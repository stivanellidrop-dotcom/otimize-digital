# Subprojeto 3B — 3 Agentes Ygor na Helena: design

> **Instrução operacional (verbatim do dono do produto):** "voce vai planejar como um socio programador senior, depois auditar e executr, e vai apos implementação testar visualmente como um QA profissional"

**Meta:** 2026-05-12 · OTIMIZE Systems · Igor Stivanelli · canal `(11) 97820-2286` · parceiro Helena White Label

---

## 1. Objetivo

Substituir os 2 agentes Ygor antigos (arquivados — produto descontinuado "máquina de fotos") por **3 novos agentes do zero** que vendam o produto atual da OTIMIZE — **agente IA WhatsApp 24h via Helena** (R$497 chatbot só / R$597 chatbot+IA combo) — usando a estratégia **show-don't-tell**: o lead entra achando que está falando com um vendedor humano da loja modelo (Empório Stivanelli, moda feminina, Brás SP); só depois da experiência convincente é que recebe a revelação positiva + pitch. **Métrica de sucesso:** ≥30 % dos leads de tráfego pago que entram no `(11) 97820-2286` chegam ao estágio "Demo agendada" no pipeline CRM OTIMIZE Funil dentro de 14 dias após go-live.

---

## 2. Decisão arquitetural — por que Supervisor + 2 sub-agentes

| Critério                                  | Handoff serial (1 agente → outro)                                                   | Supervisor + sub-agentes (escolhido)                                                            |
| ----------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Roteamento por intent em **cada mensagem** | Não — handoff é evento único, agente B fica preso mesmo se lead voltar a falar moda | Sim — supervisor reclassifica msg a msg, pode devolver pro Empório se lead voltar a perguntar tamanho |
| Custo de tokens                           | Menor (1 LLM call/msg)                                                              | Maior (supervisor + sub-agente: ~2× tokens)                                                     |
| Risco de "vazar" identidade               | Alto — Empório vê histórico OTIMIZE, pode confundir personas                        | Baixo — sub-agentes recebem só o slice de conversa do seu domínio                              |
| Manutenção dos prompts                    | Cada agente precisa lógica de detectar handoff embutida                             | Detecção centralizada no supervisor, sub-agentes ficam puramente "executores de papel"          |
| Disponibilidade Helena                    | Estável (handoff `Transferir Atendimento` já documentado)                           | Helena ≥V0.6 (recente, doc parcial — risco a mitigar)                                           |

**Decisão final:** Supervisor + 2 sub-agentes. O ganho de roteamento dinâmico + isolamento de persona supera o risco de doc V0.6 incompleta. **Mitigação:** se V0.6 falhar nos testes, fallback handoff serial usando habilidade `Transferir Atendimento` nativa (já validada nos 2 agentes Higor antigos).

---

## 3. Catálogo Inteligente — fonte da verdade

Os **7 produtos** já cadastrados (VESTIDO FRANCINE, CONJUNTO MESCLA, BIQUINI ANITTA, Camiseta Polo Feminina, Conjunto Fitness Academia, Vestido Alessandra, Conjunto Masculino) precisam ser acessíveis ao Ygor-Empório **sem possibilidade de o agente inventar preço, estoque ou descrição**.

| Caminho                                                | Como funciona                                                                              | Risco                                                                                | Decisão                  |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------ |
| **A. Fluxo Chatbot "Consultar Catálogo"**              | Agente chama habilidade `Acionar Fluxo Chatbot`, fluxo retorna ficha do produto formatada  | Latência (1-3 s); fluxo precisa ser construído no editor visual                      | **Investigar primeiro**  |
| **B. Base de Conhecimento (.md/PDF)**                  | RAG nativo Helena indexa arquivo; agente busca semanticamente                              | Risco de o LLM "interpolar" preços se buscar errado; precisa de regra "cite verbatim" | **Backup se A não der**  |
| **C. MCP externo / API direta**                        | Habilidade `Consultar MCP` chama endpoint próprio com lista canônica                       | Precisa servidor MCP rodando + manutenção; sobrematado pra 7 produtos                | **Não nesta fase**       |

**Estratégia adotada:** testar **A** primeiro (fluxo chatbot — única forma de garantir 0 % alucinação porque os valores vêm do banco Helena, não do prompt). Se a feature não estiver disponível no plano atual, cair pro **B** com instrução de sistema explícita: *"Para qualquer pergunta sobre preço/estoque/descrição você DEVE buscar na Base de Conhecimento e citar a linha exata. Se não achar, diga 'deixa eu confirmar com o estoque, retorno em 2 min' e dispare etiqueta `Pendente_estoque`."*

---

## 4. Pipeline CRM "OTIMIZE Funil" — 13 etapas

| #  | Etapa                            | Quem move o card                                       | Critério de entrada                                          |
| -- | -------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| 1  | **Lead chegou**                   | Automático (canal recebe msg)                          | Primeira msg do número desconhecido                          |
| 2  | **Atendendo moda**                | Ygor-Empório                                            | Lead enviou 1+ msg sobre produto/moda                        |
| 3  | **Pergunta IA detectada**         | Ygor-Supervisor                                        | Trigger: "tu é robô? / é IA? / atende rápido / tem loja?"   |
| 4  | **Revelado**                      | Ygor-OTIMIZE                                            | Mensagem de revelação positiva enviada                       |
| 5  | **SPIN concluído**                | Ygor-OTIMIZE                                            | 4 perguntas SPIN respondidas (Situação/Problema/Implicação/Necessidade) |
| 6  | **Demo agendada**                 | Ygor-OTIMIZE                                            | Lead confirmou horário Google Meet 20min                     |
| 7  | **Demo realizada**                | Manual (Igor após call)                                | Igor marca após reunião                                      |
| 8  | **Proposta enviada**              | Manual (Igor)                                          | PDF/orçamento entregue                                       |
| 9  | **Negociando**                    | Manual (Igor)                                          | Lead pediu desconto/condição                                 |
| 10 | **Fechou**                        | Manual (Igor)                                          | Pagamento confirmado                                         |
| 11 | **Perdeu**                        | Manual (Igor) ou Ygor-OTIMIZE                          | Lead descartado (motivo no campo `motivo_perda`)             |
| 12 | **Pausado**                       | Manual (Igor)                                          | Lead pede pra retomar depois                                 |
| 13 | **Reativação 30 dias**            | Automação Helena (trigger temporal)                    | Lead em "Pausado" há ≥30 dias                                |

**Observação:** etapas 1-6 totalmente automatizadas pelos agentes; 7-13 manuais (Igor) — agentes apenas movem cards até "Demo agendada".

---

## 5. Etiquetas — 30 etiquetas únicas

| Categoria                  | Etiquetas (8 cat. × variável)                                                                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Origem (4)**             | `Origem_trafego_meta`, `Origem_trafego_google`, `Origem_organico`, `Origem_indicacao`                                                                      |
| **Jornada Empório (4)**    | `Atendido_loja`, `Pergunta_produto`, `Comprou_loja`, `Desistiu_loja`                                                                                       |
| **Comportamentais (4)**    | `Pergunta_IA`, `Elogiou_atendimento`, `Tem_loja_propria`, `Sem_loja`                                                                                       |
| **Jornada OTIMIZE (7)**    | `Lead_quente_OTIMIZE`, `Revelado`, `SPIN_concluido`, `Pitch_feito`, `Demo_online_agendada`, `Demo_realizada`, `Quer_presencial`                            |
| **Resultado (5)**          | `Fechou_OTIMIZE`, `Perdeu_frio`, `Perdeu_objecao`, `Sem_fit_ICP`, `Reativar_30d`                                                                            |
| **Suporte / Pós-venda (3)** | `Comprou_e_voltou`, `Reclamacao`, `Resolvido`                                                                                                              |
| **Operacional (3)**        | `Pendente_estoque`, `Aguardando_humano`, `Spam`                                                                                                            |
| **Total**                  | **30**                                                                                                                                                     |

---

## 6. Habilidades Helena necessárias

> Helena tem 9 habilidades nativas: Info Contato, Etiquetas, Transferir, Concluir, Criar Card CRM, Acionar API, Acionar Fluxo Chatbot, Alterar Campo Contato, Consultar MCP.

### 6.1 Ygor-Supervisor (orquestrador silencioso)

| Habilidade            | Uso                                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------------------- |
| Alterar Campo Contato | Setar `estagio_funil_otimize` cada msg (audit trail)                                                      |
| Etiquetas             | Aplicar `Pergunta_IA`, `Elogiou_atendimento`, `Tem_loja_propria` ao detectar trigger no texto             |
| Transferir            | **NÃO usar** — supervisor não transfere, ele roteia internamente delegando pro sub-agente filho           |

### 6.2 Ygor-Empório-Stivanelli (vendedor moda)

| Habilidade              | Uso                                                                                                      |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| Info Contato            | Ler nome / cidade / histórico                                                                            |
| Alterar Campo Contato   | `manequim`, `interesse_produto`, `nome_loja` (se cliente atacadista mencionar)                            |
| Etiquetas               | `Atendido_loja`, `Pergunta_produto`, `Comprou_loja`, `Desistiu_loja`                                     |
| Acionar Fluxo Chatbot   | Consulta Catálogo Inteligente (caminho **A** seção 3)                                                    |
| Concluir Atendimento    | Ao final da venda OU se lead sair sem responder 24h                                                      |

### 6.3 Ygor-OTIMIZE-Systems (vendedor SaaS)

| Habilidade              | Uso                                                                                                       |
| ----------------------- | --------------------------------------------------------------------------------------------------------- |
| Info Contato            | Ler dados pra personalizar pitch                                                                          |
| Alterar Campo Contato   | `tem_loja_propria`, `faturamento_mensal`, `nicho_negocio`, `reacao_revelacao`, `motivo_perda`             |
| Etiquetas               | `Revelado`, `SPIN_concluido`, `Pitch_feito`, `Demo_online_agendada`, `Sem_fit_ICP`, `Perdeu_objecao`     |
| Acionar API             | Gerar link Calendly / Google Calendar (slot demo 20 min)                                                  |
| Criar Card CRM          | Mover card pra pipeline "OTIMIZE Funil" assim que `Revelado`                                              |
| Transferir Atendimento  | Pra humano Igor quando objeção complexa OU lead pede falar com pessoa                                     |
| Concluir                | Após `Demo_online_agendada` ou `Sem_fit_ICP`                                                              |

---

## 7. Campos personalizados de contato (15 a criar)

| #  | Campo                       | Tipo                                                                                                | Setado por          |
| -- | --------------------------- | --------------------------------------------------------------------------------------------------- | ------------------- |
| 1  | `nome_loja`                  | Texto curto                                                                                         | Ygor-Empório / OTIMIZE |
| 2  | `tem_loja_propria`           | Lista (sim / não)                                                                                   | Ygor-OTIMIZE         |
| 3  | `faturamento_mensal`         | Lista (`<10k`, `10-30k`, `30-100k`, `100-300k`, `>300k`)                                            | Ygor-OTIMIZE         |
| 4  | `nicho_negocio`              | Texto curto                                                                                         | Ygor-OTIMIZE         |
| 5  | `manequim`                   | Texto curto                                                                                         | Ygor-Empório         |
| 6  | `interesse_produto`          | Texto curto                                                                                         | Ygor-Empório         |
| 7  | `motivo_handoff`             | Texto longo                                                                                         | Ygor-Supervisor      |
| 8  | `reacao_revelacao`           | Lista (verde / amarelo / vermelho)                                                                  | Ygor-OTIMIZE         |
| 9  | `estagio_funil_otimize`      | Lista (13 etapas seção 4)                                                                           | Ygor-Supervisor      |
| 10 | `data_demo`                  | Data (`YYYY-MM-DD`)                                                                                 | Ygor-OTIMIZE         |
| 11 | `data_visita_brass`          | Data (`YYYY-MM-DD`)                                                                                 | Ygor-OTIMIZE / manual |
| 12 | `motivo_perda`               | Texto longo                                                                                         | Ygor-OTIMIZE / manual |
| 13 | `pitch_apresentado`          | Lista (sim / não)                                                                                   | Ygor-OTIMIZE         |
| 14 | `origem_lead`                | Texto curto (UTM ou tag de campanha)                                                                | Ygor-Supervisor (1ª msg) |
| 15 | `pretende_demo_online`       | Lista (sim, prefere_presencial, talvez_depois, não)                                                | Ygor-OTIMIZE         |

---

## 8. Sequência de implementação (passo a passo Helena)

| Passo | Ação                                                                                       | Tempo estimado | Dependência          |
| ----- | ------------------------------------------------------------------------------------------ | -------------- | -------------------- |
| 1     | Audit Helena (já feito)                                                                    | —              | —                    |
| 2     | Criar pipeline CRM "OTIMIZE Funil" com 13 etapas (seção 4)                                 | 20 min         | Passo 1              |
| 3     | Criar 15 campos personalizados (seção 7)                                                   | 30 min         | Passo 1              |
| 4     | Criar 30 etiquetas (seção 5) — categorizar por cor                                          | 25 min         | Passo 1              |
| 5     | Subir Base de Conhecimento Empório (`base-conhecimento-emporio.md` — catálogo + políticas) | 15 min         | Passo 1              |
| 6     | Criar Ygor-Empório-Stivanelli + prompt + habilidades (seção 6.2)                           | 60 min         | Passos 3, 4, 5       |
| 7     | Criar Ygor-OTIMIZE-Systems + prompt + habilidades (seção 6.3)                              | 90 min         | Passos 3, 4          |
| 8     | Criar Ygor-Supervisor + associar como pai dos 2 sub-agentes (Helena V0.6+)                 | 45 min         | Passos 6, 7          |
| 9     | Configurar canal `(11) 97820-2286` → entrada só no Supervisor                              | 10 min         | Passo 8              |
| 10    | Executar 100 testes (seção 9) via WhatsApp Web (intervalo 60 s entre msgs)                 | 6-8 h          | Passo 9              |
| 11    | Iterar prompts conforme bugs detectados (ciclo até taxa ≥80 % aprovação)                   | 4-12 h         | Passo 10             |
| 12    | Documentar resultados + commit no repo OTIMIZE                                             | 30 min         | Passo 11             |

**Total estimado:** ~16-24 h de trabalho efetivo, distribuível em 3-5 dias.

---

## 9. Plano de 100 testes WhatsApp Web (50 Empório + 50 OTIMIZE)

> Todos os testes seguem schema: **número simulado · persona · mensagem · resposta esperada · critério de sucesso/falha**. Arquivo de execução: `agentes/simulacoes-atendimento-100.md`.

### 9.1 Empório — 30 testes cliente comum

| Grupo                                  | Qtd | Exemplo                                                                                                          |
| -------------------------------------- | --- | ---------------------------------------------------------------------------------------------------------------- |
| Saudação simples                       | 5   | "oi" / "boa tarde" / "tudo bem?" → Ygor-Empório responde com apresentação + abre conversa                        |
| Pergunta de produto (catálogo)         | 10  | "tem vestido?" / "quanto o conjunto fitness?" / "qual cor o biquini?" → consulta Catálogo, cita preço verbatim   |
| Pergunta de tamanho/manequim           | 5   | "veste 44?" → seta `manequim=44`, responde com base na ficha                                                     |
| Pergunta de pagamento/frete            | 5   | "parcela?" / "manda pra BH?" → consulta Base Conhecimento (3× sem juros, troca 7 dias)                           |
| Fechamento de venda                    | 5   | "vou querer" → coleta dados, envia checkout, etiqueta `Comprou_loja`                                              |

### 9.2 Empório — 10 edge cases

| Cenário                                | Qtd | Critério                                                                                                          |
| -------------------------------------- | --- | ----------------------------------------------------------------------------------------------------------------- |
| Áudio (transcrever)                    | 3   | Agente transcreve via Helena e responde no texto                                                                  |
| Cliente difícil / rude                  | 3   | Mantém tom cordial, não escala                                                                                    |
| Spam / link suspeito                   | 2   | Etiqueta `Spam`, conclui atendimento                                                                              |
| Lead some 24h                          | 2   | Trigger temporal `Concluir` automático                                                                            |

### 9.3 Empório — 10 testes de handoff (gatilho IA)

| Trigger no texto                       | Qtd | Resposta esperada                                                                                                 |
| -------------------------------------- | --- | ----------------------------------------------------------------------------------------------------------------- |
| "tu é IA / robô / bot?"                | 3   | Supervisor detecta → handoff Ygor-OTIMIZE → revelação positiva                                                    |
| "vocês atendem rápido demais"          | 2   | Etiqueta `Elogiou_atendimento` → handoff                                                                          |
| "tenho loja, queria isso aí"           | 3   | Etiqueta `Tem_loja_propria` → handoff direto                                                                      |
| "que sistema vocês usam?"              | 2   | Handoff imediato Ygor-OTIMIZE                                                                                     |

### 9.4 OTIMIZE — 30 testes pitch (lojista interessado)

| Etapa                                  | Qtd | Critério                                                                                                          |
| -------------------------------------- | --- | ----------------------------------------------------------------------------------------------------------------- |
| Revelação positiva aceita              | 6   | Lead responde "nossa que legal" → seta `reacao_revelacao=verde`                                                  |
| SPIN — Situação                        | 6   | Agente pergunta sobre loja atual, agente seta `nicho_negocio`                                                     |
| SPIN — Problema                        | 6   | Pergunta dor (perde venda fora do horário?)                                                                       |
| SPIN — Implicação + Necessidade        | 6   | Quantifica perda, valida desejo de solução                                                                        |
| Pitch R$597 combo + CTA demo           | 6   | Apresenta preço, gera link Calendly via `Acionar API`, etiqueta `Demo_online_agendada`                            |

### 9.5 OTIMIZE — 10 filtro ICP

| Cenário                                | Qtd | Critério                                                                                                          |
| -------------------------------------- | --- | ----------------------------------------------------------------------------------------------------------------- |
| Lead sem loja própria                  | 5   | Seta `tem_loja_propria=não`, etiqueta `Sem_fit_ICP`, encerra cordialmente                                         |
| Lead com fat. `<10k` (não ICP)         | 3   | Etiqueta `Sem_fit_ICP`, indica produto futuro                                                                     |
| Lead curioso (não decisor)             | 2   | Coleta contato decisor, encerra                                                                                   |

### 9.6 OTIMIZE — 10 objeções

| Objeção                                | Qtd | Resposta esperada                                                                                                 |
| -------------------------------------- | --- | ----------------------------------------------------------------------------------------------------------------- |
| "tá caro"                              | 3   | Compara com vendedor humano, reforça ROI; se persiste → transferir humano Igor                                    |
| "não tenho tempo agora"                | 3   | Agenda follow-up 7 dias (etiqueta `Reativar_30d` adaptada)                                                        |
| Dúvida técnica complexa                | 2   | Transferir Atendimento → Igor                                                                                     |
| Comparativo com concorrente            | 2   | Responde com diferenciais (white label, suporte BR, 24h); se aprofunda → transferir                                |

---

## 10. Critérios de aceitação (definition of done)

- [ ] 3 agentes criados e ativos na Helena (Supervisor, Empório, OTIMIZE)
- [ ] Supervisor V0.6+ roteando corretamente ≥90 % dos 100 casos de teste
- [ ] Catálogo Inteligente respondendo perguntas dos 7 produtos com **0 alucinações de preço** (verificado nos 15 testes da seção 9.1)
- [ ] Pipeline CRM "OTIMIZE Funil" criado com 13 etapas e cards sendo movidos automaticamente pelos agentes
- [ ] 30 etiquetas criadas e sendo aplicadas conforme trigger
- [ ] 15 campos personalizados criados e populados nos testes
- [ ] ≥80 dos 100 testes passando (auto-avaliados por critério explícito)
- [ ] Canal `(11) 97820-2286` configurado para entrada exclusiva no Supervisor
- [ ] Backups dos prompts versionados em `agentes/ygor-*.md` (regra Backup Antes de Modificar — CLAUDE.md)
- [ ] Documento de resultados + lições aprendidas commitado em `docs/superpowers/specs/`

---

## 11. Riscos e mitigações

| Risco                                                                          | Probabilidade | Impacto | Mitigação                                                                                                            |
| ------------------------------------------------------------------------------ | ------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| Supervisor V0.6 doc incompleta / feature não disponível no plano               | Média          | Alto    | Tentar primeiro; fallback handoff serial (`Transferir Atendimento`) já validado nos Higor antigos                    |
| Catálogo Inteligente sem integração documentada                                 | Média          | Alto    | 3 caminhos testados sequencialmente (A→B→C) seção 3                                                                  |
| WhatsApp rate limit / banimento conta nos 100 testes                            | Baixa          | Alto    | Intervalar ≥60 s entre msgs; usar número de teste diferente do produção; respeitar 80 msgs/dia/número                |
| Agente inventa preço/estoque (alucinação)                                       | Alta           | Crítico | Forçar fonte verdade Catálogo (seção 3); 15 testes específicos de preço; bloquear deploy se ≥1 alucinação detectada |
| Lead descobre IA antes da revelação (trigger handoff impreciso)                | Média          | Médio   | Lista de triggers expandida no Supervisor; teste 9.3 valida 10 variações; iterar prompt até precisão 100 %           |
| Empório vaza identidade OTIMIZE (cita preço R$597 sem ter recebido handoff)    | Baixa          | Alto    | Prompt Empório não menciona OTIMIZE; conhecimento separado por base; teste adversarial (perguntar direto)            |
| Helena indisponível durante go-live                                            | Baixa          | Crítico | Roteamento manual para Igor via número paralelo; SLA Helena white label                                              |
| Custo Helena escala com 2 sub-agentes + supervisor (~2× tokens)                | Alta           | Médio   | Monitorar uso semanal; se passar de orçamento, cair pra handoff serial                                               |

---

## 12. URLs e arquivos relacionados

| Recurso                            | Caminho / URL                                                            |
| ---------------------------------- | ------------------------------------------------------------------------ |
| Prompts dos agentes                | `agentes/ygor-emporio-stivanelli.md`, `agentes/ygor-otimize-systems.md`, `agentes/ygor-supervisor.md` |
| Base de Conhecimento Empório       | `agentes/base-conhecimento-emporio.md`                                   |
| Etiquetas + pipeline               | `agentes/etiquetas-pipeline-unificado.md`                                |
| 100 simulações pré-feitas          | `agentes/simulacoes-atendimento-100.md`                                  |
| Spec subprojeto 1 (infra LP)       | `docs/superpowers/specs/2026-05-11-subprojeto-1-infra-lp-design.md`      |
| Spec subprojeto 2 (LP refinada)    | `docs/superpowers/specs/2026-05-11-subprojeto-2-lp-refinada-design.md`   |
| Helena admin                       | https://otimize-crm.wts.chat/ai                                          |
| Helena docs                        | https://docs.flw.chat/guide                                              |

---

**Próximo passo:** revisar este design com Igor → aprovar → iniciar passo 2 (criar pipeline CRM "OTIMIZE Funil") seguindo a sequência da seção 8.
