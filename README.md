# Playwright Testing Guide

## Prerequisites Check

### 1. Verify Node.js and npm Installation
```bash
# Check Node.js version
node --version

# Check npm version
npm --version
```

If not installed, download and install Node.js from [nodejs.org](https://nodejs.org/)

### 2. Verify/Install Playwright
```bash
# Check if Playwright is installed globally
npm list -g @playwright/test

# Install Playwright if not present
npm init playwright@latest

# This will:
# - Create a basic project structure
# - Add the playwright.config.js file
# - Create an examples directory with sample tests
# - Install browser binaries
```

## Running Your First Test

1. Create your first test file:
```bash
mkdir tests
touch tests/example.spec.ts
```

2. Add basic test content:
```typescript
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = await page.title();
  expect(title).toBe('Playwright');
});
```

3. Run the test:
```bash
# Run all tests
npx playwright test

# Run tests with UI Mode
npx playwright test --ui

# Run specific test file
npx playwright test example.spec.ts

# Run tests in headed mode (visible browser)
npx playwright test --headed
```

## Viewing Test Reports
```bash
# Show HTML test report
npx playwright show-report
```