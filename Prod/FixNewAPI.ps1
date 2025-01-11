# Prompt for URLs
$apiUrl = Read-Host "Enter the new API URL (e.g., https://api.efacture.ma)"
$frontendUrl = Read-Host "Enter the new Frontend URL (e.g., https://efacture.com)"

# Define search and replace terms
$oldApiPlaceholder = "API_SERVER_TO_CHANGE"
$oldFrontendPlaceholder = "FRONTEND_SERVER_TO_CHANGE"

# Function to perform search and replace
function Replace-Text {
    param (
        [string]$searchText,
        [string]$replaceText
    )
    
    Write-Host "Replacing '$searchText' with '$replaceText'..."

    # Perform search and replace in all files recursively
    Get-ChildItem -Path .. -Recurse -File | ForEach-Object {
        (Get-Content $_.FullName) -replace [regex]::Escape($searchText), [regex]::Escape($replaceText) | Set-Content $_.FullName
    }

    # Check if the replacement was successful
    $filesWithNewText = Get-ChildItem -Path .. -Recurse -File | Select-String -Pattern [regex]::Escape($replaceText) | Select-Object -ExpandProperty Path -Unique
    if ($filesWithNewText) {
        Write-Host "The following files now contain '$replaceText':"
        $filesWithNewText | ForEach-Object { Write-Host $_ }
    } else {
        Write-Host "No files were updated with '$replaceText'."
    }

    # Check if any files still contain the old text
    $filesWithOldText = Get-ChildItem -Path .. -Recurse -File | Select-String -Pattern [regex]::Escape($searchText) | Select-Object -ExpandProperty Path -Unique
    if ($filesWithOldText) {
        Write-Warning "Some files still contain the old placeholder '$searchText':"
        $filesWithOldText | ForEach-Object { Write-Host $_ }
    } else {
        Write-Host "Replacement of '$searchText' completed successfully!"
    }
}

# Replace placeholders
Replace-Text -searchText $oldApiPlaceholder -replaceText $apiUrl
Replace-Text -searchText $oldFrontendPlaceholder -replaceText $frontendUrl
