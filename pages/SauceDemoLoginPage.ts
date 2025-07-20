import { Page, Locator } from '@playwright/test';
import { LoginCredentials } from '../test-data/saucedemo-data';
import { SAUCEDEMO_URLS } from '../test-data/saucedemo-data';

export class SauceDemoLoginPage {
  readonly page: Page;
  
  // Locators - encapsulated within the page object
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Navigation methods
  async navigate() {
    await this.page.goto(SAUCEDEMO_URLS.login);
    await this.page.waitForLoadState('networkidle');
  }

  // Verification methods
  async verifyPageElements() {
    await this.usernameField.waitFor();
    await this.passwordField.waitFor();
    await this.loginButton.waitFor();
  }

  async verifyErrorMessage(expectedText: string): Promise<boolean> {
    await this.errorMessage.waitFor();
    const errorText = await this.errorMessage.textContent();
    return errorText?.includes(expectedText) || false;
  }

  async isLoginFormVisible(): Promise<boolean> {
    return await this.usernameField.isVisible() && 
           await this.passwordField.isVisible() && 
           await this.loginButton.isVisible();
  }

  // Interaction methods
  async fillUsername(username: string) {
    await this.usernameField.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(credentials: LoginCredentials) {
    await this.fillUsername(credentials.username);
    await this.fillPassword(credentials.password);
    await this.clickLogin();
  }

  async loginWithKeyboard(credentials: LoginCredentials) {
    await this.fillUsername(credentials.username);
    await this.fillPassword(credentials.password);
    await this.page.keyboard.press('Enter');
  }

  // Utility methods for testing
  async clearForm() {
    await this.usernameField.clear();
    await this.passwordField.clear();
  }

  async isUsernameFieldFocused(): Promise<boolean> {
    return await this.usernameField.evaluate(el => document.activeElement === el);
  }

  async isPasswordFieldFocused(): Promise<boolean> {
    return await this.passwordField.evaluate(el => document.activeElement === el);
  }

  async isLoginButtonFocused(): Promise<boolean> {
    return await this.loginButton.evaluate(el => document.activeElement === el);
  }

  async tabToNextField() {
    await this.page.keyboard.press('Tab');
  }
}
