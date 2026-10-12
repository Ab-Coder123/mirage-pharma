code = """[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
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

$candidates = Get-ChildItem -Path "E:\\" -Directory
$mirageDir = ""
foreach ($c in $candidates) {
    $test = Join-Path $c.FullName "Downloads\\Mirage"
    if (Test-Path $test) {
        $mirageDir = $test
        break
    }
}

Write-Host "Mirage Dir: $mirageDir"

$profile = Get-ChildItem -Path $mirageDir -Filter "*.jpeg"
if ($profile) {
    Write-Host "=== PROFILE IMAGE OCR ==="
    Write-Host (Get-OcrText -path $profile.FullName)
}

$posts = Get-ChildItem (Join-Path $mirageDir "Mirage posts\\Mirage posts") -Filter "*.jpg"
foreach ($p in $posts) {
    Write-Host "=== POST: $($p.Name) ==="
    try {
        $text = Get-OcrText -path $p.FullName
        Write-Host $text
    } catch {
        Write-Host "Error: $_"
    }
}
"""

with open(r"e:\programming\Space Work\MIrage\run_ocr_final.ps1", "w", encoding="utf-8-sig") as f:
    f.write(code)
