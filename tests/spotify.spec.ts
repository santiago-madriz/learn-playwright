import { test, expect } from '@playwright/test';

test.describe('Spotify Web App Tests', () => {
  test('should search for an artist and navigate through their profile', async ({ page }) => {
    // Navigate to Spotify
    await page.goto('https://open.spotify.com/');
    await expect(page).toHaveTitle(/Spotify/);

    // Search for Daft Punk
    const searchInput = page.getByTestId('search-input');
    await searchInput.waitFor({ state: 'visible' });
    await searchInput.click();
    await searchInput.fill('daft punk');
    await searchInput.press('Enter');

    // Verify search results and navigate to artist page
    const artistLink = page.getByTestId('artists-search-entity-shelf')
      .getByRole('link', { name: 'Daft Punk', exact: true });
    await expect(artistLink).toBeVisible();
    await artistLink.click();

    // Verify artist page loaded
    const artistButton = page.getByRole('button', { name: 'Daft Punk', exact: true });
    await expect(artistButton).toBeVisible();
    await artistButton.click();

    // Navigate through images with verification
    const nextImageButton = page.getByRole('button', { name: 'Next image' });
    for (let i = 0; i < 3; i++) {
      await expect(nextImageButton).toBeVisible();
      await nextImageButton.click();
      // Add small delay between clicks to ensure images load
      await page.waitForTimeout(1000);
    }

    // Close artist profile modal
    const closeButton = page.getByTestId('artist-page')
      .getByRole('button', { name: 'Close' });
    await expect(closeButton).toBeVisible();
    await closeButton.click();

    // Navigate home
    const homeButton = page.getByTestId('home-button');
    await expect(homeButton).toBeVisible();
    await homeButton.click();

    // Navigate to Bad Bunny's profile
    const badBunnyLink = page.getByLabel('Popular artists')
      .getByRole('link', { name: 'Bad Bunny' });
    await expect(badBunnyLink).toBeVisible();
    await badBunnyLink.click();
  });
});