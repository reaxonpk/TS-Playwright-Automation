import { test, expect, Page } from "@playwright/test";
import path from "path";
import fs from "fs";

// ==========================
// 📌 Centralized XPath Locators
// ==========================
const locators = {
  title: "xpath=//h1", // Page title <h1>
  username: "xpath=//input[@name='username']", // Username input field
  password: "xpath=//input[@type='password' and @name='password']", // Password field
  comments: "xpath=//textarea[@name='comments']", // Textarea for comments
  checkbox1: "xpath=//input[@type='checkbox' and @value='cb1']", // Checkbox with value cb1
  checkboxDefault: "xpath=//input[@value='cb3']", // Default checked checkbox
  radio1: "xpath=//input[@type='radio' and @value='rd1']", // Radio button with value rd1
  dropdown: "xpath=//select[@name='dropdown']", // Dropdown menu
  fileUpload: 'xpath=//input[@type="file" and @name="filename"]', // File upload input
  submit: "xpath=//input[@type='submit']", // Submit button
  reset: 'xpath=//input[@type="reset"]', // Reset button
  resultUsername: "xpath=//li[@id='_valueusername']", // Result value of username
  resultDropdown: "xpath=//li[@id='_valuedropdown']", // Result value of dropdown
};

// ==========================
// ✏️ Type for Form Test Data
// ==========================
interface FormData {
  username: string;
  password: string;
  comments: string;
  dropdownValue: string;
}

// 🎯 Centralized test data used in multiple test cases
const testUser: FormData = {
  username: "Chocho",
  password: "MySecret123",
  comments: "This is a test comment",
  dropdownValue: "dd2",
};

// ==========================
// 🔧 Utility Function: Fill all form fields
// ==========================
const fillFormFields = async (page: Page, data: FormData) => {
  // Fill the username input
  await test.step("Fill the username input", async () => {
    const usernameInput = page.locator(locators.username);
    await usernameInput.fill(data.username);
    await expect(usernameInput).toHaveValue(data.username);
  });

  // Fill the password field
  await test.step("Fill the password input", async () => {
    const passwordInput = page.locator(locators.password);
    await passwordInput.fill(data.password);
    await expect(passwordInput).toHaveValue(data.password);
  });

  // Fill the comments textarea
  await test.step("Fill the comments textarea", async () => {
    const commentsField = page.locator(locators.comments);
    await commentsField.fill(data.comments);
    await expect(commentsField).toHaveValue(data.comments);
  });

  // Check a checkbox (value cb1)
  await test.step("Check the checkbox with value 'cb1'", async () => {
    const checkbox = page.locator(locators.checkbox1);
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });

  // Select a radio button (value rd1)
  await test.step("Select the radio button with value 'rd1'", async () => {
    const radio = page.locator(locators.radio1);
    await radio.check();
    await expect(radio).toBeChecked();
  });

  // Choose a value from the dropdown
  await test.step("Select dropdown value", async () => {
    const dropdown = page.locator(locators.dropdown);
    await dropdown.selectOption(data.dropdownValue);
    await expect(dropdown).toHaveValue(data.dropdownValue);
  });

  // Upload a file
  await test.step("Upload file", async () => {
    const filePath = path.resolve(__dirname, "assets/testfile.txt");
    const fileInput = page.locator(locators.fileUpload);
    await fileInput.setInputFiles(filePath);
  });
};

// ==========================
// 🧪 Test Suite: HTML Form Validation
// ==========================
test.describe("Basic HTML Form Tests", () => {
  // ✅ Navigate to the form page before each test
  // 📌 BASE_HTML_FORM_URL=https://testpages.herokuapp.com/styled/basic-html-form-test.html
  test.beforeEach("Navigate to the form page", async ({ page }) => {
    const url = process.env.BASE_HTML_FORM_URL as string;
    await page.goto(url);
  });

  // ✅ Verify that the h1 title is correct
  test("Page has correct h1 title", async ({ page }) => {
    await expect(page.locator(locators.title)).toHaveText(
      "Basic HTML Form Example"
    );
  });

  // ✅ Verify that the Reset button clears the form fields
  test("Form reset clears fields", async ({ page }) => {
    const cancelBtn = page.locator(locators.reset);
    await expect(cancelBtn).toBeVisible();

    // Fill form and click reset
    await fillFormFields(page, testUser);
    await cancelBtn.click();

    // Confirm that username field is cleared
    await expect(page.locator(locators.username)).toHaveValue("");

    // Confirm that the default checkbox remains checked (cb3)
    await expect(page.locator(locators.checkboxDefault)).toBeChecked();
  });

  // ✅ Submit the form and validate that submitted values are displayed
  test("Submit the form and validate results", async ({ page }) => {
    const submitBtn = page.locator(locators.submit);
    await expect(submitBtn).toBeVisible();

    // Fill and submit the form
    await fillFormFields(page, testUser);
    await submitBtn.click();

    // Confirm URL redirection to result page
    await expect(page).toHaveURL(/.*the_form_processor\.php.*/);

    // Verify submitted values appear on the results page
    await expect(page.locator(locators.resultUsername)).toHaveText(
      testUser.username
    );
    await expect(page.locator(locators.resultDropdown)).toHaveText(
      testUser.dropdownValue
    );
  });

  // ✅ Check if the file is larger than 5MB before uploading
  test("Prevent file upload if file is over 5MB", async ({ page }) => {
    const filePath = path.resolve(__dirname, "assets/testfile.txt");
    const fileInput = page.locator(locators.fileUpload);

    // Get file size in MB
    const sizeInMB = fs.statSync(filePath).size / (1024 * 1024);
    console.log(`📁 File size: ${sizeInMB.toFixed(2)} MB`);

    // Stop test if file is larger than 5MB
    if (sizeInMB > 5) {
      throw new Error(
        "❌ File is larger than 5MB. Cannot proceed with upload."
      );
    }

    await fileInput.setInputFiles(filePath);
  });
});
