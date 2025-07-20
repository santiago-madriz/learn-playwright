// Test data types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SauceDemoTestData {
  validUsers: {
    standard: LoginCredentials;
    performanceGlitch: LoginCredentials;
    problemUser: LoginCredentials;
  };
  invalidCredentials: {
    wrongPassword: LoginCredentials;
    wrongUsername: LoginCredentials;
    bothWrong: LoginCredentials;
  };
  edgeCases: {
    emptyFields: LoginCredentials;
    onlyUsername: LoginCredentials;
    onlyPassword: LoginCredentials;
    lockedUser: LoginCredentials;
  };
}

// SauceDemo test data - separate from page objects
export const SAUCEDEMO_TEST_DATA: SauceDemoTestData = {
  validUsers: {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    performanceGlitch: { username: 'performance_glitch_user', password: 'secret_sauce' },
    problemUser: { username: 'problem_user', password: 'secret_sauce' }
  },
  invalidCredentials: {
    wrongPassword: { username: 'standard_user', password: 'wrong_password' },
    wrongUsername: { username: 'invalid_user', password: 'secret_sauce' },
    bothWrong: { username: 'invalid_user', password: 'wrong_password' }
  },
  edgeCases: {
    emptyFields: { username: '', password: '' },
    onlyUsername: { username: 'standard_user', password: '' },
    onlyPassword: { username: '', password: 'secret_sauce' },
    lockedUser: { username: 'locked_out_user', password: 'secret_sauce' }
  }
};

// URLs configuration
export const SAUCEDEMO_URLS = {
  login: 'https://www.saucedemo.com',
  inventory: 'https://www.saucedemo.com/inventory.html',
  cart: 'https://www.saucedemo.com/cart.html',
  checkout: 'https://www.saucedemo.com/checkout-step-one.html',
  checkoutOverview: 'https://www.saucedemo.com/checkout-step-two.html',
  checkoutComplete: 'https://www.saucedemo.com/checkout-complete.html'
};
