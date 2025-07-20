import { test, expect } from '@playwright/test';

test.describe('MCP Spotify Tests', () => {
  test('should open Spotify web page', async ({ page }) => {
    // Navigate to Spotify
    await page.goto('https://open.spotify.com/');
    
    // Verify the page loaded correctly
    await expect(page).toHaveTitle(/Spotify/);
    
    // Take a screenshot for verification
    await page.screenshot({ path: 'spotify-homepage.png' });
    
    // Wait a moment to see the page
    await page.waitForTimeout(3000);
  });
});
