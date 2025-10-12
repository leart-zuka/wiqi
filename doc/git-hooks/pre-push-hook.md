---
id: "pre-push-hook"
date: "2025-01-12"
---

# Pre-push Git Hook for Code Quality

## What is it?

The pre-push hook automatically runs code quality checks before allowing you to push commits to the repository. It ensures that all code meets our quality standards before it reaches the remote repository.

## What does it check?

The hook runs validation checks in this order:

- **`bun lint`** - Runs ESLint checks for code quality
- **`bun types`** - Runs TypeScript type checking
- **`bun format:check`** - Verifies code is properly formatted (without modifying files)

## How it works

1. **Before every push**, Git automatically runs the pre-push hook
2. **If all checks pass** → Push continues normally
3. **If any check fails** → Push is blocked with detailed error information

## Example output

### ✅ Success case:

```bash
🔍 Running pre-push checks (bun lft)...

📋 What pre-push checks do:
   • bun lint       - Run ESLint checks
   • bun types      - Run TypeScript type checking
   • bun format:check - Verify code is properly formatted

[formatted output from validation checks]

📊 Summary:
   • Errors: 0
   • Warnings: 0

✅ Pre-push checks passed!
```

### ❌ Failure case:

```bash
🔍 Running pre-push checks (bun lft)...

📋 What pre-push checks do:
   • bun lint       - Run ESLint checks
   • bun types      - Run TypeScript type checking
   • bun format:check - Verify code is properly formatted

[error output from validation checks]

📊 Summary:
   • Errors: 2
   • Warnings: 3

❌ Errors found:
   15:error TS2304: Cannot find name 'undefinedVariable'.
   23:Error: Missing semicolon

⚠️  Warnings found:
   8:warning: Unused variable 'temp'
   12:Warning: Prefer const over let
   18:warning: Missing JSDoc comment

❌ Pre-push checks failed!
Please fix the issues above before pushing.
```

## Benefits

- **Prevents broken code** from reaching the repository
- **Enforces consistent formatting** across the codebase
- **Catches type errors** before they cause runtime issues
- **Maintains code quality** automatically
- **Saves review time** by catching issues early
- **No file modification** during push process (validation only)

## Implementation

The hook is located at `.git/hooks/pre-push` and is automatically executed by Git.

### Setting up the hook

1. **Create the hook file**:

```bash
touch .git/hooks/pre-push
```

2. **Make it executable**:

```bash
chmod +x .git/hooks/pre-push
```

3. **Add the following script** to `.git/hooks/pre-push`:

```bash
#!/bin/sh

# Pre-push hook to run bun lft before pushing
# This ensures code quality checks pass before commits are pushed

echo "🔍 Running pre-push checks (bun lft)..."
echo ""
echo "📋 What pre-push checks do:"
echo "   • bun lint       - Run ESLint checks"
echo "   • bun types      - Run TypeScript type checking"
echo "   • bun format:check - Verify code is properly formatted"
echo ""

# Capture output and count errors/warnings
# Use format:check instead of format to avoid modifying files during pre-push
OUTPUT=$(bun lint && bun types && bun format:check 2>&1)
EXIT_CODE=$?

# Extract and count errors and warnings
ERROR_LINES=$(echo "$OUTPUT" | grep -n "error\|Error\|ERROR" || true)
WARNING_LINES=$(echo "$OUTPUT" | grep -n "warning\|Warning\|WARNING" || true)

# Count errors and warnings, handling empty results
if [ -z "$ERROR_LINES" ]; then
    ERROR_COUNT=0
else
    ERROR_COUNT=$(echo "$ERROR_LINES" | wc -l | tr -d ' ')
fi

if [ -z "$WARNING_LINES" ]; then
    WARNING_COUNT=0
else
    WARNING_COUNT=$(echo "$WARNING_LINES" | wc -l | tr -d ' ')
fi

# Display the output
echo "$OUTPUT"

echo ""
echo "📊 Summary:"
echo "   • Errors: $ERROR_COUNT"
echo "   • Warnings: $WARNING_COUNT"

# List all errors if any
if [ "$ERROR_COUNT" -gt 0 ]; then
    echo ""
    echo "❌ Errors found:"
    echo "$ERROR_LINES" | while IFS= read -r line; do
        echo "   $line"
    done
fi

# List all warnings if any
if [ "$WARNING_COUNT" -gt 0 ]; then
    echo ""
    echo "⚠️  Warnings found:"
    echo "$WARNING_LINES" | while IFS= read -r line; do
        echo "   $line"
    done
fi

# Check if bun lft succeeded
if [ $EXIT_CODE -ne 0 ]; then
    echo ""
    echo "❌ Pre-push checks failed!"
    echo "Please fix the issues above before pushing."
    echo "You can run 'bun lft' manually to see the errors."
    exit 1
fi

echo ""
echo "✅ Pre-push checks passed!"
exit 0
```

### Prerequisites

Make sure you have the `lft` script defined in your `package.json`:

```json
{
  "scripts": {
    "lft": "bun format && bun lint && bun types && bun format:check"
  }
}
```

**⚠️ Important**: The pre-push hook uses `format:check` instead of `format` to avoid modifying files during the check. The hook should only validate, not modify code.

**Note**: The `bun lft` command (for manual use) includes formatting, but the pre-push hook only validates to prevent file modification during push.

### One-liner setup

You can also set up the hook with a single command:

```bash
cat > .git/hooks/pre-push << 'EOF'
#!/bin/sh

# Pre-push hook to run bun lft before pushing
# This ensures code quality checks pass before commits are pushed

echo "🔍 Running pre-push checks (bun lft)..."
echo ""
echo "📋 What pre-push checks do:"
echo "   • bun lint       - Run ESLint checks"
echo "   • bun types      - Run TypeScript type checking"
echo "   • bun format:check - Verify code is properly formatted"
echo ""

# Capture output and count errors/warnings
# Use format:check instead of format to avoid modifying files during pre-push
OUTPUT=$(bun lint && bun types && bun format:check 2>&1)
EXIT_CODE=$?

# Extract and count errors and warnings
ERROR_LINES=$(echo "$OUTPUT" | grep -n "error\|Error\|ERROR" || true)
WARNING_LINES=$(echo "$OUTPUT" | grep -n "warning\|Warning\|WARNING" || true)

# Count errors and warnings, handling empty results
if [ -z "$ERROR_LINES" ]; then
    ERROR_COUNT=0
else
    ERROR_COUNT=$(echo "$ERROR_LINES" | wc -l | tr -d ' ')
fi

if [ -z "$WARNING_LINES" ]; then
    WARNING_COUNT=0
else
    WARNING_COUNT=$(echo "$WARNING_LINES" | wc -l | tr -d ' ')
fi

# Display the output
echo "$OUTPUT"

echo ""
echo "📊 Summary:"
echo "   • Errors: $ERROR_COUNT"
echo "   • Warnings: $WARNING_COUNT"

# List all errors if any
if [ "$ERROR_COUNT" -gt 0 ]; then
    echo ""
    echo "❌ Errors found:"
    echo "$ERROR_LINES" | while IFS= read -r line; do
        echo "   $line"
    done
fi

# List all warnings if any
if [ "$WARNING_COUNT" -gt 0 ]; then
    echo ""
    echo "⚠️  Warnings found:"
    echo "$WARNING_LINES" | while IFS= read -r line; do
        echo "   $line"
    done
fi

# Check if bun lft succeeded
if [ $EXIT_CODE -ne 0 ]; then
    echo ""
    echo "❌ Pre-push checks failed!"
    echo "Please fix the issues above before pushing."
    echo "You can run 'bun lft' manually to see the errors."
    exit 1
fi

echo ""
echo "✅ Pre-push checks passed!"
exit 0
EOF

chmod +x .git/hooks/pre-push
```

## Bypassing the hook (not recommended)

If you absolutely need to bypass the hook (emergency fixes), you can use:

```bash
git push --no-verify
```

**⚠️ Warning**: Only use this in genuine emergencies. The hook exists to maintain code quality.

## Troubleshooting

### Hook not running?

- Make sure the file `.git/hooks/pre-push` exists and is executable
- Check that you're in the correct Git repository

### Too many false positives?

- Run `bun lft` manually to see what's failing
- Fix the issues before pushing
- Consider updating the linting rules if they're too strict

### Hook is too slow?

- The hook runs all quality checks, which can take time
- This is intentional to ensure code quality
- Consider running `bun lft` locally before committing to catch issues early

## Best practices

1. **Run `bun lft` locally** before committing to catch issues early
2. **Fix formatting issues** as you write code
3. **Don't bypass the hook** unless absolutely necessary
4. **Keep the hook updated** if you change the quality check commands
