import { test, expect } from '@playwright/test';

test('should load Spotify homepage and validate elements', async ({ page }) => {
  // Navigate to Spotify
  await page.goto('https://open.spotify.com');
  
  // 1. Title validation
  await expect(page).toHaveTitle(/Spotify/);
  
  // 2. Heading validation - check for main heading
  await expect(page.locator('h1').first()).toBeVisible();
  
  // 3. Logo validation
  await expect(page.locator('[data-testid="logo"]').or(page.locator('svg[role="img"]').first())).toBeVisible();
  
  // 4. Navigation menu validation
  await expect(page.locator('nav').or(page.locator('[role="navigation"]'))).toBeVisible();
  
  // 5. Search functionality validation
  await expect(page.locator('[data-testid="search-input"]').or(page.locator('input[type="search"]')).or(page.locator('[placeholder*="search" i]'))).toBeVisible();
  
  // 6. Login/Sign up button validation
  await expect(page.locator('text=/log in|sign up/i').first()).toBeVisible();

  // UI Test - Check responsive design by changing viewport
  await page.setViewportSize({ width: 375, height: 667 }); // Mobile size
  await expect(page.locator('body')).toBeVisible();
  await page.setViewportSize({ width: 1200, height: 800 }); // Desktop size
  
  // Accessibility Test - Check for proper ARIA labels and roles
  await expect(page.locator('[role="main"]').or(page.locator('main'))).toBeVisible();
  
  // Additional accessibility check - ensure images have alt text or proper aria labels
  const images = page.locator('img');
  const imageCount = await images.count();
  if (imageCount > 0) {
    for (let i = 0; i < Math.min(imageCount, 3); i++) {
      const img = images.nth(i);
      const hasAlt = await img.getAttribute('alt');
      const hasAriaLabel = await img.getAttribute('aria-label');
      expect(hasAlt !== null || hasAriaLabel !== null).toBeTruthy();
    }
  }
});
