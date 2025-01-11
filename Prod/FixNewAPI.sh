#!/bin/bash

# Define the search and replace strings
old_text="API_SERVER_TO_CHANGE"
new_text="https://efacture-api.certifygate.com"

# Recursive search and replace using sed
find . -type f -exec sed -i "s|$old_text|$new_text|g" {} +

# Check if the replacement was successful
echo "Checking if the replacement was successful..."
grep -rl "$new_text" .  # List files containing the new URL

# Check if any files still contain the old text
if grep -rq "$old_text" .; then
  echo "Warning: Some files still contain the old API_SERVER_TO_CHANGE url."
else
  echo "Replacement of API_SERVER_TO_CHANGE completed successfully."
fi



# Define the search and replace strings
old_text_front="FRONTEND_SERVER_TO_CHANGE"
new_text_front="https://efacture.certifygate.com"

# Recursive search and replace using sed
find . -type f -exec sed -i "s|$old_text_front|$new_text_front|g" {} +

# Check if the replacement was successful
echo "Checking if the replacement was successful..."
grep -rl "$new_text_front" .  # List files containing the new URL

# Check if any files still contain the old text
if grep -rq "$old_text_front" .; then
  echo "Warning: Some files still contain the old FRONTEND_SERVER_TO_CHANGE url."
else
  echo "Replacement of FRONTEND_SERVER_TO_CHANGE completed successfully."
fi
