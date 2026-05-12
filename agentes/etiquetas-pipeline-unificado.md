# Etiquetas + Pipeline Unificado — Arquitetura OTIMIZE

> Versão: 1.0 — 2026-05-11
> Uso: documento de referência ÚNICO para todas as etiquetas e o pipeline CRM compartilhados entre os agentes Ygor-Supervisor, Ygor-Empório, Ygor-OTIMIZE Systems e Ygor-Suporte.
> Princípio reitor: **uma etiqueta tem UM dono e UM significado.** Não pode existir `Lead_quente_Emporio` E `Lead_quente_OTIMIZE` — duplicação é proibida.

---

## STATUS DOS DADOS (Fact-Forcing Gate)

| Fato | Status | Fonte |
|---|---|---|
| Etiquetas atuais de Empório (6 únicas) | CONFIRMADO | `ygor-emporio-stivanelli.md` linhas 89-114, 138-146 |
| Etiquetas atuais de OTIMIZE (10 únicas) | CONFIRMADO | `ygor-otimize-systems.md` linhas 76-78, 102, 126, 142, 168-170, 204, 215-216 |
| Sobreposição entre os 2 agentes | CONFIRMADO via análise — `Tem_loja_propria` é detectada por Empório e CONSUMIDA por OTIMIZE | Ambos os arquivos |
| Etiquetas de Suporte | A CRIAR — Suporte ainda não existe como agente | — |
| Helena lê etiquetas via "Informações do contato" | CONFIRMADO (fev/2026) | Doc Helena 26/02/2026-ia |
| Pipeline CRM no Helena | CONFIRMADO — existe módulo CRM com pipelines/funis customizáveis | Funcionalidade base Helena |

---

## Conflitos detectados no estado atual (a resolver agora)

### Conflito 1: `Lead_quente_OTIMIZE` é redundante
- **Onde:** `ygor-otimize-systems.md` linha 77.
- **Problema:** o próprio agente OTIMIZE já é exclusivo do funil SaaS. Aplicar uma etiqueta "Lead_quente_OTIMIZE" enquanto ele atua é redundante com a etiqueta de estágio (`OTIMIZE_revelado`). Toda etiqueta de estágio implica que o lead É um lead OTIMIZE.
- **Resolução:** ELIMINAR. Substituir por etiqueta de TEMPERATURA compartilhada: `Lead_quente`, `Lead_morno`, `Lead_frio` (categoria Comportamento, aplicável a qualquer jornada).

### Conflito 2: "Fechou" sem qualificador
- **Onde:** `ygor-otimize-systems.md` linhas 216 e 307.
- **Problema:** `Fechou` é ambíguo — fechou o quê? Compra de moda ou contrato OTIMIZE?
- **Resolução:** RENOMEAR para `Fechou_OTIMIZE` (estágio terminal do funil SaaS). Compra de moda usa `Comprou_loja` (já existe).

### Conflito 3: "Comprou_loja" como cliente recorrente
- **Onde:** `ygor-emporio-stivanelli.md` linha 142.
- **Problema:** se cliente compra 5x ao longo do ano, fica com `Comprou_loja` aplicada 5x ou só 1x? Etiqueta binária vs contador.
- **Resolução:** `Comprou_loja` é binária (aplicada uma vez, permanente). Adicionar custom field `numero_compras` no contato pra contar compras (não é etiqueta).

### Conflito 4: "Tem_loja_propria" é Comportamento OU ICP?
- **Onde:** `ygor-emporio-stivanelli.md` linha 109 (Empório aplica) e referência implícita no OTIMIZE.
- **Problema:** atualmente é só "gatilho" para handoff. Mas é também sinal de **fit ICP** OTIMIZE.
- **Resolução:** `Tem_loja_propria` vira etiqueta de CATEGORIA ICP (não Comportamento). Ela qualifica o lead pra OTIMIZE. Ainda é aplicada por Empório, mas com novo significado (ICP confirmado).

### Conflito 5: "Sem_fit_ICP" muito genérico
- **Onde:** `ygor-otimize-systems.md` linha 144.
- **Problema:** não diz POR QUE não tem fit. Sem loja? Fora do nicho? Volume insuficiente?
- **Resolução:** desdobrar em `Sem_loja`, `Fora_ICP_nicho`, `Volume_insuficiente`.

---

## Categorias de etiquetas — taxonomia

| Categoria | Para quê serve | Quantas etiquetas | Cor sugerida (UX) |
|---|---|---|---|
| **Origem** | De onde o lead veio | 3-5 | Azul |
| **Estágio** | Onde está no funil (qual jornada + qual etapa) | 8-12 | Laranja (Empório) / Roxo (OTIMIZE) / Cinza (Suporte) |
| **Comportamento** | Como o lead reagiu / o que ele fez (compartilhado entre jornadas) | 6-8 | Verde |
| **Resultado** | Estado terminal de uma jornada | 6-8 | Vermelho (perda) / Verde escuro (ganho) |
| **ICP** | Qualidade do lead pro produto OTIMIZE | 3-4 | Amarelo |

**Total alvo:** ~30-40 etiquetas únicas no sistema. Nenhuma duplicada.

---

## LISTA FINAL DE ETIQUETAS (sem duplicação)

### Categoria 1 — Origem

| Etiqueta | Quem aplica | Quando aplica | Jornada |
|---|---|---|---|
| `Origem_organica` | Supervisor (1ª msg) | Lead chegou no número do WhatsApp sem campanha paga rastreada | Compartilhada |
| `Origem_anuncio_meta` | Supervisor | Lead veio via clique em anúncio Meta (CTWA — Click to WhatsApp) | Compartilhada |
| `Origem_indicacao` | Suporte ou Humano | Lead disse que foi indicado por amigo/cliente — humano confirma | Compartilhada |
| `Origem_evento_brass` | Humano | Cliente conheceu na loja física e voltou pelo WhatsApp | Compartilhada |

**Regra:** etiqueta de Origem é aplicada UMA VEZ na primeira mensagem do lead. Imutável depois.

---

### Categoria 2 — Estágio (jornada Empório)

| Etiqueta | Quem aplica | Quando aplica | Jornada |
|---|---|---|---|
| `Atendido_loja` | Ygor-Empório | Primeira interação confirmada (Estágio 1 do agente Empório) | Empório |
| `Demonstrando_peca` | Ygor-Empório | Empório mandou foto de peça e está aguardando reação (Estágio 3) | Empório |
| `Negociando_compra` | Ygor-Empório | Cliente perguntou frete/forma de pagamento/desconto, sem fechar ainda | Empório |
| `Reservou_peca` | Ygor-Empório | Cliente pediu pra reservar peça mas ainda não pagou | Empório |

### Categoria 2 — Estágio (jornada OTIMIZE)

| Etiqueta | Quem aplica | Quando aplica | Jornada |
|---|---|---|---|
| `OTIMIZE_revelado` | Ygor-OTIMIZE | Estágio 1 do OTIMIZE — revelação positiva feita ao lead | OTIMIZE |
| `SPIN_concluido` | Ygor-OTIMIZE | Estágio 3 — SPIN respondido, dor identificada | OTIMIZE |
| `Pitch_feito` | Ygor-OTIMIZE | Estágio 4 — pitch do combo R$597 apresentado | OTIMIZE |
| `Demo_online_agendada` | Ygor-OTIMIZE | Estágio 6 — Google Meet confirmado no calendário | OTIMIZE |
| `Quer_presencial` | Ygor-OTIMIZE | Estágio 6 plano B — lead reservou visita Brás | OTIMIZE |
| `Demo_realizada` | Ygor-OTIMIZE ou Humano | Após o Google Meet acontecer (manual ou via webhook calendar) | OTIMIZE |
| `Proposta_enviada` | Humano (Igor) | Igor mandou proposta formal pós-demo | OTIMIZE |

### Categoria 2 — Estágio (jornada Suporte) — etiquetas A CRIAR

| Etiqueta | Quem aplica | Quando aplica | Jornada |
|---|---|---|---|
| `Pos_venda_rastreio` | Ygor-Suporte | Cliente perguntando status/código de rastreio | Suporte |
| `Pos_venda_troca` | Ygor-Suporte | Cliente solicitou troca por tamanho/cor/estilo | Suporte |
| `Pos_venda_defeito` | Ygor-Suporte | Cliente reportou defeito de produto | Suporte |
| `Pos_venda_atraso` | Ygor-Suporte | Cliente reclamou de atraso na entrega | Suporte |
| `Reclamacao_grave` | Ygor-Suporte | Cliente furioso, reclamação séria, risco reputacional | Suporte |

---

### Categoria 3 — Comportamento (compartilhada entre jornadas)

| Etiqueta | Quem aplica | Quando aplica | Jornada |
|---|---|---|---|
| `Pergunta_IA` | Ygor-Empório (Estágio 4) | Lead perguntou explicitamente "é robô?", "é IA?", "que sistema é esse?" | Compartilhada — qualifica pra handoff OTIMIZE |
| `Elogiou` | Ygor-Empório (Estágio 4) | Lead elogiou velocidade/qualidade do atendimento | Compartilhada — qualifica pra handoff OTIMIZE |
| `Lead_quente` | Supervisor ou agente atual | Lead respondendo rápido, várias mensagens, perguntando preço/disponibilidade — engajado | Compartilhada |
| `Lead_morno` | Supervisor ou agente atual | Lead respondendo com gaps de tempo, sem fechar nem desistir | Compartilhada |
| `Lead_frio` | Supervisor ou agente atual | Lead parou de responder OU responde monossilábico | Compartilhada |
| `Pediu_humano` | Ygor-OTIMIZE (Estágio 7) ou Ygor-Suporte | Lead pediu falar com pessoa real | Compartilhada |
| `Cliente_recorrente` | Ygor-Empório ou Humano | Lead já comprou antes (consulta `Comprou_loja` ativo + nova compra) | Empório |

**Regras de Comportamento:**
- `Lead_quente`/`Lead_morno`/`Lead_frio` são **mutuamente excludentes**. Quando uma é aplicada, as outras 2 são removidas (atualizadas a cada turn).
- `Pergunta_IA` e `Elogiou` SÃO os gatilhos para handoff Empório → OTIMIZE. Aplicação automática pelo agente Empório.

---

### Categoria 4 — Resultado (terminal de jornada)

| Etiqueta | Quem aplica | Quando aplica | Jornada |
|---|---|---|---|
| `Comprou_loja` | Ygor-Empório (Estágio 5) | Cliente fechou compra de moda | Empório (terminal positivo) |
| `Desistiu_loja` | Ygor-Empório (Estágio 5) | Cliente disse "vou pensar" / não fechou em 7 dias | Empório (terminal neutro) |
| `Fechou_OTIMIZE` | Humano (Igor) ou Ygor-OTIMIZE | Cliente fechou contrato OTIMIZE Systems | OTIMIZE (terminal positivo) |
| `Perdeu_frio_OTIMIZE` | Ygor-OTIMIZE (Estágio 2 sinal vermelho) | Lead reagiu vermelho à revelação, encerrado | OTIMIZE (terminal negativo) |
| `Perdeu_objecao_OTIMIZE` | Humano (Igor) | Lead foi pra demo mas não fechou por objeção | OTIMIZE (terminal negativo) |
| `Resolvido_suporte` | Ygor-Suporte | Problema pós-venda resolvido | Suporte (terminal positivo) |
| `Escalado_humano` | Ygor-Suporte ou Ygor-OTIMIZE | Conversa foi pra humano (Igor ou equipe) | Compartilhada |
| `Fora_escopo` | Supervisor | Spam, idioma desconhecido, loop, número errado | Compartilhada (terminal técnico) |

**Regras de Resultado:**
- Etiqueta de Resultado é APLICADA UMA VEZ e fecha a jornada daquele agente. Lead com `Comprou_loja` continua existindo no CRM mas a jornada Empório terminou.
- Lead pode ter MAIS DE UM Resultado se passou por mais de uma jornada (ex: `Comprou_loja` + `Fechou_OTIMIZE` = cliente que comprou moda E virou cliente OTIMIZE).

---

### Categoria 5 — ICP (qualificação OTIMIZE)

| Etiqueta | Quem aplica | Quando aplica | Jornada |
|---|---|---|---|
| `Tem_loja_propria` | Ygor-Empório (Estágio 4) OU Ygor-OTIMIZE (Estágio 3 SPIN) | Lead disse explicitamente que tem loja/negócio rodando vendas | ICP — qualifica pra OTIMIZE |
| `Sem_loja` | Ygor-OTIMIZE (Estágio 3) | SPIN revelou que lead NÃO tem loja nem negócio | ICP — desqualifica OTIMIZE |
| `Fora_ICP_nicho` | Ygor-OTIMIZE (Estágio 3) | Lead tem negócio mas é outro segmento sem fit (ex: prestador de serviço sem WhatsApp ativo) | ICP — desqualifica OTIMIZE |
| `Volume_insuficiente` | Ygor-OTIMIZE ou Humano | Lead tem loja mas faturamento muito baixo (<R$ 10k/mês), payback ruim | ICP — desqualifica OTIMIZE temporariamente |

**Regras de ICP:**
- Etiqueta ICP é **persistente** no contato. Se lead vira "Tem_loja_propria" e depois fechou a loja, humano remove manualmente.
- `Tem_loja_propria` é o GATILHO mais forte pra OTIMIZE. Pode ser aplicada AINDA NO EMPÓRIO se a cliente mencionar no Estágio 4 do agente Empório.
- `Sem_loja` + `Fora_ICP_nicho` + `Volume_insuficiente` são mutuamente excludentes. Lead tem 1 só dessas 3.

---

## Comparação ANTES → DEPOIS

| Etiqueta antiga (com problema) | Onde estava | Nova etiqueta | Mudança |
|---|---|---|---|
| `Lead_quente_OTIMIZE` | OTIMIZE doc | `Lead_quente` | Removeu sufixo, virou Comportamento compartilhado |
| `Fechou` | OTIMIZE doc | `Fechou_OTIMIZE` | Qualificada com produto |
| `Sem_fit_ICP` | OTIMIZE doc | `Sem_loja` / `Fora_ICP_nicho` / `Volume_insuficiente` | Desdobrada em 3 motivos específicos |
| `Tem_loja_propria` | Empório doc (gatilho) | `Tem_loja_propria` | Mantida, mas RE-CATEGORIZADA como ICP (não Comportamento) |
| `Perdeu_frio` | OTIMIZE doc | `Perdeu_frio_OTIMIZE` | Qualificada com produto |
| `Precisa_humano` | OTIMIZE doc | `Pediu_humano` (comportamento) + `Escalado_humano` (resultado) | Separada em 2 momentos distintos |

---

## Pipeline CRM único: "OTIMIZE Funil"

O Igor opera **UM funil** que abriga as 3 jornadas (Empório, OTIMIZE Systems, Suporte). Cards entram no funil quando lead chega; movem entre etapas conforme etiquetas vão sendo aplicadas; saem do funil quando uma etiqueta de Resultado aciona estado terminal.

### Etapas do pipeline (ordem)

```
ETAPA 1  — "Novo lead chegou"
ETAPA 2  — "Em atendimento moda" (jornada Empório ativa)
ETAPA 3  — "Comprou moda" (terminal Empório positivo)
ETAPA 4  — "Desistiu moda" (terminal Empório neutro)
ETAPA 5  — "Em qualificação OTIMIZE" (handoff disparado, Estágios 1-3 OTIMIZE)
ETAPA 6  — "Demo agendada" (Estágio 6 OTIMIZE concluído)
ETAPA 7  — "Demo realizada"
ETAPA 8  — "Proposta enviada"
ETAPA 9  — "Cliente OTIMIZE fechado" (terminal OTIMIZE positivo)
ETAPA 10 — "Perdeu OTIMIZE" (terminal OTIMIZE negativo)
ETAPA 11 — "Em pós-venda" (jornada Suporte ativa)
ETAPA 12 — "Pós-venda resolvido" (terminal Suporte)
ETAPA 13 — "Fora de escopo" (terminal técnico)
```

### Tabela de transição — qual etiqueta move o card

| De → Para | Etiqueta-gatilho | Quem aciona |
|---|---|---|
| (criação do card) → ETAPA 1 | Lead manda 1ª msg → Supervisor aplica `Origem_*` | Supervisor |
| ETAPA 1 → ETAPA 2 | `Atendido_loja` aplicada | Ygor-Empório |
| ETAPA 2 → ETAPA 3 | `Comprou_loja` aplicada | Ygor-Empório |
| ETAPA 2 → ETAPA 4 | `Desistiu_loja` aplicada | Ygor-Empório |
| ETAPA 2 → ETAPA 5 | `Pergunta_IA` OU `Elogiou` OU `Tem_loja_propria` aplicada | Ygor-Empório (gatilho de handoff) |
| ETAPA 5 → ETAPA 6 | `Demo_online_agendada` OU `Quer_presencial` aplicada | Ygor-OTIMIZE |
| ETAPA 5 → ETAPA 10 | `Perdeu_frio_OTIMIZE` OU `Sem_loja` OU `Fora_ICP_nicho` OU `Volume_insuficiente` aplicada | Ygor-OTIMIZE |
| ETAPA 6 → ETAPA 7 | `Demo_realizada` aplicada | Humano ou webhook calendar |
| ETAPA 7 → ETAPA 8 | `Proposta_enviada` aplicada | Humano (Igor) |
| ETAPA 8 → ETAPA 9 | `Fechou_OTIMIZE` aplicada | Humano (Igor) |
| ETAPA 8 → ETAPA 10 | `Perdeu_objecao_OTIMIZE` aplicada | Humano (Igor) |
| Qualquer → ETAPA 11 | Etiqueta `Pos_venda_*` aplicada | Ygor-Suporte |
| ETAPA 11 → ETAPA 12 | `Resolvido_suporte` aplicada | Ygor-Suporte |
| ETAPA 11 → terminal | `Reclamacao_grave` aplicada → escalada humana | Ygor-Suporte → Humano |
| Qualquer → ETAPA 13 | `Fora_escopo` aplicada | Supervisor |

### Reentrada no pipeline

Um lead pode percorrer múltiplas etapas em ciclos:

**Cenário ideal (sonho do Igor):**
1. Lead chega via anúncio → ETAPA 1 (`Origem_anuncio_meta`)
2. Empório atende → ETAPA 2 (`Atendido_loja`)
3. Cliente compra biquíni → ETAPA 3 (`Comprou_loja`)
4. Mês seguinte, mesma cliente volta perguntando "que sistema é esse?" → Supervisor roteia OTIMIZE → ETAPA 5 (`OTIMIZE_revelado`)
5. Cliente é dona de loja → ETAPA 5 segue com `Tem_loja_propria` + `SPIN_concluido`
6. Demo agendada → ETAPA 6
7. Demo realizada → ETAPA 7
8. Fechou contrato → ETAPA 9 (`Fechou_OTIMIZE`)
9. 60 dias depois, mesma pessoa pede troca da blusa que comprou na ETAPA 3 → ETAPA 11 (`Pos_venda_troca`)
10. Resolvido → ETAPA 12

**Card único do contato passa por:** 1 → 2 → 3 → 5 → 6 → 7 → 9 → 11 → 12. Histórico completo preservado.

---

## Regras DE-DUPLICAÇÃO — princípios reiterados

1. **Nome único por significado.** Se duas equipes pensaram em criar etiquetas com mesmo conceito, MERGEAR antes de criar (ex: `Lead_quente_X` + `Lead_quente_Y` → `Lead_quente`).
2. **Sufixo `_OTIMIZE` só em RESULTADO terminal OTIMIZE** (`Fechou_OTIMIZE`, `Perdeu_frio_OTIMIZE`, `Perdeu_objecao_OTIMIZE`). Outras etiquetas OTIMIZE de estágio NÃO levam sufixo porque já são exclusivas da jornada (`OTIMIZE_revelado` é único, não precisa de redundância).
3. **Sufixo `_loja` SÓ no Empório terminal** (`Comprou_loja`, `Desistiu_loja`, `Atendido_loja`).
4. **Sufixo `Pos_venda_` SÓ no Suporte estágio** (`Pos_venda_troca`, `Pos_venda_rastreio` etc.).
5. **Comportamento NUNCA tem sufixo de jornada** (`Lead_quente`, `Elogiou`, `Pergunta_IA` etc. são jornada-agnósticas).
6. **ICP é jornada-agnóstica mas semanticamente OTIMIZE** (porque ICP avalia fit pro produto SaaS).

---

## Implementação na Helena — passo a passo

### Pré-requisitos
- Acesso admin Helena
- Pipeline "OTIMIZE Funil" não existe ainda? Criar do zero. Existe? Renomear/reestruturar.

### Etapa A — Limpar etiquetas legadas

1. Helena → Ajustes → Etiquetas
2. Listar todas as etiquetas atualmente em uso. Identificar:
   - `Lead_quente_OTIMIZE` → renomear para `Lead_quente`
   - `Fechou` → renomear para `Fechou_OTIMIZE`
   - `Sem_fit_ICP` → não dá pra renomear pra 3 etiquetas, então: criar as 3 novas (`Sem_loja`, `Fora_ICP_nicho`, `Volume_insuficiente`) e remigrar contatos que tinham `Sem_fit_ICP` (Igor avalia caso a caso ou marca todos como `Sem_loja` default)
   - `Perdeu_frio` → renomear para `Perdeu_frio_OTIMIZE`
   - `Precisa_humano` → renomear para `Pediu_humano`

### Etapa B — Criar etiquetas novas

Criar (Ajustes → Etiquetas → +) todas as etiquetas listadas neste documento que ainda NÃO existem. Aplicar a cor sugerida da categoria.

### Etapa C — Criar/reestruturar pipeline

1. Helena → CRM → Pipelines → criar "OTIMIZE Funil"
2. Adicionar 13 etapas na ordem listada acima
3. Para cada etapa, configurar automações de movimento via "se etiqueta X for aplicada → mover card pra etapa Y" (se Helena suporta — verificar) OU mover manualmente nas primeiras semanas

### Etapa D — Atualizar definições de uso dos agentes

Os 3 agentes (Empório, OTIMIZE, Supervisor — e o futuro Suporte) precisam ter suas habilidades **Etiquetas** atualizadas pra apontar pras etiquetas NOVAS. Editar:
- `ygor-emporio-stivanelli.md` linhas 138-146 — substituir etiquetas antigas pela nova taxonomia; alinhar com lista deste doc
- `ygor-otimize-systems.md` linhas 215-216 — atualizar tags conforme nova taxonomia (`Lead_quente_OTIMIZE` → `Lead_quente`; `Fechou` → `Fechou_OTIMIZE`; `Sem_fit_ICP` → 3 etiquetas novas; etc.)
- `ygor-supervisor.md` — já criado com a taxonomia nova

### Etapa E — Validação

1. Mandar 5 mensagens-teste no WhatsApp simulando jornadas diferentes
2. Verificar no CRM que os cards estão movendo entre etapas corretamente conforme etiquetas
3. Auditar que NÃO surgiu nenhuma etiqueta legada (orphan) — todas as aplicadas devem estar na lista deste documento

---

## Riscos e mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| Esquecer de migrar etiqueta legada e ficar contato com tag órfã | Médio | Antes de subir, Igor exporta lista de etiquetas atuais e marca quais estão fora deste doc — essas precisam migrar ou ser deletadas |
| Sub-agente Suporte ainda não existe — etiquetas `Pos_venda_*` ficam sem dono | Alto (bloqueia parte do pipeline) | LACUNA — recomendar Igor criar `ygor-suporte.md` na próxima iteração; até lá, etiquetas `Pos_venda_*` aplicadas manualmente por humano |
| Helena não suporta automação "etiqueta → mover card pra etapa" | Médio | Verificar feature no admin. Se não suporta, movimentação manual nas primeiras 2 semanas (Igor revisa diariamente) |
| Lead em jornada antiga (sem nova taxonomia) gera relatório bagunçado | Baixo | Igor decide cutoff: contatos pré-migração mantêm tags antigas, pós-migração usam novas. Relatório separado por período. |
| Excesso de etiquetas (>40) confunde operador humano | Baixo | Limite atual: ~39 etiquetas únicas. Manter teto |

---

## Conformidade com o princípio do usuário

> Citação verbatim: "As funcionalidades, as etiquetas não podem se repetir"

**Validação:**

- **Sem `Lead_quente_Emporio` + `Lead_quente_OTIMIZE`:** unificado em `Lead_quente` único.
- **Sem `Comprou_X` + `Cliente_X`:** `Comprou_loja` é o único terminal positivo Empório.
- **Sem `Sem_fit` + `Fora_ICP` + `Sem_loja`:** desdobrado em 3 etiquetas distintas com motivos específicos.
- **Sem `Transferiu_humano` + `Atendente_humano` + `Foi_pra_humano`:** unificado em `Pediu_humano` (comportamento) + `Escalado_humano` (resultado).
- **Comportamento jornada-agnóstico:** `Pergunta_IA`, `Elogiou`, `Lead_quente`, `Lead_morno`, `Lead_frio` — todas sem sufixo de produto.

**Conformidade ICP:**
- `Tem_loja_propria` | `Sem_loja` | `Fora_ICP_nicho` | `Volume_insuficiente` — taxonomia exata pedida pelo usuário.

---

## Manutenção contínua

- **Revisão mensal:** Igor abre este doc, compara com etiquetas reais aplicadas no Helena. Se aparecerem etiquetas NOVAS não listadas aqui, decidir: (a) incluir no doc oficial, (b) deletar do CRM por ter sido criada erroneamente.
- **Versionamento:** quando este doc subir pra v1.1, atualizar a referência nos `ygor-*.md` correspondentes.
- **Auditoria de duplicação:** trimestralmente, fazer query no CRM Helena listando etiquetas que aparecem em <5 contatos — geralmente são órfãs ou foram aplicadas por engano.

---

## Tabela-resumo final (todas as 39 etiquetas)

```
Origem (4):
  Origem_organica, Origem_anuncio_meta, Origem_indicacao, Origem_evento_brass

Estágio Empório (4):
  Atendido_loja, Demonstrando_peca, Negociando_compra, Reservou_peca

Estágio OTIMIZE (7):
  OTIMIZE_revelado, SPIN_concluido, Pitch_feito, Demo_online_agendada,
  Quer_presencial, Demo_realizada, Proposta_enviada

Estágio Suporte (5):
  Pos_venda_rastreio, Pos_venda_troca, Pos_venda_defeito,
  Pos_venda_atraso, Reclamacao_grave

Comportamento (7):
  Pergunta_IA, Elogiou, Lead_quente, Lead_morno, Lead_frio,
  Pediu_humano, Cliente_recorrente

Resultado (8):
  Comprou_loja, Desistiu_loja, Fechou_OTIMIZE, Perdeu_frio_OTIMIZE,
  Perdeu_objecao_OTIMIZE, Resolvido_suporte, Escalado_humano, Fora_escopo

ICP (4):
  Tem_loja_propria, Sem_loja, Fora_ICP_nicho, Volume_insuficiente

TOTAL: 39 etiquetas únicas, zero duplicação semântica.
```

---

## Mudança Modelo Negócio (atualizado 2026-05-12)

- **Sem teste grátis de 7 dias.**
- CTA único: lead testa chamando no WhatsApp (11) 97820-2286 — número API Oficial onde os 3 agentes Ygor estão rodando.
- Lead vivencia o agente como cliente da loja Empório. Quando demonstra interesse, agente OTIMIZE entra com pitch.
- Preço R$ 597/mês (chatbot + IA combo) e R$ 497/mês (só chatbot). Sem desconto temporário.
- Escassez genuína: 2 setups novos por semana (capacidade real Igor).
