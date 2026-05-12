# Audit Helena Admin — Estado Atual (2026-05-12)

> Fonte: navegação visual via Chrome MCP em `https://otimize-crm.wts.chat`
> Conta: stivanellidrop@gmail.com (perfil Igor • STIVANELLIDROP)
> Browser: OTIMIZE-Helena (Chrome Windows local)

---

## 1. Agentes IA

### Ativos (NÃO MEXER)
- **Higor - Closer** (Vendedor / Consultivo) — 31/03/2026 — produto descontinuado "máquina de fotos"
- **HIgor - SDR** (SDR / Consultivo) — 31/03/2026 — produto descontinuado "máquina de fotos"

### Arquivados
- **Ygor - Consultor OTIMIZE CRM** (SDR) — arquivado 11/05/2026
- **Ygor - Vendedor Empório Stivanelli** (Vendedor) — arquivado 11/05/2026
- **Igor - OTIMIZE CRM** (SDR) — arquivado 26/03/2026
- **SDR - Funcionario do Ano** (SDR) — arquivado 25/03/2026

**Decisão:** Criar 3 agentes Ygor novos do zero. Não reativar arquivados.

---

## 2. Supervisores

**Estado:** ✅ V0.6+ disponível. "Nenhum supervisor criado" — placeholder mostra arquitetura Supervisor → Suporte/Financeiro/Onboarding.

**Decisão:** Criar Ygor-Supervisor + associar Ygor-Empório e Ygor-OTIMIZE como filhos.

---

## 3. Provedor IA

- **ChatGPT • IGOR - OTIMIZE** (Em uso)
- API key OpenAI configurada
- Reaproveitar nos 3 novos agentes

**Modelos disponíveis presumidos (V0.8 mar/2026):** GPT-5.1, GPT-5.2, GPT-5.4 + Esforço Raciocínio

---

## 4. Empresas cadastradas

- **OTIMIZE** • Serviços profissionais (Em uso) ✓
- **Emporio Stivanelli** • Automotivo (Em uso) ⚠️

**⚠️ BUG ENCONTRADO:** Empório categorizado como "Automotivo". Correto: **Varejo / Moda Feminina / Atacado**. **Ação:** corrigir antes de criar Ygor-Empório.

---

## 5. Bases de Conhecimento

| Nome | Tipo | Conteúdo | Status |
|------|------|----------|--------|
| **CATALOGO INTELIGENTE** | Tabela | Produtos Empório (moda feminina) | Disponível 26/03 |
| **FAQ OTIMIZE CRM** | Tabela | Funcionalidades, preços, planos | Disponível 24/03 ⚠️ revisar trial 7 dias |
| **Infos operacionais** | Tabela | Prazo entrega, teste grátis, foto | Disponível 25/03 ⚠️ revisar trial 7 dias |

**⚠️ REVISAR:** "Infos operacionais" + "FAQ OTIMIZE CRM" mencionam "teste grátis" no preview — Igor pivotou negócio pra CTA WhatsApp direto. Necessário atualizar conteúdo.

**Decisão:** Reaproveitar CATALOGO INTELIGENTE (consulta verbatim). Revisar/atualizar outras 2.

---

## 6. CRM > Painéis (pipelines)

- **ENSAIOS FOTOGRAFICOS** — painel antigo do produto descontinuado (manter, não excluir)
- Vários cards "Minhas tarefas" (templates)

**Decisão:** Criar novo painel **"OTIMIZE Funil"** com 13 etapas (SPEC seção 4).

---

## 7. CRM > Contatos

- **96.746 contatos** cadastrados (base existente)
- Modal "Edição de campos personalizados" mostra só botões "Adicionar novo campo/grupo" — nenhum campo customizado raiz
- Grupo existente: **Origem** com campos:
  - FACEBOOK (provável valor/seleção)
  - Campanha (texto longo, ex: "JÁ PENSOU EM AUMENTAR EM ATÉ 3X SUAS VENDAS...")
  - Acesso (URL, ex: "https://fb.me/8lfkWWvjf")

**Decisão:** Reaproveitar grupo Origem. Criar 15 campos novos da SPEC dentro de grupos "Lead OTIMIZE" + "Empório" + "Sistema".

---

## 8. Etiquetas observadas (em contatos)

- APP - TA NA MAO
- DANCINHA
- D+1, D+3 (dias inativo)
- EXCLUIR - NÃO RESPONDEU
- TRAFEGO

**Decisão:** Manter etiquetas atuais. Criar 30 novas SPEC sem duplicar — usar prefixos `Origem_*`, `Empório_*`, `OTIMIZE_*`, etc para distinguir.

---

## 9. Bloqueadores identificados

Nenhum bloqueador crítico. Supervisor V0.6 disponível → plano arquitetural principal confirmado.

---

## 10. Decisões finais

| Item | Ação |
|------|------|
| Empresa Empório "Automotivo" | **Corrigir** pra Varejo Moda Feminina antes da Fase 5 |
| Base "Infos operacionais" / "FAQ OTIMIZE CRM" | **Revisar** + remover menções trial 7 dias antes da Fase 5 |
| Provedor ChatGPT | **Reusar** |
| Catálogo Inteligente | **Reusar** (consulta verbatim no Ygor-Empório) |
| Pipeline OTIMIZE Funil | **Criar do zero** (não duplicar ENSAIOS FOTOGRAFICOS) |
| Campos 15 SPEC | **Criar** em grupos novos (Lead OTIMIZE, Empório, Sistema) |
| Etiquetas 30 SPEC | **Criar** com prefixos distintos das existentes |
| Supervisor V0.6 | **Criar** primeiro Ygor-Supervisor (pai), depois filhos |
| 2 Higor antigos | **NÃO MEXER** |
| 4 Ygor/Igor/SDR arquivados | **Deixar arquivado** |

---

_Audit realizado: 2026-05-12 ~08:00 GMT-3 · Sessão autônoma · Subprojeto 3B_
