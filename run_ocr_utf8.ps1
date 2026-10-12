[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null

function Get-OcrText() {
     = [Windows.Storage.StorageFile]::GetFileFromPathAsync().GetAwaiter().GetResult()
     = .OpenAsync([Windows.Storage.FileAccessMode]::Read).GetAwaiter().GetResult()
     = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync().GetAwaiter().GetResult()
     = .GetSoftwareBitmapAsync().GetAwaiter().GetResult()
     = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
    if (-not ) {  = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage([Windows.Globalization.Language]::new('en-US')) }
     = .RecognizeAsync().GetAwaiter().GetResult()
    return .Text
}

 = @(
    'E:\\ملفاتي\\Downloads\\Mirage\\profile P.jpg.jpeg',
    'E:\\ملفاتي\\Downloads\\Mirage\\Mirage posts\\Mirage posts\\Mirage posts -01.jpg',
    'E:\\ملفاتي\\Downloads\\Mirage\\Mirage posts\\Mirage posts\\Mirage posts -02.jpg',
    'E:\\ملفاتي\\Downloads\\Mirage\\Mirage posts\\Mirage posts\\Mirage posts -03.jpg',
    'E:\\ملفاتي\\Downloads\\Mirage\\Mirage posts\\Mirage posts\\Mirage posts -04.jpg',
    'E:\\ملفاتي\\Downloads\\Mirage\\Mirage posts\\Mirage posts\\Mirage posts -05.jpg',
    'E:\\ملفاتي\\Downloads\\Mirage\\Mirage posts\\Mirage posts\\Mirage posts -06.jpg',
    'E:\\ملفاتي\\Downloads\\Mirage\\Mirage posts\\Mirage posts\\Mirage posts -07.jpg',
    'E:\\ملفاتي\\Downloads\\Mirage\\Mirage posts\\Mirage posts\\Mirage posts -08.jpg',
    'E:\\ملفاتي\\Downloads\\Mirage\\Mirage posts\\Mirage posts\\Mirage posts -09.jpg',
    'E:\\ملفاتي\\Downloads\\Mirage\\Mirage posts\\Mirage posts\\Mirage posts -10.jpg',
    'E:\\ملفاتي\\Downloads\\Mirage\\Mirage posts\\Mirage posts\\Mirage posts -11.jpg'
)

foreach ( in ) {
    Write-Host ('FILE: ' + )
    try {
         = Get-OcrText 
        Write-Host 
    } catch {
        Write-Host ('ERROR: ' + )
    }
}
