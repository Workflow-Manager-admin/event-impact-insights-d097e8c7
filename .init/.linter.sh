#!/bin/bash
cd /home/kavia/workspace/code-generation/event-impact-insights-d097e8c7/frontend_web_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

