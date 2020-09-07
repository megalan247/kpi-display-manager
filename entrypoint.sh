#!/bin/sh
npx db-migrate up -e prod
npm start-prod