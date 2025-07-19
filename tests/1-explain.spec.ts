import { test, expect } from '@playwright/test';

test('should load homepage and check title', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});
