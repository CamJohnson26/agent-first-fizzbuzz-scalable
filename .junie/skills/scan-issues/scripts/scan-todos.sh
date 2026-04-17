#!/bin/bash
# Scan for TODO, FIXME, HACK comments in the codebase
echo "Scanning for TODO, FIXME, HACK in the codebase..."
grep -rnE "TODO|FIXME|HACK" . --exclude-dir={node_modules,dist,.turbo,.git,.junie,playwright-report} | grep -v "grep"
