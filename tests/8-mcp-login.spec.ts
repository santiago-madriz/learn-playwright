import { test, expect } from '../fixtures/saucedemo-fixtures';

test.describe('SauceDemo Login Validation - POM Structure', () => {
  
  test.beforeEach(async ({ loginPage }) => {
    // Navigate to login page and verify elements using POM
    await loginPage.navigate();
    await loginPage.verifyPageElements();
  });

  test.describe('Positive Test Cases', () => {
    
    test('should successfully login with valid standard user credentials', async ({ testData, loginPage, inventoryPage }) => {
      // Use POM for login
      await loginPage.login(testData.validUsers.standard);
      
      // Verify successful login using inventory page
      await inventoryPage.verifyPageLoaded();
      await inventoryPage.verifyInventoryItemsVisible();
      
      // Verify we can access the menu (indicates full authentication)
      await inventoryPage.openMenu();
    });

    test('should successfully login with performance glitch user', async ({ page, testData, loginPage, urls }) => {
      await loginPage.login(testData.validUsers.performanceGlitch);
      
      // This user may be slower, so use custom timeout
      await expect(page).toHaveURL(urls.inventory, { timeout: 10000 });
      await expect(page.locator('.inventory_list')).toBeVisible();
    });
  });

  test.describe('Negative Test Cases', () => {
    
    test('should reject login with invalid password', async ({ page, testData, loginPage, urls }) => {
      await loginPage.login(testData.invalidCredentials.wrongPassword);
      
      // Verify error message appears using POM
      const hasError = await loginPage.verifyErrorMessage('Username and password do not match');
      expect(hasError).toBe(true);
      
      // Verify we stay on login page
      await expect(page).toHaveURL(urls.login);
      const isLoginFormVisible = await loginPage.isLoginFormVisible();
      expect(isLoginFormVisible).toBe(true);
    });

    test('should reject login with invalid username', async ({ page, testData, loginPage, urls }) => {
      await loginPage.login(testData.invalidCredentials.wrongUsername);
      
      const hasError = await loginPage.verifyErrorMessage('Username and password do not match');
      expect(hasError).toBe(true);
      await expect(page).toHaveURL(urls.login);
    });

    test('should reject login with both invalid credentials', async ({ page, testData, loginPage, urls }) => {
      await loginPage.login(testData.invalidCredentials.bothWrong);
      
      const hasError = await loginPage.verifyErrorMessage('Username and password do not match');
      expect(hasError).toBe(true);
      await expect(page).toHaveURL(urls.login);
    });
  });

  test.describe('Edge Case Test Cases', () => {
    
    test('should reject login with empty username and password fields', async ({ page, loginPage, urls }) => {
      // Just click login without filling fields
      await loginPage.clickLogin();
      
      const hasError = await loginPage.verifyErrorMessage('Username is required');
      expect(hasError).toBe(true);
      await expect(page).toHaveURL(urls.login);
    });

    test('should reject login with only username filled', async ({ page, testData, loginPage, urls }) => {
      await loginPage.login(testData.edgeCases.onlyUsername);
      
      const hasError = await loginPage.verifyErrorMessage('Password is required');
      expect(hasError).toBe(true);
      await expect(page).toHaveURL(urls.login);
    });

    test('should reject login with only password filled', async ({ page, testData, loginPage, urls }) => {
      await loginPage.login(testData.edgeCases.onlyPassword);
      
      const hasError = await loginPage.verifyErrorMessage('Username is required');
      expect(hasError).toBe(true);
      await expect(page).toHaveURL(urls.login);
    });

    test('should reject login with locked out user', async ({ page, testData, loginPage, urls }) => {
      await loginPage.login(testData.edgeCases.lockedUser);
      
      const hasError = await loginPage.verifyErrorMessage('Sorry, this user has been locked out');
      expect(hasError).toBe(true);
      await expect(page).toHaveURL(urls.login);
    });

    test('should handle special characters in username field', async ({ page, loginPage, urls }) => {
      // Test with special characters that might cause injection issues
      const specialCredentials = { username: "'; DROP TABLE users; --", password: 'secret_sauce' };
      await loginPage.login(specialCredentials);
      
      // Should handle gracefully with standard error message
      const hasError = await loginPage.verifyErrorMessage('Username and password do not match');
      expect(hasError).toBe(true);
      await expect(page).toHaveURL(urls.login);
    });

    test('should handle very long input strings', async ({ page, loginPage, urls }) => {
      // Test with extremely long strings
      const longCredentials = { username: 'a'.repeat(1000), password: 'a'.repeat(1000) };
      await loginPage.login(longCredentials);
      
      // Should handle gracefully
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(page).toHaveURL(urls.login);
    });
  });

  test.describe('UI and Accessibility Tests', () => {
    
    test('should display error message for empty fields and allow correction', async ({ testData, loginPage, inventoryPage }) => {
      // First, trigger an error
      await loginPage.clickLogin();
      const hasError = await loginPage.verifyErrorMessage('Username is required');
      expect(hasError).toBe(true);
      
      // Then login with correct credentials
      await loginPage.login(testData.validUsers.standard);
      
      // Should successfully login after correction
      await inventoryPage.verifyPageLoaded();
      await inventoryPage.verifyInventoryItemsVisible();
    });

    test('should support keyboard navigation', async ({ page, testData, loginPage, urls }) => {
      // Tab through form elements using POM methods
      await loginPage.tabToNextField();
      const isUsernameFocused = await loginPage.isUsernameFieldFocused();
      expect(isUsernameFocused).toBe(true);
      
      await loginPage.tabToNextField();
      const isPasswordFocused = await loginPage.isPasswordFieldFocused();
      expect(isPasswordFocused).toBe(true);
      
      await loginPage.tabToNextField();
      const isLoginButtonFocused = await loginPage.isLoginButtonFocused();
      expect(isLoginButtonFocused).toBe(true);
      
      // Fill credentials and submit with Enter key
      await loginPage.loginWithKeyboard(testData.validUsers.standard);
      
      await expect(page).toHaveURL(urls.inventory);
    });
  });
});
