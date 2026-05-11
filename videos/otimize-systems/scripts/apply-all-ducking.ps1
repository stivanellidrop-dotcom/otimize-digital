# ============================================================================
# apply-all-ducking.ps1
# Batch processing: aplica ducking/musica nos 24 videos (12 vertical + 12 square)
# ----------------------------------------------------------------------------
# Estrutura esperada:
#   out\V1A_FechamentoNoturno.mp4          (vertical)
#   out\V1A_FechamentoNoturno-square.mp4   (square)
#   ... etc para V1B, V1C, V1D, V2A..V2D, V3A..V3D
#
# Saida:
#   out\with-audio\V1A_FechamentoNoturno.mp4
#   out\with-audio\V1A_FechamentoNoturno-square.mp4
#   ... etc
#
# Modos:
#   Padrao: MUSICA APENAS (sem voz over) -- pode rodar agora sem narracoes
#   -WithVoice: tenta usar public\voiceover\<videoid>-narration.mp3 se existir
# ----------------------------------------------------------------------------
# Uso:
#   .\apply-all-ducking.ps1                 # so musica
#   .\apply-all-ducking.ps1 -WithVoice      # ducking completo com narracao
#   .\apply-all-ducking.ps1 -DryRun         # mostra o que faria sem executar
#   .\apply-all-ducking.ps1 -Only V1A,V1B   # processa so esses IDs
# ============================================================================

param(
    [Parameter(Mandatory=$false)]
    [switch]$WithVoice,

    [Parameter(Mandatory=$false)]
    [switch]$DryRun,

    [Parameter(Mandatory=$false)]
    [switch]$Force,

    [Parameter(Mandatory=$false)]
    [string]$Music = "",

    [Parameter(Mandatory=$false)]
    [string[]]$Only = @()
)

$ErrorActionPreference = "Stop"

# ----------------------------------------------------------------------------
# Caminhos base
# ----------------------------------------------------------------------------
$projectRoot = Split-Path -Parent $PSScriptRoot
$outDir      = Join-Path $projectRoot "out"
$audioDir    = Join-Path $outDir "with-audio"
$voiceDir    = Join-Path $projectRoot "public\voiceover"
$musicasDir  = Join-Path (Split-Path -Parent (Split-Path -Parent $projectRoot)) "Musicas"

# Musica padrao se nao especificada
if ([string]::IsNullOrWhiteSpace($Music)) {
    $Music = Join-Path $musicasDir "alexgrohl-motivational-449654.mp3"
}

$scriptDucking = Join-Path $PSScriptRoot "apply-audio-ducking.ps1"

# ----------------------------------------------------------------------------
# Lista dos 12 videos base (vertical + square = 24 totais)
# ----------------------------------------------------------------------------
$videos = @(
    "V1A-FechamentoNoturno",
    "V1B-PerguntasRepetidas",
    "V1C-ConcorrenciaTempo",
    "V1D-FinalDeSemana",
    "V2A-70Porcento",
    "V2B-FuncionarioFalta",
    "V2C-VendasPerdidas",
    "V2D-QuatroCanais",
    "V3A-EmporioFloral",
    "V3B-ClienteDuvidas",
    "V3C-DomingoMadrugada",
    "V3D-ClienteDificil"
)

# Filtra se -Only fornecido (match por substring no nome base)
if ($Only.Count -gt 0) {
    $videos = $videos | Where-Object {
        $v = $_
        ($Only | Where-Object { $v -match $_ }).Count -gt 0
    }
}

# ----------------------------------------------------------------------------
# Validacoes
# ----------------------------------------------------------------------------
Write-Host ""
Write-Host "OTIMIZE Batch Audio Ducking" -ForegroundColor Cyan
Write-Host "===========================" -ForegroundColor Cyan
Write-Host "Diretorio videos:  $outDir"
Write-Host "Diretorio saida:   $audioDir"
Write-Host "Musica:            $Music"
Write-Host "Modo voz:          $(if ($WithVoice) { 'COM voz over (ducking)' } else { 'SO musica (sem ducking)' })"
Write-Host "Videos a processar:$($videos.Count) base x 2 formatos = $($videos.Count * 2)"
if ($DryRun) {
    Write-Host "DRY RUN: nada sera executado" -ForegroundColor Yellow
}
Write-Host ""

if (-not (Test-Path $scriptDucking)) {
    Write-Host "ERRO: apply-audio-ducking.ps1 nao encontrado: $scriptDucking" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $Music)) {
    Write-Host "ERRO: musica nao encontrada: $Music" -ForegroundColor Red
    Write-Host "Dica: passe -Music 'caminho\para\musica.mp3'" -ForegroundColor Yellow
    exit 1
}

if (-not $DryRun -and -not (Test-Path $audioDir)) {
    New-Item -ItemType Directory -Path $audioDir -Force | Out-Null
}

# ----------------------------------------------------------------------------
# Loop de processamento
# ----------------------------------------------------------------------------
$total      = 0
$ok         = 0
$skipped    = 0
$failed     = 0
$missing    = @()

foreach ($baseName in $videos) {
    foreach ($formato in @("", "-square")) {
        $total++
        $inputName  = "${baseName}${formato}.mp4"
        $inputPath  = Join-Path $outDir $inputName
        $outputPath = Join-Path $audioDir $inputName

        # videoid sem sufixo -square para procurar voiceover (V1A, V1B, ...)
        $videoId = $baseName.Substring(0, 3)
        $voicePath = Join-Path $voiceDir "${videoId}-narration.mp3"

        Write-Host "[$total/$($videos.Count * 2)] $inputName" -ForegroundColor White

        if (-not (Test-Path $inputPath)) {
            Write-Host "  - SKIP: video nao existe ainda ($inputPath)" -ForegroundColor DarkGray
            $skipped++
            $missing += $inputName
            continue
        }

        $usaVoz = $false
        if ($WithVoice) {
            if (Test-Path $voicePath) {
                $usaVoz = $true
                Write-Host "  - Voz: $voicePath" -ForegroundColor Gray
            } else {
                Write-Host "  - AVISO: voiceover nao existe ($voicePath) -- usando so musica" -ForegroundColor Yellow
            }
        }

        if ($DryRun) {
            Write-Host "  - DRY RUN: pularia ffmpeg" -ForegroundColor Yellow
            $ok++
            continue
        }

        # Monta argumentos para apply-audio-ducking.ps1
        $duckArgs = @(
            "-InputVideo", $inputPath,
            "-Music", $Music,
            "-Output", $outputPath
        )
        if ($usaVoz) {
            $duckArgs += @("-Voice", $voicePath)
        }
        if ($Force) {
            $duckArgs += "-Force"
        }

        # Executa script de ducking single-video
        & powershell -NoProfile -ExecutionPolicy Bypass -File $scriptDucking @duckArgs

        if ($LASTEXITCODE -eq 0) {
            $ok++
            Write-Host "  - OK" -ForegroundColor Green
        } else {
            $failed++
            Write-Host "  - FALHOU (exit $LASTEXITCODE)" -ForegroundColor Red
        }
        Write-Host ""
    }
}

# ----------------------------------------------------------------------------
# Sumario
# ----------------------------------------------------------------------------
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Sumario:" -ForegroundColor Cyan
Write-Host "  Total tentados:  $total"
Write-Host "  OK:              $ok" -ForegroundColor Green
Write-Host "  Pulados:         $skipped" -ForegroundColor DarkGray
Write-Host "  Falharam:        $failed" -ForegroundColor $(if ($failed -gt 0) { 'Red' } else { 'White' })
Write-Host "================================" -ForegroundColor Cyan

if ($missing.Count -gt 0) {
    Write-Host ""
    Write-Host "Videos faltantes (renderize-os antes):" -ForegroundColor Yellow
    foreach ($m in $missing) { Write-Host "  - $m" -ForegroundColor DarkGray }
}

if ($failed -gt 0) {
    exit 1
}
exit 0
