Add-Type -AssemblyName System.Drawing

$imgDir = "d:\AI Business Project\KP Builders\images"

function CropAndResize($srcPath, $destPath, $targetW, $targetH, $quality=82) {
  if (-not (Test-Path $srcPath)) { return }
  
  $src = [System.Drawing.Bitmap]::FromFile($srcPath)
  $origW = $src.Width
  $origH = $src.Height

  $dest = New-Object System.Drawing.Bitmap($targetW, $targetH)
  $graph = [System.Drawing.Graphics]::FromImage($dest)
  $graph.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

  # Center Crop & Scale
  $srcAspect = $origW / $origH
  $targetAspect = $targetW / $targetH

  if ($srcAspect -gt $targetAspect) {
    $cropW = [int]($origH * $targetAspect)
    $cropH = $origH
    $cropX = [int](($origW - $cropW) / 2)
    $cropY = 0
  } else {
    $cropW = $origW
    $cropH = [int]($origW / $targetAspect)
    $cropX = 0
    $cropY = [int](($origH - $cropH) / 2)
  }

  $srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
  $destRect = New-Object System.Drawing.Rectangle(0, 0, $targetW, $targetH)

  $graph.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

  # Save as JPEG
  $encoder = [System.Drawing.Imaging.Encoder]::Quality
  $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]$quality)
  $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }

  $dest.Save($destPath, $jpegCodec, $encoderParams)

  $src.Dispose()
  $dest.Dispose()
  $graph.Dispose()

  Write-Host "Created $destPath ($targetW x $targetH)"
}

# 16:9 Aspect Ratio (800x450 for cards, 1440x810 for Hero)
CropAndResize "$imgDir\project_kopuram_nagar.png" "$imgDir\project_kopuram_nagar.jpg" 800 450 82
CropAndResize "$imgDir\project_sangatamil_nagar.png" "$imgDir\project_sangatamil_nagar.jpg" 800 450 82
CropAndResize "$imgDir\project_diamond_city.png" "$imgDir\project_diamond_city.jpg" 800 450 82
CropAndResize "$imgDir\hero_bg.png" "$imgDir\hero_bg.jpg" 1440 810 82

Write-Host "16:9 Aspect Ratio optimized images created!"
