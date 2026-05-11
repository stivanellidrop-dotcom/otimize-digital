# OTIMIZE Digital

Operação digital da **OTIMIZE Systems** — agente IA WhatsApp 24/7 para e-commerce.

**Site:** [otimize.digital](https://otimize.digital)
**WhatsApp:** [+55 19 98130-6507](https://wa.me/5519981306507)

## Estrutura

| Pasta | Conteúdo |
|-------|----------|
| `lp/` | Landing page (HTML estático) servida pelo GitHub Pages |
| `agentes/` | Configurações de agentes de IA Helena |
| `docs/` | Especificações, planos e documentação |

## Stack

- **Landing page:** HTML/CSS/JS vanilla, sem framework
- **Hosting:** GitHub Pages + CDN global
- **CI/CD:** GitHub Actions (deploy automático ao push em `main`)
- **DNS:** Hostinger (A records → GitHub Pages)
- **Plataforma de atendimento:** HelenaCRM (White Label)

## Deploy

Push para `main` publica automaticamente em `otimize.digital`. Tempo total: ~30 segundos do push até o site atualizado.

```bash
git add .
git commit -m "feat: ajuste copy do hero"
git push
```

## Desenvolvimento Local

```bash
cd lp
python -m http.server 8080
# Abrir http://localhost:8080
```

## Licença

Proprietário — OTIMIZE Systems.
