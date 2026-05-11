# Subprojeto 1 — Infra LP: design

**Data:** 2026-05-11
**Status:** aprovado pelo Igor, em execução autônoma
**Autor:** Claude (sócio sênior, modo autônomo)

## Objetivo

Colocar `otimize.digital` no ar com SSL, deploy automático via push e estrutura de repositório que comporta todos os subprojetos da OTIMIZE.

## Decisões arquiteturais

### 1. Hosting: GitHub Pages (não Hostinger)
- **Por quê:** SSL automático, CDN global, deploy via push, zero custo, zero credencial FTP exposta.
- **Hostinger:** continua dono do **domínio** (DNS) — apenas A records apontam para GitHub Pages.
- **Resultado para o visitante:** idêntico — `https://otimize.digital` com cadeado.

### 2. Repositório: monorepo `otimize-digital`
- Visibilidade: público (GitHub Pages exige público no plano free).
- Conta: `stivanellidrop-dotcom`.
- Estrutura: `/lp`, `/agentes`, `/docs`, `/.github/workflows`.

### 3. CI/CD: GitHub Actions
- Workflow `.github/workflows/deploy.yml` publica `/lp` no Pages a cada push em `main`.
- Tempo médio do push até o site atualizado: ~30 segundos.

### 4. DNS: 4 A records + 1 CNAME na Hostinger
- `A` `@` → `185.199.108.153`
- `A` `@` → `185.199.109.153`
- `A` `@` → `185.199.110.153`
- `A` `@` → `185.199.111.153`
- `CNAME` `www` → `stivanellidrop-dotcom.github.io`

### 5. Arquivo CNAME (no repo)
- `lp/CNAME` contém `otimize.digital` — GitHub Pages usa isso para configurar o domínio custom.

## Sequência de execução

1. Estruturar pastas (`lp/`, `agentes/`, `docs/`, `.github/workflows/`, `_backup/`) — feito
2. Mover `index.html` → `lp/`; backup do `otimize-systems.html` antigo (R$ 347) — feito
3. Renomear `prompts-ultrathinking.html` → `lp/prompts.html` — feito
4. Mover `leia.txt` → `docs/leia.txt` — feito
5. Criar `CLAUDE.md`, `README.md`, `.gitignore`, `lp/CNAME`, workflow — em curso
6. `git init` + commit inicial
7. `gh repo create otimize-digital --public --source=. --push`
8. Ativar GitHub Pages via API (`gh api`)
9. Configurar DNS na Hostinger via Chrome MCP
10. QA visual: abrir `https://otimize.digital`, screenshot, validar SSL e mobile

## Riscos e mitigações

| Risco | Mitigação |
|-------|-----------|
| DNS demora propagar (até 24h, normalmente 5-30 min) | Avisar Igor; testar via `nslookup` |
| SSL leva 10-15 min após DNS | Aguardar; revalidar |
| Domínio `otimize.digital` já tem subdomínio/redirect ativo | Inspecionar painel Hostinger antes de mudar; backup config atual |
| `index.html` é grande (~123KB) — ok para Pages | Sem mitigação necessária (limite Pages é 1GB) |

## Critérios de aceitação

- [ ] `https://otimize.digital` carrega com SSL válido
- [ ] Conteúdo visualmente idêntico ao `lp/index.html`
- [ ] Mobile renderiza corretamente (375px)
- [ ] Sem erros no console do navegador
- [ ] Push em `main` dispara deploy automático verificado
