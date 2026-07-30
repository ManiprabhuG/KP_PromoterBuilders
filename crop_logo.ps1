Add-Type -AssemblyName System.Drawing

$srcPath = "d:\AI Business Project\KP Builders\images\bg-logo.png"
$destPath = "d:\AI Business Project\KP Builders\images\logo-icon.png"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)

$minX = $src.Width
$maxX = 0
$minY = $src.Height
$maxY = 0

# Scan left half of image for maroon pixels
for ($x = 0; $x -lt ($src.Width * 0.4); $x++) {
  for ($y = 0; $y -lt $src.Height; $y++) {
    $pixel = $src.GetPixel($x, $y)
    # Check for maroon color box
    if ($pixel.R -gt 60 -and $pixel.R -lt 160 -and $pixel.G -lt 40 -and $pixel.B -lt 60) {
      if ($x -lt $minX) { $minX = $x }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}

$width = $maxX - $minX + 1
$height = $maxY - $minY + 1

Write-Host "Maroon box bounding box: X=$minX Y=$minY W=$width H=$height"

$rect = New-Object System.Drawing.Rectangle($minX, $minY, $width, $height)
$cropped = $src.Clone($rect, $src.PixelFormat)

$cropped.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

$src.Dispose()
$cropped.Dispose()

Write-Host "Maroon logo icon extracted!"
