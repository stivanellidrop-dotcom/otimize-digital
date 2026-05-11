# Pipeline de Audio - OTIMIZE Systems

Pos-processamento de audio para os videos da campanha (V1A..V3D, vertical + square).

Aplica **ducking automatico**: musica de fundo abaixa quando narracao TTS toca, sobe quando ha silencio (respiracao/pausa).

## Por que ducking?

> "a musica fico alta e a narração baixa precisa ter um efeito quando ele fala a musica abaixa e quando ele respir a musca sobe" -- Igor

A solucao tecnica e o filtro ffmpeg `sidechaincompress`. A voz funciona como "gatilho" que comprime dinamicamente a musica em tempo real.

## Estrutura

```
videos/otimize-systems/
  scripts/
    apply-audio-ducking.ps1     <- aplica ducking em 1 video
    apply-all-ducking.ps1       <- batch dos 24 videos
    generate-narrations-12.py   <- gera 12 narracoes TTS (V1A..V3D)
    AUDIO-PIPELINE.md           <- este arquivo
  out/
    V1A_FechamentoNoturno.mp4         (saida do Remotion, sem audio)
    V1A_FechamentoNoturno-square.mp4
    ...
    with-audio/
      V1A_FechamentoNoturno.mp4       (saida final do pipeline)
      V1A_FechamentoNoturno-square.mp4
      ...
  public/voiceover/
    V1A-narration.mp3                 (gerado pelo generate-narrations-12.py)
    V1B-narration.mp3
    ...
```

## Requisitos

- **ffmpeg** no PATH: `winget install Gyan.FFmpeg`
- **Python 3.10+** para gerar narracoes: `pip install edge-tts`
- Videos renderizados pelo Remotion em `out/` (sem trilha de audio)
- Musicas em `Musicas/` (raiz do projeto OTIMIZE)

## Parametros do ducking

| Param | Default | Significado |
|---|---|---|
| `MusicVolume` | 0.30 | Volume base da musica (30%) |
| `VoiceVolume` | 1.0 | Volume da voz (100%) |
| `Threshold` | 0.05 | Gatilho da compressao (-26 dB) |
| `Ratio` | 8 | Razao 8:1 quando voz toca |
| `Attack` | 10 | Ataque em ms (responsivo) |
| `Release` | 400 | Release em ms (volta suave) |

Esses defaults sao adequados pra narracao masculina TTS pt-BR-AntonioNeural. Ajuste se a musica continuar dominando ou se a voz parecer comprimida demais.

## Uso

### 1. Gerar as 12 narracoes TTS (opcional, se ainda nao geradas)

```powershell
cd C:\Users\win\Downloads\OTIMIZE\videos\otimize-systems
python scripts\generate-narrations-12.py
```

Saida: `public\voiceover\V1A-narration.mp3` ate `V3D-narration.mp3` (12 arquivos).

Vai pular as ja existentes (skip-if-exists). Se precisar regerar, apague o `.mp3` antes.

### 2. Aplicar ducking em 1 video (teste)

```powershell
.\scripts\apply-audio-ducking.ps1 `
  -InputVideo "out\V1A_FechamentoNoturno.mp4" `
  -Music "..\..\Musicas\alexgrohl-motivational-449654.mp3" `
  -Voice "public\voiceover\V1A-narration.mp3" `
  -Output "out\with-audio\V1A_FechamentoNoturno.mp4"
```

Sem voz (apenas musica de fundo):

```powershell
.\scripts\apply-audio-ducking.ps1 `
  -InputVideo "out\V1A_FechamentoNoturno.mp4" `
  -Music "..\..\Musicas\alexgrohl-motivational-449654.mp3" `
  -Output "out\with-audio\V1A_FechamentoNoturno.mp4"
```

### 3. Batch nos 24 videos (modo recomendado)

**Modo padrao (so musica, sem narracao -- usa enquanto as narracoes nao chegam):**

```powershell
.\scripts\apply-all-ducking.ps1
```

**Modo completo com ducking (quando as 12 narracoes estiverem prontas):**

```powershell
.\scripts\apply-all-ducking.ps1 -WithVoice
```

**Dry run (lista o que faria sem executar):**

```powershell
.\scripts\apply-all-ducking.ps1 -DryRun
```

**Apenas alguns IDs:**

```powershell
.\scripts\apply-all-ducking.ps1 -Only V1A,V1B -WithVoice
```

**Outra musica:**

```powershell
.\scripts\apply-all-ducking.ps1 -Music "..\..\Musicas\eliveta-motivation-motivational-music-474161.mp3"
```

**Sobrescrever outputs existentes:**

```powershell
.\scripts\apply-all-ducking.ps1 -Force
```

## Filtro ffmpeg explicado

```
[1:a]volume=0.30[music];                                              <- musica base 30%
[2:a]volume=1.0[voice];                                               <- voz 100%
[music][voice]sidechaincompress=                                      <- ducking dinamico
    threshold=0.05:                                                   <- gatilho -26 dB
    ratio=8:                                                          <- comprime 8:1
    attack=10:                                                        <- 10ms responsivo
    release=400                                                       <- 400ms volta suave
[ducked_music];
[ducked_music][voice]amix=inputs=2:duration=longest[final_audio]      <- mistura final
```

Como funciona na pratica:
- Voz silenciosa -> compressor solta -> musica volta a 30%
- Voz fala (passa de -26 dB) -> compressor aperta 8:1 em 10ms -> musica afunda
- Voz para de falar -> em 400ms a musica sobe gradualmente

## Fluxo completo da campanha

1. **Renderizar** os 12 videos no Remotion (vertical + square = 24 .mp4 em `out/`)
   - Remotion NAO deve incluir `<Audio>` -- ducking e aplicado depois
2. **Gerar** as 12 narracoes: `python scripts\generate-narrations-12.py`
3. **Aplicar audio**: `.\scripts\apply-all-ducking.ps1 -WithVoice`
4. **Conferir** os 24 .mp4 finais em `out\with-audio\`
5. **Upload** pra plataformas (Instagram, TikTok, YouTube Shorts)

## Troubleshooting

**"ffmpeg nao encontrado no PATH"**
```powershell
winget install Gyan.FFmpeg
# reabre o terminal
```

**"Voiceover nao existe -- usando so musica"**
- O script de batch e tolerante: se a narracao do video X nao existe, processa so com musica
- Rode `python scripts\generate-narrations-12.py` para gerar as faltantes

**Musica continua muito alta**
- Reduza `MusicVolume`: `-MusicVolume 0.20`
- Aumente `Ratio`: `-Ratio 12`

**Musica abaixa de mais (voz isolada)**
- Aumente `MusicVolume`: `-MusicVolume 0.40`
- Reduza `Ratio`: `-Ratio 4`

**Ducking soa "robotico" (cortes bruscos)**
- Aumente `Release`: `-Release 800` (volta mais suave)
- Reduza `Attack`: `-Attack 5` (ataque mais rapido evita "engole" inicio de palavra)

**Audio dessincronizado**
- Verifique a duracao da narracao vs do video (com `ffprobe -i arquivo.mp3`)
- Use `-shortest` (ja esta no script) corta no menor dos dois
- Se a narracao for mais curta, considere regerar com `rate` menor (mais lento)
