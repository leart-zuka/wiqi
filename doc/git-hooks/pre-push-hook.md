---
id: "pre-push-hook"
date: "2025-10-13"
title: "Pre-push Git Hook for Code Quality"
description: "Automated code quality checks before pushing commits to maintain consistent code standards"
author: "WiQi Development Team"
category: "Development Tools"
tags: ["git", "hooks", "code-quality", "linting", "formatting", "typescript"]
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
   • bun format:check - Check if code is properly formatted

[error output from validation checks]

📊 Summary:
   • Errors: 1
   • Warnings: 1
   • Code formatting: ✅ Properly formatted

❌ Errors found:

./src/app/components/Header.tsx
23:15  Error: Cannot find name 'undefinedVariable'. TS2304

⚠️  Warnings found:

./src/app/components/homepage/FeaturedCard.tsx
81:15  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element

❌ Pre-push checks failed!
Please fix the issues above before pushing.
You can run 'bun lft' manually to see the errors.
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

# Color codes for console output
# Check if terminal supports colors
if [ -t 1 ] && [ "$TERM" != "dumb" ] && command -v tput >/dev/null 2>&1 && tput colors >/dev/null 2>&1; then
    RED=$(tput setaf 1)
    GREEN=$(tput setaf 2)
    YELLOW=$(tput setaf 3)
    BLUE=$(tput setaf 4)
    PURPLE=$(tput setaf 5)
    CYAN=$(tput setaf 6)
    WHITE=$(tput setaf 7)
    BOLD=$(tput bold)
    NC=$(tput sgr0) # No Color
else
    # Fallback to no colors if terminal doesn't support them
    RED=""
    GREEN=""
    YELLOW=""
    BLUE=""
    PURPLE=""
    CYAN=""
    WHITE=""
    BOLD=""
    NC=""
fi

printf "${BLUE}${BOLD}🔍 Running pre-push checks (bun lft)...${NC}\n"
printf "\n"
printf "${CYAN}${BOLD}📋 What pre-push checks do:${NC}\n"
printf "   ${WHITE}• bun lint${NC}       - Run ESLint checks\n"
printf "   ${WHITE}• bun types${NC}      - Run TypeScript type checking\n"
printf "   ${WHITE}• bun format:check${NC} - Check if code is properly formatted\n"
printf "\n"

# Capture output and count errors/warnings
# Use format:check instead of format to avoid modifying files during pre-push
OUTPUT=$(bun lint && bun types && bun format:check 2>&1)
EXIT_CODE=$?

# Check formatting status specifically
FORMAT_OUTPUT=$(bun format:check 2>&1)
FORMAT_EXIT_CODE=$?

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

printf "\n"
printf "${PURPLE}${BOLD}📊 Summary:${NC}\n"
printf "   ${RED}• Errors: $ERROR_COUNT${NC}\n"
printf "   ${YELLOW}• Warnings: $WARNING_COUNT${NC}\n"

# Show formatting status
if [ $FORMAT_EXIT_CODE -eq 0 ]; then
    printf "   ${GREEN}• Code formatting: ✅ Properly formatted${NC}\n"
else
    printf "   ${RED}• Code formatting: ❌ Needs formatting${NC}\n"
fi

# List all errors if any
if [ "$ERROR_COUNT" -gt 0 ]; then
    printf "\n"
    printf "${RED}${BOLD}❌ Errors found:${NC}\n"
    echo "$OUTPUT" | grep -B1 -A0 "error\|Error\|ERROR" | while IFS= read -r line; do
        # Check if this line contains a file path (starts with ./ or /)
        if echo "$line" | grep -q "^\./\|^/"; then
            printf "\n${CYAN}${line}${NC}\n"
        # Check if this line contains an error
        elif echo "$line" | grep -q "error\|Error\|ERROR"; then
            # Extract line:column and message
            if echo "$line" | grep -q "^[0-9]*:[0-9]*"; then
                line_col=$(echo "$line" | sed -E 's/^([0-9]*:[0-9]*).*/\1/')
                message=$(echo "$line" | sed -E 's/^[0-9]*:[0-9]*[[:space:]]*//')
                # Color the line:column in red, message in white
                printf "${RED}${line_col}${NC}  ${WHITE}${message}${NC}\n"
            else
                # Fallback for other error formats
                colored_line=$(echo "$line" | sed "s/Error:/${RED}Error:${NC}${WHITE}/g" | sed "s/ERROR:/${RED}ERROR:${NC}${WHITE}/g" | sed "s/error:/${RED}error:${NC}${WHITE}/g")
                printf "${WHITE}${colored_line}${NC}\n"
            fi
        fi
    done
fi

# List all warnings if any
if [ "$WARNING_COUNT" -gt 0 ]; then
    printf "\n"
    printf "${YELLOW}${BOLD}⚠️  Warnings found:${NC}\n"
    echo "$OUTPUT" | grep -B1 -A0 "warning\|Warning\|WARNING" | while IFS= read -r line; do
        # Check if this line contains a file path (starts with ./ or /)
        if echo "$line" | grep -q "^\./\|^/"; then
            printf "\n${CYAN}${line}${NC}\n"
        # Check if this line contains a warning
        elif echo "$line" | grep -q "warning\|Warning\|WARNING"; then
            # Extract line:column and message
            if echo "$line" | grep -q "^[0-9]*:[0-9]*"; then
                line_col=$(echo "$line" | sed -E 's/^([0-9]*:[0-9]*).*/\1/')
                message=$(echo "$line" | sed -E 's/^[0-9]*:[0-9]*[[:space:]]*//')
                # Color the line:column in yellow, message in white
                printf "${YELLOW}${line_col}${NC}  ${WHITE}${message}${NC}\n"
            else
                # Fallback for other warning formats
                colored_line=$(echo "$line" | sed "s/Warning:/${YELLOW}Warning:${NC}${WHITE}/g" | sed "s/WARNING:/${YELLOW}WARNING:${NC}${WHITE}/g" | sed "s/warning:/${YELLOW}warning:${NC}${WHITE}/g")
                printf "${WHITE}${colored_line}${NC}\n"
            fi
        fi
    done
fi

# Check if bun lft succeeded
if [ $EXIT_CODE -ne 0 ]; then
    printf "\n"
    printf "${RED}${BOLD}❌ Pre-push checks failed!${NC}\n"
    printf "${RED}Please fix the issues above before pushing.${NC}\n"
    printf "${YELLOW}You can run 'bun lft' manually to see the errors.${NC}\n"
    exit 1
fi

printf "\n"
printf "${GREEN}${BOLD}✅ Pre-push checks passed!${NC}\n"
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

# Color codes for console output
# Check if terminal supports colors
if [ -t 1 ] && [ "$TERM" != "dumb" ] && command -v tput >/dev/null 2>&1 && tput colors >/dev/null 2>&1; then
    RED=$(tput setaf 1)
    GREEN=$(tput setaf 2)
    YELLOW=$(tput setaf 3)
    BLUE=$(tput setaf 4)
    PURPLE=$(tput setaf 5)
    CYAN=$(tput setaf 6)
    WHITE=$(tput setaf 7)
    BOLD=$(tput bold)
    NC=$(tput sgr0) # No Color
else
    # Fallback to no colors if terminal doesn't support them
    RED=""
    GREEN=""
    YELLOW=""
    BLUE=""
    PURPLE=""
    CYAN=""
    WHITE=""
    BOLD=""
    NC=""
fi

printf "${BLUE}${BOLD}🔍 Running pre-push checks (bun lft)...${NC}\n"
printf "\n"
printf "${CYAN}${BOLD}📋 What pre-push checks do:${NC}\n"
printf "   ${WHITE}• bun lint${NC}       - Run ESLint checks\n"
printf "   ${WHITE}• bun types${NC}      - Run TypeScript type checking\n"
printf "   ${WHITE}• bun format:check${NC} - Check if code is properly formatted\n"
printf "\n"

# Capture output and count errors/warnings
# Use format:check instead of format to avoid modifying files during pre-push
OUTPUT=$(bun lint && bun types && bun format:check 2>&1)
EXIT_CODE=$?

# Check formatting status specifically
FORMAT_OUTPUT=$(bun format:check 2>&1)
FORMAT_EXIT_CODE=$?

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

printf "\n"
printf "${PURPLE}${BOLD}📊 Summary:${NC}\n"
printf "   ${RED}• Errors: $ERROR_COUNT${NC}\n"
printf "   ${YELLOW}• Warnings: $WARNING_COUNT${NC}\n"

# Show formatting status
if [ $FORMAT_EXIT_CODE -eq 0 ]; then
    printf "   ${GREEN}• Code formatting: ✅ Properly formatted${NC}\n"
else
    printf "   ${RED}• Code formatting: ❌ Needs formatting${NC}\n"
fi

# List all errors if any
if [ "$ERROR_COUNT" -gt 0 ]; then
    printf "\n"
    printf "${RED}${BOLD}❌ Errors found:${NC}\n"
    echo "$OUTPUT" | grep -B1 -A0 "error\|Error\|ERROR" | while IFS= read -r line; do
        # Check if this line contains a file path (starts with ./ or /)
        if echo "$line" | grep -q "^\./\|^/"; then
            printf "\n${CYAN}${line}${NC}\n"
        # Check if this line contains an error
        elif echo "$line" | grep -q "error\|Error\|ERROR"; then
            # Extract line:column and message
            if echo "$line" | grep -q "^[0-9]*:[0-9]*"; then
                line_col=$(echo "$line" | sed -E 's/^([0-9]*:[0-9]*).*/\1/')
                message=$(echo "$line" | sed -E 's/^[0-9]*:[0-9]*[[:space:]]*//')
                # Color the line:column in red, message in white
                printf "${RED}${line_col}${NC}  ${WHITE}${message}${NC}\n"
            else
                # Fallback for other error formats
                colored_line=$(echo "$line" | sed "s/Error:/${RED}Error:${NC}${WHITE}/g" | sed "s/ERROR:/${RED}ERROR:${NC}${WHITE}/g" | sed "s/error:/${RED}error:${NC}${WHITE}/g")
                printf "${WHITE}${colored_line}${NC}\n"
            fi
        fi
    done
fi

# List all warnings if any
if [ "$WARNING_COUNT" -gt 0 ]; then
    printf "\n"
    printf "${YELLOW}${BOLD}⚠️  Warnings found:${NC}\n"
    echo "$OUTPUT" | grep -B1 -A0 "warning\|Warning\|WARNING" | while IFS= read -r line; do
        # Check if this line contains a file path (starts with ./ or /)
        if echo "$line" | grep -q "^\./\|^/"; then
            printf "\n${CYAN}${line}${NC}\n"
        # Check if this line contains a warning
        elif echo "$line" | grep -q "warning\|Warning\|WARNING"; then
            # Extract line:column and message
            if echo "$line" | grep -q "^[0-9]*:[0-9]*"; then
                line_col=$(echo "$line" | sed -E 's/^([0-9]*:[0-9]*).*/\1/')
                message=$(echo "$line" | sed -E 's/^[0-9]*:[0-9]*[[:space:]]*//')
                # Color the line:column in yellow, message in white
                printf "${YELLOW}${line_col}${NC}  ${WHITE}${message}${NC}\n"
            else
                # Fallback for other warning formats
                colored_line=$(echo "$line" | sed "s/Warning:/${YELLOW}Warning:${NC}${WHITE}/g" | sed "s/WARNING:/${YELLOW}WARNING:${NC}${WHITE}/g" | sed "s/warning:/${YELLOW}warning:${NC}${WHITE}/g")
                printf "${WHITE}${colored_line}${NC}\n"
            fi
        fi
    done
fi

# Check if bun lft succeeded
if [ $EXIT_CODE -ne 0 ]; then
    printf "\n"
    printf "${RED}${BOLD}❌ Pre-push checks failed!${NC}\n"
    printf "${RED}Please fix the issues above before pushing.${NC}\n"
    printf "${YELLOW}You can run 'bun lft' manually to see the errors.${NC}\n"
    exit 1
fi

printf "\n"
printf "${GREEN}${BOLD}✅ Pre-push checks passed!${NC}\n"
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
