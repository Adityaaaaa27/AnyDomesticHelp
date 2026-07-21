# PowerShell Script to generate iOS AppIcon assets using built-in System.Drawing
Add-Type -AssemblyName System.Drawing

$sourcePath = Join-Path $PSScriptRoot "src/assets/logo.png"
$targetDir = Join-Path $PSScriptRoot "ios/AnyDomesticHelp/Images.xcassets/AppIcon.appiconset"

if (-not (Test-Path $sourcePath)) {
    Write-Error "Source logo file not found at $sourcePath"
    exit 1
}

if (-not (Test-Path $targetDir)) {
    Write-Host "Creating target folder: $targetDir"
    New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
}

$sizes = @(
    @{ name = "icon-20.png"; size = 20 },
    @{ name = "icon-20@2x.png"; size = 40 },
    @{ name = "icon-20@3x.png"; size = 60 },
    @{ name = "icon-29.png"; size = 29 },
    @{ name = "icon-29@2x.png"; size = 58 },
    @{ name = "icon-29@3x.png"; size = 87 },
    @{ name = "icon-40.png"; size = 40 },
    @{ name = "icon-40@2x.png"; size = 80 },
    @{ name = "icon-40@3x.png"; size = 120 },
    @{ name = "icon-60@2x.png"; size = 120 },
    @{ name = "icon-60@3x.png"; size = 180 },
    @{ name = "icon-76.png"; size = 76 },
    @{ name = "icon-76@2x.png"; size = 152 },
    @{ name = "icon-83.5@2x.png"; size = 167 },
    @{ name = "icon-1024.png"; size = 1024 }
)

Write-Host "Resizing logo to all required sizes..."
foreach ($item in $sizes) {
    $destPath = Join-Path $targetDir $item.name
    $size = $item.size
    
    Write-Host "Generating: $($item.name) ($size x $size)..."
    
    $src = [System.Drawing.Image]::FromFile($sourcePath)
    $dest = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    
    # Configure high-quality scaling settings
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $g.DrawImage($src, 0, 0, $size, $size)
    
    $dest.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $g.Dispose()
    $dest.Dispose()
    $src.Dispose()
}

Write-Host "All icons generated successfully!"
