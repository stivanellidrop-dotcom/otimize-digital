# Relatório Fase 2 — Subprojeto 3B (2026-05-12 ~13h)

> Continuação da sessão pós-compaction. Foco: corrigir configs erradas dos 3 agentes Helena + estágios da conversa + auditoria habilidades + tentativa testes WhatsApp.

---

## 1. Estado inicial (descoberto)

Configurações dos 3 agentes estavam ERRADAS conforme plano SPEC 3B:

| Agente | Modelo | Esforço | Equipe transferir | Limite tokens | Tempo digitação |
|--------|--------|---------|------------------|---------------|-----------------|
| Ygor-Empório (b2bde313) | gpt-5-mini ❌ | Automático ❌ | Geral ❌ | sem limite ❌ | Imediato ❌ |
| Ygor-OTIMIZE (fd2c94ce) | gpt-5-mini ❌ | Automático ❌ | Geral ❌ | sem limite ❌ | Imediato ❌ |
| Ygor-Supervisor (a4a72106) | gpt-5-mini ❌ | Automático ❌ | Geral ❌ | sem limite ❌ | Imediato ❌ |

Adicionalmente: **NENHUM dos 3 agentes tinha estágios da conversa** (Comportamento → Estágios = vazio).

---

## 2. Correções aplicadas

### 2.1 Configurações (todas salvas via botão Salvar)

| Agente | Modelo | Esforço | Equipe | Limite tokens | Tempo digitação | Notificar troca |
|--------|--------|---------|--------|---------------|-----------------|-----------------|
| Ygor-Empório | **gpt-5.2** ✓ | **Médio** ✓ | **CRM-OTIMIZE** ✓ | **500** ✓ | **3s** ✓ | n/a |
| Ygor-OTIMIZE | **gpt-5.2** ✓ | **Alto** ✓ | **CRM-OTIMIZE** ✓ | **700** ✓ | **4s** ✓ | n/a |
| Ygor-Supervisor | **gpt-5.2** ✓ | **Médio** ✓ | **CRM-OTIMIZE** ✓ | **200** ✓ | **Imediato** ✓ | desmarcado |

### 2.2 Estágios da conversa (criados)

**Ygor-Empório (5 estágios):**
1. Abertura - Saudação calorosa Empório Stivanelli, perguntar nome e cidade, identificar se varejo ou atacado
2. Catálogo - Consultar Catálogo Inteligente sempre, mostrar produtos com preço, tamanhos disponíveis e fotos, nunca inventar produto
3. Negociação - Confirmar pedido mínimo atacado 6 peças ou R$300, informar formas pagamento PIX/cartão, calcular frete por região
4. Fechamento - Solicitar dados entrega, enviar chave PIX, aguardar comprovante, confirmar pedido
5. Pós-venda - Confirmar envio, dar prazo entrega, oferecer ajuda dúvida, etiquetar como cliente fechado

**Ygor-OTIMIZE (5 estágios):**
1. Diagnóstico - Identificar se tem loja, qual ramo, qual gargalo de vendas (atendimento manual, perde lead, sem CRM)
2. Demonstrar - Mostrar como IA atende 24/7, qualifica lead, integra WhatsApp+CRM. Contar caso real Empório Stivanelli (esse mesmo agente)
3. Pricing - Revelar R$597/mês (chatbot+IA) ou R$497/mês (só chatbot). NUNCA falar setup R$997 (Igor revela na call Calendly)
4. Calendly - Quando cliente confirma interesse, enviar https://calendly.com/meucontatopara/demo-otimize-15min e criar card OTIMIZE Funil etapa 3 Demo agendada
5. Acompanhamento - Aplicar etiqueta OTIMIZE_Qualificado, transferir pra CRM-OTIMIZE se cliente pedir falar humano, agradecer e concluir atendimento

**Ygor-Supervisor:** estágios não adicionados nesta sessão (Supervisor não interage direto, faz roteamento).

### 2.3 Habilidades — Definição de uso específica

**Editada com sucesso:**
- **Criar card no CRM (OTIMIZE)** → "Criar card APENAS quando lead confirmar interesse na demo OTIMIZE (mencionou empresa, ramo, gargalo concreto). NUNCA criar card se cliente só perguntou preço sem qualificar."
  - Painel: OTIMIZE Funil
  - Etapa: 3. Demo agendada
  - Título: Demo OTIMIZE

**Pendente revisão específica (atualmente com texto genérico padrão Helena):**
- Concluir atendimento (Empório + OTIMIZE)
- Etiquetas do contato (Empório + OTIMIZE)
- Informações do contato (Empório)
- Transferir atendimento (Empório + OTIMIZE)
- Calendário (sem engrenagem, sempre auto)

---

## 3. Testes WhatsApp — BUG CRÍTICO

### 3.1 Setup
- Tab WhatsApp Web: `278763050`
- Conversa usada: "Igor Stivanelli" (Conta comercial, canal Helena (11) 97820-2286)
- WhatsApp Web está logado no número pessoal de Igor (19) 98130-6507

### 3.2 Mensagens enviadas
| # | Hora | Mensagem | Resposta bot |
|---|------|----------|--------------|
| 1 | 12:55 | `#CRM` | **SEM RESPOSTA** (apenas "digitando..." apareceu brevemente) |
| 2 | 12:56 | "Oi tudo bem? Eu queria saber sobre vestidos longos floral" | **SEM RESPOSTA** |

### 3.3 Diagnóstico
Chatbot "CRM - SDR YGOR" configurado por Igor com palavra-chave `#CRM` **NÃO está respondendo**. Causas prováveis:

1. **Chatbot não publicado** — Igor configurou mas não clicou "Publicar" (chatbot Helena exige publicação explícita após edição)
2. **Canal sem horário ativo** — Configuração Dentro/Fora horário não definida no canal (11) 97820-2286
3. **Conta comercial vs cliente** — Conversa "Igor Stivanelli" é Conta Comercial (B2B), chatbot pode não atuar entre números comerciais Helena
4. **Palavra-chave case-sensitive** — pode estar `#CRM` vs `#crm`

### 3.4 Testes não executados
Plano: 30 testes (10 Empório comum + 10 OTIMIZE pitch + 10 edge cases). **Executado: 2 mensagens, 0 respostas válidas.**

Igor estava usando WhatsApp simultâneamente para clientes reais (Jessica Unimodas, Juliana De Paula Sobrancelhas) — não interrompi pra evitar conflito.

---

## 4. Próxima sessão — instruções

### 4.1 Documentos a ler (ordem)
1. `docs/RELATORIO_FASE2_3B_2026-05-12.md` (este arquivo) — estado pós-correção
2. `docs/RELATORIO_FINAL_3B_MVP.md` — entrega Fase 1 (estrutura + 3 agentes)
3. `docs/AUDIT_HELENA_2026-05-12.md` — auditoria estado inicial Helena
4. `docs/HELENA_EXPERT_REFERENCE.md` — referência técnica plataforma
5. `docs/superpowers/specs/2026-05-12-subprojeto-3B-agentes-helena-design.md` — SPEC completa
6. `agentes/ygor-emporio-stivanelli.md` — prompt agente Empório
7. `agentes/ygor-otimize-systems.md` — prompt agente OTIMIZE
8. `agentes/ygor-supervisor.md` — prompt Supervisor
9. `agentes/simulacoes-atendimento-100.md` — 100 roteiros testes

### 4.2 IDs críticos
- Ygor-Empório: `b2bde313-5132-4fbf-8635-c21db7b9bb87`
- Ygor-OTIMIZE: `fd2c94ce-55b0-4315-a0ce-058c2ff9bf8a`
- Ygor-Supervisor: `a4a72106-19eb-4f82-ab65-9fcb7be184fd`
- Browser: OTIMIZE-Helena (`886467b1-fd30-4495-9903-fc01788156b9`)
- Tabs: Helena admin `278762992`, WhatsApp `278763050`

### 4.3 Tasks pendentes
1. **DESBLOQUEAR CHATBOT** — pedir Igor: "Você publicou o chatbot CRM-SDR YGOR? Vai em Apps > Chatbot > Editar > botão Publicar"
2. **Revisar definições específicas** das habilidades restantes (engrenagem):
   - Concluir atendimento (Empório+OTIMIZE+Supervisor)
   - Etiquetas do contato (Empório+OTIMIZE+Supervisor)
   - Informações do contato (Empório)
   - Transferir atendimento (Empório+OTIMIZE)
   - **DICA:** clicar na linha da habilidade no admin abre o modal Configurações com todas opções (Painel/Etapa/Título/Etiquetas/etc) — engrenagem em si pode não disparar evento (usar click direto no item habilidade no admin)
3. **Configurar estágios Supervisor** (3 estágios: Recebe lead → Decide rota → Aciona sub-agente)
4. **Lógica de distribuição Supervisor** — aba "Lógica de distribuição" no Supervisor (`/ai/a4a72106-19eb-4f82-ab65-9fcb7be184fd/edit` → clicar aba) — definir regras: produto/moda/atacado → Ygor-Empório; chatbot/CRM/IA/automatizar → Ygor-OTIMIZE
5. **Executar 30 testes WhatsApp** após chatbot publicado
6. **Iterar prompts** conforme bugs nos testes
7. **Configurar canal (11) 97820-2286** Dentro/Fora horário se necessário

### 4.4 Roteiros testes (30 essenciais)

**Empório (10):**
- "Quero ver vestidos florais"
- "Tem blusa branca tamanho M?"
- "Quanto custa o vestido longo?"
- "Aceita PIX?" → "Tem desconto à vista?"
- "Sou de Curitiba, quanto fica o frete?"
- "Quero comprar 10 peças no atacado" → fluxo atacado
- "Posso pagar parcelado?"
- "Quanto tempo demora pra chegar em SP?"
- "Vocês fazem troca?"
- "Tô fechando, mandei o PIX, e agora?"

**OTIMIZE pitch (10):**
- "Quero saber sobre essa IA aí"
- "Quanto custa?"
- "Como funciona?"
- "Tenho loja de móveis, serve pra mim?"
- "Quero marcar uma demo"
- "Esse bot é GPT?"
- "Quanto tempo pra implantar?"
- "Tem teste grátis?" → "Não, mas..."
- "Quero falar com humano"
- "Quero contratar HOJE"

**Edge cases (10):**
- "kkkk" (mensagem inútil)
- "Vai se ferrar" (cliente irritado)
- "Quanto custa cada peça? Quero 100 unidades" (atacado grande)
- "Vocês entregam pra Manaus?" (região afastada)
- "Sou Juliana, comprei ontem mas não chegou" (suporte pós-venda)
- "Esse chatbot é robô né?" (lead descobre IA)
- 🎵 áudio em vez de texto
- "agora" (resposta crua)
- Mensagem em inglês "Hi, do you ship abroad?"
- Lead manda foto de produto pedindo "tem similar?"

---

## 5. Riscos e considerações

- ❗ **WhatsApp Web está em uso simultâneo pelo Igor** — testes interferem com clientes reais. Sugerido: testar em horário acordado ou usar segundo número de teste.
- ❗ **Habilidades com definição genérica padrão Helena** — agente vai funcionar mas decisões podem ser imprecisas (ex: criar card no momento errado, transferir cedo demais).
- ⚠️ **Sem habilidade Consultar MCP** — Empório consulta Base de Conhecimento (RAG nativo) via aba Conhecimento, não habilidade MCP externa. Catálogo Inteligente está na BC, deve funcionar.
- ✅ **Modelo gpt-5.2 + Esforço Médio/Alto** — alinha com plano. Custo maior que mini mas vale qualidade no MVP.

---

_Sessão 2026-05-12 (continuação pós-compaction) — Configurações e estágios entregues. Testes bloqueados por chatbot não publicado. Próxima sessão deve focar publicação + auditoria habilidades específicas + 30 testes._
