# ============================================================================
# apply-audio-ducking.ps1
# Pipeline de audio pos-processamento para videos OTIMIZE Systems
# ----------------------------------------------------------------------------
# Aplica ducking automatico: musica abaixa quando narracao TTS toca,
# sobe quando ha silencio (respiracao / pausa).
#
# Filtro ffmpeg: sidechaincompress
#   - threshold=0.05  (-26 dB) gatilho da voz
#   - ratio=8         comprime musica 8:1 quando voz toca
#   - attack=10       responde em 10 ms
#   - release=400     volta suave em 400 ms
# ----------------------------------------------------------------------------
# Modos:
#   1) Video + Musica + Voz Over  -> ducking completo (musica abaixa na voz)
#   2) Video + Musica (sem voz)   -> apenas mistura musica de fundo (-c:a aac)
# ----------------------------------------------------------------------------
# Uso:
#   .\apply-audio-ducking.ps1 -InputVideo "input.mp4" -Music "music.mp3" `
#       -Voice "voiceover.mp3" -Output "output.mp4"
#
#   .\apply-audio-ducking.ps1 -InputVideo "input.mp4" -Music "music.mp3" `
#       -Output "output.mp4"  # sem voz (apenas musica)
# ============================================================================

param(
    [Parameter(Mandatory=$true)]
    [string]$InputVideo,

    [Parameter(Mandatory=$true)]
    [string]$Music,

    [Parameter(Mandatory=$false)]
    [string]$Voice = "",

    [Parameter(Mandatory=$true)]
    [string]$Output,

    [Parameter(Mandatory=$false)]
    [double]$MusicVolume = 0.30,

    [Parameter(Mandatory=$false)]
    [double]$VoiceVolume = 1.0,

    [Parameter(Mandatory=$false)]
    [double]$Threshold = 0.05,

    [Parameter(Mandatory=$false)]
    [int]$Ratio = 8,

    [Parameter(Mandatory=$false)]
    [int]$Attack = 10,

    [Parameter(Mandatory=$false)]
    [int]$Release = 400,

    [Parameter(Mandatory=$false)]
    [switch]$Force
)

$ErrorActionPreference = "Stop"

# ----------------------------------------------------------------------------
# Validacoes
# ----------------------------------------------------------------------------
Write-Host ""
Write-Host "OTIMIZE Audio Ducking Pipeline" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan

if (-not (Test-Path $InputVideo)) {
    Write-Host "ERRO: video de entrada nao encontrado: $InputVideo" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $Music)) {
    Write-Host "ERRO: musica nao encontrada: $Music" -ForegroundColor Red
    exit 1
}

$temVoz = -not [string]::IsNullOrWhiteSpace($Voice)
if ($temVoz -and -not (Test-Path $Voice)) {
    Write-Host "AVISO: voiceover nao encontrado: $Voice -- prosseguindo SEM voz" -ForegroundColor Yellow
    $temVoz = $false
}

if ((Test-Path $Output) -and -not $Force) {
    Write-Host "ERRO: output ja existe: $Output (use -Force para sobrescrever)" -ForegroundColor Red
    exit 1
}

# Verifica ffmpeg
$ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue
if (-not $ffmpeg) {
    Write-Host "ERRO: ffmpeg nao encontrado no PATH" -ForegroundColor Red
    Write-Host "Instale via: winget install Gyan.FFmpeg" -ForegroundColor Yellow
    exit 1
}

Write-Host "Video:  $InputVideo"
Write-Host "Musica: $Music (volume=$MusicVolume)"
if ($temVoz) {
    Write-Host "Voz:    $Voice (volume=$VoiceVolume)"
    Write-Host "Modo:   DUCKING (musica abaixa quando voz toca)"
} else {
    Write-Host "Voz:    (nenhuma)"
    Write-Host "Modo:   MUSICA BACKGROUND APENAS"
}
Write-Host "Output: $Output"
Write-Host ""

# ----------------------------------------------------------------------------
# Constroi filter_complex e executa
# ----------------------------------------------------------------------------

$outputDir = Split-Path -Parent $Output
if ($outputDir -and -not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

if ($temVoz) {
    # ----- PIPELINE COMPLETO COM DUCKING -----
    $filterComplex = "[1:a]volume=$MusicVolume" + "[music];" + `
                     "[2:a]volume=$VoiceVolume" + "[voice];" + `
                     "[music][voice]sidechaincompress=threshold=$Threshold" + ":ratio=$Ratio" + ":attack=$Attack" + ":release=$Release" + "[ducked_music];" + `
                     "[ducked_music][voice]amix=inputs=2:duration=longest:dropout_transition=0[final_audio]"

    Write-Host "Aplicando ducking..." -ForegroundColor Green
    Write-Host "Threshold=$Threshold Ratio=${Ratio}:1 Attack=${Attack}ms Release=${Release}ms" -ForegroundColor Gray
    Write-Host ""

    & ffmpeg `
        -y `
        -i $InputVideo `
        -i $Music `
        -i $Voice `
        -filter_complex $filterComplex `
        -map 0:v `
        -map "[final_audio]" `
        -c:v copy `
        -c:a aac `
        -b:a 192k `
        -shortest `
        $Output

} else {
    # ----- APENAS MUSICA DE FUNDO (sem ducking) -----
    $filterComplex = "[1:a]volume=$MusicVolume" + "[music_bg]"

    Write-Host "Aplicando musica de fundo (sem ducking)..." -ForegroundColor Green
    Write-Host ""

    & ffmpeg `
        -y `
        -i $InputVideo `
        -i $Music `
        -filter_complex $filterComplex `
        -map 0:v `
        -map "[music_bg]" `
        -c:v copy `
        -c:a aac `
        -b:a 192k `
        -shortest `
        $Output
}

# ----------------------------------------------------------------------------
# Resultado
# ----------------------------------------------------------------------------
if ($LASTEXITCODE -eq 0) {
    $tamanho = (Get-Item $Output).Length / 1MB
    Write-Host ""
    Write-Host "OK Output gerado: $Output ($([Math]::Round($tamanho, 2)) MB)" -ForegroundColor Green
    exit 0
} else {
    Write-Host ""
    Write-Host "ERRO ffmpeg retornou exit code $LASTEXITCODE" -ForegroundColor Red
    exit $LASTEXITCODE
}
