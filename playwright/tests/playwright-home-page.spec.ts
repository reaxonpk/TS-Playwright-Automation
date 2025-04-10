import { test, expect, Page } from "@playwright/test";
import path from "path";

interface Results {
  username: string;
  password: string;
  dropdownValue: string;
}

const results = {
  username: "testuser",
  password: "password",
  dropdownValue: "dd3",
};

const fillFormFields = async (page: Page) => {
  const usernameInput = page.locator("xpath=//input[@name='username']");
  await expect(usernameInput).toBeVisible();
  await usernameInput.fill("testUser");
  await expect(usernameInput).toHaveValue("testUser");

  const checkboxEl = page.locator('xpath=//input[@value="cb2"]');
  await expect(checkboxEl).toBeVisible();
  await checkboxEl.check();
  await expect(checkboxEl).toBeChecked();

  const dropdown = page.locator('xpath=//select[@name="dropdown"]');
  await expect(dropdown).toBeVisible();
  await dropdown.selectOption("dd2");
  await expect(dropdown).toHaveValue("dd2");

  const fileInput = page.locator('xpath=//input[@type="file"]');
  const filePath = path.resolve(__dirname, "./tests.txt");
  await fileInput.setInputFiles(filePath);
};

test.describe("Testing Web Form", () => {
  test.beforeEach("Open Form Web Page", async ({ page }) => {
    await page.goto(
      "https://testpages.herokuapp.com/styled/basic-html-form-test.html"
    );
  });

  test("Cancel and reset the form", async ({ page }) => {
    await fillFormFields(page);
    const cancelBtn = page.locator('xpath=//input[@type="reset"]');
    await cancelBtn.click();

    await expect(page.locator("xpath=//input[@name='username']")).toHaveValue(
      ""
    );
  });

  test("Submit and proceed to form details", async ({ page }) => {
    await fillFormFields(page);
    const submitBtn = page.locator('xpath=//input[@type="submit"]');
    await submitBtn.click();

    await expect(page).toHaveURL(
      "https://testpages.herokuapp.com/styled/the_form_processor.php"
    );
    const title = page.locator("xpath=//h1");
    await expect(title).toHaveText("Processed Form Details");

    const usernameVal = page.locator('xpath=//li[@id="_valueusername"]');
    await expect(usernameVal).toHaveText("testUser");
    const dropdownValue = page.locator('xpath=//li[@id="_valuedropdown"]');
    await expect(dropdownValue).toHaveText("dd2");
  });
});
