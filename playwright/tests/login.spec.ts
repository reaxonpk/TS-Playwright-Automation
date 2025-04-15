import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { CREDENTIALS } from "../test-data/credentials";
import { ERROR_MESSAGES } from "../test-data/messages";

test.describe("Login Page - SauceDemo", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("should login successfully with valid credentials", async () => {
    await loginPage.login(
      CREDENTIALS.validUser.username,
      CREDENTIALS.validUser.password
    );
    await loginPage.expectLoginSuccess();
  });

  test("should show error for locked out user", async () => {
    await loginPage.login(
      CREDENTIALS.lockedUser.username,
      CREDENTIALS.lockedUser.password
    );
    await loginPage.expectLoginError(ERROR_MESSAGES.locked);
  });

  test("should show error for invalid credentials", async () => {
    await loginPage.login(
      CREDENTIALS.invalidUser.username,
      CREDENTIALS.invalidUser.password
    );
    await loginPage.expectLoginError(ERROR_MESSAGES.invalid);
  });

  test("Login page loads properly", async () => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
