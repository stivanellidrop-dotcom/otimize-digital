# Base de Conhecimento — Empório Stivanelli

> Versão: 1.0 — 2026-05-11
> Uso: arquivo para upload na aba **Base de Conhecimento** do agente `Ygor — Empório Stivanelli` na Helena (tipo "Arquivo" — formato MD suportado desde 23/07/2025).
> Quando o lead pergunta tamanho, tecido, preço ou política, o agente consulta este documento antes de responder.

---

## STATUS DOS DADOS (Fact-Forcing Gate)

Para evitar achismo de IA, este documento separa **CONFIRMADO** de **ESTIMATIVA**. Antes de subir essa base em produção, Igor precisa validar os campos marcados como ESTIMATIVA.

| Tipo de dado | Status | Quem confirma |
|---|---|---|
| Lista dos 7 produtos | CONFIRMADO (visto no admin Helena) | — |
| Tecidos/materiais | CONFIRMADO (admin Helena) | — |
| Faixas de preço | ESTIMATIVA — usuário pediu "confirmar com Igor depois" | Igor |
| Tamanhos típicos | ESTIMATIVA por categoria de peça (padrão moda BR) | Igor |
| Endereço Brás | CONFIRMADO no doc atual (Rua Maria Marcolina, 250) | — |
| Política de troca | CONFIRMADO via Código de Defesa do Consumidor (7 dias) | — |
| Políticas de pagamento | ESTIMATIVA baseada no padrão Brás + pedido do usuário (Pix/cartão 3x/boleto) | Igor |
| Horário humano | ESTIMATIVA (seg-sex 9h-18h, sáb 9h-14h — do doc atual) | Igor |

**Regra de uso pelo agente:** se um dado estiver com status ESTIMATIVA e o lead questionar com firmeza ("tem certeza desse preço?"), o agente NÃO inventa — ele responde "deixa eu confirmar com o time, te respondo em 2 minutos" e dispara a habilidade "Acionar API" para humano revisar.

---

## 1. Catálogo de produtos (7 itens reais — admin Helena)

### 1.1 VESTIDO FRANCINE

- **Categoria:** Vestido feminino
- **Tecido/material:** Viscolinho (mistura viscose + linho — leve, fresco, cai bem)
- **Sugestão de uso:** dia a dia, trabalho casual, almoço, brunch, evento diurno semi-formal. Não é peça de balada nem de festa noturna.
- **Faixa de preço estimada:** **R$ 79 a R$ 149** (ESTIMATIVA — confirmar com Igor)
- **Tamanhos típicos:** P, M, G, GG (numeração 36 a 46 conforme modelagem)
- **Cuidados:** lavar à mão ou máquina ciclo delicado em água fria, não usar alvejante, secar à sombra, passar em temperatura média
- **Fotos disponíveis:** SIM (várias — verificar IDs no catálogo Helena ao mostrar)
- **Cores predominantes:** confirmar no estoque
- **Diferencial de venda:** "tecido que não amassa fácil, ótimo pra mulher ocupada"

### 1.2 CONJUNTO MESCLA

- **Categoria:** Conjunto feminino (provavelmente blusa + calça ou blusa + short)
- **Tecido/material:** Moletinho (tecido leve com toque de moletom — confortável mas não pesado, ideal pra meia-estação)
- **Sugestão de uso:** look casual urbano, passeio, fim de semana, home office com videocall
- **Faixa de preço estimada:** **R$ 89 a R$ 179** (ESTIMATIVA — confirmar com Igor)
- **Tamanhos típicos:** PP, P, M, G, GG
- **Cuidados:** máquina ciclo normal, água fria ou morna, não passar diretamente sobre estampa (se houver), secar à sombra
- **Diferencial de venda:** "conforto de moletom com cara de produção arrumada"

### 1.3 BIQUÍNI ANITTA

- **Categoria:** Moda praia / verão
- **Tecido/material:** Lycra/poliamida + elastano (padrão praia)
- **Sugestão de uso:** praia, piscina, viagem litoral, eventos verão
- **Faixa de preço estimada:** **R$ 49 a R$ 89** (ESTIMATIVA — confirmar com Igor)
- **Tamanhos típicos:** P, M, G (alguns biquínis também GG)
- **Cuidados:** lavar à mão com sabão neutro, não torcer, não deixar de molho em cloro, secar à sombra (sol enfraquece a fibra)
- **Disponibilidade:** disponível (admin Helena)
- **Diferencial de venda:** "modelagem que valoriza o corpo, peça queridinha do verão"

### 1.4 CAMISETA POLO FEMININA

- **Categoria:** Top casual / esporte fino
- **Tecido/material:** Malha piquê (textura quadriculada característica da polo)
- **Sugestão de uso:** look casual elegante, trabalho informal, golf, passeio
- **Faixa de preço estimada:** **R$ 69 a R$ 119** (ESTIMATIVA — confirmar com Igor)
- **Tamanhos típicos:** P, M, G, GG
- **Cuidados:** máquina ciclo normal, água fria, não usar alvejante, passar em temperatura média do avesso
- **Diferencial de venda:** "clássico que nunca sai de moda, combina com jeans, saia, short"

### 1.5 CONJUNTO FITNESS ACADEMIA

- **Categoria:** Moda fitness / esportiva
- **Tecido/material:** Canelado (tecido com textura de canelinha, geralmente com elastano — abraça o corpo, dá suporte)
- **Sugestão de uso:** academia, treino, yoga, pilates, look athleisure
- **Faixa de preço estimada:** **R$ 99 a R$ 199** (ESTIMATIVA — confirmar com Igor)
- **Tamanhos típicos:** PP, P, M, G, GG
- **Cuidados:** lavar com peças similares (cor escura com cor escura), água fria, não usar amaciante (estraga a fibra elástica), secar à sombra
- **Diferencial de venda:** "modelagem que segura o corpo, não escorrega no treino, tecido respirável"

### 1.6 VESTIDO ALESSANDRA

- **Categoria:** Vestido feminino
- **Tecido/material:** Poliamida (fibra sintética, leve, cai bem, geralmente com leve elasticidade)
- **Sugestão de uso:** look noite, jantar, festa semi-formal, evento social
- **Faixa de preço estimada:** **R$ 99 a R$ 169** (ESTIMATIVA — confirmar com Igor)
- **Tamanhos típicos:** P, M, G, GG
- **Cuidados:** lavar à mão ou máquina ciclo delicado, água fria, não usar alvejante, secar pendurado, passar invertido em temperatura baixa
- **Diferencial de venda:** "peça com caimento de moda autoral, ótima pra ocasião especial"

### 1.7 CONJUNTO MASCULINO

- **Categoria:** Conjunto masculino (provavelmente blusa + short ou blusa + calça)
- **Tecido/material:** Moletom 3 cabos (moletom premium, mais encorpado, dura mais que moletom comum)
- **Sugestão de uso:** look casual masculino, conforto, fim de semana, viagem
- **Faixa de preço estimada:** **R$ 129 a R$ 239** (ESTIMATIVA — confirmar com Igor — produto masculino moletom 3 cabos geralmente fica nessa faixa)
- **Tamanhos típicos:** P, M, G, GG, XGG
- **Cuidados:** máquina ciclo normal, água fria ou morna, virar do avesso pra lavar (preserva estampa se houver), secar à sombra, não passar diretamente sobre estampa
- **Diferencial de venda:** "moletom 3 cabos é o mais resistente do mercado, dura anos"

---

## 2. Política de pagamento

| Forma de pagamento | Condição | Desconto |
|---|---|---|
| **Pix (à vista)** | Instantâneo, confirmação na hora | Padrão: 5% off (verificar com Igor se mantém 5% ou ajusta) |
| **Cartão de crédito** | Até **3x sem juros** (instrução desta refatoração) | Mínimo R$ 30 por parcela |
| **Boleto bancário** | À vista (compensa em 1-2 dias úteis) | Pode ter pequeno desconto (Igor confirma) |

**Conflito detectado e resolvido:** o documento atual `ygor-emporio-stivanelli.md` linha 162 menciona "Cartão até 4x sem juros". O usuário pediu nesta refatoração **"Cartão até 3x sem juros"**. Segue a instrução nova: **3x sem juros**. Igor confirma antes de subir em produção (consistência com site e redes sociais).

---

## 3. Política de envio (frete)

### Modalidades

1. **Sedex (Correios)** — envio rápido (2-5 dias úteis dependendo do CEP)
2. **Transportadora** — para pedidos volumosos ou regiões específicas, prazo varia
3. **Retirada na loja Brás** — **grátis**, no endereço físico, horário de funcionamento

### Prazos operacionais

- **Postagem:** 1 dia útil após confirmação do pagamento
- **Sedex:** 3-5 dias úteis após postagem
- **PAC:** 5-12 dias úteis após postagem (se ofertado)
- **Transportadora:** 5-15 dias úteis dependendo do destino

### Como o agente cobra frete

1. Pedir CEP da cliente
2. Consultar tabela (ou integração com API do Correios — se Igor implementar)
3. Informar valor calculado, NUNCA inventar preço
4. Se não souber o valor exato: "deixa eu calcular pelo seu CEP exato e te confirmo em 2 minutos"

---

## 4. Política de troca e devolução

### Regras gerais (padrão Brás + Código de Defesa do Consumidor)

- **Prazo:** 7 dias corridos a partir do recebimento da mercadoria (compra online — direito de arrependimento CDC art. 49)
- **Condições:** peça precisa estar com a etiqueta original, sem uso, sem manchas, sem cheiro (perfume, suor)
- **Custo da devolução por arrependimento:** frete reverso por conta do cliente OU entrega presencial na loja Brás sem custo
- **Troca por defeito:** prazo de 30 dias, custo do frete por conta do Empório Stivanelli (CDC)
- **Troca por tamanho/cor:** sujeita à disponibilidade em estoque, prazo de 7 dias

### Como o agente conduz pedido de troca

1. Confirmar dentro do prazo (data do recebimento)
2. Pedir foto da peça com etiqueta
3. Combinar logística (Correios reverso OU presencial)
4. **NÃO autorizar troca/devolução sozinho** — sempre transferir pra humano da equipe logística com etiqueta `Pos_venda_troca`

---

## 5. Horário de atendimento humano (transferência)

| Dia | Horário | Modalidade |
|---|---|---|
| Segunda a sexta | 9h às 18h | Atendimento humano disponível na loja física e WhatsApp |
| Sábado | 9h às 14h | Atendimento humano disponível (reduzido) |
| Domingo e feriado | — | Apenas agente IA. Humano retorna no próximo dia útil. |

**Endereço físico:** Rua Maria Marcolina, 250 — Galeria, Brás/SP — CEP 03028-000 (confirmado no documento atual; Igor revalida se mudou).

**Quando o agente deve transferir pra humano:**
- Pedido de troca/devolução
- Problema com pedido já enviado (extravio, atraso, dano)
- Dúvida sobre produto que NÃO está na base (estoque, variação não listada)
- Cliente irritado, reclamação séria
- Pedido de negociação fora da tabela (desconto especial, atacado, revenda)

**Mensagem de transferência sugerida:**
> "Vou te passar pra equipe agora, [nome]. Eles te respondem aqui mesmo, sem trocar de canal. Em até [X minutos no horário comercial / na manhã do próximo dia útil fora]."

---

## 6. FAQ Moda — perguntas que clientes fazem

### "Como medir meu tamanho?"

Pra peças femininas:
1. **Busto:** medir na altura mais cheia, fita justa mas não apertada
2. **Cintura:** parte mais fina do tronco (acima do umbigo)
3. **Quadril:** parte mais larga do bumbum

Tabela orientativa (varia por marca/modelo):

| Tamanho | Busto (cm) | Cintura (cm) | Quadril (cm) | Manequim aprox |
|---|---|---|---|---|
| PP | 80-84 | 60-64 | 86-90 | 34 |
| P | 84-88 | 64-68 | 90-94 | 36-38 |
| M | 88-92 | 68-72 | 94-98 | 40-42 |
| G | 92-98 | 72-78 | 98-104 | 44 |
| GG | 98-104 | 78-86 | 104-110 | 46 |

**Sempre orientar:** "se ficar entre 2 tamanhos, peça o maior — pode ajustar depois, mas peça apertada não tem jeito."

### "Quando posso trocar?"

- **Tamanho/cor:** 7 dias a partir do recebimento (peça com etiqueta, sem uso)
- **Defeito:** 30 dias
- **Arrependimento (compra online):** 7 dias (frete reverso por conta do cliente)

### "Qual o prazo de entrega?"

- **Postagem:** até 1 dia útil após pagamento confirmado
- **Sedex:** 3-5 dias úteis após postagem (depende do CEP)
- **Retirada Brás:** mesmo dia, sem custo

### "Qual a diferença entre viscolinho e poliamida?"

- **Viscolinho:** mistura natural (viscose + linho). Toque mais natural, respirável, fresco, leve. Ótimo pro calor. Pode amassar um pouco.
- **Poliamida:** fibra sintética. Cai bem, tem leve elasticidade, seca rápido, não amassa. Sensação um pouco mais "sintética" no toque.

### "Posso pagar parte no Pix e parte no cartão?"

Padrão: **uma forma de pagamento por pedido.** Para pagamento misto, transferir pra humano confirmar caso a caso.

### "Vocês mandam pro Brasil inteiro?"

Sim, via Sedex/transportadora. Custo varia por CEP.

### "Tem desconto pra primeira compra?"

(Igor confirma se quer oferecer cupom de boas-vindas. Por padrão: não inventar desconto não autorizado.)

---

## 7. Sazonalidade — o que vende em cada estação

### Verão (dezembro a março)

- **Top sellers:** Biquíni Anitta, Vestido Francine (viscolinho fresco), Conjunto Mescla (moletinho leve)
- **Estoque alto em:** moda praia, vestidos curtos/midi, conjuntos leves
- **Argumento de venda:** "tecido respirável, perfeito pro calor"

### Outono (abril a junho)

- **Top sellers:** Camiseta Polo Feminina, Vestido Alessandra (poliamida), Conjunto Mescla
- **Estoque transitório:** peças de manga longa começam a entrar
- **Argumento de venda:** "meia-estação combina leveza com leve cobertura"

### Inverno (julho a setembro)

- **Top sellers:** Conjunto Masculino (moletom 3 cabos), peças de manga longa, cardigãs
- **Estoque alto em:** moletom, peças mais quentes
- **Argumento de venda:** "moletom 3 cabos premium aquece sem pesar"

### Primavera (outubro a novembro)

- **Top sellers:** Vestido Francine, Conjunto Fitness Academia (gente voltando à malhação), Camiseta Polo
- **Argumento de venda:** "estação de retomar look colorido e cuidar do corpo pro verão"

---

## 8. Tabela rápida para o agente consultar (resumo)

| Produto | Material | Faixa preço (R$) | Tamanhos | Sazonal |
|---|---|---|---|---|
| Vestido Francine | Viscolinho | 79-149 | P/M/G/GG | Verão/Primavera |
| Conjunto Mescla | Moletinho | 89-179 | PP-GG | Meia-estação |
| Biquíni Anitta | Lycra/poliamida+elastano | 49-89 | P/M/G | Verão |
| Camiseta Polo Feminina | Malha piquê | 69-119 | P/M/G/GG | Ano todo |
| Conjunto Fitness | Canelado c/ elastano | 99-199 | PP-GG | Ano todo |
| Vestido Alessandra | Poliamida | 99-169 | P/M/G/GG | Outono/Inverno |
| Conjunto Masculino | Moletom 3 cabos | 129-239 | P-XGG | Inverno |

---

## 9. Instrução final ao agente (consumir esta base)

Ao receber uma pergunta do lead sobre PRODUTO, PREÇO, TAMANHO, MATERIAL, ENVIO ou TROCA:

1. **Consulte primeiro esta base.** A habilidade "Informações do contato" + busca em Base de Conhecimento funciona automaticamente desde V0.6+.
2. **Se a resposta está aqui:** responda direto, com clareza, sem rodeios.
3. **Se a resposta está como ESTIMATIVA e o lead questiona com firmeza:** NÃO invente. Use a fórmula "deixa eu confirmar com o time, te respondo em 2 minutos" e dispara `Acionar API` pra humano.
4. **Se a resposta NÃO está aqui (ex: peça nova, promoção da semana):** NÃO invente. Mesma fórmula acima.
5. **Sempre cite valores REAIS desta base, nunca arredonde nem dê faixa muito ampla** ("entre 50 e 200" é ruim — fala "R$ 79 a R$ 149 dependendo do modelo, te mando foto").

---

## 10. Atualização desta base

- **Frequência sugerida:** quinzenal (Igor revisa preços, estoque, peças novas).
- **Como atualizar:** editar este `.md` no repositório `OTIMIZE/agentes/`, fazer upload novamente na aba Base de Conhecimento da Helena (substitui a versão anterior).
- **Antes de subir:** validar campos ESTIMATIVA com Igor. Marcar como CONFIRMADO depois de validados.
