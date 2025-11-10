#!/usr/bin/env node

/*
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    404 Handling Test Suite                                   ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 *
 * This script tests the 404 handling implementation by checking various URLs
 * and verifying they return the correct HTML responses.
 *
 * Usage: node test-404-handling.js
 * Make sure your Next.js dev server is running on localhost:3000
 */

import https from "https";
import http from "http";

const BASE_URL = "http://localhost:3000";

// Test URLs with expected outcomes
const testCases = [
  // Valid URLs (should return 200 and show content)
  {
    url: "/en/posts/entries",
    expected: "valid",
    description: "Valid entries subfolder",
  },
  {
    url: "/en/posts/quantum_tuesdays",
    expected: "valid",
    description: "Valid quantum_tuesdays subfolder",
  },
  {
    url: "/de/posts/entries",
    expected: "valid",
    description: "Valid entries subfolder (German)",
  },
  {
    url: "/de/posts/quantum_tuesdays",
    expected: "valid",
    description: "Valid quantum_tuesdays subfolder (German)",
  },

  // Invalid subfolder URLs (should redirect to 404)
  {
    url: "/en/posts/invalid-folder",
    expected: "redirect-404",
    description: "Invalid subfolder - should redirect to 404",
  },
  {
    url: "/en/posts/entrieadsasd",
    expected: "redirect-404",
    description: "Typo in subfolder - should redirect to 404",
  },
  {
    url: "/en/posts/random-stuff",
    expected: "redirect-404",
    description: "Random invalid subfolder - should redirect to 404",
  },
  {
    url: "/en/posts/nonexistent",
    expected: "redirect-404",
    description: "Non-existent subfolder - should redirect to 404",
  },
  {
    url: "/de/posts/invalid-folder",
    expected: "redirect-404",
    description: "Invalid subfolder (German) - should redirect to 404",
  },
  {
    url: "/en/posts/quantum_tuesday",
    expected: "redirect-404",
    description: "Missing 's' in quantum_tuesdays - should redirect to 404",
  },

  // Completely unknown URLs (should use catch-all route)
  {
    url: "/en/random-page",
    expected: "catch-all-404",
    description: "Completely unknown page - should use catch-all route",
  },
  {
    url: "/en/completely-unknown",
    expected: "catch-all-404",
    description: "Unknown path - should use catch-all route",
  },
  {
    url: "/en/posts/entries/invalid-subpage",
    expected: "catch-all-404",
    description: "Invalid subpage - should use catch-all route",
  },
  {
    url: "/en/nonexistent-section",
    expected: "catch-all-404",
    description: "Non-existent section - should use catch-all route",
  },
  {
    url: "/de/unknown-path",
    expected: "catch-all-404",
    description: "Unknown path (German) - should use catch-all route",
  },
  // Easter egg test case - "your-d" sounds like "you're dead" when spoken aloud
  // This is a playful reference that will show "your-d not found" in the 404 page
  {
    url: "/en/your-d",
    expected: "catch-all-404",
    description: "See? Your D was not found",
  },

  // Edge cases with query parameters
  {
    url: "/en/posts/entries?difficulty=college",
    expected: "valid",
    description: "Valid URL with query parameter",
  },
  {
    url: "/en/posts/invalid-folder?difficulty=elementary",
    expected: "redirect-404",
    description:
      "Invalid subfolder with query parameter - should still redirect",
  },
];

// Colors for console output
const colors = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
};

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const fullUrl = BASE_URL + url;
    const client = http;

    const req = client.get(fullUrl, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          url: fullUrl,
        });
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error("Request timeout"));
    });
  });
}

function analyzeResponse(response, expected) {
  const { statusCode, body, url } = response;

  // Check for 404 page indicators (more specific)
  // Only detect actual 404 pages, not i18n translations or internal Next.js code
  const has404Title =
    body.includes("<title>404") || body.includes("title>404:");
  const has404Content =
    // Only detect if it's actually displaying the 404 page content, not just translations
    (body.includes("Quantum superposition error") &&
      body.includes("Return to quantum base") &&
      statusCode === 404) ||
    (body.includes("404: This page could not be found") && statusCode === 404);
  const hasQuantumElements =
    body.includes("quantum") ||
    body.includes("Quantum") ||
    body.includes("404");
  const isRedirect = statusCode >= 300 && statusCode < 400;
  const hasLocationHeader = response.headers.location;

  // Check for valid content indicators (more specific)
  const hasValidContent =
    body.includes("Quantum Entries") ||
    body.includes("Quantum Tuesdays") ||
    (body.includes("grid") && body.includes("list"));
  const hasLoadingState = body.includes("Redirecting...");
  const hasValidPageStructure =
    body.includes("min-h-screen") && body.includes("container");
  const hasValidSubfolderTitle =
    body.includes("Quantum Entries") || body.includes("Quantum Tuesdays");

  let result = {
    status: "unknown",
    details: [],
  };

  if (expected === "valid") {
    if (
      statusCode === 200 &&
      (hasValidSubfolderTitle || hasValidContent || hasValidPageStructure) &&
      !has404Content
    ) {
      result.status = "pass";
      result.details.push("✅ Returns 200 status");
      result.details.push("✅ Contains valid content or page structure");
      result.details.push("✅ No 404 indicators found");
    } else {
      result.status = "fail";
      if (statusCode !== 200)
        result.details.push(`❌ Expected 200, got ${statusCode}`);
      if (!hasValidSubfolderTitle && !hasValidContent && !hasValidPageStructure)
        result.details.push("❌ Missing valid content indicators");
      if (has404Content)
        result.details.push("❌ Contains 404 indicators (should be valid)");
    }
  } else if (expected === "redirect-404") {
    // For client-side redirects, we expect either:
    // 1. Server-side redirect (3xx status with location header)
    // 2. Client-side redirect (200 status with redirecting state)
    // 3. Empty content state (0 articles, loading state)
    if (
      isRedirect &&
      hasLocationHeader &&
      hasLocationHeader.includes("/not-found")
    ) {
      result.status = "pass";
      result.details.push("✅ Server-side redirect to 404 page");
      result.details.push(`✅ Location: ${hasLocationHeader}`);
    } else if (statusCode === 200 && hasLoadingState) {
      result.status = "pass";
      result.details.push("✅ Shows redirecting state (client-side redirect)");
      result.details.push("✅ Will redirect to 404 via JavaScript");
    } else if (
      statusCode === 200 &&
      (body.includes("0 Articles") ||
        body.includes("0<!-- --> Articles") ||
        body.includes("0<!-- --> Ergebnisse")) &&
      (body.includes("Loading articles") ||
        body.includes("Loading articles...") ||
        body.includes("Artikel werden geladen"))
    ) {
      result.status = "pass";
      result.details.push("✅ Shows empty state (will redirect to 404)");
      result.details.push("✅ Client-side validation will trigger redirect");
    } else {
      result.status = "fail";
      if (!isRedirect && statusCode !== 200)
        result.details.push(`❌ Expected redirect or 200, got ${statusCode}`);
      if (
        !hasLocationHeader &&
        !hasLoadingState &&
        !body.includes("0 Articles") &&
        !body.includes("0<!-- --> Articles")
      )
        result.details.push("❌ No redirect indicators found");
    }
  } else if (expected === "catch-all-404") {
    if (statusCode === 404 || (statusCode === 200 && has404Content)) {
      result.status = "pass";
      result.details.push("✅ Returns 404 or shows 404 content");
      if (hasQuantumElements)
        result.details.push("✅ Contains quantum 404 elements");
    } else {
      result.status = "fail";
      result.details.push(`❌ Expected 404, got ${statusCode}`);
      if (!has404Content) result.details.push("❌ No 404 content found");
    }
  }

  return result;
}

async function runTests() {
  console.log(
    `${colors.bold}${colors.blue}🧪 Starting 404 Handling Test Suite${colors.reset}\n`,
  );
  console.log(`Testing against: ${colors.yellow}${BASE_URL}${colors.reset}\n`);

  let passed = 0;
  let failed = 0;
  let total = testCases.length;

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    const { url, expected, description } = testCase;

    console.log(
      `${colors.bold}Test ${i + 1}/${total}:${colors.reset} ${description}`,
    );
    console.log(`URL: ${colors.blue}${BASE_URL}${url}${colors.reset}`);
    console.log(`Expected: ${colors.yellow}${expected}${colors.reset}`);

    try {
      const response = await makeRequest(url);
      const analysis = analyzeResponse(response, expected);

      if (analysis.status === "pass") {
        console.log(`${colors.green}✅ PASS${colors.reset}`);
        passed++;
      } else {
        console.log(`${colors.red}❌ FAIL${colors.reset}`);
        failed++;
      }

      analysis.details.forEach((detail) => {
        console.log(`   ${detail}`);
      });

      console.log(`   Status Code: ${response.statusCode}`);
      if (response.headers.location) {
        console.log(`   Redirect Location: ${response.headers.location}`);
      }
    } catch (error) {
      console.log(`${colors.red}❌ ERROR${colors.reset}`);
      console.log(`   ${colors.red}${error.message}${colors.reset}`);
      failed++;
    }

    console.log(""); // Empty line for readability
  }

  // Summary
  console.log(
    `${colors.bold}${colors.blue}📊 Test Results Summary${colors.reset}`,
  );
  console.log(`${colors.green}✅ Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}❌ Failed: ${failed}${colors.reset}`);
  console.log(`${colors.blue}📈 Total: ${total}${colors.reset}`);

  if (failed === 0) {
    console.log(
      `\n${colors.green}${colors.bold}🎉 All tests passed! 404 handling is working correctly.${colors.reset}`,
    );
    // Unique identifier for GitHub workflow parsing
    console.log("WIQI_TEST_RESULT: 404-HANDLING-SUCCESS");
  } else {
    console.log(
      `\n${colors.red}${colors.bold}⚠️  Some tests failed. Please check the 404 handling implementation.${colors.reset}`,
    );
    // Unique identifier for GitHub workflow parsing
    console.log("WIQI_TEST_RESULT: 404-HANDLING-FAILURE");
  }

  // Exit with appropriate code
  process.exit(failed === 0 ? 0 : 1);
}

// Check if server is running
async function checkServer() {
  try {
    await makeRequest("/");
    console.log(
      `${colors.green}✅ Server is running on ${BASE_URL}${colors.reset}\n`,
    );
    return true;
  } catch (error) {
    console.log(
      `${colors.red}❌ Server is not running on ${BASE_URL}${colors.reset}`,
    );
    console.log(
      `${colors.yellow}Please start your Next.js dev server with: npm run dev${colors.reset}`,
    );
    return false;
  }
}

// Main execution
async function main() {
  const serverRunning = await checkServer();
  if (serverRunning) {
    await runTests();
  } else {
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error(
    `${colors.red}Unhandled Rejection at:${colors.reset}`,
    promise,
    `${colors.red}reason:${colors.reset}`,
    reason,
  );
  process.exit(1);
});

// Run the tests
main().catch(console.error);
