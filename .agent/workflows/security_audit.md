---
description: Run a comprehensive security audit to detect exposed API keys and secrets before committing code.
---

# Security Audit Workflow

This workflow scans the codebase for common patterns of exposed secrets and ensures sensitive files are gitignored.

## 1. Check for Hardcoded Secrets
Scan for common secret patterns (API keys, tokens) in non-gitignored files.

// turbo
grep_search(
    SearchPath=".",
    Query="(sk-[a-zA-Z0-9]{20,}|AIza[0-9A-Za-z-_]{35}|[0-9]+:[0-9A-Za-z_-]{35})",
    IsRegex=true,
    Includes=["**/*.ts", "**/*.tsx", "**/*.js", "**/*.json"],
    Excludes=["**/node_modules/**", "**/.next/**", "**/.git/**", "**/*.d.ts"]
)

## 2. Verify Environment Configuration
Ensure `.env` files are properly ignored.

// turbo
view_file(AbsolutePath="<workspace_root>/.gitignore")

## 3. Check Staged Files
Review what is about to be committed to ensure no sensitive files (like .env or scripts with keys) are included.

// turbo
run_command(CommandLine="git status", Cwd="<workspace_root>", SafeToAutoRun=true, WaitMsBeforeAsync=0)

## 4. Remediation Instructions
If any secrets are found:
1.  **Immediate Action**: Revoke the key.
2.  **Move to Environment**: Add the key to `.env.local` and use `process.env.KEY_NAME`.
3.  **GitIgnore**: Ensure the file containing the secret is in `.gitignore`.
4.  **Clean History**: If already committed, use `git filter-repo` or `BFG` (ask user first).
