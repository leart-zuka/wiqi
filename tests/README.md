# WiQi Testing Suite

![Experimental](https://img.shields.io/badge/Status-Experimental-orange?style=for-the-badge)
![Tests](https://img.shields.io/badge/Tests-18_Total-blue?style=for-the-badge)
![Coverage](https://img.shields.io/badge/Coverage-404_Handling-green?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18+-brightgreen?style=for-the-badge&logo=node.js)
![CI/CD](https://img.shields.io/badge/CI_CD-Ready-purple?style=for-the-badge)
![License](https://img.shields.io/badge/License-CC_BY_NC_ND_4.0-lightgrey?style=for-the-badge)

> **⚠️ EXPERIMENTAL TESTING FRAMEWORK**  
> This testing structure is currently an **experimental idea** and proof of concept. The patterns, conventions, and implementations described here are suggestions for future development and may change as the project evolves.

This directory contains automated tests for the WiQi quantum education platform.

## Test Categories

### 404 Handling (`404-handling/`)

Comprehensive test suite for the multi-layered 404 error handling system.

**Purpose**: Ensures all "not found" scenarios (invalid subfolders, unknown paths, missing content) properly redirect to custom 404 pages instead of showing broken content or causing runtime errors.

**Coverage**:

- ✅ Valid page rendering (4 tests)
- ✅ Invalid subfolder redirects (6 tests)
- ✅ Catch-all 404 handling (6 tests)
- ✅ Edge cases with query parameters (1 test)

**Total**: 18 comprehensive test cases (including easter egg)

## Running Tests

### 404 Handling Tests

```bash
cd tests/404-handling
node test-404-handling.js
```

### GitHub Workflow Integration

All test scripts output unique identifiers for CI/CD parsing:

- **Success**: `WIQI_TEST_RESULT: [TEST-NAME]-SUCCESS`
- **Failure**: `WIQI_TEST_RESULT: [TEST-NAME]-FAILURE`

This allows GitHub workflows to easily parse test results and take appropriate actions.

## Prerequisites

- Local development server running on `http://localhost:3000`
- Node.js installed
- All project dependencies installed (`npm install` or `bun install`)

## Adding New Tests

When adding new test categories:

1. Create a new subdirectory under `tests/`
2. Include a `README.md` explaining the test purpose and coverage
3. Add test runner scripts where appropriate
4. Update this main `tests/README.md` with the new category

## Test Philosophy

Our tests focus on:

- **User Experience**: Ensuring users never see broken pages or confusing errors
- **System Reliability**: Preventing runtime crashes and server errors
- **Internationalization**: Supporting multiple languages (English/German)
- **Edge Cases**: Handling unusual but possible user interactions

Each test category should include comprehensive documentation explaining:

- What is being tested and why
- The problem it solves
- Expected behaviors
- Technical implementation details

## Console Output Pattern for CI/CD Integration

All test scripts follow a standardized console output pattern for GitHub workflow integration:

### Success Output Format

```
WIQI_TEST_RESULT: [TEST-CATEGORY]-SUCCESS
```

### Failure Output Format

```
WIQI_TEST_RESULT: [TEST-CATEGORY]-FAILURE
```

### Examples

- `WIQI_TEST_RESULT: 404-HANDLING-SUCCESS`
- `WIQI_TEST_RESULT: INTEGRATION-FAILURE`
- `WIQI_TEST_RESULT: E2E-SUCCESS`

### GitHub Workflow Usage

```yaml
- name: Run Tests
  run: |
    cd tests/[test-category]
    node test-[category].js | tee test-output.log

- name: Parse Results
  run: |
    if grep -q "WIQI_TEST_RESULT: [CATEGORY]-SUCCESS" tests/[test-category]/test-output.log; then
      echo "✅ Tests passed"
    else
      echo "❌ Tests failed"
      exit 1
    fi
```

## Writing New Test Cases - Tutorial

### 1. Create Test Directory Structure

```bash
mkdir tests/[new-category]
cd tests/[new-category]
```

### 2. Create Test Script Template

Create `test-[category].js` with this basic structure:

```javascript
import http from "http";

// Test configuration
const BASE_URL = "http://localhost:3000";
const TEST_CATEGORY = "YOUR-CATEGORY"; // e.g., "INTEGRATION", "E2E"

// Color codes for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
};

// Test cases array
const testCases = [
  {
    url: "/example-path",
    expected: "success",
    description: "Example test case",
  },
  // Add more test cases...
];

// Main test function
async function runTests() {
  console.log(
    `${colors.bright}${colors.blue}🧪 Starting ${TEST_CATEGORY} Test Suite${colors.reset}`,
  );
  console.log(`Testing against: ${colors.yellow}${BASE_URL}${colors.reset}\n`);

  let passed = 0;
  let failed = 0;

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    console.log(
      `${colors.bright}Test ${i + 1}/${testCases.length}:${colors.reset} ${testCase.description}`,
    );

    try {
      const result = await runSingleTest(testCase);
      if (result.success) {
        console.log(`${colors.green}✅ PASS${colors.reset}`);
        passed++;
      } else {
        console.log(`${colors.red}❌ FAIL${colors.reset}`);
        failed++;
      }
    } catch (error) {
      console.log(`${colors.red}❌ ERROR: ${error.message}${colors.reset}`);
      failed++;
    }
    console.log("");
  }

  // Results summary
  console.log(
    `${colors.bright}${colors.blue}📊 Test Results Summary${colors.reset}`,
  );
  console.log(`${colors.green}✅ Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}❌ Failed: ${failed}${colors.reset}`);
  console.log(`${colors.blue}📈 Total: ${passed + failed}${colors.reset}`);

  // CRITICAL: Console output for CI/CD parsing
  if (failed === 0) {
    console.log(
      `\n${colors.green}${colors.bright}🎉 All tests passed!${colors.reset}`,
    );
    console.log(`WIQI_TEST_RESULT: ${TEST_CATEGORY}-SUCCESS`);
  } else {
    console.log(
      `\n${colors.red}${colors.bright}❌ Some tests failed.${colors.reset}`,
    );
    console.log(`WIQI_TEST_RESULT: ${TEST_CATEGORY}-FAILURE`);
  }

  process.exit(failed === 0 ? 0 : 1);
}

// Individual test runner
async function runSingleTest(testCase) {
  // Implement your test logic here
  // Return { success: true/false, details: [...] }
}

// Server check function
async function checkServer() {
  return new Promise((resolve) => {
    const req = http.get(BASE_URL, (res) => {
      resolve(true);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// Main execution
async function main() {
  const serverRunning = await checkServer();
  if (!serverRunning) {
    console.log(
      `${colors.red}❌ Server is not running on ${BASE_URL}${colors.reset}`,
    );
    console.log(
      `${colors.yellow}Please start your Next.js dev server with: npm run dev${colors.reset}`,
    );
    process.exit(1);
  }

  console.log(
    `${colors.green}✅ Server is running on ${BASE_URL}${colors.reset}\n`,
  );
  await runTests();
}

main().catch(console.error);
```

### 3. Create Documentation

Create `README.md` explaining:

- **Purpose**: What the tests validate
- **Test Cases**: Detailed breakdown of scenarios
- **Why Needed**: Problems solved
- **Running Instructions**: How to execute locally and in CI/CD

### 4. Test Categories to Consider

- **Unit Tests**: Individual component/function testing
- **Integration Tests**: API endpoint and database interactions
- **E2E Tests**: Full user workflow testing
- **Performance Tests**: Load and response time testing
- **Security Tests**: Authentication and authorization
- **Accessibility Tests**: WCAG compliance and screen reader compatibility

### 5. Best Practices

- **Descriptive Names**: Use clear, descriptive test case names
- **Comprehensive Coverage**: Test both success and failure scenarios
- **Error Handling**: Gracefully handle network errors and timeouts
- **Cleanup**: Clean up any test data or temporary files
- **Documentation**: Explain complex test logic with comments
- **Consistent Output**: Always use the `WIQI_TEST_RESULT` pattern

### 6. Example Test Categories

```
tests/
├── unit/                    # Component and function tests
├── integration/             # API and database tests
├── e2e/                     # End-to-end user workflows
├── performance/             # Load and speed tests
├── security/                # Auth and permission tests
├── accessibility/           # WCAG and screen reader tests
└── 404-handling/           # Current example implementation
```

### 7. Integration with GitHub Workflows

Each test category can be run independently or as part of a comprehensive test suite:

```yaml
name: Comprehensive Test Suite
on: [push, pull_request]

jobs:
  test-404-handling:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
      - name: Install dependencies
        run: npm install
      - name: Start dev server
        run: npm run dev &
      - name: Run 404 tests
        run: cd tests/404-handling && node test-404-handling.js

  test-integration:
    runs-on: ubuntu-latest
    steps:
      # Similar setup...
      - name: Run integration tests
        run: cd tests/integration && node test-integration.js
```

This modular approach allows for:

- **Parallel execution** of different test categories
- **Selective testing** based on changed files
- **Clear failure isolation** when specific test categories fail
- **Scalable test architecture** as the project grows
