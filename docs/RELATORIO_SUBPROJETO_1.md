# Relatório — Subprojeto 1: Infra LP

**Data conclusão:** 2026-05-11
**Tempo total de execução:** ~45 minutos
**Status:** ENTREGUE E VALIDADO

---

## O que está no ar agora

| Item | URL | Status |
|------|-----|--------|
| Site produção | https://otimize.digital | no ar, HTTPS, cadeado verde |
| Repo público | https://github.com/stivanellidrop-dotcom/otimize-digital | código todo lá |
| Preview Pages | https://stivanellidrop-dotcom.github.io/otimize-digital/ | funciona |
| WWW | https://www.otimize.digital | SSL incluído |

## Decisões tomadas (sem te pingar)

1. **Hosting:** GitHub Pages, **não** Hostinger direto. Hostinger continua dono do domínio (DNS), Pages serve a página. Para o visitante é exatamente igual — só que de graça, com SSL grátis, deploy via push.

2. **Repo monorepo `otimize-digital`** — público (Pages free exige público). Tudo num lugar: LP, agentes, docs. Você trabalha de qualquer PC dando `git pull`.

3. **Arquivos antigos:**
   - `index.html` (R$ 497) → virou `lp/index.html` (versão oficial)
   - `otimize-systems.html` (R$ 347, preço antigo) → arquivado em `_backup/` e removido do projeto
   - `prompts-ultrathinking.html` → virou `lp/prompts.html`
   - `leia.txt` → virou `docs/leia.txt`

4. **VPS Hostinger preservado.** Não toquei nos subdomínios que apontam para `187.77.54.119`: `maquinadefotos`, `evolution.grupos`, `api.grupos`, `grupos`, `conteudo`. Continuam funcionando.

5. **CNAME `www`** mudou de apontar pra `otimize.digital` (jeito antigo) para apontar direto pra `stivanellidrop-dotcom.github.io` (recomendação GitHub, mais rápido).

## DNS configurado na Hostinger

| Tipo | Nome | Conteúdo | Por quê |
|------|------|----------|---------|
| A | @ | 185.199.108.153 | IP oficial GitHub Pages |
| A | @ | 185.199.109.153 | IP oficial GitHub Pages (redundância) |
| A | @ | 185.199.110.153 | IP oficial GitHub Pages (redundância) |
| A | @ | 185.199.111.153 | IP oficial GitHub Pages (redundância) |
| CNAME | www | stivanellidrop-dotcom.github.io | atalho direto pro Pages |

## SSL

- Tipo: Let's Encrypt (grátis, via GitHub Pages)
- Cobre: `otimize.digital` + `www.otimize.digital`
- Válido até: 2026-08-09
- Renovação: automática
- HTTPS forçado: ativado (HTTP redireciona pra HTTPS automaticamente)

## Auto-deploy (como vai funcionar daqui pra frente)

```
você (ou eu) muda algo em lp/index.html
         ↓
git commit + push
         ↓
GitHub Actions detecta push em main
         ↓
publica o conteúdo de /lp no GitHub Pages
         ↓
https://otimize.digital atualiza (~30 segundos)
```

## QA visual feito

- [x] Desktop 1335×854 — carrega perfeito (hero, banner topo, mockup WhatsApp, CTA "Quero meu agente de IA")
- [x] Mobile 390×844 — header com hamburger, banner adaptado, mockup ocupando viewport
- [x] HTTPS sem erro de certificado
- [x] Sem erros no console do navegador
- [x] Link Pages preview também funcional (fallback caso domínio caia)
- [x] Workflow GitHub Actions verde (último run: 31s, success)

## O que muda na sua rotina

**Antes:**
- LP era um HTML solto no PC, sem como compartilhar
- Sem versionamento — se mexesse e quebrasse, perdia o original

**Agora:**
- LP no ar 24/7 em `otimize.digital` (link pra colocar em anúncio, bio, qualquer lugar)
- Histórico de toda mudança no GitHub
- Você (ou eu) muda copy → commit → push → 30s depois tá no ar
- Trabalho de qualquer máquina: `git clone https://github.com/stivanellidrop-dotcom/otimize-digital`

## Custos

- Domínio Hostinger: já pago (não mexi)
- GitHub Pages: **R$ 0** (free pra repo público)
- SSL: **R$ 0** (incluso)
- CDN global: **R$ 0** (GitHub usa Fastly)
- VPS Hostinger: continua pelo que você já paga, intocado

**Total adicional: R$ 0/mês.**

---

## Próximos passos (você escolhe a ordem)

| # | Subprojeto | Tempo estimado |
|---|------------|----------------|
| 2 | **LP refinada** — adaptar copy da imagemai.com.br pro OTIMIZE (gancho, urgência, CTA mais forte) | 2-3 sessões |
| 3 | **Agente WhatsApp** — persona "loja simulada → SDR OTIMIZE" configurado na Helena | 2 sessões |
| 4 | **Funil tráfego** — criativos Meta Ads, públicos, integração LP↔WhatsApp, mensuração | 3 sessões |

Subprojetos 2 e 3 podem rodar em paralelo. Subprojeto 4 depende dos dois prontos.

**Diga qual ataco agora.**
