import { test, expect, Page } from "@playwright/test";
import path from "path";

// ------------------------------
// Test Data & Configuration
// ------------------------------
const TEST_DATA = {
  username: "testUser",                   // Input for username field
  password: "password123",                // Not used, but can be added to form logic
  dropdownValue: "dd2",                   // Option value to select from dropdown
  fileToUpload: "./tests.txt",            // Relative path to file for upload test
};

// ------------------------------
// Utility Function to Fill Form
// ------------------------------
const fillFormFields = async (page: Page) => {
  // Fill username input
  const usernameInput = page.getByLabel("Username:");
  await expect(usernameInput).toBeVisible();
  await usernameInput.fill(TEST_DATA.username);
  await expect(usernameInput).toHaveValue(TEST_DATA.username);

  // Check second checkbox (value "cb2")
  const checkbox = page.locator('input[type="checkbox"][value="cb2"]');
  await checkbox.check();
  await expect(checkbox).toBeChecked();

  // Select dropdown option
  const dropdown = page.getByRole("combobox", { name: "Drop Down:" });
  await dropdown.selectOption(TEST_DATA.dropdownValue);
  await expect(dropdown).toHaveValue(TEST_DATA.dropdownValue);

  // Upload a file
  const fileInput = page.locator('input[type="file"]');
  const filePath = path.resolve(__dirname, TEST_DATA.fileToUpload);
  await fileInput.setInputFiles(filePath);
};

// ------------------------------
// Main Test Suite
// ------------------------------
test.describe("Merged Best Practices Tests", () => {

  // --------------------------
  // Runs Before Each Test
  // --------------------------
  test.beforeEach("Navigate to Test Page", async ({ page }) => {
    // Use environment variable for flexibility, fallback to default
    const url = process.env.BASE_URL || "https://testpages.herokuapp.com/styled/basic-html-form-test.html";
    await page.goto(url);
  });

  // --------------------------
  // Form Reset Test
  // --------------------------
  test("Form reset should clear all inputs", async ({ page }) => {
    await fillFormFields(page); // Fill the form
    const resetBtn = page.getByRole("button", { name: "Reset" });
    await resetBtn.click(); // Click reset

    // Ensure username field is cleared
    const usernameInput = page.getByLabel("Username:");
    await expect(usernameInput).toHaveValue("");
  });

  // --------------------------
  // Form Submission Test
  // --------------------------
  test("Form submit should go to details page", async ({ page }) => {
    await fillFormFields(page); // Fill the form
    const submitBtn = page.getByRole("button", { name: "Submit" });
    await submitBtn.click(); // Click submit

    // Confirm navigation to result page
    await expect(page).toHaveURL(/.*the_form_processor\.php$/);

    // Confirm expected title on results page
    const resultTitle = page.getByRole("heading", { name: "Processed Form Details" });
    await expect(resultTitle).toBeVisible();

    // Confirm username and dropdown values are shown correctly
    const usernameResult = page.locator("#_valueusername");
    const dropdownResult = page.locator("#_valuedropdown");
    await expect(usernameResult).toHaveText(TEST_DATA.username);
    await expect(dropdownResult).toHaveText(TEST_DATA.dropdownValue);
  });

  // --------------------------
  // Homepage Logo & Heading Test
  // --------------------------
  test("Homepage nav elements check", async ({ page }) => {
    await page.goto("https://playwright.dev/"); // Go to official Playwright site

    const logo = page.getByAltText("Playwright logo").first();
    await expect(logo).toBeVisible(); // Verify logo is visible

    const heading = page.locator("h1");
    console.log(await heading.innerText()); // Print heading text
    await expect(heading).toBeVisible(); // Verify heading is visible

    const docsLink = page.getByRole("link", { name: "Docs" });
    const apiLink = page.getByRole("link", { name: "API" });
    await expect(docsLink).toBeVisible(); // Check Docs nav link
    await expect(apiLink).toBeVisible();  // Check API nav link
  });

  // --------------------------
  // Navigation Test: Community Page
  // --------------------------
  test("Navigate to Community page", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    const communityLink = page.getByRole("link", { name: "Community" });
    await communityLink.click(); // Click Community link

    // Confirm we're on the correct page
    await expect(page).toHaveURL("https://playwright.dev/community/welcome");

    // Check that the heading is present
    const ambassadorHeading = page.getByRole("heading", { name: "Ambassadors" });
    await expect(ambassadorHeading).toBeVisible();
  });

  // --------------------------
  // Hover Menu Test: Switch Env to Python
  // --------------------------
  test("Hover and switch environment to Python", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    const envToggle = page.getByRole("button", { name: "Node.js" });

    await envToggle.hover(); // Hover to reveal dropdown

    const envMenu = page.locator(".dropdown__menu");
    await expect(envMenu).toBeVisible(); // Make sure dropdown shows up

    const pythonLink = envMenu.getByText("Python");
    await pythonLink.click(); // Click Python

    // Confirm page URL updated to Python docs
    await expect(page).toHaveURL("https://playwright.dev/python/");
  });

  // --------------------------
  // Logos List Check
  // --------------------------
  test("Verify logos list on homepage", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    const logos = page.locator("ul.logosList_zAAF li");

    // Confirm there are 9 logo list items
    await expect(logos).toHaveCount(9);
  });

});
