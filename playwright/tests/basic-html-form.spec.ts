import { test, expect } from "@playwright/test";

test.describe("Basic HTML Form Tests", () => {

  test.beforeEach('Navigate to the form page', async ({ page }) => {
    const url = process.env.BASE_URL as string;
    await page.goto(url);
  });

  test("Has h1 title", async ({ page }) => {
    const title = page.locator("xpath=//h1");
    await expect(title).toHaveText("Basic HTML Form Example");
  });

  test("Test username field", async ({ page }) => {
    const usernameInput = page.locator("xpath=//input[@name='username']");
    await expect(usernameInput).toBeVisible();
    await usernameInput.fill("Chocho");
    await expect(usernameInput).toHaveValue("Chocho");
  });

  test("Test password field", async ({ page }) => {
    const passwordInput = page.locator("xpath=//input[@type='password' and @name='password']");
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill("MySecret123");
    await expect(passwordInput).toHaveValue("MySecret123");
  });

  test("Test textarea", async ({ page }) => {
    const textarea = page.locator("xpath=//textarea[@name='comments']");
    await expect(textarea).toBeVisible();
    await textarea.fill("This is a test comment.");
    await expect(textarea).toHaveValue("This is a test comment.");
  });

  test("Test checkbox selection", async ({ page }) => {
    const checkbox = page.locator("xpath=//input[@type='checkbox' and @value='cb2']");
    await expect(checkbox).toBeVisible();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });

  test("Test radio selection", async ({ page }) => {
    const radio = page.locator("xpath=//input[@type='radio' and @value='rd1']");
    await expect(radio).toBeVisible();
    await radio.check();
    await expect(radio).toBeChecked();
  });

  test("Select dropdown option", async ({ page }) => {
    const dropdown = page.locator("xpath=//select[@name='dropdown']");
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption("dd2");
    await expect(dropdown).toHaveValue("dd2");
  });

  test("Submit the form", async ({ page }) => {
    const submitButton = page.locator("xpath=//input[@type='submit']");
    await expect(submitButton).toBeVisible();
    await submitButton.click();

    await expect(page).toHaveURL(/.*the_form_processor\.php.*/);
  });
});