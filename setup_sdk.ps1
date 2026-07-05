# Lightweight Android SDK Setup Script for Windows
# Installs command-line tools, platform-tools (adb), and required build packages (~150MB total)

$sdkDir = "$env:USERPROFILE\android-sdk"
$tempDir = "$sdkDir\temp"

Write-Host "Creating directories..."
if (!(Test-Path $sdkDir)) { New-Item -ItemType Directory -Path $sdkDir }
if (!(Test-Path $tempDir)) { New-Item -ItemType Directory -Path $tempDir }

# Enable TLS 1.2 for .NET connections in PowerShell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# 1. Download Command Line Tools (contains sdkmanager) using curl.exe with -k (insecure) to bypass schannel revocation check failures
$cmdlineUrl = "https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip"
Write-Host "Downloading Android Command Line Tools..."
curl.exe -k -L -o "$tempDir\cmdline.zip" $cmdlineUrl

Write-Host "Extracting Command Line Tools..."
Expand-Archive -Path "$tempDir\cmdline.zip" -DestinationPath "$sdkDir\cmdline-tools" -Force

# sdkmanager expects the directory structure: cmdline-tools/latest/bin/...
if (Test-Path "$sdkDir\cmdline-tools\latest") { Remove-Item "$sdkDir\cmdline-tools\latest" -Recurse -Force }
New-Item -ItemType Directory -Path "$sdkDir\cmdline-tools\latest"
Move-Item -Path "$sdkDir\cmdline-tools\cmdline-tools\*" -Destination "$sdkDir\cmdline-tools\latest\" -Force
Remove-Item "$sdkDir\cmdline-tools\cmdline-tools" -Recurse -Force

# 2. Add to PATH and set ANDROID_HOME for current session
$env:ANDROID_HOME = $sdkDir
$env:PATH = "$env:PATH;$sdkDir\cmdline-tools\latest\bin;$sdkDir\platform-tools"

# 3. Use sdkmanager to install platforms and build-tools
Write-Host "Installing Platform Tools (adb), Build Tools, and Android Platforms..."
# Accept licenses automatically
$sdkManager = "$sdkDir\cmdline-tools\latest\bin\sdkmanager.bat"
& echo y | & $sdkManager --sdk_root=$sdkDir "platform-tools" "platforms;android-34" "build-tools;34.0.0"

# 4. Save environment variables permanently for the user
Write-Host "Configuring permanent environment variables..."
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", $sdkDir, "User")
$userPath = [System.Environment]::GetEnvironmentVariable("PATH", "User")
if ($userPath -notlike "*android-sdk*") {
    $newPath = "$userPath;$sdkDir\cmdline-tools\latest\bin;$sdkDir\platform-tools"
    [System.Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
}

# 5. Create local.properties for the React Native project
Write-Host "Creating local.properties..."
$localPropertiesPath = "$PSScriptRoot\android\local.properties"
$sdkPathEscaped = $sdkDir.Replace("\", "\\")
"sdk.dir=$sdkPathEscaped" | Out-File -FilePath $localPropertiesPath -Encoding ascii -Force

# Clean up temp
Remove-Item $tempDir -Recurse -Force

Write-Host "🎉 Android SDK lightweight setup complete! Please restart your terminal/VS Code for changes to take effect."
