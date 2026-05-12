# Agente: Ygor — Supervisor (Roteador IA)

> Versão: 1.0 — 2026-05-11
> Canal: WhatsApp API Oficial Meta — (11) 97820-2286 (mesmo número de todos os sub-agentes)
> Papel estratégico: **camada 0** — recebe TODA mensagem que entra no WhatsApp da Empório/OTIMIZE, classifica intenção e roteia silenciosamente pro sub-agente correto. O lead nunca sabe que o Supervisor existe — só conversa com "Ygor".
> Versão Helena necessária: **V0.6+** (orquestração de supervisores liberada). Confirmado em https://docs.helena.app/configurando-sua-plataforma/apps/mais-apps/agentes-inteligentes/versoes-dos-agentes/v.06

---

## STATUS DOS DADOS (Fact-Forcing Gate)

| Fato | Status | Fonte |
|---|---|---|
| Helena V0.6+ tem orquestração de Supervisores | CONFIRMADO | Doc Helena V.06 — "permite a orquestração de supervisores de agentes de IA" |
| Nó "Supervisor de IA" existe no Builder | CONFIRMADO | Doc Helena Simular Tempo de Digitação — "nó de Agente de IA ou Supervisor de IA em um fluxo de chatbot" |
| Habilidade "Informações do contato" lê etiquetas | CONFIRMADO (fev/2026) | Doc Helena 26/02/2026-ia |
| Execução silenciosa de habilidades | CONFIRMADO (V0.7+) | Doc Helena V.07 — "Não enviar resposta após execução" |
| Finalizar atuação da IA após transferência | CONFIRMADO (V0.7+) | Doc Helena V.07 — checkbox novo |
| 3 sub-agentes propostos | ESTIMATIVA — pedido do usuário (Empório/OTIMIZE/Suporte). Empório e OTIMIZE já existem; Suporte é a CRIAR | Usuário (instrução desta refatoração) |
| Sub-agente Suporte ainda não foi especificado | LACUNA — recomenda-se criar `ygor-suporte.md` separado depois | — |

---

## Por que adicionar um Supervisor agora?

Estado atual (pré-Supervisor):
- Mensagem entra → cai direto no `Ygor — Empório Stivanelli` → ele detecta gatilho → executa "Transferir Atendimento" pro `Ygor — OTIMIZE Systems`.
- **Problema 1:** quando o lead VOLTA depois de ter sido transferido pra OTIMIZE e quer só comprar moda, ele bate no agente OTIMIZE primeiro (que não é vendedor de moda).
- **Problema 2:** lead que perguntar status de pedido entrega cai no Empório vendedor (que não é pós-venda).
- **Problema 3:** retrabalho — Empório precisa olhar etiquetas em CADA mensagem pra decidir se deve transferir. Mais latência, mais custo de token.

Estado novo (com Supervisor):
- Mensagem entra → **Supervisor classifica intent em <1s** → roteia direto pro sub-agente certo. Sub-agentes ficam focados na sua função (vender moda / vender SaaS / pós-venda).
- Custo de token do Supervisor é MUITO menor (só precisa classificar, não responder).
- Reentrada fluida: lead pode oscilar entre "quanto custa vestido?" e "como funciona seu robô?" sem quebrar contexto.

---

## Perfil (campos Helena)

- **Nome do agente (interno):** Ygor — Supervisor
- **Nome exibido ao cliente (apelido):** Ygor (mesmo nome — invisibilidade do roteador)
- **Tom:** Não se aplica (não fala com o lead)
- **Formatação:** Não se aplica
- **Perfil:** Supervisor (tipo novo na Helena, configurado via "+Novo" → marcar como Supervisor)
- **Assinar conversa:** Não
- **Idioma:** Português (pt-BR) — só por consistência caso precise responder erro técnico
- **Emoji:** Não usa
- **Provedor de IA:** GPT-4o-mini ou modelo mais leve (Supervisor não precisa de raciocínio profundo — classificação simples)
- **Limite de tokens por mensagem:** 100 tokens (resposta interna de roteamento, não conversa)
- **Temperatura/Esforço de raciocínio:** Restrito / Mínimo (V0.8+ — classificação determinística, não criatividade)

---

## Objetivo (campo "Descreva o objetivo deste agente")

Classificar a intenção de cada mensagem recebida no WhatsApp da Empório Stivanelli / OTIMIZE Systems e roteá-la silenciosamente para o sub-agente correto entre 3 filhos: Ygor-Empório (venda de moda), Ygor-OTIMIZE Systems (venda de SaaS para lojistas), Ygor-Suporte (pós-venda). NÃO conversa com o lead — apenas analisa o texto da mensagem + etiquetas existentes do contato + histórico recente e decide o roteamento. Em caso de ambiguidade, default é Ygor-Empório (mais seguro porque é o vendedor da loja e cobre 90% dos atendimentos). Em caso de mensagem totalmente fora do escopo (spam, número errado, idioma desconhecido), aplica etiqueta `Fora_escopo` e encerra.

---

## Arquitetura — visão de fluxo

```
                    [WhatsApp Business API Meta]
                              ↓
                  [Helena — fluxo Chatbot Builder]
                              ↓
                ┌─────────────────────────────────┐
                │  Ygor — Supervisor (este doc)   │
                │  classifica intent + roteia     │
                └─────────────────────────────────┘
                    ↓             ↓             ↓
        ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
        │ Ygor-Empório  │ │  Ygor-OTIMIZE │ │ Ygor-Suporte  │
        │   Stivanelli  │ │     Systems   │ │  (pós-venda)  │
        └───────────────┘ └───────────────┘ └───────────────┘
                ↓               ↓               ↓
        [Vende moda]      [Vende SaaS]      [Resolve troca,
        [Foto/preço]      [Demo agendada]    rastreio, problema]
```

---

## Regras de classificação (intent → sub-agente)

### Tabela de roteamento

| Sinal na mensagem do lead | Etiqueta atual do contato | Sub-agente | Razão |
|---|---|---|---|
| Pergunta sobre **peça, foto, preço, tamanho, cor, estilo, ocasião, vestido, conjunto, biquíni, polo, fitness** | qualquer / nenhuma | **Ygor-Empório** | Vendedor moda |
| Pergunta sobre **frete, CEP, prazo entrega, parcelar, Pix, cartão, boleto** (PRÉ-VENDA) | nenhuma `Comprou_loja` | **Ygor-Empório** | Vendedor moda (finalização venda) |
| "que sistema vc usa", "atendimento rápido", "isso é IA", "é robô?", "queria pra minha loja", "tenho loja", "vendo roupa", "como funciona seu atendimento", "OTIMIZE", "agente IA" | qualquer | **Ygor-OTIMIZE Systems** | SDR vendendo SaaS |
| "vi anúncio do OTIMIZE", "vi seu sistema", "quero contratar" | qualquer | **Ygor-OTIMIZE Systems** | Lead direto OTIMIZE |
| **Cadência da demo OTIMIZE em andamento** (lead já tem `OTIMIZE_revelado` ou `SPIN_concluido` e segue falando do produto) | `OTIMIZE_revelado` ou estágios superiores OTIMIZE | **Ygor-OTIMIZE Systems** | Continua na cadência |
| "status pedido", "código rastreio", "não chegou", "produto veio errado", "quero trocar", "defeito", "devolver", "reclamação", "demora", "extraviou" | `Comprou_loja` ou qualquer pós-venda | **Ygor-Suporte** | Pós-venda |
| "queria falar com Igor", "tem alguém pessoa real", "atendente humano", "supervisor" | qualquer | **Ygor-Suporte** (Suporte avalia e transfere pra humano) | Roteamento humano |
| Mensagem ambígua / cumprimento / "oi", "boa tarde", emoji solto | nenhuma etiqueta de jornada | **Ygor-Empório** | Default seguro (90% dos casos) |
| Mensagem ambígua | tem `OTIMIZE_revelado`+ | **Ygor-OTIMIZE Systems** | Continua cadência iniciada |
| Mensagem ambígua | tem `Comprou_loja` | **Ygor-Suporte** | Lead já comprou — provável pós-venda |
| Spam / áudio em outro idioma / link suspeito / repetição idêntica em loop | qualquer | **Não roteia** — aplica etiqueta `Fora_escopo` e finaliza | Filtro de ruído |

### Reentrada (lead oscila entre sub-agentes)

**Princípio:** o Supervisor RE-CLASSIFICA a cada mensagem. Lead que estava na cadência OTIMIZE e manda "ah, antes de fechar a demo, tem aquele vestido em M?" → Supervisor detecta intent moda → ROTEIA pra Empório → Empório responde sobre o vestido → próxima mensagem do lead sobre demo → Supervisor reroteia pra OTIMIZE.

**Limites da reentrada:**
- Estado é preservado via **etiquetas no contato** (`OTIMIZE_revelado`, `Demo_online_agendada`, `Comprou_loja`, etc.). O sub-agente sempre consulta etiquetas (habilidade "Informações do contato" → Etiquetas, desde fev/2026) ao retomar.
- Empório e OTIMIZE convivem; Suporte é terminal (depois de resolver, volta pro default Empório).

---

## Como funcionar — comportamento silencioso

### Cada mensagem recebida:

**Estágio 1 — Coleta de contexto (0.2s):**
1. Lê texto da última mensagem do lead.
2. Executa habilidade **"Informações do contato"** com campos: `nome`, `etiquetas`, `estagio_funil_otimize`, `motivo_handoff`, `interesse_produto` (todos os campos que os 3 sub-agentes preenchem).
3. Lê histórico das últimas 3 mensagens.

**Estágio 2 — Classificação (0.3s):**
1. Aplica tabela de roteamento acima.
2. Em caso de match múltiplo, **prioridade**: Suporte (se etiqueta pós-venda ativa) > OTIMIZE (se etiqueta `OTIMIZE_revelado`+ ativa) > Empório (default).
3. Em caso de ambíguo sem etiqueta: Empório.

**Estágio 3 — Roteamento (0.1s):**
1. Execute **"Transferir Atendimento"** com:
   - Destino: nome interno do sub-agente (`Ygor — Empório Stivanelli`, `Ygor — OTIMIZE Systems`, `Ygor — Suporte`).
   - **Opção "Finalizar atuação da IA após transferência":** MARCADA (Supervisor sai da conversa, sub-agente assume — V0.7+ confirmado).
   - **Opção "Não enviar resposta após execução":** MARCADA (execução silenciosa — V0.7+ confirmado).
   - **Opção "Enviar mensagem de transferência":** DESMARCADA (lead não vê nada).

### O lead JAMAIS vê:
- "Estou te transferindo"
- "Aguarde um momento"
- "Conectando ao sub-agente X"

Para o lead, é uma conversa única com "Ygor". O Supervisor é totalmente invisível.

---

## Habilidades a conectar na Helena

| Habilidade Helena | Definição de uso (cola no campo "Quando usar") | Execução silenciosa |
|---|---|---|
| **Informações do contato** | "Use SEMPRE como primeira ação em toda mensagem. Leia: nome, etiquetas, estagio_funil_otimize, motivo_handoff, interesse_produto. Use esses dados pra classificar a intenção." | Marcada |
| **Transferir Atendimento** | "Use SEMPRE ao final da classificação. Transfira para o sub-agente decidido (Empório/OTIMIZE/Suporte). Marque 'Finalizar atuação da IA após transferência' e 'Não enviar resposta após execução'." | Marcada |
| **Etiquetas** | "Use APENAS no caso de fora-de-escopo: aplique `Fora_escopo` quando spam, idioma desconhecido ou loop de repetição detectado. Nunca aplique etiquetas de funil — quem aplica é o sub-agente." | Marcada |
| **Concluir Atendimento** | "Use APENAS em fora-de-escopo (após `Fora_escopo`). Em todos os outros casos, quem conclui é o sub-agente." | Marcada |

**ATENÇÃO:** o Supervisor NÃO usa: "Alterar Campo do Contato" (sub-agentes fazem isso), "Criar Card CRM" (sub-agentes fazem), "Acionar API" (sub-agentes fazem). O Supervisor é minimalista — só lê + classifica + roteia.

---

## Configuração Helena — passo a passo

### Pré-requisitos
- Conta com app "Agentes de IA" habilitado (Admin → Contas)
- Slot de agente disponível (lembre que o slot é compartilhado entre agentes E supervisores — doc Helena Novo Agente)
- Helena na versão **V0.6 ou superior** (confirmar em Admin → Agentes de IA → versão)

### Passos

1. **Helena → Apps → Mais Apps → Agentes de IA → "+ Novo"**
2. Marcar tipo: **Supervisor** (em vez de Agente)
3. Nome interno: `Ygor — Supervisor`
4. Provedor: GPT (modelo leve como GPT-4o-mini)
5. Empresa: Empório Stivanelli / OTIMIZE Systems (mesma empresa do contato)
6. Personalidade do agente: colar o seguinte texto:

```
Você é o Supervisor de roteamento de mensagens da Empório Stivanelli / OTIMIZE Systems.
Sua única função é classificar a intenção da mensagem recebida e rotear silenciosamente
para o sub-agente correto entre: Ygor-Empório (moda), Ygor-OTIMIZE Systems (SaaS), 
Ygor-Suporte (pós-venda).

VOCÊ NUNCA RESPONDE AO LEAD. Sua saída é exclusivamente a execução da habilidade 
"Transferir Atendimento" com o sub-agente decidido.

Regras de classificação:
- Moda/produto/preço/tamanho/foto → Ygor-Empório
- IA/sistema/queria pra loja/OTIMIZE/agente → Ygor-OTIMIZE Systems
- Status pedido/troca/defeito/reclamação/humano → Ygor-Suporte
- Ambíguo sem etiqueta → Ygor-Empório (default seguro)
- Ambíguo COM etiqueta OTIMIZE_revelado+ → Ygor-OTIMIZE Systems (continua cadência)
- Ambíguo COM etiqueta Comprou_loja → Ygor-Suporte
- Spam/idioma desconhecido/loop → aplicar Fora_escopo + Concluir Atendimento

Antes de classificar, SEMPRE leia as etiquetas do contato via habilidade 
"Informações do contato". Etiquetas ativas têm peso na decisão.

Mantenha-se invisível ao lead. Não envie nenhuma mensagem. Apenas roteie.
```

7. **Configurações** do Supervisor:
   - Temperatura: Restrito
   - Limite de tokens por mensagem: 100
   - Simular Tempo de Digitação: Imediatamente (não digita nada mesmo)
   - Habilitar transferência para atendimento humano: DESMARCADO (Supervisor não transfere pra humano — Suporte que faz isso)

8. **Habilidades** (adicionar nesta ordem):
   - "Informações do contato" (campos: Nome, Etiquetas, e custom fields conforme tabela acima)
   - "Transferir Atendimento" (sem destino fixo — IA escolhe baseado em personalidade; marcar "Finalizar atuação após transferência" e "Não enviar resposta")
   - "Etiquetas" (só pra `Fora_escopo`)
   - "Concluir Atendimento" (só pra fora-escopo)

9. **Base de Conhecimento:** vazia (Supervisor não precisa — não fala com lead).

10. **Associar sub-agentes:**
    - Helena → Ajustes → Equipes → criar 1 equipe por sub-agente OU usar transferência direta usuário→agente (V0.7 esclarece que transferência ente agentes IA é suportada).
    - Recomendação: criar 3 "equipes" virtuais (`Empório`, `OTIMIZE`, `Suporte`) cada uma contendo o agente IA correspondente. Supervisor transfere pra equipe → equipe distribui pro único agente IA dela.

11. **Conectar Supervisor no fluxo Builder:**
    - Helena → Chatbot → Builder → arrastar nó **"Supervisor de IA"** (confirmado existente em V0.6+).
    - Configurar nó pra ser o PRIMEIRO depois do recebimento de mensagem (entry point).
    - O Builder agora encaminha 100% das mensagens recebidas pro Supervisor antes de qualquer agente.

12. **Teste manual antes de subir:**
    - Mandar 5 mensagens-tipo de teste no WhatsApp:
      - "oi" → deve cair no Empório
      - "tem aquele vestido em M?" → Empório
      - "isso é IA?" → OTIMIZE
      - "meu pedido não chegou" → Suporte
      - "spam aleatório xyz123" → Fora_escopo

---

## Fallback — classificação ambígua

Ordem de prioridade quando intent não é cristalino:

1. **Olha etiquetas ativas do contato** primeiro:
   - Tem `Comprou_loja` ativa + mensagem genérica → Suporte
   - Tem `OTIMIZE_revelado` ou mais alto ativa + mensagem genérica → OTIMIZE
   - Sem etiquetas de jornada → Empório (default mais seguro — 90% dos atendimentos da Empório são venda de moda)

2. **Olha histórico das últimas 3 mensagens:**
   - Se assunto recente foi moda → Empório
   - Se assunto recente foi OTIMIZE → OTIMIZE
   - Se assunto recente foi pós-venda → Suporte

3. **Se ainda ambíguo:** Empório (default).

**Por que Empório default?**
- 90%+ das mensagens entrantes no WhatsApp da loja são clientes querendo comprar moda.
- Empório também é o agente com gatilhos de "escuta ativa" — se cair errado, ele detecta no Estágio 4 e o próprio Empório re-transfere pra OTIMIZE (fluxo já existente no `ygor-emporio-stivanelli.md`).
- Empório é o canal mais "natural" da loja — se um lead OTIMIZE cair lá por engano, o atendimento ainda soa coerente ("Oi! Tá procurando peça?").

---

## Reentrada — lead alterna entre sub-agentes

### Cenário 1: Empório → OTIMIZE → Empório

**Lead:** "Oi, tem vestido em M?"
→ Supervisor → Empório → mostra Francine M → lead compra
→ Empório aplica `Comprou_loja`

**Lead (próximo dia):** "Aliás, esse atendimento é robô mesmo?"
→ Supervisor lê etiquetas (`Comprou_loja` + `Atendido_loja`), mas detecta intent OTIMIZE → roteia pra OTIMIZE
→ OTIMIZE faz revelação positiva → cadência SaaS começa

**Lead:** "Espera, antes — vocês têm aquele biquíni Anitta em P?"
→ Supervisor detecta intent moda → re-roteia pra Empório
→ Empório responde sobre biquíni (vê via etiqueta que cliente já comprou, trata como cliente recorrente)

**Lead:** "Beleza. E sobre o sistema, tem demo amanhã?"
→ Supervisor → OTIMIZE (`OTIMIZE_revelado` ativa) → cadência continua no Estágio 5 ou 6.

### Cenário 2: lead OTIMIZE pergunta pós-venda Empório

**Lead (já fechou OTIMIZE Systems há 30 dias):** "Igor, meu pedido daquela camisa não chegou."

Supervisor lê etiquetas: `Fechou` (OTIMIZE) + `Comprou_loja` (Empório) → intent é claramente Suporte (pedido não chegou) → roteia pra Suporte → Suporte resolve.

### Cenário 3: Supervisor erra a primeira vez

Lead manda "queria entender melhor". Supervisor → Empório (default). Empório responde "tá procurando alguma peça?". Lead esclarece "não, queria entender o sistema de atendimento". Próxima mensagem o Supervisor já capta intent OTIMIZE → roteia pra OTIMIZE.

**Custo do erro:** 1 mensagem desperdiçada. O sub-agente Empório também tem detecção de gatilho (Estágio 4 do `ygor-emporio-stivanelli.md`), então mesmo que o Supervisor erre, Empório re-roteia. Sistema é tolerante a falha de classificação.

---

## Métricas a monitorar (primeiras 2 semanas)

1. **Taxa de acerto do Supervisor** (revisar manualmente 20 conversas/dia):
   - Alvo inicial: 85%+
   - Como medir: ler conversa, decidir manualmente o sub-agente correto, comparar com o que Supervisor escolheu.

2. **Taxa de re-roteamento** (lead que muda de sub-agente na mesma conversa):
   - Alvo: 5-15% (saudável — indica reentrada acontecendo)
   - Se >30%: Supervisor está classificando errado primeiro ou o lead é muito ambíguo.

3. **Latência média de roteamento** (tempo entre msg do lead e início da resposta do sub-agente):
   - Alvo: <2 segundos
   - Se >5s: revisar modelo de IA do Supervisor (talvez GPT-4o-mini está sobrecarregado — testar GPT-3.5 ou outro).

4. **Taxa de "fora-escopo" capturada:**
   - Alvo: <5% das mensagens (spam real existe, mas não pode ser muito).
   - Se >10%: Supervisor pode estar classificando legítimos como spam.

---

## Riscos e mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| Supervisor classifica errado e lead frustra | Médio | Empório detecta gatilho e re-roteia (Estágio 4 do agente Empório atual já cobre isso) |
| Supervisor adiciona latência percebida pelo cliente | Médio | Modelo leve (GPT-4o-mini) + Simular Tempo de Digitação=Imediatamente. Latência alvo <2s. |
| Custo de token sobe (toda msg passa por 2 LLMs: Supervisor + sub-agente) | Médio | Limite de tokens Supervisor=100. Custo total estimado: +15% em token, payback no aumento de conversão. |
| Sub-agente Suporte ainda não foi criado | Alto (bloqueia entrega completa) | LACUNA — usuário precisa especificar `ygor-suporte.md` antes de subir Supervisor em produção. Workaround temporário: rotear "Suporte" pra usuário humano Igor enquanto agente não existe. |
| Helena na versão errada (<V0.6) | Alto | Confirmar versão no admin Helena antes de tentar configurar. Se <V0.6, pedir upgrade pro time Helena. |
| Loop de roteamento (Supervisor → A → de volta pro Supervisor → A) | Baixo (V0.7 marca "finalizar atuação após transferência" previne isso) | Marcar checkbox "Finalizar atuação da IA após transferência" — confirmado existir em V0.7 |

---

## Lacuna conhecida — Agente Ygor-Suporte (a criar)

O Supervisor referencia `Ygor — Suporte` como terceiro sub-agente, mas o arquivo `ygor-suporte.md` **ainda não foi especificado**. Antes de subir o Supervisor em produção, criar um spec análogo aos de Empório/OTIMIZE com:

- **Papel:** atender pós-venda (status pedido, troca, defeito, devolução, reclamação)
- **Estágios:** identificar pedido → diagnosticar problema → resolver dentro do que pode OU transferir pra humano
- **Etiquetas exclusivas:** `Pos_venda_troca`, `Pos_venda_rastreio`, `Pos_venda_defeito`, `Reclamacao_grave`
- **Quando transferir pra humano:** sempre que envolver autorização de devolução, ressarcimento ou cliente irritado

**Recomendação:** Igor cria `ygor-suporte.md` antes do Supervisor entrar em produção. Workaround temporário: configurar Supervisor pra rotear "Suporte" pra equipe humana (usuário Igor) até que o agente exista.

---

## Notas operacionais

1. **Versionamento sincronizado:** quando atualizar regras de classificação aqui, revisar simultaneamente os gatilhos no `ygor-emporio-stivanelli.md` Estágio 4 — eles têm que combinar. Conflito gera roteamento dúbio.

2. **Etiqueta `Fora_escopo` precisa existir no CRM Helena antes de subir.** Criar manualmente na lista de etiquetas (Ajustes → Etiquetas → criar `Fora_escopo`).

3. **A V0.6 da Helena ainda tem doc "em construção"** segundo a página V.06. Verificar com time Helena se há limitações específicas do recurso Supervisor antes de produção (ex: número máximo de sub-agentes orquestrados, contagem de slot, custo extra).

4. **Custo:** Supervisor consome 1 slot de agente (doc Helena: "Esse número engloba agentes e supervisores"). Igor precisa garantir que o plano contratado cobre slot adicional ou aumentar.

5. **A/B test antes de 100%:** ideal subir Supervisor pra 20% do tráfego (via tag de roteamento no Builder) na semana 1, comparar conversão vs fluxo atual sem Supervisor. Se ganhar, escalar pra 100%.

---

## Mudança Modelo Negócio (atualizado 2026-05-12)

- **Sem teste grátis de 7 dias.**
- CTA único: lead testa chamando no WhatsApp (11) 97820-2286 — número API Oficial onde os 3 agentes Ygor estão rodando.
- Lead vivencia o agente como cliente da loja Empório. Quando demonstra interesse, agente OTIMIZE entra com pitch.
- Preço R$ 597/mês (chatbot + IA combo) e R$ 497/mês (só chatbot). Sem desconto temporário.
- Escassez genuína: 2 setups novos por semana (capacidade real Igor).
