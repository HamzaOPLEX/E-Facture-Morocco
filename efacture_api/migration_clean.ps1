# Find and delete all .py files in migrations folder except "__init__.py"
Get-ChildItem -Path .. -Recurse -Include *.py -Exclude __init__.py |
    Where-Object { $_.FullName -match "\\migrations\\" } |
    Remove-Item -Force

# Find and delete all .pyc files in migrations folder
Get-ChildItem -Path .. -Recurse -Include *.pyc |
    Where-Object { $_.FullName -match "\\migrations\\" } |
    Remove-Item -Force

# Run Python commands
python ..\manage.py makemigrations
python ..\manage.py migrate