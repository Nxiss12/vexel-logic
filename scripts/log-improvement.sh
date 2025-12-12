#!/usr/bin/env bash
set -euo pipefail

# Append the last commit details to TOMS-IMPROVEMENTS.md and auto-commit the update.
# Guard: if the last commit message already starts with the docs prefix, do nothing.

FILE="TOMS-IMPROVEMENTS.md"
LAST_SUBJECT=$(git log -1 --pretty=format:%s)
if [[ "$LAST_SUBJECT" =~ ^docs:.*TOMS-IMPROVEMENTS ]]; then
  exit 0
fi

SHORT_HASH=$(git rev-parse --short HEAD)
AUTHOR=$(git log -1 --pretty=format:%an)
DATE=$(git log -1 --pretty=format:%ad --date=iso)
BODY=$(git log -1 --pretty=format:%B)
FILES=$(git show --name-only --pretty="" $SHORT_HASH)

ENTRY="### $DATE — $SHORT_HASH — $LAST_SUBJECT — $AUTHOR\n\n"
ENTRY+="**Files changed:**\n\n"
while IFS= read -r line; do
  ENTRY+="- $line\n"
done <<< "$FILES"

ENTRY+="\n**Commit message:**\n\n$BODY\n\n---\n\n"

echo -e "$ENTRY" >> "$FILE"

# Only commit if the file changed
git add "$FILE"
git commit -m "docs: update TOMS-IMPROVEMENTS for $SHORT_HASH" || true
