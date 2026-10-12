[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.FileAccessMode, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null

function Get-OcrText {
    param([string]$path)
    $file = [Windows.Storage.StorageFile]::GetFileFromPathAsync($path).GetAwaiter().GetResult()
    $stream = $file.OpenAsync([Windows.Storage.FileAccessMode]::Read).GetAwaiter().GetResult()
    $decoder = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream).GetAwaiter().GetResult()
    $bitmap = $decoder.GetSoftwareBitmapAsync().GetAwaiter().GetResult()
    $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
    if ($null -eq $engine) {
        $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage([Windows.Globalization.Language]::new("en-US"))
    }
    $res = $engine.RecognizeAsync($bitmap).GetAwaiter().GetResult()
    return $res.Text
}

$dir = Get-ChildItem "E:\" | Where-Object { $_.Name -like "*ملفاتي*" }
$mirageDir = Join-Path $dir.FullName "Downloads\Mirage"

Write-Host "Dir found: $mirageDir"

$profile = Get-ChildItem $mirageDir -Filter "*.jpeg"
if ($profile) {
    Write-Host "=== PROFILE IMAGE OCR ==="
    Write-Host (Get-OcrText $profile.FullName)
}

$posts = Get-ChildItem (Join-Path $mirageDir "Mirage posts\Mirage posts") -Filter "*.jpg"
foreach ($p in $posts) {
    Write-Host "=== POST: $($p.Name) ==="
    try {
        $text = Get-OcrText $p.FullName
        Write-Host $text
    } catch {
        Write-Host "Error: $_"
    }
}
