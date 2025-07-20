import { test, expect } from '../fixtures/saucedemo-fixtures';

test.describe('SauceDemo Inventory Tests - POM Structure', () => {
  
  test.beforeEach(async ({ testData, loginPage, inventoryPage }) => {
    // Navigate and login with standard user using POM
    await loginPage.navigate();
    await loginPage.login(testData.validUsers.standard);
    await inventoryPage.verifyPageLoaded();
  });

  test('should display inventory items after login', async ({ inventoryPage }) => {
    // Verify inventory page using POM methods
    await inventoryPage.verifyInventoryItemsVisible();
    
    // Verify expected number of products
    const itemCount = await inventoryPage.getInventoryItemCount();
    expect(itemCount).toBe(6); // SauceDemo has 6 items
  });

  test('should be able to add item to cart', async ({ inventoryPage }) => {
    // Add first item to cart using POM
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    
    // Verify cart badge shows 1 item
    const hasItemsInCart = await inventoryPage.hasItemsInCart();
    expect(hasItemsInCart).toBe(true);
    
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe('1');
  });

  test('should be able to remove item from cart', async ({ inventoryPage }) => {
    // Add and then remove item
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.removeItemFromCart('sauce-labs-backpack');
    
    // Verify cart is empty
    const hasItemsInCart = await inventoryPage.hasItemsInCart();
    expect(hasItemsInCart).toBe(false);
  });

  test('should display product details correctly', async ({ inventoryPage }) => {
    // Get product details using POM
    const product = await inventoryPage.getProductDetails('sauce-labs-backpack');
    
    expect(product.name).toContain('Backpack');
    expect(product.price).toContain('$');
    expect(product.description).toBeTruthy();
  });

  test('should be able to navigate to cart', async ({ page, inventoryPage, urls }) => {
    // Add item and go to cart
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.goToCart();
    
    // Verify we're on cart page
    await expect(page).toHaveURL(urls.cart);
  });

  test('should be able to logout successfully', async ({ page, inventoryPage, urls }) => {
    // Logout using POM
    await inventoryPage.logout();
    
    // Verify we're back to login page
    await expect(page).toHaveURL(urls.login);
  });
});
