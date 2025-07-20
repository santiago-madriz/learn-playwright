# SauceDemo Login Test Suite - Test Case Documentation

## Overview
This test suite comprehensively validates the login functionality of https://www.saucedemo.com with positive, negative, and edge case scenarios.

## Test Structure

### Test Data Configuration
- **Externalized test data**: All credentials, URLs, and selectors organized in `LOGIN_DATA` object
- **Multiple user types**: Standard user, performance glitch user, problem user, and locked out user
- **Reusable selectors**: Centralized element selectors for maintainability

### Test Categories

#### 1. Positive Test Cases ✅
- **Standard User Login**: Validates successful login with `standard_user` credentials
- **Performance User Login**: Tests login with `performance_glitch_user` (with extended timeout)
- **Complete Flow Validation**: Verifies access to inventory page and menu functionality

#### 2. Negative Test Cases ❌
- **Invalid Password**: Tests rejection with wrong password
- **Invalid Username**: Tests rejection with wrong username  
- **Both Invalid**: Tests rejection when both credentials are wrong
- **Error Message Validation**: Ensures proper error messages are displayed

#### 3. Edge Case Test Cases 🔍
- **Empty Fields**: Tests behavior with no input
- **Partial Input**: Tests with only username or only password
- **Locked User**: Tests the locked out user scenario
- **Security Testing**: SQL injection attempts and special characters
- **Boundary Testing**: Very long input strings (1000 characters)

#### 4. UI and Accessibility Tests 🎯
- **Error Correction Flow**: Tests error display and successful login after correction
- **Keyboard Navigation**: Validates tab order and Enter key submission
- **Focus Management**: Ensures proper focus states

## Key Features

### Robust Error Handling
- Comprehensive error message validation
- Proper URL verification for failed login attempts
- Graceful handling of edge cases

### Test Isolation
- Each test starts with clean state via `beforeEach` hook
- Independent test execution without dependencies
- Proper cleanup between test runs

### Modern Playwright Patterns
- Uses data-test attributes for reliable element selection
- Implements fallback selectors with `.or()` method
- Follows page object principles with centralized selectors

### Security Validation
- Tests for SQL injection prevention
- Validates handling of special characters
- Boundary testing with extreme input lengths

## Usage Examples

### Run All Tests
```bash
npx playwright test tests/8-mcp-login.spec.ts --headed
```

### Run Specific Test Categories
```bash
# Positive tests only
npx playwright test tests/8-mcp-login.spec.ts --grep "Positive Test Cases" --headed

# Negative tests only  
npx playwright test tests/8-mcp-login.spec.ts --grep "Negative Test Cases" --headed

# Edge cases only
npx playwright test tests/8-mcp-login.spec.ts --grep "Edge Case Test Cases" --headed
```

### Run Individual Tests
```bash
# Test locked user scenario
npx playwright test tests/8-mcp-login.spec.ts --grep "locked out user" --headed

# Test empty fields
npx playwright test tests/8-mcp-login.spec.ts --grep "empty username" --headed
```

## Test Coverage Summary

| Category | Test Cases | Purpose |
|----------|------------|---------|
| **Positive** | 2 tests | Valid credential scenarios |
| **Negative** | 3 tests | Invalid credential handling |
| **Edge Cases** | 6 tests | Boundary conditions & security |
| **UI/UX** | 2 tests | User experience validation |
| **Total** | 13 tests | Complete login validation |

## Key Validations

### Functional Validations
- ✅ Successful login redirects to inventory page
- ✅ Failed login shows appropriate error messages
- ✅ User remains on login page after failed attempts
- ✅ Menu and logout functionality accessible after login

### Security Validations
- ✅ SQL injection attempts handled safely
- ✅ Special characters processed correctly
- ✅ Long input strings don't break the system
- ✅ Locked users properly denied access

### Usability Validations
- ✅ Clear error messages for different failure scenarios
- ✅ Keyboard navigation works properly
- ✅ Error correction flows work smoothly
- ✅ Form validation messages are appropriate

## Best Practices Demonstrated
1. **Test Data Externalization**: All test data centralized for easy maintenance
2. **Comprehensive Coverage**: Tests cover happy path, error conditions, and edge cases
3. **Security Awareness**: Includes basic security testing scenarios
4. **User Experience Focus**: Validates accessibility and usability features
5. **Maintainable Selectors**: Uses data-test attributes and centralized selector management
6. **Clear Test Organization**: Logical grouping with descriptive test names
