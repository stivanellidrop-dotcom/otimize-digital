# Helena CRM — Referência Expert (gerada via MCPs oficiais)

> Compilação técnica para execução autônoma do Subprojeto 3B.
> Fontes: `docs.flw.chat/guide` (Helena DOCs OTIMIZE) + `docs.helena.app` (Helena Parceiros)
> Versão atual: **V0.8** (mar/2026) — Agentes de IA

---

## 1. Pré-requisitos para criar agente

| Passo | Local | Ação |
|-------|-------|------|
| 1 | Admin → Contas | Habilitar app **"Agentes de IA"** |
| 2 | Admin → Contas | Definir quantidade total (agentes + supervisores) |
| 3 | Apps → Mais Apps | Habilitar "Agentes de IA" |
| 4 | Agentes IA → Empresas | Cadastrar empresa (nome, setor, produtos, diferenciais, público) |
| 5 | Agentes IA → Provedores | Adicionar Provedor (selecionar modelo + chave API + apelido) |

---

## 2. Modelos de IA disponíveis (mar/2026)

| Modelo | Controle de criatividade | Esforço de Raciocínio | Observação |
|--------|---|---|---|
| **GPT-5.1** | – | ✅ Mínimo/Curto/Médio/Alto/Automático | Recente, recomendado |
| **GPT-5.2** | – | ✅ Mínimo/Curto/Médio/Alto/Automático | Recente, balanceado |
| **GPT-5.4** | – | ❌ (bloqueado quando há habilidades — força "Automático") | Topo, mas perde controle |
| GPT-4 e anteriores | Temperatura (Restrito ↔ Criativo) | – | Legacy |

**Decisão para OTIMIZE:** **GPT-5.2** + Esforço **Médio** (Supervisor e Empório); **GPT-5.2** + Esforço **Alto** (OTIMIZE — vendedor B2B precisa raciocínio profundo SPIN).

---

## 3. Configuração do Agente (V0.8) — 4 blocos

### A. Perfil e Identidade
- Nome interno (ex: "Ygor-Empório-Stivanelli")
- Apelido (ex: "Ygor") — nome ao cliente
- Assinar conversa (Sim/Não)

### B. Comportamento e Estilo
| Campo | Opções |
|-------|--------|
| Forma de comunicação | Consultivo e Acolhedor / Neutro e Equilibrado / Formal |
| Formato da resposta | Curta e Objetiva / Longa e Detalhada / Automática |
| Perfil do agente | Vendedor / Suporte / Recepcionista / etc |

### C. Objetivo (Prompt do Sistema)
- Campo "Descreva o objetivo deste agente" → prompt central com personalidade, função, regras

### D. Conhecimento
- Associar à Empresa cadastrada (perfil de negócio)

### Configurações extras importantes:
- **Simular Tempo de Digitação:** Imediato / 1-10s / 15-40s (recomendado 3-7s para naturalidade humana)
- **Limite de tokens por mensagem:** padrão off; mínimo 50; recomendado **400-700** (cobre busca em base + resposta)
- **Transferência humana:** Habilitar/Desabilitar + mensagem customizada + checkbox de aviso
- **Fragmentação Inteligente:** quebra textão automaticamente respeitando contexto

---

## 4. Habilidades — 9 nativas

| # | Nome | Quando usar | Campos extras |
|---|------|-------------|---------------|
| 1 | Informações do Contato | Ler dados (nome, email, etc.) | Marcar campos visíveis |
| 2 | Etiquetas do Contato | Adicionar / Remover | Lista de etiquetas |
| 3 | Transferir Atendimento | Mandar pra equipe humana | Equipe destino + finalizar IA (sim/não) |
| 4 | Concluir Atendimento | Encerrar conversa | Msg encerramento + nota interna |
| 5 | Criar Card no CRM | Nova oportunidade | Painel + etapa + título + descrição + etiquetas |
| 6 | Acionar API | Sistema externo | URL + Method + Headers + Body |
| 7 | Acionar Fluxo Chatbot | Direcionar pro Builder | Fluxo destino |
| 8 | Alterar Campo Contato | Atualizar dado | Campo + ação + valor |
| 9 | Consultar Servidor MCP | Query MCP externo | URL + header auth |

**Campos comuns a todas:**
- Nome interno
- **Definição de uso** (linguagem natural — campo MAIS IMPORTANTE)
- **Não enviar resposta após execução** (execução silenciosa — ideal pra ações de bastidor)

**Atualização CRM Avançada (chatbot — jul/2025):**
- Criar Card no CRM (preencher tudo + atribuir responsável)
- Mover Card no CRM (busca por etiqueta + move etapa)
- Alterar campos do Card (atualização precisa)

---

## 5. Supervisor de IA (V0.6+)

- Orquestra hierarquia de sub-agentes
- Vínculo crítico: arquivar agente filho sem desvincular do supervisor dispara alerta
- Sub-agentes pegam slice da conversa (isolamento de persona)
- Roteamento por intent **a cada msg** (não único como handoff serial)
- Travas: arquivamento valida vínculos antes de concluir

**Configuração:**
- Criar supervisor como tipo "Supervisor"
- Associar agentes filhos (Empório, OTIMIZE)
- Prompt do supervisor define regra de roteamento (não fala com cliente, só decide quem fala)

---

## 6. Base de Conhecimento

### Tipos suportados
- **Arquivo:** PDF, CSV, **MD**, **TXT** (jul/2025)
- **Tabela:** linhas/colunas estruturadas (sem corte após mar/2026)
- **FAQ:** pares pergunta/resposta
- **Página de site:** scraping URL

### Recursos novos (2026)
- **Q&A view:** auditar o que IA extraiu do documento (read-only)
- **Chat de teste:** IA dedicada por base — testar respostas isoladas
- **Detalhes de execução:** log do que IA buscou + resultado (sucesso/falha + timestamp + parâmetros)

---

## 7. Campos Personalizados — tipos disponíveis

- Texto curto
- Texto longo
- Número inteiro
- Número decimal
- Lista de opções (criação automática via API se valor inexistente)
- Multiseleção
- Data
- Horário
- Data e Hora
- Booleano
- Link
- CEP
- CPF/CNPJ

**Sem limite de quantidade.** Criar agrupamentos para organizar (ex: "Endereço" = Logradouro + Número + ...).

---

## 8. Painel CRM (Funil)

### Criação
1. CRM → Painéis → Novo
2. Tipo: **Vendas** (Kanban com Ganho/Perda auto-ocultos) ou **Gestão**
3. ⚠️ Tipo não pode mudar após criação
4. Adicionar etapas:
   - Nome
   - Tipo: **Início** (entrada de leads) ou **Intermediário**
   - Sem etapa "Fase Final" — encerramento via ação manual

### Comportamento Vendas
- Cards marcados Ganho/Perda → ocultos do Kanban (visíveis em modo Lista)
- Mover por API: endpoint Cards → Atualizar
- Exclusão de etapa: alerta antes; mover cards antes para preservar dados
- Duplicação de painel: copia fases + etiquetas + campos + motivos de perda

---

## 9. Etiquetas

- Limite Essential: 10 etiquetas
- Outros planos: ilimitado
- Cores customizáveis
- Aplicáveis por agente IA (habilidade Etiquetas)

---

## 10. Canal WhatsApp

### Tipos de conexão
| Tipo | Limitações |
|------|------------|
| API Oficial (Cloud Meta) | Modelos pré-aprovados Meta; melhor entrega |
| QR Code (Coexistência) | Mais flexível; sem suporte Canais/Status |
| API Não Oficial (Z-API) | Sem suporte oficial; rate limit |

### Vincular agente ao canal
- Apps → Chatbot → Chatbot para Atendimento
- Localizar canal (ex: (11) 97820-2286)
- **Alterar** → definir chatbot horário trabalho / fora horário
- Palavras-chave podem disparar chatbots específicos (útil pra tráfego pago)

### Tipos de chatbot
- **Atendimento:** responde mensagens do canal
- **Automação:** disparos massa/API/sequência/campanha

---

## 11. API REST (endpoints relevantes)

| Endpoint | Uso |
|----------|-----|
| `POST /chat/v1/contacts` (upsert) | Criar/atualizar contato (param `upsertFields`, `upsertTagOperation`) |
| `POST /chat/v1/contacts/bulk` | Massa |
| `GET /chat/v1/conversations` | Listar conversas |
| `GET /chat/v1/conversations/{id}?includeDetails=contactDetails` | Detalhes com etiquetas |
| `PATCH /chat/v1/cards/{id}` | Mover card entre etapas |
| `POST /chat/v1/files/upload-url` | Obter URL upload temp |
| `POST /chat/v1/template/otp/send` | Enviar OTP |
| `GET /chat/v1/webhooks/events` | Listar eventos (Mensagem atualizada, Etiqueta alterada, Card movido, etc.) |
| Usuários | Param `Availability` (jan/2026) |

---

## 12. Estratégia OTIMIZE — decisões técnicas

### Modelo IA por agente
- **Ygor-Supervisor:** GPT-5.2, Esforço **Médio** (decisão rápida + custo controlado)
- **Ygor-Empório:** GPT-5.2, Esforço **Médio** (atendimento moda + consulta catálogo)
- **Ygor-OTIMIZE:** GPT-5.2, Esforço **Alto** (raciocínio SPIN + objeções B2B)

### Comportamento
| Agente | Tom | Formato | Perfil | Assinar | Tempo digitação |
|--------|-----|---------|--------|---------|------------------|
| Supervisor | Neutro | Curta | Recepcionista | Não | Imediato (invisible) |
| Empório | Consultivo/Acolhedor | Curta/Auto | Vendedor | Sim ("Ygor") | 3-5s |
| OTIMIZE | Consultivo/Acolhedor | Auto | Vendedor | Sim ("Ygor") | 4-7s |

### Catálogo Inteligente — fonte verdade produtos
**Plano A (preferido):** Acionar Fluxo Chatbot → fluxo "Consultar Catálogo" retorna ficha verbatim
**Plano B (fallback):** Base Conhecimento tipo Tabela (7 produtos + colunas: nome, preço, descrição, foto_url) + instrução "cite verbatim"
**Plano C (descartado nesta fase):** MCP externo

### Limite de tokens
- Supervisor: 200 (decisão rápida)
- Empório: 500 (consulta catálogo + resposta)
- OTIMIZE: 700 (SPIN + objeções + pitch)

### Pipeline OTIMIZE Funil (13 etapas — seção 4 SPEC)
1. Lead chegou (Início)
2-13. Intermediárias (atendendo moda → demo agendada → fechou/perdeu/pausado/reativação)

### Campos personalizados (15)
Definidos em SPEC seção 7 — agrupamento sugerido: "Lead OTIMIZE" + "Empório" + "Sistema"

### Etiquetas (30)
Definidas em SPEC seção 5 — 8 categorias por cor:
- Origem (4) — azul
- Jornada Empório (4) — verde
- Comportamentais (4) — amarelo
- Jornada OTIMIZE (7) — laranja
- Resultado (5) — vermelho/verde
- Suporte (3) — cinza
- Operacional (3) — roxo

---

## 13. Riscos confirmados via docs

| Risco | Mitigação validada |
|-------|---------------------|
| Supervisor V0.6 não disponível no plano | Fallback handoff serial via `Transferir Atendimento` (já validado nos Higor antigos arquivados) |
| Agente expõe nome de habilidade ao cliente | V0.6+ corrige isso automaticamente (não mais "Adicionei a etiqueta X") |
| Catálogo via Base Conhecimento alucinando preço | Q&A view permite auditar antes de produção + instrução "cite verbatim" |
| WhatsApp banir conta em testes | Rate limit não oficial / espaçar ≥60s entre msgs |
| Empório vaza identidade OTIMIZE | Bases de conhecimento separadas; sub-agente recebe slice; teste adversarial |

---

## 14. Próximas referências a buscar quando necessário

- `https://docs.helena.app/configurando-sua-plataforma/apps/mais-apps/agentes-inteligentes/versoes-dos-agentes/v.06` — detalhes Supervisor
- `https://docs.helena.app/configurando-sua-plataforma/apps/mais-apps/agentes-inteligentes/novo-agente` — fluxo completo criação
- `https://docs.helena.app/configurando-sua-plataforma/apps/mais-apps/agentes-inteligentes/habilidades` — habilidades detalhadas
- `https://docs.flw.chat/guide/documentacao/crm/paineis/vendas/como-criar-e-configurar-um-painel-de-vendas` — painel

---

_Atualizado: 2026-05-12 · sessão autônoma Subprojeto 3B_
