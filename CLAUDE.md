# OTIMIZE Digital — Instruções para Claude Code

## Visão Geral do Projeto

Monorepo que abriga toda a operação digital da **OTIMIZE Systems**:
- **Landing page** (`/lp`) hospedada em `otimize.digital` via GitHub Pages
- **Agentes de IA Helena** (`/agentes`) — prompts, configurações, versionamento
- **Documentação** (`/docs`) — specs, decisões, planos de subprojetos

**Dono:** Igor Stivanelli (stivanellidrop@gmail.com)
**Negócio:** revenda White Label HelenaCRM + agente IA WhatsApp 24/7 para e-commerce de moda feminina (foco inicial: Brás/SP).

## Idioma
- Toda saída, comentários, commits e variáveis de log em **português pt-BR**.

## Arquitetura

```
otimize-digital/
├── .github/workflows/deploy.yml   # CI/CD: push main → GitHub Pages
├── lp/                            # Landing page (HTML estático)
│   ├── index.html                 # LP principal
│   ├── prompts.html               # Página biblioteca de prompts
│   ├── assets/                    # imagens, ícones, fontes
│   └── CNAME                      # otimize.digital
├── agentes/                       # Configurações de agentes Helena
├── docs/                          # Especificações e planos
│   ├── leia.txt                   # Documentação Helena (origem)
│   └── superpowers/specs/         # Design docs por subprojeto
└── _backup/                       # Backups com timestamp
```

## Subprojetos (decomposição)

| # | Nome | Status |
|---|------|--------|
| 1 | **Infra LP** — hospedagem + auto-deploy + DNS | em execução |
| 2 | **LP refinada** — copy/UX adaptado da referência imagemai.com.br | pendente |
| 3 | **Agente WhatsApp** — persona "loja simulada → SDR OTIMIZE" | pendente |
| 4 | **Funil tráfego** — criativos, públicos, integração LP↔WhatsApp | pendente |

Cada subprojeto tem spec em `docs/superpowers/specs/`.

## Regras Operacionais

### Regra das 3 Tentativas
Se uma correção não funcionar após 4 tentativas, PARA. Lista 3 abordagens diferentes e aguarda escolha.

### Backup Antes de Modificar
Sempre `cp arquivo.html _backup/arquivo_backup_YYYYMMDD_HHMM.html` antes de modificar HTML grande.

### Modo Autônomo
Igor pediu modo "sócio programador sênior": planejar → auditar → executar → QA visual → entregar. Não esperar aprovação para passos óbvios dentro de um subprojeto já aprovado.

### Investigar Antes de Modificar
Para automação de navegador (Helena, Hostinger, etc): screenshot do estado → dump DOM relevante → propor fix.

## Fontes de Informação (ordem de prioridade)

1. **MCPs Helena**:
   - `mcp__5f8979ab__searchDocumentation` → Helena DOCs OTIMIZE (docs.flw.chat/guide)
   - `mcp__f1f13121__searchDocumentation` → Helena Parceiros (docs.helena.app)
2. **Arquivos do projeto**: `docs/leia.txt` e specs em `docs/superpowers/specs/`.
3. **Conhecimento geral**.

## Deploy

- Push para `main` → GitHub Actions publica `/lp/*` no GitHub Pages.
- DNS: `otimize.digital` aponta para GitHub Pages via A records.
- SSL: automático via GitHub Pages (Let's Encrypt).

## URLs

- **Produção:** https://otimize.digital
- **Repo:** https://github.com/stivanellidrop-dotcom/otimize-digital
- **Pages preview:** https://stivanellidrop-dotcom.github.io/otimize-digital/

## Comandos Úteis

```powershell
# Status
gh repo view --web
gh run list --limit 5

# Deploy manual (caso necessário)
gh workflow run deploy.yml

# Logs do último deploy
gh run view --log

# Verificar DNS
nslookup otimize.digital
```
