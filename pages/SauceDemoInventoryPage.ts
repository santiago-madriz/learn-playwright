import { Page, Locator } from '@playwright/test';
import { SAUCEDEMO_URLS } from '../test-data/saucedemo-data';

export class SauceDemoInventoryPage {
  readonly page: Page;
  
  // Locators
  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('.inventory_list');
    this.inventoryItems = page.locator('.inventory_item');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  // Verification methods
  async verifyPageLoaded() {
    await this.page.waitForURL(SAUCEDEMO_URLS.inventory);
    await this.inventoryContainer.waitFor();
  }

  async verifyInventoryItemsVisible() {
    await this.inventoryItems.first().waitFor();
  }

  async getInventoryItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async verifyCartBadge(expectedCount: string) {
    await this.cartBadge.waitFor();
    return await this.cartBadge.textContent() === expectedCount;
  }

  // Navigation methods
  async openMenu() {
    await this.menuButton.click();
    await this.logoutLink.waitFor();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  // Product interaction methods
  async addItemToCart(itemName: string) {
    const addButton = this.page.locator(`[data-test="add-to-cart-${itemName}"]`);
    await addButton.click();
  }

  async removeItemFromCart(itemName: string) {
    const removeButton = this.page.locator(`[data-test="remove-${itemName}"]`);
    await removeButton.click();
  }

  async getProductDetails(itemName: string) {
    const productContainer = this.page.locator(`.inventory_item:has([data-test="add-to-cart-${itemName}"])`);
    const name = await productContainer.locator('.inventory_item_name').textContent();
    const price = await productContainer.locator('.inventory_item_price').textContent();
    const description = await productContainer.locator('.inventory_item_desc').textContent();
    
    return { name, price, description };
  }

  // Utility methods
  async isMenuOpen(): Promise<boolean> {
    return await this.logoutLink.isVisible();
  }

  async hasItemsInCart(): Promise<boolean> {
    return await this.cartBadge.isVisible();
  }

  async getCartItemCount(): Promise<string | null> {
    if (await this.hasItemsInCart()) {
      return await this.cartBadge.textContent();
    }
    return '0';
  }
}
