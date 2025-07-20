import { test as base } from '@playwright/test';
import { SauceDemoLoginPage } from '../pages/SauceDemoLoginPage';
import { SauceDemoInventoryPage } from '../pages/SauceDemoInventoryPage';
import { SAUCEDEMO_TEST_DATA, SAUCEDEMO_URLS, SauceDemoTestData } from '../test-data/saucedemo-data';

// Extend the base test with SauceDemo fixtures
export const test = base.extend<{
  testData: SauceDemoTestData;
  urls: typeof SAUCEDEMO_URLS;
  loginPage: SauceDemoLoginPage;
  inventoryPage: SauceDemoInventoryPage;
}>({
  testData: async ({}, use) => {
    await use(SAUCEDEMO_TEST_DATA);
  },

  urls: async ({}, use) => {
    await use(SAUCEDEMO_URLS);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new SauceDemoLoginPage(page);
    await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new SauceDemoInventoryPage(page);
    await use(inventoryPage);
  }
});

export { expect } from '@playwright/test';
