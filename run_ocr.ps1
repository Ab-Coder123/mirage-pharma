Add-Type -AssemblyName System.Drawing
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null

function Get-OcrText {
    param([string]$ImagePath)
    $file = [Windows.Storage.StorageFile]::GetFileFromPathAsync($ImagePath).GetAwaiter().GetResult()
    $stream = $file.OpenAsync([Windows.Storage.FileAccessMode]::Read).GetAwaiter().GetResult()
    $decoder = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream).GetAwaiter().GetResult()
    $bitmap = $decoder.GetSoftwareBitmapAsync().GetAwaiter().GetResult()
    
    $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
    if ($engine -eq $null) {
        $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage([Windows.Globalization.Language]::new("en-US"))
    }
    $ocrResult = $engine.RecognizeAsync($bitmap).GetAwaiter().GetResult()
    return $ocrResult.Text
}

Write-Output "--- Profile Picture ---"
try {
    $text = Get-OcrText -ImagePath "E:\ملفاتي\Downloads\Mirage\profile P.jpg.jpeg"
    Write-Output $text
} catch {
    Write-Output "Error: $_"
}

Write-Output "--- Posts ---"
$postsDir = "E:\ملفاتي\Downloads\Mirage\Mirage posts\Mirage posts"
Get-ChildItem -Path $postsDir -Filter "*.jpg" | ForEach-Object {
    Write-Output "=== $($_.Name) ==="
    try {
        $text = Get-OcrText -ImagePath $_.FullName
        Write-Output $text
    } catch {
        Write-Output "Error: $_"
    }
}
