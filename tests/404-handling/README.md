# 404 Handling Test Suite

![Test Suite](https://img.shields.io/badge/Test_Suite-404_Handling-blue?style=for-the-badge)
![Tests Passing](https://img.shields.io/badge/Tests-18_of_18_Passing-brightgreen?style=for-the-badge)
![Coverage](https://img.shields.io/badge/Coverage-Multi_layered-green?style=for-the-badge)
![Languages](https://img.shields.io/badge/Languages-EN_and_DE-yellow?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-App_Router-black?style=for-the-badge&logo=next.js)

## Purpose

This test suite validates the comprehensive 404 error handling system implemented in the WiQi application. The system ensures that all types of "not found" scenarios correctly redirect users to a custom 404 page instead of showing broken content or causing runtime errors.

## What We Test

### 1. Valid Pages (4 tests)

- **English valid subfolders**: `/en/posts/entries`, `/en/posts/quantum_tuesdays`
- **German valid subfolders**: `/de/posts/entries`, `/de/posts/quantum_tuesdays`
- **Expected behavior**: Return 200 status with proper content

### 2. Invalid Subfolders (6 tests)

- **Invalid folder names**: `invalid-folder`, `entrieadsasd`, `random-stuff`, `nonexistent`
- **Typos in valid names**: `quantum_tuesday` (missing 's')
- **Both languages**: English and German URLs
- **Expected behavior**: Show empty state (0 Articles, Loading...) and trigger client-side redirect to 404

### 3. Catch-All 404s (6 tests)

- **Unknown pages**: `/en/random-page`, `/en/completely-unknown`
- **Invalid subpages**: `/en/posts/entries/invalid-subpage`
- **Non-existent sections**: `/en/nonexistent-section`
- **Both languages**: English and German URLs
- **Expected behavior**: Return 404 status with custom quantum-themed 404 page

### 4. Edge Cases (1 test)

- **Query parameters**: Valid and invalid URLs with query strings
- **Expected behavior**: Query parameters don't affect 404 handling logic

## Why This Testing Was Needed

### The Problem

Before implementing this system, the application had several critical issues:

1. **Runtime Errors**: `ReferenceError: window is not defined` during server-side rendering
2. **Undefined Property Access**: `TypeError: Cannot read properties of undefined (reading 'length')`
3. **Poor UX**: Invalid subfolders showed empty pages instead of proper 404 redirects
4. **API Crashes**: Server errors when trying to read non-existent directories

### The Solution

A multi-layered 404 handling approach:

1. **Client-side Validation** (`src/app/[locale]/posts/[subfolder]/page.tsx`)
   - Validates subfolder names against allowed values: `["entries", "quantum_tuesdays"]`
   - Prevents unnecessary API calls for invalid subfolders
   - Provides immediate user feedback with loading states

2. **API Route Safety** (`src/app/api/getBlogPosts/route.ts`)
   - Checks directory existence before attempting file operations
   - Returns empty arrays instead of crashing on invalid paths
   - Validates request parameters

3. **Catch-All Route** (`src/app/[locale]/[...rest]/page.tsx`)
   - Handles truly unknown paths that don't match any specific routes
   - Shows custom localized 404 page

## Test Categories Explained

### Valid Pages

These tests ensure that legitimate URLs continue to work correctly and don't get falsely flagged as 404s by our detection logic.

### Invalid Subfolders (Client-side Redirects)

These test the most complex scenario: URLs that match the route pattern but have invalid subfolder names. Next.js routes these to the specific page component, which then validates the subfolder and redirects to 404 if invalid.

**Key insight**: These return 200 initially because Next.js successfully routes to the page component. The 404 redirect happens via JavaScript after client-side validation.

### Catch-All 404s (Server-side 404s)

These test URLs that don't match any specific route pattern, so Next.js routes them to the catch-all `[...rest]` route, which immediately returns a 404.

### Edge Cases

Query parameters and other URL variations that might affect routing behavior.

## Technical Implementation Details

### Multi-language Support

The test suite validates both English and German content patterns:

- **English**: "0 Articles", "Loading articles..."
- **German**: "0 Ergebnisse", "Artikel werden geladen..."

### Detection Logic

The test script uses sophisticated content analysis to distinguish between:

- **Valid pages**: Look for specific content indicators like "Quantum Entries", "grid", "list"
- **Client-side redirects**: Look for empty states ("0 Articles") and loading indicators
- **Server-side 404s**: Look for actual 404 page content and status codes

### False Positive Prevention

The detection logic specifically avoids flagging valid pages that might contain 404-related strings in their:

- Internationalization (i18n) data
- Internal Next.js JavaScript bundles
- Translation files

## Running the Tests

### Local Development

```bash
# From the project root
cd tests/404-handling
node test-404-handling.js
```

**Prerequisites**:

- Local development server must be running on `http://localhost:3000`
- All required dependencies must be installed

### GitHub Workflow Integration

The test script outputs unique identifiers for automated CI/CD parsing:

**Success Output:**

```
WIQI_TEST_RESULT: 404-HANDLING-SUCCESS
```

**Failure Output:**

```
WIQI_TEST_RESULT: 404-HANDLING-FAILURE
```

Your GitHub workflow can parse these identifiers to determine test results:

```yaml
- name: Run 404 Handling Tests
  run: |
    cd tests/404-handling
    node test-404-handling.js

- name: Check Test Results
  run: |
    if grep -q "WIQI_TEST_RESULT: 404-HANDLING-SUCCESS" test_output.log; then
      echo "✅ 404 handling tests passed"
    else
      echo "❌ 404 handling tests failed"
      exit 1
    fi
```

## Expected Results

All 18 tests should pass:

- ✅ **4/4** Valid pages return proper content
- ✅ **6/6** Invalid subfolders trigger client-side redirects
- ✅ **7/7** Unknown paths show catch-all 404 page (including easter egg)
- ✅ **1/1** Edge cases handle correctly

## Files Modified During Implementation

1. **`src/app/[locale]/posts/[subfolder]/page.tsx`**
   - Added client-side validation and redirect logic
   - Fixed `window is not defined` and `files.length` errors

2. **`src/app/api/getBlogPosts/route.ts`**
   - Added directory existence checks
   - Improved error handling and request validation

3. **`src/app/[locale]/[...rest]/page.tsx`**
   - Enhanced with comprehensive documentation
   - Explains the complete 404 handling system

## Maintenance Notes

- **Update test cases** when adding new valid subfolders
- **Update language patterns** when adding new locales
- **Review detection logic** if page content structure changes significantly
- **Test after major routing changes** to ensure 404 handling still works correctly
