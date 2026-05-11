# 100 Simulações de Atendimento — Agentes Ygor

> Versão: 1.0 — 2026-05-11
> Objetivo: stress-test dos agentes Ygor (Empório Stivanelli + OTIMIZE Systems) com 100 cenários reais que vão chegar pelo número (11) 97820-2286.
> Uso: validar prompts, identificar gaps, treinar handoff, calibrar gatilhos. Documento companheiro de `ygor-emporio-stivanelli.md`, `ygor-otimize-systems.md` e `base-conhecimento-emporio.md`.

---

## Aviso sobre dados de preço

Faixas de preço usadas nas simulações são **ESTIMATIVAS** alinhadas com `base-conhecimento-emporio.md` (status: a confirmar com Igor). Quando o lead questionar firmeza, o agente NÃO inventa — usa a fórmula "deixa eu confirmar com o time, te respondo em 2 minutos" e dispara **Acionar API** para humano (ver `base-conhecimento-emporio.md` seção 9). Cartão: **3x sem juros** (instrução vigente, consolidada na base de conhecimento — sobrepõe os "4x" do prompt antigo).

---

## Sumário

- **Bloco 1 — Cliente comum moda Empório (40 simulações):** Sim #1 a #40
- **Bloco 2 — Lojistas interessados em OTIMIZE (30 simulações):** Sim #41 a #70
- **Bloco 3 — Outros nichos (15 simulações):** Sim #71 a #85
- **Bloco 4 — Casos limites / edge cases (15 simulações):** Sim #86 a #100
- **Relatório executivo** ao final

---

# BLOCO 1 — Cliente comum moda Empório (Sim #1-40)

---

### Sim #1 — Pergunta de tamanho seca
**Origem:** tráfego pago Instagram (anúncio Vestido Francine)
**Persona:** Mariana, 28a, moradora Tatuapé, primeira compra
**Mensagem do lead:**
> "tem M?"

**Resposta IDEAL do Ygor (Empório):**
> "Oi! Aqui é o Ygor, do Empório Stivanelli. Tem sim — o M tá disponível em várias peças. Você tá olhando qual? Me manda o print ou o nome que eu te confirmo cor e prazo."

**Habilidades acionadas:**
- Etiquetas — aplicar `Atendido_loja` (primeira interação, conforme prompt Empório linha 142)
- Alterar Campo do Contato — gravar nome quando ela responder

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Sondagem (Estágio 2) — descobrir qual peça e fechar a venda.

**Por que essa resposta funciona:**
Responde direto (sim, tem), gera reciprocidade pedindo print, conduz pra próxima etapa sem soar robótico.

---

### Sim #2 — Pergunta de tamanho com peça nomeada
**Origem:** orgânico, lead salvou número da bio
**Persona:** Camila, 31a, mãe, vai pra casamento
**Mensagem do lead:**
> "oi, tem o vestido francine no tamanho 42?"

**Resposta IDEAL do Ygor (Empório):**
> "Oi! Aqui é o Ygor, do Empório Stivanelli. O Francine no manequim 42 (G na nossa modelagem) costuma ter disponível — deixa eu confirmar a cor com você. Quer preto, off white ou estampa? Te mando foto e valor exato."

**Habilidades acionadas:**
- Alterar Campo do Contato — `interesse_produto = Vestido Francine 42`
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Demonstração (Estágio 3) — enviar foto da cor escolhida, falar preço da base (R$ 79-149) com valor exato pós-consulta.

**Por que essa resposta funciona:**
Confirma disponibilidade sem inventar cor específica, traduz manequim 42 → tamanho G (educar), CTA suave por cor.

---

### Sim #3 — "Manda foto do vestido"
**Origem:** tráfego pago Facebook
**Persona:** Jéssica, 24a, estudante moda
**Mensagem do lead:**
> "manda foto do vestido por favor"

**Resposta IDEAL do Ygor (Empório):**
> "Oi! Ygor aqui do Empório Stivanelli. Qual vestido você viu? Manda print ou nome (Francine ou Alessandra são os mais pedidos) que te mando foto, preço e tamanhos."

**Habilidades acionadas:**
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Sondagem — identificar qual peça.

**Por que essa resposta funciona:**
Lead chegou sem contexto. Em vez de mandar catálogo aleatório (queima janela 24h e contexto), pede âncora pra entregar o que ele realmente quer.

---

### Sim #4 — Quer ver mais cores
**Origem:** continuação Sim #2
**Persona:** Camila
**Mensagem do lead:**
> "queria ver mais cores além das três que vc mandou"

**Resposta IDEAL do Ygor (Empório):**
> "Deixa eu confirmar com o time as cores do Francine que tão no estoque agora — te respondo em 2 minutos. Se preferir, o Alessandra (poliamida, caimento de noite) costuma ter mais cores. Quer ver?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `preferencia_cor = busca variedade`
- Acionar API — pingar humano pra checar estoque cor (não inventa)

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Demonstração — Alessandra como alternativa.

**Por que essa resposta funciona:**
Honesto (consulta humano antes de listar cor), abre cross-sell com produto adjacente do catálogo (`base-conhecimento` 1.6), mantém lead engajado.

---

### Sim #5 — "Qual o preço?"
**Origem:** tráfego pago
**Persona:** Renata, 35a, primeira compra
**Mensagem do lead:**
> "qual o preço?"

**Resposta IDEAL do Ygor (Empório):**
> "Oi! Ygor do Empório Stivanelli. Preço varia por peça — biquíni começa em R$ 49, vestido entre R$ 79 e R$ 169, conjunto masculino até R$ 239. Qual você tá olhando? Te passo valor exato com Pix e parcelamento."

**Habilidades acionadas:**
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Sondagem.

**Por que essa resposta funciona:**
Dá faixa real (`base-conhecimento` seção 8), evita assustar com valor único, pede pra identificar a peça. Faixas vêm da tabela ESTIMATIVA — se questionarem firmeza, agente aciona humano (regra base de conhecimento seção 9).

---

### Sim #6 — "Tem desconto?"
**Origem:** indicação
**Persona:** Bruna, 29a, recorrente
**Mensagem do lead:**
> "tem desconto se eu levar 2?"

**Resposta IDEAL do Ygor (Empório):**
> "Oi! Ygor do Empório Stivanelli. No Pix já tem 5% off em qualquer peça à vista. Pra desconto adicional em 2 peças, deixa eu confirmar com o time — me fala quais peças e eu te respondo em 2 minutos."

**Habilidades acionadas:**
- Acionar API — checar com humano se há política de bundle
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Demonstração — calcular bundle real.

**Por que essa resposta funciona:**
Não inventa desconto fixo (regra prompt Empório linha 80), ancora no Pix oficial (`base-conhecimento` 2), escala pra humano se precisa benefício extra.

---

### Sim #7 — Pix ou parcelado?
**Origem:** tráfego pago
**Persona:** Aline, 32a
**Mensagem do lead:**
> "aceita pix? parcela?"

**Resposta IDEAL do Ygor (Empório):**
> "Aceito sim, Aline! Pix com 5% off à vista, OU cartão em até 3x sem juros (mínimo R$ 30 por parcela). Qual prefere? E qual peça você tá querendo?"

**Habilidades acionadas:**
- Alterar Campo do Contato — gravar nome
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Sondagem.

**Por que essa resposta funciona:**
Responde as duas perguntas em uma frase. Usa **3x** (instrução vigente em `base-conhecimento` 2.10) — não 4x do prompt antigo. Fecha com pergunta dupla pra encurtar funil.

---

### Sim #8 — Urgência casamento sábado
**Origem:** tráfego pago, lead com prazo
**Persona:** Larissa, 27a, padrinha casamento
**Mensagem do lead:**
> "preciso pra sábado, vai dar tempo?"

**Resposta IDEAL do Ygor (Empório):**
> "Vamos ver, Larissa. Hoje é segunda — se fechar até amanhã 16h, posto quarta e o Sedex chega quinta/sexta pra maior parte do Brasil. Me passa seu CEP que eu confirmo o prazo certinho. Qual vestido?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `urgencia = alta`, `evento = casamento sabado`
- Etiquetas — `Atendido_loja`, criar `Urgente`

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Urgente`

**Próximo estágio:**
CEP → validar prazo → demonstração → fechar rápido.

**Por que essa resposta funciona:**
Reconhece urgência, cria mini-deadline real ("amanhã 16h"), pede CEP. Prazo é o oficial (`base-conhecimento` 3 — Sedex 3-5 dias).

---

### Sim #9 — "Tô grávida, sirve?"
**Origem:** tráfego pago
**Persona:** Patrícia, 30a, 6 meses gestação
**Mensagem do lead:**
> "to gravida de 6 meses, esse vestido francine serve?"

**Resposta IDEAL do Ygor (Empório):**
> "Que delícia! O Francine é viscolinho, que cede bem no corpo (`base-conhecimento`). Pra 6 meses, geralmente vale subir 1 tamanho do que você usava antes. Você usava qual normalmente? Te indico a numeração."

**Habilidades acionadas:**
- Alterar Campo do Contato — `contexto = gestante 6m`
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Sondagem manequim → demonstração.

**Por que essa resposta funciona:**
Acolhe ("que delícia"), explica tecido (viscolinho cede — info real da base), orientação prática, pergunta manequim.

---

### Sim #10 — Conjunto pra praia
**Origem:** tráfego pago (Biquíni Anitta)
**Persona:** Stéfanie, 22a, vai pra Bahia
**Mensagem do lead:**
> "vou pra praia em fevereiro, qual conjunto sugere?"

**Resposta IDEAL do Ygor (Empório):**
> "Fevereiro na Bahia é cheia praia! Sugiro Biquíni Anitta (lycra+elastano que aguenta sol e mar) — faixa R$ 49 a R$ 89. E o Conjunto Mescla moletinho pra pós-praia, fresquinho. Você prefere mais minimalista ou colorido?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `ocasiao = praia`, `interesse_produto = biquini`
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Demonstração.

**Por que essa resposta funciona:**
Linguagem casual, oferece combo (biquíni + saída praia — `base-conhecimento` 1.2 e 1.3), pergunta de estilo. Preço-faixa direto da base.

---

### Sim #11 — Presente pra mãe 50 anos
**Origem:** tráfego pago, lead masculino comprando pra mãe
**Persona:** Lucas, 32a, busca presente Dia das Mães
**Mensagem do lead:**
> "queria um presente pra minha mae fazer 50 anos, ela é elegante mas nao gosta de muito decote"

**Resposta IDEAL do Ygor (Empório):**
> "Bonito da sua parte, Lucas. Pra esse perfil sugiro: Vestido Alessandra em poliamida (caimento sóbrio, ótimo pra evento) ou Conjunto Mescla em tom neutro. Os dois são elegantes sem decote profundo. Qual numeração ela usa? Te mando foto."

**Habilidades acionadas:**
- Alterar Campo do Contato — `comprando_para = mae`, `ocasiao = aniv 50`, `restricoes = sem decote`
- Etiquetas — `Atendido_loja`, `Presente`

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Presente`

**Próximo estágio:**
Demonstração de 2 opções curadas.

**Por que essa resposta funciona:**
Valida o gesto, traduz brief em peças do catálogo real (`base-conhecimento` 1.2 e 1.6), oferece 2 (não 5), pede manequim.

---

### Sim #12 — Diferença de tecidos
**Origem:** orgânico
**Persona:** Sara, 26a, primeira compra
**Mensagem do lead:**
> "qual a diferença de viscolinho pra moletinho?"

**Resposta IDEAL do Ygor (Empório):**
> "Boa pergunta! Viscolinho é viscose+linho, mais fluido, ótimo pra vestido e clima quente. Moletinho é mais felpudo por dentro, conforto de meia-estação, ideal pra conjunto casual. Qual ocasião você tá pensando?"

**Habilidades acionadas:**
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Sondagem ocasião.

**Por que essa resposta funciona:**
Educa direto da base (`base-conhecimento` 6 FAQ), conecta cada tecido a uma ocasião, devolve pergunta.

---

### Sim #13 — Entrega em cidade pequena
**Origem:** tráfego pago
**Persona:** Renata, 40a, mora em Pedreira/MG
**Mensagem do lead:**
> "vcs entregam em pedreira minas gerais?"

**Resposta IDEAL do Ygor (Empório):**
> "Entregamos sim, Renata! Mandamos Brasil inteiro via Sedex ou transportadora. Me passa seu CEP que eu calculo o frete exato e o prazo. Qual peça você tá querendo?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `cidade = Pedreira/MG`
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
CEP → calcular → demonstração.

**Por que essa resposta funciona:**
Confirma direto (`base-conhecimento` 3 e FAQ 6), pede dado concreto, avança a venda na mesma frase.

---

### Sim #14 — Tem loja física?
**Origem:** orgânico
**Persona:** Vivian, 33a, mora em SP capital
**Mensagem do lead:**
> "vcs tem loja fisica pra eu provar?"

**Resposta IDEAL do Ygor (Empório):**
> "Temos sim! Rua Maria Marcolina, 250, galeria do Brás. Funciona de segunda a sexta 9-18h, sábado 9-14h. Pode passar tranquila pra provar. Quer que eu separe alguma peça antes de você chegar?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `quer_loja_fisica = sim`
- Etiquetas — `Atendido_loja`, `Loja_fisica`

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Loja_fisica`

**Próximo estágio:**
Reservar peças pra prova presencial.

**Por que essa resposta funciona:**
Endereço completo da base, horário oficial, propõe pré-separação (compromisso suave).

---

### Sim #15 — Como cuida do tecido
**Origem:** continuação pós-compra
**Persona:** Sara, 26a
**Mensagem do lead:**
> "como que lava esse viscolinho? pode maquina?"

**Resposta IDEAL do Ygor (Empório):**
> "Pode máquina sim! Ciclo delicado, água fria, sem alvejante. Secar à sombra (evita marca). Passar em temperatura média. Dura muito mais tempo assim."

**Habilidades acionadas:**
- Etiquetas — `Atendido_loja`, `Pos_venda`

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Pos_venda`

**Próximo estágio:**
Encerramento — perguntar se entrou no grupo VIP.

**Por que essa resposta funciona:**
Instrução técnica direta da base (`base-conhecimento` 1.1 cuidados), gera confiança pra próxima compra.

---

### Sim #16 — Tem catálogo completo?
**Origem:** tráfego pago
**Persona:** Mônica, 36a, lojista que ainda não revelou
**Mensagem do lead:**
> "voces tem catalogo completo pra eu ver?"

**Resposta IDEAL do Ygor (Empório):**
> "Tenho sim! Posso te mandar por categoria (vestido, conjunto, fitness, biquíni). Você prefere começar por qual? E tá pensando em alguma ocasião?"

**Habilidades acionadas:**
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Sondagem — categoria + ocasião. *Atenção:* "catálogo completo" pode sinalizar revendedora — monitorar Estágio 4 gatilho.

**Por que essa resposta funciona:**
Não despeja 100 fotos (queima contexto), segmenta por interesse real.

---

### Sim #17 — Peça da influencer
**Origem:** tráfego pago Reels
**Persona:** Yasmin, 23a, viu nos Stories
**Mensagem do lead:**
> "vi a Bianca Andrade usando um vestido azul desses, vcs tem?"

**Resposta IDEAL do Ygor (Empório):**
> "Oi! O que ela usou tem caimento bem parecido com nosso Alessandra (poliamida, modelagem autoral). Deixa eu confirmar com o time se temos azul no estoque agora — te respondo em 2 minutos com foto."

**Habilidades acionadas:**
- Alterar Campo do Contato — `origem = social_influencer`
- Acionar API — checar estoque azul
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Demonstração quando estoque confirmado.

**Por que essa resposta funciona:**
Reconhece referência social, traduz pra peça do catálogo (`base-conhecimento` 1.6), não inventa cor disponível (escala humano).

---

### Sim #18 — Quer provar antes
**Origem:** orgânico
**Persona:** Cláudia, 41a
**Mensagem do lead:**
> "queria provar antes de comprar"

**Resposta IDEAL do Ygor (Empório):**
> "Tranquilo! Duas opções: 1) passa na loja física no Brás (rua Maria Marcolina, 250) e prova, 2) compra online com 7 dias pra trocar se não servir (CDC). Qual fica melhor?"

**Habilidades acionadas:**
- Etiquetas — `Atendido_loja`, `Loja_fisica`

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Loja_fisica`

**Próximo estágio:**
Conforme escolha — agendar visita ou demonstrar online.

**Por que essa resposta funciona:**
Oferece 2 caminhos (autonomia), troca embutida (`base-conhecimento` 4), reduz fricção online.

---

### Sim #19 — Compra pra terceiro
**Origem:** tráfego pago
**Persona:** Dona Inês, 58a, comprando pra nora
**Mensagem do lead:**
> "minha nora quer essa saia mas eu que pago, manda a cobrança pra mim"

**Resposta IDEAL do Ygor (Empório):**
> "Combinado, Dona Inês! Você fecha o pagamento no Pix no seu nome, e enviamos pro endereço dela. Me passa o nome dela, endereço de entrega e a peça. Confirmo tudo antes de mandar."

**Habilidades acionadas:**
- Alterar Campo do Contato — `comprando_para = nora`, `pagador = Dona Inês`
- Etiquetas — `Atendido_loja`, `Presente`

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Presente`

**Próximo estágio:**
Coleta dados destinatária + finaliza Pix.

**Por que essa resposta funciona:**
Trata pelo nome (cliente 50+ aprecia), organiza fluxo (pagador + destinatário), pede info estruturada.

---

### Sim #20 — Política de troca
**Origem:** dúvida pré-compra
**Persona:** Adriana, 34a
**Mensagem do lead:**
> "qual a politica de troca de vcs?"

**Resposta IDEAL do Ygor (Empório):**
> "7 dias corridos a partir do recebimento pra trocar (CDC). Peça precisa estar com etiqueta, sem uso. Pode mandar pelos Correios (frete reverso) OU trazer na loja Brás sem custo. Aceita?"

**Habilidades acionadas:**
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Sondagem qual peça.

**Por que essa resposta funciona:**
Política exata da base (`base-conhecimento` 4), condições objetivas, fecha com "aceita?".

---

### Sim #21 — Nota fiscal
**Origem:** tráfego pago
**Persona:** Helena, 38a, advogada
**Mensagem do lead:**
> "vcs emitem nota fiscal?"

**Resposta IDEAL do Ygor (Empório):**
> "Emitimos sim, NFe normal — vai junto no pacote ou e-mail, como preferir. Precisa de algum dado fiscal específico (CNPJ, observação)?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `precisa_nfe = sim`
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Sondagem peça + dados fiscais (CNPJ pode sinalizar lojista — atenção pra Estágio 4).

**Por que essa resposta funciona:**
Resposta objetiva, opção (pacote ou e-mail), abre porta pra detectar CNPJ que pode virar lead OTIMIZE.

---

### Sim #22 — Vendem atacado?
**Origem:** orgânico
**Persona:** Larissa, 29a, dona de brechó
**Mensagem do lead:**
> "vcs vendem no atacado? tenho um brechó"

**Resposta IDEAL do Ygor (Empório):**
> "Atacado é caso a caso — deixa eu te passar pra falar com o time direto (eles negociam por volume). Antes disso, deixa eu te perguntar: você atende seu brechó pelo WhatsApp tambem? Tem uma sacada legal aqui, depois te conto."

**Habilidades acionadas:**
- Alterar Campo do Contato — `tem_loja = sim`, `tipo = brecho`, `motivo_handoff = mencionou loja própria`
- Etiquetas — `Atendido_loja`, `Tem_loja_propria`
- Acionar API — criar card pipeline OTIMIZE etapa "Lead quente — handoff iniciado"
- Transferir Atendimento → `Ygor — OTIMIZE Systems` (após resposta dela)

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Tem_loja_propria`

**Próximo estágio:**
**HANDOFF para Ygor-OTIMIZE** ao receber resposta sobre WhatsApp. Gatilho "menção de loja própria" disparou (prompt Empório linha 96).

**Por que essa resposta funciona:**
Honesta sobre atacado (escala humano, não inventa tabela), planta gancho pro OTIMIZE sem revelar handoff.

---

### Sim #23 — Tô buscando peça pra evento
**Origem:** tráfego pago
**Persona:** Júlia, 25a, formanda
**Mensagem do lead:**
> "tô buscando vestido pra formatura no fim do mes, algo elegante mas nao muito longo"

**Resposta IDEAL do Ygor (Empório):**
> "Formatura é nosso momento! Sugiro o Alessandra (poliamida, caimento de noite, sem cair no chão). Ou o Francine viscolinho num tom mais sóbrio. Qual seu manequim e que cor te chama?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `ocasiao = formatura`, `prazo = fim do mes`, `comprimento = midi`
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Demonstração 2 opções.

**Por que essa resposta funciona:**
Animação genuína, 2 peças do catálogo real (`base-conhecimento` 1.1 e 1.6), pergunta específica.

---

### Sim #24 — Cliente revoltada com demora
**Origem:** tráfego pago da véspera
**Persona:** Ana, 30a, tá puta
**Mensagem do lead:**
> "vcs me deixaram ESPERANDO o dia inteiro ontem! perdi a vontade"

**Resposta IDEAL do Ygor (Empório):**
> "Ana, peço desculpa de verdade. Não foi legal. Hoje tô aqui pra resolver agora — o que você queria saber ontem? Te respondo na hora."

**Habilidades acionadas:**
- Alterar Campo do Contato — `flag = cliente_insatisfeito`
- Etiquetas — `Atendido_loja`, `Recuperacao`

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Recuperacao`

**Próximo estágio:**
Sondagem com prioridade. *Atenção:* esse caso é prato cheio pra disparar gatilho de elogio depois ("nossa, hoje tá ágil") → Estágio 4 OTIMIZE.

**Por que essa resposta funciona:**
Pede desculpa direto, assume responsabilidade, oferece resolver agora sem suborno preventivo. Pode virar handoff OTIMIZE se ela elogiar a velocidade hoje.

---

### Sim #25 — Cliente confusa, perdeu link
**Origem:** tráfego pago
**Persona:** Cláudia, 45a, não muito digital
**Mensagem do lead:**
> "eu vi um vestido azul de vcs ontem mas perdi o link, era florido eu acho"

**Resposta IDEAL do Ygor (Empório):**
> "Sem problema, Cláudia. Vou te mostrar nossos vestidos azuis (Francine e Alessandra) — você reconhece e a gente avança. Já te mando."

**Habilidades acionadas:**
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Demonstração — enviar fotos.

**Por que essa resposta funciona:**
Não pune memória vaga, faz o trabalho de identificar, oferece 2 candidatos pra confirmar.

---

### Sim #26 — Indecisa entre 2 peças
**Origem:** continuação Sim #2
**Persona:** Camila
**Mensagem do lead:**
> "nao sei se compro o francine ou o alessandra, ta dificil"

**Resposta IDEAL do Ygor (Empório):**
> "Te ajudo. Francine é viscolinho — fluido, ideal pra evento de dia/almoço. Alessandra é poliamida — caimento de noite. Qual ocasião você tá pensando?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `comportamento = indeciso`
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Sondagem decisória.

**Por que essa resposta funciona:**
Ajuda decidir sem forçar, traduz tecido em ocasião (`base-conhecimento` 1.1 e 1.6), fecha com pergunta única.

---

### Sim #27 — Cliente repetitiva
**Origem:** tráfego pago
**Persona:** Tatiana, 27a, ansiosa
**Mensagem do lead:**
> "tem M? tem mesmo? tem certeza?"

**Resposta IDEAL do Ygor (Empório):**
> "Tem M sim, Tatiana — confirmado. Posso reservar pra você por 24h enquanto decide. Qual peça?"

**Habilidades acionadas:**
- Alterar Campo do Contato — gravar nome
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Sondagem peça + reservar.

**Por que essa resposta funciona:**
Não repete 3x (paciente sem ser robô), oferece reserva (acalma ansiedade), pede info.

---

### Sim #28 — Silêncio após preço (follow-up)
**Origem:** tráfego pago, lead sumiu há 2h
**Persona:** Mariana, 28a
**Histórico:** Ygor mandou preço; lead visualizou, não respondeu.

**Resposta IDEAL do Ygor (Empório) — follow-up dentro da janela 24h:**
> "Oi Mariana! Sem pressão. Separei o Francine M aqui no estoque pra você. Te seguro até amanhã 18h. Se mudou de ideia, é só me avisar que libero."

**Habilidades acionadas:**
- Etiquetas — `Atendido_loja`, `Follow_up_silencio`
- Acionar API — agendar template Meta de re-engajamento em 24h se nada

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Follow_up_silencio`

**Próximo estágio:**
Aguarda. Se 24h silêncio → template Meta marketing.

**Por que essa resposta funciona:**
Sem pressão, oferece valor (separei), prazo realista (sem fake urgency), abertura pra "não".

---

### Sim #29 — "Vai esfriar até a entrega?"
**Origem:** tráfego pago
**Persona:** Maíra, 35a, mora em Curitiba
**Mensagem do lead:**
> "to em curitiba e to vendo aqui que vai esfriar, o tecido desse vestido aguenta?"

**Resposta IDEAL do Ygor (Empório):**
> "Boa pergunta, Maíra. O Francine viscolinho é leve — pra Curitiba esfriando, vale o Alessandra poliamida (mais encorpado) ou Conjunto Mescla moletinho. Quer ver as opções de meia-estação?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `cidade = Curitiba`, `contexto = clima frio`
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Demonstração de peças adequadas.

**Por que essa resposta funciona:**
Honesto sobre limitação, reposiciona pra alternativa real (`base-conhecimento` 1.2 e 1.6), mantém venda viva.

---

### Sim #30 — Pergunta sobre material biquíni
**Origem:** tráfego pago Biquíni Anitta
**Persona:** Stéfanie (mesma Sim #10)
**Mensagem do lead:**
> "esse biquini anitta é com bojo? aguenta a maré?"

**Resposta IDEAL do Ygor (Empório):**
> "Deixa eu confirmar se tem bojo removível nesse modelo (te respondo em 2 minutos). O tecido é lycra+elastano, aguenta tranquilo dia inteiro de praia. Quer ver as cores?"

**Habilidades acionadas:**
- Acionar API — verificar com humano se bojo é removível
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Demonstração cores.

**Por que essa resposta funciona:**
Honesto (não inventa "removível" sem confirmar), valida durabilidade pelo tecido (`base-conhecimento` 1.3).

---

### Sim #31 — Fitness pra musculação
**Origem:** tráfego pago Conjunto Fitness
**Persona:** Roberta, 33a, treina pesado
**Mensagem do lead:**
> "esse conjunto fitness eh bom pra musculação? tem suporte?"

**Resposta IDEAL do Ygor (Empório):**
> "É canelado com elastano (`base-conhecimento`) — segura bem em musculação, hiit, funcional. Top tem sustentação média. Pra impacto muito alto, vale top reforçado por baixo. Quer ver cores e numeração?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `interesse = fitness`, `atividade = musculacao`
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Demonstração.

**Por que essa resposta funciona:**
Honesto sobre escopo (sustentação média, não overpromise), vocabulário da praticante.

---

### Sim #32 — Conjunto masculino pro marido
**Origem:** tráfego pago
**Persona:** Renata, 30a, comprando pro marido
**Mensagem do lead:**
> "vcs vendem masculino tbm? meu marido tava de olho num moletom"

**Resposta IDEAL do Ygor (Empório):**
> "Vendemos sim! Conjunto Masculino em moletom 3 cabos (premium, dura anos) — faixa R$ 129 a R$ 239. Cores variam. Qual tamanho ele usa? Te mando foto."

**Habilidades acionadas:**
- Alterar Campo do Contato — `comprando_para = marido`, `categoria = masculino`
- Etiquetas — `Atendido_loja`, `Masculino`

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Masculino`

**Próximo estágio:**
Demonstração + manequim.

**Por que essa resposta funciona:**
Confirma catálogo (`base-conhecimento` 1.7), faixa de preço real, avança.

---

### Sim #33 — Polo feminina pro trabalho
**Origem:** orgânico
**Persona:** Daniela, 41a, vendedora
**Mensagem do lead:**
> "preciso de camiseta polo pra trabalho, vcs tem?"

**Resposta IDEAL do Ygor (Empório):**
> "Tenho sim! Camiseta Polo Feminina em malha piquê — clássico que combina com tudo. Faixa R$ 69 a R$ 119. Tamanhos P ao GG. Quer ver as cores?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `interesse = polo`, `uso = trabalho`
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Demonstração.

**Por que essa resposta funciona:**
Direto, ancora tecido (`base-conhecimento` 1.4), preço-faixa real.

---

### Sim #34 — Plus size
**Origem:** tráfego pago
**Persona:** Ana Paula, 38a, manequim 48
**Mensagem do lead:**
> "vcs tem ate o 48? sou plus"

**Resposta IDEAL do Ygor (Empório):**
> "Vou checar agora, Ana Paula. A maior parte das nossas peças vai até GG (manequim ~46). Pra 48 vale conferir cada peça específica — qual você gostou? Te confirmo a numeração."

**Habilidades acionadas:**
- Alterar Campo do Contato — `manequim = 48`
- Acionar API — checar peça específica
- Etiquetas — `Atendido_loja`, `Plus_size`

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Plus_size`

**Próximo estágio:**
Sondagem peça → conferir estoque real.

**Por que essa resposta funciona:**
Não promete sem checar (`base-conhecimento` 1 mostra GG = 46), abre porta pra peças específicas.

---

### Sim #35 — "Demora quanto pra chegar?"
**Origem:** tráfego pago
**Persona:** Vanessa, 27a, CEP de Recife
**Mensagem do lead:**
> "se eu comprar hj quando chega? to em recife"

**Resposta IDEAL do Ygor (Empório):**
> "Pra Recife: posto em 1 dia útil, Sedex chega entre 3 e 5 dias úteis depois. Total uns 4-6 dias da compra. Me passa CEP que eu calculo o valor do frete. Qual peça?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `cidade = Recife/PE`
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
CEP → calcular → demonstração.

**Por que essa resposta funciona:**
Prazo honesto da base (`base-conhecimento` 3), pede dado pra concretizar.

---

### Sim #36 — "Vocês têm Instagram?"
**Origem:** orgânico
**Persona:** Bruna, 25a
**Mensagem do lead:**
> "vcs tem instagram pra eu seguir?"

**Resposta IDEAL do Ygor (Empório):**
> "Deixa eu te passar o @ certinho — te confirmo em 2 minutos. Enquanto isso, você tá olhando alguma peça ou quer ver novidades?"

**Habilidades acionadas:**
- Acionar API — confirmar @ atual com humano (não inventar)
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Sondagem.

**Por que essa resposta funciona:**
Não inventa @ (regra de honestidade), mantém lead engajado com pergunta.

---

### Sim #37 — Vídeo de modelo provando
**Origem:** tráfego pago
**Persona:** Mônica, 30a, indecisa
**Mensagem do lead:**
> "tem video de alguem usando essa saia? quero ver o caimento"

**Resposta IDEAL do Ygor (Empório):**
> "Tenho vídeo sim! Te mando agora — a modelo usa manequim 38, 1,70m, pra você ter referência. Qual seu manequim e altura? Te falo se o caimento vai ser parecido."

**Habilidades acionadas:**
- Acionar API — buscar vídeo da peça no banco de mídia
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Enviar vídeo + sondagem manequim.

**Por que essa resposta funciona:**
Atende pedido, dá referência da modelo (transparência), mapping pro biotipo do lead.

---

### Sim #38 — Cliente que adia compra
**Origem:** continuação Sim #28
**Persona:** Mariana
**Mensagem do lead:**
> "ai mudei de ideia, vou esperar o salario do mes que vem"

**Resposta IDEAL do Ygor (Empório):**
> "Tranquilo, Mariana! Quer que eu te avise no início do mês com a peça separadinha? Sem compromisso, só pra você não perder."

**Habilidades acionadas:**
- Alterar Campo do Contato — `motivo_adiamento = financeiro`, `reagenda = inicio_mes`
- Etiquetas — `Atendido_loja`, `Aguardando_orcamento`
- Acionar API — agendar template Meta de marketing pra reativar início do próximo mês

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Aguardando_orcamento`

**Próximo estágio:**
Conclui com follow-up agendado.

**Por que essa resposta funciona:**
Aceita o "não agora" sem pressão, oferece valor, planta agenda futura.

---

### Sim #39 — Áudio reclamando do prazo
**Origem:** pós-compra
**Persona:** Larissa, 27a
**Mensagem do lead (áudio transcrito):**
> "[ÁUDIO 38s] oi gente queria saber por que meu pedido nao chegou ainda eu comprei dia 5 hoje eh dia 9 disse que ia chegar antes do casamento amanhã eu to surtando"

**Resposta IDEAL do Ygor (Empório):**
> "Larissa, calma — vamos resolver. Me passa o número do pedido (#STIV-) que eu rastreio agora e te respondo em 5 minutos com a posição exata. Já tô olhando."

**Habilidades acionadas:**
- Acionar API — alertar humano logística + rastrear Correios
- Alterar Campo do Contato — `flag = atraso_potencial`
- Etiquetas — `Atendido_loja`, `Suporte`, `Urgente`
- Transferir Atendimento → humano logística após pegar #pedido

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Suporte`
- `Urgente`

**Próximo estágio:**
Rastrear → comunicar status → escala humano logística.

**Por que essa resposta funciona:**
Acolhe ("calma, vamos resolver"), pede dado concreto, promete prazo curto. Conforme `base-conhecimento` seção 5 — pedido em rota é caso de transferir humano.

---

### Sim #40 — Pergunta filosófica de moda
**Origem:** tráfego pago
**Persona:** Júlia, 23a, exploratória
**Mensagem do lead:**
> "ai gente nao sei o que eu visto mais, o que tá em alta?"

**Resposta IDEAL do Ygor (Empório):**
> "Bora descobrir juntas! Pra essa temporada, tá bombando vestido viscolinho leve, conjunto fitness pra athleisure e biquíni pra quem já tá pensando em verão. Você é mais de vibe romântica, clean ou power?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `comportamento = exploratorio`
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Sondagem estilo → demonstração curada.

**Por que essa resposta funciona:**
Energia, traz tendência baseada em sazonalidade real (`base-conhecimento` 7), pergunta de estilo bem feita.

---

# BLOCO 2 — Lojistas interessados em OTIMIZE (Sim #41-70)

---

### Sim #41 — "Quem responde aí?"
**Origem:** tráfego pago, lead curioso
**Persona:** Roberto, 41a, dono boutique
**Mensagem do lead:**
> "quem responde ai? eh voce mesmo ou tem gente trabalhando?"

**Resposta IDEAL do Ygor (Empório):**
> "Oi! Aqui é o Ygor, eu mesmo. Você tá procurando alguma peça ou só passando pra olhar?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `motivo_handoff = perguntou sobre operacao` (suave — monitorar)
- Etiquetas — `Atendido_loja`, marcar `Pergunta_IA` como observação interna

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
**Sondagem + monitorar.** Não dispara handoff pleno ainda (gatilho borderline — ver Gap 3 no relatório). Se ele insistir em "sistema/robô", aí transfere.

**Por que essa resposta funciona:**
Não revela IA proativamente (prompt Empório linha 44), responde como pessoa, devolve pergunta pra avançar.

---

### Sim #42 — "É robô?"
**Origem:** tráfego pago, lead direto
**Persona:** Mariana, 34a, lojista Shopee
**Mensagem do lead:**
> "vc eh robo? to te testando rsrs"

**Resposta IDEAL do Ygor (Empório → handoff Ygor-OTIMIZE):**
> "Boa pergunta. Posso te passar pro meu sócio aqui que cuida exatamente dessa parte? Ele te explica direitinho — leva 2 minutos."

**Habilidades acionadas (Empório):**
- Alterar Campo do Contato — `motivo_handoff = perguntou sobre IA`
- Etiquetas — `Atendido_loja`, `Pergunta_IA`
- Acionar API — criar card pipeline OTIMIZE "Lead quente — handoff iniciado"
- Transferir Atendimento → `Ygor — OTIMIZE Systems`

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Pergunta_IA`

**Próximo estágio:**
**HANDOFF → Ygor-OTIMIZE Estágio 1 (revelação positiva).**

**Resposta seguinte (Ygor-OTIMIZE):**
> "Boa pergunta, Mariana. Então — esse atendimento que você teve foi feito 100% por agente IA. Funcionou bem, né?"

**Por que essa resposta funciona:**
Empório não nega nem confirma (não queima a revelação — prompt Empório linha 100). OTIMIZE entra com show-don't-tell perfeito.

---

### Sim #43 — "Que sistema vocês usam?"
**Origem:** tráfego pago
**Persona:** Daniel, 36a, dono ML
**Mensagem do lead:**
> "que sistema vcs usam aí? respondeu super rapido"

**Resposta IDEAL do Ygor (Empório → handoff):**
> "Que legal você ter notado! Posso te passar pro meu sócio aqui que cuida exatamente dessa parte? Leva 2 minutos."

**Habilidades acionadas (Empório):**
- `motivo_handoff = elogiou velocidade + perguntou sistema`
- Etiquetas — `Atendido_loja`, `Pergunta_IA`, `Elogiou`
- Acionar API + Transferir

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Pergunta_IA`
- `Elogiou`

**Próximo estágio:**
**HANDOFF → Ygor-OTIMIZE Estágio 1.**

**Resposta seguinte (Ygor-OTIMIZE):**
> "Obrigado! Posso te contar uma sacada: esse atendimento que você teve foi 100% por agente IA. Chama OTIMIZE Systems. Você tem loja?"

**Por que essa resposta funciona:**
Aproveita gatilho duplo (velocidade + sistema). OTIMIZE entra com revelação + filtro ICP imediato.

---

### Sim #44 — "Quanto custa esse atendimento?"
**Origem:** tráfego pago, já no Estágio 2 OTIMIZE
**Persona:** Carla, 38a, dona de loja física
**Mensagem do lead:**
> "quanto custa isso? to interessada de testar"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Antes de te falar preço, Carla, deixa eu entender uma coisa: você vende o quê e por onde hoje? Pergunto porque o valor faz mais sentido depois que a gente entende seu volume."

**Habilidades acionadas:**
- Alterar Campo do Contato — `reacao_revelacao = verde`
- Etiquetas — `Lead_quente_OTIMIZE`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`

**Próximo estágio:**
**SPIN curto Estágio 3** antes de pitch.

**Por que essa resposta funciona:**
Resistência saudável ao "preço primeiro" — postura sócio comercial sênior (prompt OTIMIZE linha 13).

---

### Sim #45 — "Queria isso pra minha loja"
**Origem:** tráfego pago
**Persona:** Vanessa, 32a, dona de loja Brás
**Mensagem do lead:**
> "queria isso na minha loja, como faço?"

**Resposta IDEAL do Ygor (Empório → handoff):**
> "Que ótimo! Posso te passar pro meu sócio que cuida disso? Ele te explica direitinho. Leva 2 minutos."

**Habilidades acionadas (Empório):**
- `motivo_handoff = elogio + interesse instalar`
- Etiquetas — `Atendido_loja`, `Elogiou`, `Tem_loja_propria`
- Acionar API + Transferir

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Elogiou`
- `Tem_loja_propria`

**Próximo estágio:**
**HANDOFF → Ygor-OTIMIZE.**

**Resposta seguinte (Ygor-OTIMIZE):**
> "Obrigado pelo papo, Vanessa! Esse atendimento que você teve foi 100% IA — e é o que a gente coloca rodando pra lojistas. Antes de explicar tudo, você vende o quê hoje e por onde?"

**Por que essa resposta funciona:**
Gatilho ouro (já quer instalar). OTIMIZE revela + começa SPIN imediato.

---

### Sim #46 — "Tô tendo problema de atender no whats"
**Origem:** tráfego pago Reels OTIMIZE
**Persona:** Marcela, 28a, lojista pequena
**Mensagem do lead:**
> "to tendo problema de atender no whats da minha loja, mta gente e eu sozinha"

**Resposta IDEAL do Ygor (Empório → handoff direto):**
> "Oi! Ygor aqui. Pelo que você falou faz total sentido você falar com meu sócio que cuida exatamente desse problema (perder venda por sobrecarga). Posso te passar?"

**Habilidades acionadas (Empório):**
- `motivo_handoff = dor de atendimento + tem loja`
- Etiquetas — `Atendido_loja`, `Tem_loja_propria`, `Dor_atendimento`
- Acionar API + Transferir

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Tem_loja_propria`
- `Dor_atendimento`

**Próximo estágio:**
**HANDOFF imediato → Ygor-OTIMIZE Estágios 2-3.**

**Resposta seguinte (Ygor-OTIMIZE):**
> "Oi Marcela. Esse atendimento que você teve foi 100% IA — exatamente o que a gente faz pro seu problema: agente roda 24h, atende mesmo enquanto você dorme. Você vende o quê?"

**Por que essa resposta funciona:**
Dor direta. Handoff imediato. Revela + conecta solução à dor real.

---

### Sim #47 — "Perdi vendas no fim de semana"
**Origem:** tráfego pago
**Persona:** Bruno, 35a, vende pelo Insta
**Mensagem do lead:**
> "perdi mta venda no domingo que eu nao tava no whats"

**Resposta IDEAL do Ygor (Empório → handoff):**
> "Te entendo. Posso te passar pro meu sócio aqui? Ele cuida exatamente desse problema. 2 minutos."

**Resposta seguinte (Ygor-OTIMIZE):**
> "Bruno, esse atendimento que você teve agora foi 100% IA. Roda inclusive domingo, no WhatsApp da sua loja. Atende, manda foto, fecha venda. Você vende o quê e por onde?"

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Tem_loja_propria`
- `Dor_atendimento`

**Próximo estágio:**
**HANDOFF.**

**Por que essa resposta funciona:**
Dor "venda perdida domingo" = motor de compra OTIMIZE. Conecta direto.

---

### Sim #48 — "Quanto IA cobra?"
**Origem:** Estágio 3 OTIMIZE (após SPIN)
**Persona:** Carla, 38a (continuação Sim #44)
**Mensagem do lead:**
> "to com loja de cosmetico, vendo no whats e insta. mais ou menos 100 mensagens por dia. agora me fala o preço"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Bom volume! Pra esse perfil, combo CHATBOT+IA é R$ 597/mês. Dá menos de R$ 20/dia — menos que um almoço. Inclui agente 24h, CRM, mídia. Tem versão só CHATBOT por R$ 497, mas pra resolver venda fora do horário a IA é o pulo do gato. Posso te mostrar rodando numa demo de 20min?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `tem_loja = sim`, `nicho = cosmetico`, `volume = 100/dia`
- Etiquetas — `SPIN_concluido`, `Pitch_feito`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `SPIN_concluido`
- `Pitch_feito`

**Próximo estágio:**
Estágio 6 — agendar demo.

**Por que essa resposta funciona:**
Pitch curto (prompt OTIMIZE linhas 115-122), ancora valor, diferencia planos sem confundir, CTA específico.

---

### Sim #49 — "Preciso ter loja grande?"
**Origem:** tráfego pago
**Persona:** Letícia, 26a, lojista iniciante
**Mensagem do lead:**
> "preciso ter loja grande pra usar isso ou serve pra quem ta começando?"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Boa pergunta. Serve pra qualquer tamanho, mas faz mais sentido quando já tem fluxo regular — uns 50+ leads/mês. Abaixo disso, R$ 597 talvez não pague. Quanto mais ou menos tá entrando hoje?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `dor_atual = começando`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`

**Próximo estágio:**
Sondagem volume. Se < 50/mês → filtro ICP Estágio 5.

**Por que essa resposta funciona:**
Honesto sobre fit (não vende pra todo mundo), número concreto pra calibrar, evita queimar lead.

---

### Sim #50 — "Atendi mal cliente ontem"
**Origem:** tráfego pago
**Persona:** Roberta, 33a, lojista pet
**Mensagem do lead:**
> "atendi mal um cliente ontem porque tava sem paciencia, queria automatizar pra nao acontecer mais"

**Resposta IDEAL do Ygor (Empório → handoff):**
> "Te entendo, acontece. Posso te passar pro meu sócio que cuida disso? 2 minutos."

**Resposta seguinte (Ygor-OTIMIZE):**
> "Esse atendimento que você teve foi 100% IA — vantagem é que ele responde no tom certo sempre, mesmo quando você tá esgotada. Você tem loja de quê?"

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Tem_loja_propria`
- `Dor_atendimento`

**Próximo estágio:**
**HANDOFF + SPIN.**

**Por que essa resposta funciona:**
Empatia ("acontece"), revela com benefício (tom consistente), qualifica.

---

### Sim #51 — "Tenho 3 funcionários no atendimento"
**Origem:** tráfego pago
**Persona:** Cláudio, 45a, dono varejo
**Mensagem do lead:**
> "tenho 3 funcionarios atendendo whats da loja, gasto fortuna. vale a pena?"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Cláudio, perfil ideal. R$ 597/mês = menos que 5% de um salário CLT, e roda 24h sem cansar. Não substitui os 3 (você ainda quer humano pra venda complexa), mas filtra MUITA coisa antes deles. Quer ver numa demo de 20min?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `tem_loja = sim`, `equipe = 3 atendentes`, `dor_atual = custo alto`
- Etiquetas — `Lead_quente_OTIMIZE`, `SPIN_concluido`, `Pitch_feito`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `SPIN_concluido`
- `Pitch_feito`

**Próximo estágio:**
Estágio 6.

**Por que essa resposta funciona:**
Compara com salário (âncora forte), não promete demissão (honestidade), CTA limpo.

---

### Sim #52 — "Uso Mercado Livre já"
**Origem:** tráfego pago
**Persona:** Marcos, 39a, lojista ML
**Mensagem do lead:**
> "ja vendo no mercado livre, isso conecta?"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Conecta com WhatsApp que recebe leads do ML (quando sai do anúncio pro whats). Não substitui atendimento interno do ML (esse é via Mercado Pago), mas captura tudo que vem pro seu número. Faz sentido?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `canais = ML + Whats`
- Etiquetas — `Lead_quente_OTIMIZE`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`

**Próximo estágio:**
SPIN volume → pitch.

**Por que essa resposta funciona:**
Honesto sobre escopo (não promete ML interno), entrega valor real, qualifica.

---

### Sim #53 — "Uso Shopee e Shein"
**Origem:** tráfego pago
**Persona:** Júlia, 27a, lojista nichada
**Mensagem do lead:**
> "vendo na shopee e shein, isso funciona?"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Funciona pro WhatsApp que recebe leads de fora (Insta, anúncio, indicação). Atendimento interno Shopee/Shein é dentro dos apps deles. Mas se você divulga seu Whats em algum lugar, o agente cuida. Tem volume nesse canal?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `canais = Shopee + Shein + Whats`
- Etiquetas — `Lead_quente_OTIMIZE`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`

**Próximo estágio:**
SPIN volume.

**Por que essa resposta funciona:**
Esclarece limite (não invade marketplaces), mostra ponto válido.

---

### Sim #54 — "Minha loja é nova"
**Origem:** tráfego pago
**Persona:** Bianca, 24a, abriu 2 meses
**Mensagem do lead:**
> "abri loja faz 2 meses, ainda tô construindo. vale a pena ja?"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Honestamente, Bianca: pra 2 meses pode ser cedo pro combo R$ 597 — o investimento paga quando já tem fluxo regular. Sugiro: agora foca em trazer público, e quando começar a perder mensagem por volume, me chama. Tô aqui."

**Habilidades acionadas:**
- Alterar Campo do Contato — `motivo_perda = cedo`
- Etiquetas — `Sem_fit_ICP`, `Reativar_futuro`

**Etiquetas aplicadas:**
- `Sem_fit_ICP`
- `Reativar_futuro`

**Próximo estágio:**
**Estágio 5 — filtro ICP, encerra com classe.**

**Por que essa resposta funciona:**
Honestidade comercial sênior (prompt OTIMIZE Estágio 5), planta semente, lead vira indicação potencial.

---

### Sim #55 — "Qual a diferença pra ChatGPT?"
**Origem:** tráfego pago
**Persona:** Felipe, 31a, sabe tech
**Mensagem do lead:**
> "tenho o chatgpt plus, nao da pra usar ele direto no whats?"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Boa pergunta. ChatGPT puro não conecta no WhatsApp Business API Oficial — pra isso precisa de plataforma com aprovação Meta. Também não tem CRM, não dispara campanha, não envia mídia. A gente entrega tudo pronto. Faz sentido?"

**Habilidades acionadas:**
- Etiquetas — `Lead_quente_OTIMIZE`, `Comparacao_ferramenta`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Comparacao_ferramenta`

**Próximo estágio:**
SPIN → demo.

**Por que essa resposta funciona:**
Resposta técnica honesta (objeção da FAQ — prompt OTIMIZE linha 272), lista valor agregado concreto.

---

### Sim #56 — "Como configura?"
**Origem:** pós-pitch
**Persona:** Daniel, 36a
**Mensagem do lead:**
> "complicado configurar?"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Você não configura — a gente configura. Onboarding 1 dia, implementação 5-7 dias úteis, go-live no seu número. Depois 30 dias com a gente acompanhando. Você só passa info, a gente entrega pronto. Bora ver na demo?"

**Habilidades acionadas:**
- Etiquetas — `Lead_quente_OTIMIZE`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`

**Próximo estágio:**
Demo (Estágio 6).

**Por que essa resposta funciona:**
Tira objeção da complexidade (white-glove — FAQ prompt OTIMIZE linhas 256-260), cronograma claro, CTA.

---

### Sim #57 — "Demora quanto pra implantar?"
**Origem:** pós-pitch
**Persona:** Vanessa
**Mensagem do lead:**
> "se eu fechar hj quando ja ta rodando?"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Cronograma: dia 1 conversamos e levantamos requisitos. Dias 2-7 Igor monta o agente. Dia 8 vai pro ar. Pra entrar essa semana, melhor agendar demo agora. Tenho amanhã 14h ou sexta 10h. Qual prefere?"

**Habilidades acionadas:**
- Etiquetas — `Lead_quente_OTIMIZE`, `Hot`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Hot`

**Próximo estágio:**
Estágio 6 — agendar.

**Por que essa resposta funciona:**
Concreto (8 dias), urgência verdadeira, oferece 2 horários (escolha forçada saudável — prompt OTIMIZE linha 156).

---

### Sim #58 — "Helena ou OTIMIZE?"
**Origem:** lead avançado
**Persona:** Carla, 38a
**Mensagem do lead:**
> "vi a helena, vi a otimize, qual a diferença?"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Boa pergunta. Helena é a plataforma (estrutura). OTIMIZE Systems é o serviço que entrega o agente IA pronto, customizado pra sua loja, rodando na Helena. A gente cuida da configuração e ajustes. Você não vira tech. Faz sentido?"

**Habilidades acionadas:**
- Etiquetas — `Lead_quente_OTIMIZE`, `Lead_avancado`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Lead_avancado`

**Próximo estágio:**
Demo.

**Por que essa resposta funciona:**
Reposiciona Helena como infraestrutura, OTIMIZE como serviço — complementar (FAQ OTIMIZE linha 230). Reduz fricção.

---

### Sim #59 — "Posso testar antes?"
**Origem:** lead cauteloso
**Persona:** Marcela
**Mensagem do lead:**
> "posso testar antes de pagar?"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Não tem free trial direto — a configuração consome trabalho real do time. Mas você ACABOU de testar: o atendimento da Empório que você teve foi exatamente o que entregamos. Quer ver mais detalhes numa demo ao vivo, com seus cenários?"

**Habilidades acionadas:**
- Etiquetas — `Lead_quente_OTIMIZE`, `Objecao_trial`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Objecao_trial`

**Próximo estágio:**
Demo.

**Por que essa resposta funciona:**
Honesto (não tem trial), reverte objeção (você já testou — FAQ OTIMIZE linha 274), CTA pra demo.

---

### Sim #60 — "Tem garantia?"
**Origem:** lead cauteloso
**Persona:** Bruno
**Mensagem do lead:**
> "tem alguma garantia se nao gostar?"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "O acompanhamento de 30 dias com Igor é o 'fica bom ou ajusta'. Se nesse período não tiver performando, a gente refina até atender. Sem cláusula de reembolso retroativo (implantação consumiu tempo), mas a gente persegue resultado. Quer falar isso direto com o Igor na demo?"

**Habilidades acionadas:**
- Etiquetas — `Lead_quente_OTIMIZE`, `Objecao_garantia`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Objecao_garantia`

**Próximo estágio:**
Demo com Igor.

**Por que essa resposta funciona:**
Transparente, oferece o que tem (acompanhamento — FAQ OTIMIZE linha 259), escala pra humano apropriado.

---

### Sim #61 — "Vocês fazem o setup?"
**Origem:** lead pragmático
**Persona:** Cláudio
**Mensagem do lead:**
> "eu nao vou ter q mexer em nada né? vcs fazem tudo?"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Tudo. Você manda: catálogo, FAQ, processo de venda, tom. Igor monta. Você só aprova a versão final antes de entrar no ar. Resumo: 2 horas suas durante 7 dias. Combinado?"

**Habilidades acionadas:**
- Etiquetas — `Lead_quente_OTIMIZE`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`

**Próximo estágio:**
Demo / fechar.

**Por que essa resposta funciona:**
Resposta categórica, honesta sobre o tempo necessário (2h), fecha com "combinado".

---

### Sim #62 — "Minha loja é salão de beleza"
**Origem:** tráfego pago
**Persona:** Beatriz, 30a, dona salão
**Mensagem do lead:**
> "minha loja eh salão de beleza, vcs servem?"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Servem sim — base é a mesma, muda o conteúdo. Pra salão configuramos agenda (horários), serviços, valores. Agente faz triagem, agenda, manda lembrete. Você usa WhatsApp pra agendar hoje?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `nicho = salao_beleza`
- Etiquetas — `Lead_quente_OTIMIZE`, `Outro_nicho`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Outro_nicho`

**Próximo estágio:**
SPIN específico nicho.

**Por que essa resposta funciona:**
Confirma fit, traduz aplicação (agenda + lembrete), qualifica.

---

### Sim #63 — "Whats Business comum, precisa trocar?"
**Origem:** lead técnico
**Persona:** Daniel
**Mensagem do lead:**
> "uso whats business comum no celular, precisa trocar?"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Precisa migrar pra API Oficial Meta (sem app no celular). MESMO número, só muda como o sistema acessa. Igor faz a migração — 1 dia, sem perder histórico. Whats Business comum não permite IA conectada (regra Meta). Beleza?"

**Habilidades acionadas:**
- Etiquetas — `Lead_quente_OTIMIZE`, `Migracao_API`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Migracao_API`

**Próximo estágio:**
Demo.

**Por que essa resposta funciona:**
Explica diferença técnica sem assustar, garante continuidade do número (objeção #1).

---

### Sim #64 — "Minha equipe vai perder emprego?"
**Origem:** lead com equipe
**Persona:** Cláudio
**Mensagem do lead:**
> "minha equipe vai ficar sem trabalho?"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Pelo contrário, Cláudio. Eles param de fazer 'tem M?', 'qual o preço?' — perguntas repetitivas que tomam o dia. E sobram pra venda complexa, fidelização, atendimento VIP. Quer ver na demo como fica?"

**Habilidades acionadas:**
- Etiquetas — `Lead_quente_OTIMIZE`, `Objecao_substituicao`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Objecao_substituicao`

**Próximo estágio:**
Demo.

**Por que essa resposta funciona:**
Reframe positivo (libera pra valor), exemplos concretos, demo como prova.

---

### Sim #65 — Indicação "Conheço a Lúcia da Brás"
**Origem:** indicação
**Persona:** Helena, 41a, lojista
**Mensagem do lead:**
> "a Lucia da brás me falou de vcs, disse que sao bons"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "A Lúcia! Que legal. Vou mandar um café pra ela como cortesia. Bom — me conta seu contexto: que tipo de loja você tem e qual a dor com WhatsApp hoje?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `origem = indicacao_Lucia`
- Etiquetas — `Lead_quente_OTIMIZE`, `Indicacao`, `Hot`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Indicacao`
- `Hot`

**Próximo estágio:**
SPIN abreviado.

**Por que essa resposta funciona:**
Calor genuíno, brinde social (café), entra em SPIN com lead já quente.

---

### Sim #66 — Objeção preço "R$ 597 tá caro"
**Origem:** pós-pitch
**Persona:** Marcela
**Mensagem do lead:**
> "ta caro 597 por mes, nao tenho como"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Te entendo, Marcela. Compara com 1 dia de funcionário CLT — sai mais caro e não roda 24h. Mas: se R$ 597 não cabe agora, tem o CHATBOT (sem IA) por R$ 497 — fluxos pré-configurados. Faz mais sentido pra esse momento?"

**Habilidades acionadas:**
- Etiquetas — `Lead_quente_OTIMIZE`, `Objecao_preco`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Objecao_preco`

**Próximo estágio:**
Conforme reação — fecha CHATBOT ou perde.

**Por que essa resposta funciona:**
Não força, oferece downgrade real (FAQ OTIMIZE linha 236), checa fit.

---

### Sim #67 — Objeção tempo "Tô ocupado"
**Origem:** pós-pitch
**Persona:** Bruno
**Mensagem do lead:**
> "to muito ocupado pra implantar agora"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Sua participação são 2h em 7 dias — você passa info, a gente monta. Se você não tem 2h, é porque o WhatsApp já tá te sugando. Que tal agendar a demo (20min) pra você ver o ROI primeiro, e decidir depois?"

**Habilidades acionadas:**
- Etiquetas — `Lead_quente_OTIMIZE`, `Objecao_tempo`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Objecao_tempo`

**Próximo estágio:**
Demo.

**Por que essa resposta funciona:**
Quantifica esforço (2h em 7d), reframe ("WhatsApp já te suga"), CTA pequeno (20min).

---

### Sim #68 — Objeção dúvida "E se não der certo?"
**Origem:** pós-pitch
**Persona:** Beatriz
**Mensagem do lead:**
> "e se nao der certo? eu perco o dinheiro"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Beatriz, tem 30 dias de acompanhamento Igor — se não tiver performando, refina até atender. Não é 'paga e some'. Você vê clientes nossos rodando ao vivo na demo. Bora?"

**Habilidades acionadas:**
- Etiquetas — `Lead_quente_OTIMIZE`, `Objecao_risco`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Objecao_risco`

**Próximo estágio:**
Demo.

**Por que essa resposta funciona:**
Reduz risco percebido, prova social (clientes rodando), CTA leve.

---

### Sim #69 — Objeção comparação "vi mais barato"
**Origem:** pós-pitch
**Persona:** Felipe
**Mensagem do lead:**
> "vi outro sistema por 297, mais barato"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Já vi os de R$ 297 — geralmente é só chatbot de fluxo fixo, sem IA generativa. Atende script, não conversa. Se você quer fluxo fixo, vale. Se quer agente que pensa (igual o que você teve agora), R$ 597 é outro produto. Qual experiência você quer?"

**Habilidades acionadas:**
- Etiquetas — `Lead_quente_OTIMIZE`, `Objecao_concorrente`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Objecao_concorrente`

**Próximo estágio:**
Conforme decisão.

**Por que essa resposta funciona:**
Não denigre concorrente, posiciona como categoria diferente, devolve escolha.

---

### Sim #70 — Objeção tech "Não sei mexer"
**Origem:** pós-pitch
**Persona:** Cláudia, 52a, lojista offline
**Mensagem do lead:**
> "nao entendo nada de tecnologia, vou conseguir?"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Cláudia, você não vai precisar mexer em nada técnico. Igor configura, você só fala em texto: 'minha loja vende X, atende assim'. Igor traduz pra agente. Pra acompanhar depois, o painel é igual o WhatsApp. Bora ver na demo?"

**Habilidades acionadas:**
- Etiquetas — `Lead_quente_OTIMIZE`, `Objecao_tech`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Objecao_tech`

**Próximo estágio:**
Demo.

**Por que essa resposta funciona:**
Personaliza pelo nome, tira fricção (você só fala texto), pinta o pós-implantação simples.

---

# BLOCO 3 — Outros nichos (Sim #71-85)

---

### Sim #71 — "Vendo bolo de pote"
**Origem:** tráfego pago
**Persona:** Sandra, 38a, confeiteira
**Mensagem do lead:**
> "vi o sistema de vcs, mas eu vendo bolo de pote pelo whats"

**Resposta IDEAL do Ygor (OTIMIZE — direto, ela chegou já mencionando "sistema"):**
> "Show, Sandra. Pra confeitaria caseira pelo WhatsApp, o agente atende pedido, manda cardápio, calcula valor, agenda entrega. Quantos pedidos você recebe por dia mais ou menos?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `nicho = confeitaria_caseira`
- Etiquetas — `Lead_quente_OTIMIZE`, `Outro_nicho`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Outro_nicho`

**Próximo estágio:**
SPIN volume.

**Por que essa resposta funciona:**
Aplica caso real do nicho, mostra fit, qualifica volume.

---

### Sim #72 — "Sou advogado"
**Origem:** tráfego pago
**Persona:** Dr. Henrique, 44a, advogado tributário
**Mensagem do lead:**
> "advogado posso usar? recebo muito contato e nao consigo responder"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Faz sentido pra advocacia, Dr. Henrique. Agente faz triagem (área do caso, urgência, dados básicos), agenda consulta, manda contrato padrão. Vale ressaltar que comunicação OAB tem regra ética — a gente configura conforme. Qual seu volume médio?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `nicho = advocacia`
- Etiquetas — `Lead_quente_OTIMIZE`, `Outro_nicho`, `Cuidado_etica`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Outro_nicho`
- `Cuidado_etica`

**Próximo estágio:**
SPIN + ressalva OAB.

**Por que essa resposta funciona:**
Reconhece especificidade (ética OAB), aplica caso, mostra domínio.

---

### Sim #73 — "Atendimento odontológico"
**Origem:** tráfego pago
**Persona:** Dra. Mariana, 37a, dentista
**Mensagem do lead:**
> "tenho clinica odontologica, atendimento sufoca"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Clínica é caso clássico! Agente faz triagem (qual procedimento, urgência, convênio), checa horário, agenda, manda lembrete dia antes. Atende noite e fim de semana. Usa algum sistema de agenda hoje?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `nicho = odontologia`
- Etiquetas — `Lead_quente_OTIMIZE`, `Outro_nicho`, `Integracao_agenda`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Outro_nicho`
- `Integracao_agenda`

**Próximo estágio:**
SPIN integração.

**Por que essa resposta funciona:**
Caso de uso concreto, abre porta pra integração.

---

### Sim #74 — "Oficina mecânica"
**Origem:** tráfego pago
**Persona:** Seu Antônio, 51a, dono oficina
**Mensagem do lead:**
> "tenho oficina mecanica, serve?"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Serve sim, seu Antônio. Agente recebe pedido de orçamento (qual carro, modelo, ano, problema), agenda visita, manda lista de serviços e valores médios. Quantos contatos por dia mais ou menos?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `nicho = oficina_mecanica`
- Etiquetas — `Lead_quente_OTIMIZE`, `Outro_nicho`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Outro_nicho`

**Próximo estágio:**
SPIN.

**Por que essa resposta funciona:**
Caso real do nicho, qualifica volume.

---

### Sim #75 — "Vendo cursos online"
**Origem:** tráfego pago
**Persona:** Pedro, 33a, infoprodutor
**Mensagem do lead:**
> "vendo cursos online, quero automatizar"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Infoproduto roda bem. Agente qualifica lead (interesse, perfil), manda link de check-out, recupera carrinho, atende dúvida pré-compra. Você usa Hotmart, Kiwify, plataforma própria?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `nicho = infoproduto`
- Etiquetas — `Lead_quente_OTIMIZE`, `Outro_nicho`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Outro_nicho`

**Próximo estágio:**
SPIN integração plataforma.

**Por que essa resposta funciona:**
Caso direto, qualifica stack.

---

### Sim #76 — "Restaurante delivery"
**Origem:** tráfego pago
**Persona:** Marcos, 40a, dono restaurante
**Mensagem do lead:**
> "tenho restaurante delivery"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Bom caso! Agente recebe pedido, manda cardápio, calcula valor + entrega, confirma pagamento, passa pra cozinha. Você usa iFood ou só WhatsApp direto?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `nicho = restaurante_delivery`
- Etiquetas — `Lead_quente_OTIMIZE`, `Outro_nicho`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Outro_nicho`

**Próximo estágio:**
SPIN canal.

**Por que essa resposta funciona:**
Aplica caso, qualifica canal (iFood vs WhatsApp puro muda escopo).

---

### Sim #77 — "Imobiliária"
**Origem:** tráfego pago
**Persona:** Carolina, 36a, corretora
**Mensagem do lead:**
> "trabalho com imovel, vcs servem?"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Imobiliária sim! Agente qualifica lead (compra ou aluguel, faixa, região, quartos), manda 2-3 opções do portfólio, agenda visita. Você usa CRM hoje?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `nicho = imobiliaria`
- Etiquetas — `Lead_quente_OTIMIZE`, `Outro_nicho`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Outro_nicho`

**Próximo estágio:**
SPIN integração.

**Por que essa resposta funciona:**
Qualificação imobiliária padrão (4 critérios), mostra domínio.

---

### Sim #78 — "Clínica veterinária"
**Origem:** tráfego pago
**Persona:** Dr. Roberto, 39a, veterinário
**Mensagem do lead:**
> "clinica vet, atendimento confuso"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Vet é ótimo caso. Agente faz triagem (espécie, idade, problema, urgência), agenda consulta, lembra vacina, atende emergência fora do horário. Quantos atendimentos por mês mais ou menos?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `nicho = veterinaria`
- Etiquetas — `Lead_quente_OTIMIZE`, `Outro_nicho`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Outro_nicho`

**Próximo estágio:**
SPIN volume.

**Por que essa resposta funciona:**
Caso concreto (triagem + vacina + emergência), qualifica.

---

### Sim #79 — "Mentoria"
**Origem:** tráfego pago
**Persona:** Felipe, 28a, criador
**Mensagem do lead:**
> "vendo mentoria, queria automatizar"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Mentoria roda bem. Agente qualifica (objetivo, momento de vida, expectativa), agenda call estratégica, manda material prévio. Quanto cobra pela mentoria, mais ou menos?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `nicho = mentoria`
- Etiquetas — `Lead_quente_OTIMIZE`, `Outro_nicho`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Outro_nicho`

**Próximo estágio:**
SPIN ticket.

**Por que essa resposta funciona:**
Ticket alto = fit forte, qualifica.

---

### Sim #80 — "Academia"
**Origem:** tráfego pago
**Persona:** Diego, 34a, dono academia
**Mensagem do lead:**
> "tenho academia, recebo mta duvida"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Academia é caso bom. Agente manda plano, valores, agenda aula experimental, tira dúvida de horário. Quantas perguntas por semana?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `nicho = academia`
- Etiquetas — `Lead_quente_OTIMIZE`, `Outro_nicho`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Outro_nicho`

**Próximo estágio:**
SPIN volume.

**Por que essa resposta funciona:**
Aplicação clara, qualifica.

---

### Sim #81 — "Pet shop"
**Origem:** tráfego pago
**Persona:** Tatiana, 32a, dona pet shop
**Mensagem do lead:**
> "pet shop, agendamento de banho e tosa"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Pet shop é case clássico. Agente recebe pedido de agendamento (espécie, serviço, dia), checa horário, confirma. Também atende compra de ração/acessório com entrega. Qual seu maior gargalo hoje?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `nicho = pet_shop`
- Etiquetas — `Lead_quente_OTIMIZE`, `Outro_nicho`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Outro_nicho`

**Próximo estágio:**
SPIN dor.

**Por que essa resposta funciona:**
Dois casos de uso (serviço + produto), pergunta abre dor real.

---

### Sim #82 — "Produto químico B2B"
**Origem:** tráfego pago
**Persona:** Carlos, 48a, vendedor B2B
**Mensagem do lead:**
> "vendo produto quimico pra industria, b2b"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "B2B químico é mais técnico, Carlos. Honestamente: a gente funciona bem pra qualificação inicial (produto, volume, indústria), agendamento, envio de catálogo. Negociação fina, cotação grande, contrato — vai pro humano. Faz sentido?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `nicho = quimico_b2b`
- Etiquetas — `Lead_quente_OTIMIZE`, `Outro_nicho`, `B2B`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Outro_nicho`
- `B2B`

**Próximo estágio:**
SPIN escopo.

**Por que essa resposta funciona:**
Honesto sobre limite (B2B alto ticket precisa humano), define escopo realista.

---

### Sim #83 — "Consultoria"
**Origem:** tráfego pago
**Persona:** Renata, 41a, consultora gestão
**Mensagem do lead:**
> "faço consultoria empresarial"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Consultoria roda. Agente qualifica (tamanho da empresa, área de dor, urgência), agenda diagnóstico, manda institucional. Você prospecta no LinkedIn ou WhatsApp direto?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `nicho = consultoria_empresarial`
- Etiquetas — `Lead_quente_OTIMIZE`, `Outro_nicho`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Outro_nicho`

**Próximo estágio:**
SPIN canal.

**Por que essa resposta funciona:**
Caso, qualifica origem.

---

### Sim #84 — "Vendo arte/quadros"
**Origem:** tráfego pago
**Persona:** Bia, 29a, artista visual
**Mensagem do lead:**
> "vendo quadros e prints minhas pelo whats"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Que demais, Bia. Agente manda portfólio (foto + tamanho + preço), recebe pedido, calcula frete, fecha venda. Você posta mais no Insta ou recebe direto no Whats?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `nicho = arte_visual`
- Etiquetas — `Lead_quente_OTIMIZE`, `Outro_nicho`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Outro_nicho`

**Próximo estágio:**
SPIN canal.

**Por que essa resposta funciona:**
Calor, aplicação direta, qualifica.

---

### Sim #85 — "Personal trainer 20 alunos"
**Origem:** tráfego pago
**Persona:** Lucas, 30a, personal
**Mensagem do lead:**
> "sou personal trainer, autonomo, tenho 20 alunos"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Personal autônomo com 20 alunos tá no limite, Lucas. Agente faria triagem novo aluno, envio de treino, cobrança mensal. Compensa quando você tá perdendo aluno por demora ou esquecimento. Tá rolando isso?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `nicho = personal_trainer`, `volume = 20 alunos`
- Etiquetas — `Lead_quente_OTIMIZE`, `Outro_nicho`, `Volume_baixo`

**Etiquetas aplicadas:**
- `Lead_quente_OTIMIZE`
- `Outro_nicho`
- `Volume_baixo`

**Próximo estágio:**
SPIN dor real. Sem dor concreta → filtro ICP.

**Por que essa resposta funciona:**
Honesto sobre fit no volume (20 = limite), condiciona à dor real, evita venda forçada.

---

# BLOCO 4 — Casos limites / edge cases (Sim #86-100)

---

### Sim #86 — Cantada / proposta romântica
**Origem:** tráfego pago
**Persona:** Anônimo, 30a
**Mensagem do lead:**
> "quero a dona da loja, casa comigo? rsrsrs"

**Resposta IDEAL do Ygor (Empório):**
> "Haha valeu! Aqui é só atendimento da loja mesmo. Você tá procurando alguma peça ou só passou pra puxar papo?"

**Habilidades acionadas:**
- Etiquetas — `Atendido_loja`, `Brincadeira`

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Brincadeira`

**Próximo estágio:**
Se intenção real → segue. Se brincar mais → encerra educado.

**Por que essa resposta funciona:**
Não embarca, sem lição de moral, devolve pergunta útil.

---

### Sim #87 — Só emoji
**Origem:** tráfego pago, primeira mensagem
**Persona:** Anônimo
**Mensagem do lead:**
> "😂😂😂"

**Resposta IDEAL do Ygor (Empório):**
> "Oi! Aqui é o Ygor, do Empório Stivanelli. Posso te ajudar com alguma peça? Conta o que tá procurando."

**Habilidades acionadas:**
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Sondagem. Silêncio total → re-engajamento 1h.

**Por que essa resposta funciona:**
Não tenta interpretar emoji, abre canal, pergunta direta.

---

### Sim #88 — Só reticências
**Origem:** tráfego pago
**Persona:** Anônimo, indeciso
**Mensagem do lead:**
> "..."

**Resposta IDEAL do Ygor (Empório):**
> "Oi! Aqui é o Ygor, do Empório Stivanelli. Pode escrever tranquilo o que você tá pensando — eu te ajudo."

**Habilidades acionadas:**
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Aguarda. Silêncio → re-engajamento.

**Por que essa resposta funciona:**
Convite suave, sem pressão.

---

### Sim #89 — Mensagem em inglês
**Origem:** estrangeiro ou cliente fingindo
**Persona:** Anônimo
**Mensagem do lead:**
> "do you have this dress in size M?"

**Resposta IDEAL do Ygor (Empório):**
> "Hi! This is Ygor from Empório Stivanelli. Yes, size M is available. Which dress are you looking at? Send a print so I can confirm color and price. We ship within Brazil only — are you here?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `idioma = ingles`
- Etiquetas — `Atendido_loja`, `Idioma_outro`

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Idioma_outro`

**Próximo estágio:**
Conforme localização — se Brasil, segue. Se exterior, info logística.

**Por que essa resposta funciona:**
Responde no idioma, mantém política (frete Brasil), checa geográfico.

---

### Sim #90 — "Esqueci o que ia perguntar"
**Origem:** tráfego pago
**Persona:** Joana, 26a, distraída
**Mensagem do lead:**
> "ai esqueci o que ia perguntar kkk"

**Resposta IDEAL do Ygor (Empório):**
> "Haha de boa! Tá procurando alguma peça em específico ou quer ver as novidades da semana?"

**Habilidades acionadas:**
- Etiquetas — `Atendido_loja`

**Etiquetas aplicadas:**
- `Atendido_loja`

**Próximo estágio:**
Sondagem.

**Por que essa resposta funciona:**
Light, ressuscita conversa com 2 opções.

---

### Sim #91 — Áudio de cliente 60+
**Origem:** tráfego pago
**Persona:** Dona Tereza, 60a
**Mensagem do lead (áudio transcrito):**
> "[ÁUDIO 22s] oi querida cê tá aí então olha eu vi um vestido da sua loja minha filha mandou pra mim eu queria saber se tem na cor amarela porque vou pra festa de uma amiga sabe?"

**Resposta IDEAL do Ygor (Empório):**
> "Oi Dona Tereza! Aqui é o Ygor. Que peça sua filha te mandou? Manda o print pra mim que eu checo se tem amarelo e te confirmo. Festa de amiga é sempre uma boa pedida."

**Habilidades acionadas:**
- Alterar Campo do Contato — `nome = Dona Tereza`, `ocasiao = festa amiga`, `cor_preferida = amarelo`
- Etiquetas — `Atendido_loja`, `Usa_audio`

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Usa_audio`

**Próximo estágio:**
Demonstração.

**Por que essa resposta funciona:**
Reconhece tudo do áudio, trata pelo nome (cliente 50+), pede o print pra continuar.

---

### Sim #92 — Imagem sem texto
**Origem:** tráfego pago
**Persona:** Mariana, 28a
**Mensagem do lead:**
> [IMAGEM — vestido azul-marinho de outra loja]

**Resposta IDEAL do Ygor (Empório):**
> "Adorei a referência! Tem caimento parecido com nosso Alessandra azul-marinho. Deixa eu confirmar o estoque dessa cor e te mando foto pra comparar. Qual seu manequim?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `interesse = vestido azul marinho`
- Acionar API — checar cor estoque
- Etiquetas — `Atendido_loja`, `Inspiracao_externa`

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Inspiracao_externa`

**Próximo estágio:**
Demonstração quando estoque confirmado.

**Por que essa resposta funciona:**
Não denigre foto de outra loja, traduz pra peça do catálogo, avança.

---

### Sim #93 — Cantada pesada
**Origem:** tráfego pago
**Persona:** Anônimo
**Mensagem do lead:**
> "vc eh gato? manda foto sua"

**Resposta IDEAL do Ygor (Empório):**
> "Aqui é atendimento da loja mesmo. Se você tem interesse em alguma peça, posso te ajudar — caso contrário, fica pra próxima."

**Habilidades acionadas:**
- Etiquetas — `Atendido_loja`, `Brincadeira`, `Encerramento_potencial`

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Brincadeira`

**Próximo estágio:**
Se insistir off-topic → encerra. Se voltar pra peça → segue.

**Por que essa resposta funciona:**
Limite firme sem ser ríspido, segunda chance pra conversa real.

---

### Sim #94 — "Passa whats do dono"
**Origem:** tráfego pago, suspeito
**Persona:** Anônimo
**Mensagem do lead:**
> "passa o whats do dono ai, quero falar com ele"

**Resposta IDEAL do Ygor (Empório):**
> "Posso te ajudar direto aqui — sou o ponto de contato oficial da loja. O que você precisa? Se for assunto que só o dono resolve, eu sinalizo pra ele e ele te chama."

**Habilidades acionadas:**
- Alterar Campo do Contato — `pediu_dono = sim`
- Etiquetas — `Atendido_loja`, `Pede_humano`

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Pede_humano`

**Próximo estágio:**
Qualifica assunto. Legítimo → transfere Igor. Spam → filtra.

**Por que essa resposta funciona:**
Não dá contato direto (protege Igor), oferece resolver, abre canal pra escalação real.

---

### Sim #95 — "Quero falar com humano"
**Origem:** lead já no OTIMIZE
**Persona:** Marcos, 39a
**Mensagem do lead:**
> "quero falar com gente, nao com bot"

**Resposta IDEAL do Ygor (OTIMIZE):**
> "Te entendo. Vou te transferir pro Igor diretamente — ele responde aqui mesmo. Me dá 2 minutos pra ele entrar. Ok?"

**Habilidades acionadas:**
- Alterar Campo do Contato — `motivo_handoff_humano = pediu humano`
- Etiquetas — `Precisa_humano`
- Transferir Atendimento → Igor

**Etiquetas aplicadas:**
- `Precisa_humano`

**Próximo estágio:**
**Transfere Igor** (prompt OTIMIZE Estágio 7).

**Por que essa resposta funciona:**
Aceita sem birra, dá prazo realista, prepara handoff humano limpo.

---

### Sim #96 — Spam ofertando outro serviço
**Origem:** lead suspeito
**Persona:** Vendedor SEO
**Mensagem do lead:**
> "ola, faço seu site aparecer no google primeiro lugar, posso te enviar proposta?"

**Resposta IDEAL do Ygor (Empório):**
> "Obrigado pela oferta. Esse canal é atendimento da loja, não compras corporativas. Se tiver interesse em parceria, encaminhe pelo email comercial. Bom dia."

**Habilidades acionadas:**
- Etiquetas — `Spam`, `Encerramento`
- Concluir Atendimento

**Etiquetas aplicadas:**
- `Spam`

**Próximo estágio:**
**Encerra.**

**Por que essa resposta funciona:**
Educado mas firme, redireciona, encerra sem perder tempo.

---

### Sim #97 — Procura emprego
**Origem:** tráfego pago
**Persona:** Camila, 23a
**Mensagem do lead:**
> "vcs tao contratando? to procurando emprego"

**Resposta IDEAL do Ygor (Empório):**
> "Obrigado pelo interesse, Camila! Esse canal é só comercial — pra vagas, vale mandar email pro RH (deixa eu confirmar o endereço com o time, te respondo em 2 minutos). Boa sorte!"

**Habilidades acionadas:**
- Acionar API — confirmar email RH com humano
- Etiquetas — `Atendido_loja`, `Procura_emprego`
- Concluir Atendimento

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Procura_emprego`

**Próximo estágio:**
**Encerra após confirmar email RH.**

**Por que essa resposta funciona:**
Acolhedor, redireciona sem inventar email, encerra positivo.

---

### Sim #98 — Pergunta filosófica
**Origem:** tráfego pago
**Persona:** Lead bizarro
**Mensagem do lead:**
> "qual o sentido da vida?"

**Resposta IDEAL do Ygor (Empório):**
> "Bonita pergunta haha. Aqui eu só sei sobre moda mesmo. Tá procurando alguma peça pra fazer o dia valer mais? Tem lançamento bonito chegando."

**Habilidades acionadas:**
- Etiquetas — `Atendido_loja`, `Brincadeira`

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Brincadeira`

**Próximo estágio:**
Sondagem. Se topar → segue. Se não → encerra leve.

**Por que essa resposta funciona:**
Humor, devolve pra contexto comercial, porta aberta.

---

### Sim #99 — Mensagem agressiva
**Origem:** tráfego pago, lead irritado
**Persona:** Anônimo
**Mensagem do lead:**
> "vcs sao uns ladroes, vendi vestido caro de tecido ruim"

**Resposta IDEAL do Ygor (Empório):**
> "Sinto muito ouvir isso. Me passa o número do pedido (#STIV-) que vou checar agora o que aconteceu. Vou também passar pro Igor olhar isso direto. Vamos resolver."

**Habilidades acionadas:**
- Alterar Campo do Contato — `flag = reclamacao_grave`
- Etiquetas — `Atendido_loja`, `Reclamacao_grave`, `Urgente`
- Acionar API — alertar Igor imediatamente
- Transferir Atendimento → Igor após pegar #pedido

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Reclamacao_grave`
- `Urgente`

**Próximo estágio:**
**Pega #pedido → Transfere Igor.** Conforme `base-conhecimento` seção 5 — cliente irritado é caso humano.

**Por que essa resposta funciona:**
Não defende a loja proativamente (não engrossa), pede dado, sinaliza humano.

---

### Sim #100 — "Esse Ygor é gostoso?"
**Origem:** tráfego pago
**Persona:** Anônima
**Mensagem do lead:**
> "esse Ygor que respondeu é gato? me passa o whats dele kkk"

**Resposta IDEAL do Ygor (Empório):**
> "Haha aqui é o próprio Ygor falando! Mas o canal é da loja mesmo. Você tá procurando alguma peça? Posso te ajudar com isso."

**Habilidades acionadas:**
- Etiquetas — `Atendido_loja`, `Brincadeira`

**Etiquetas aplicadas:**
- `Atendido_loja`
- `Brincadeira`

**Próximo estágio:**
Se voltar pra peça → segue. Persistir off-topic → encerra educado.

**Por que essa resposta funciona:**
Resposta clean e leve, mantém canal profissional, abre caminho pra venda.

---

# RELATÓRIO EXECUTIVO

## 1. Padrões de mensagem que dominam

**Top 5 categorias de primeira mensagem esperadas (baseado nas 100 simulações):**

1. **Pergunta-pílula seca (~30% Bloco 1):** "tem M?", "qual o preço?", "manda foto". Cliente com 1 linha e zero contexto. Estratégia: responder + pedir 1 dado pra avançar.

2. **Pergunta com contexto parcial (~25%):** "queria pra casamento sábado", "tô grávida sirve?", "presente pra minha mãe 50 anos". Cliente já trouxe ocasião — Ygor casa a ocasião com a peça certa do catálogo.

3. **Cliente comparativo / exploratório (~20%):** "qual a diferença de X pra Y", "tem em outras cores?", "qual está em alta?". Ygor consultor brilha — educa rapidinho com base de conhecimento, oferece curadoria.

4. **Gatilho de curiosidade IA (~15%, concentrado Bloco 2):** "é robô?", "que sistema é esse?", "queria isso pra minha loja". Crítico: detectar e disparar handoff sem revelar fachada.

5. **Edge cases / off-topic (~10%):** cantadas, spam, emojis soltos, agressividade, áudio confuso. Ygor mantém limite + redireciona.

---

## 2. Gaps descobertos nos prompts atuais

### Gap 1 — Tratamento de áudio
Prompt Empório não descreve o que fazer com áudio recebido (Sim #39, #91). Cliente 50+ e em movimento usa áudio com volume. **Sugestão:** adicionar instrução nos Estágios 1-2 do Empório: "Se receber áudio, a habilidade de transcrição já entrega o texto. Confirme entendimento com 'então você quer X, é isso?' antes de avançar".

### Gap 2 — Cliente revoltado / reclamação grave (suporte)
Sim #24, #39, #99 mostram clientes irritados pelo mesmo canal de venda. Prompt atual não tem um estágio claro de "atendimento de pós-venda problemático". **Sugestão:** criar **Estágio 3B — Suporte** no Empório: (a) acolher, (b) pedir #pedido, (c) checar rastreio via API, (d) escalar pra humano logística. A `base-conhecimento` seção 5 já lista esses casos como transferência humana — falta o fluxo prático no prompt.

### Gap 3 — Handoff borderline (Sim #41 — "quem responde aí?")
Lead pode estar testando IA OU pode ser apenas curioso casual. Prompt atual dispara ou não dispara handoff de forma binária. **Sugestão:** introduzir estado intermediário **"suspeita_IA"** — aplica etiqueta de monitoramento, mantém fachada Empório por mais 1-2 trocas, e só transfere se o lead persistir.

### Gap 4 — Filtro ICP por volume não tem corte numérico claro
Sim #49, #54, #85 mostram lojistas com volume baixo. Prompt OTIMIZE faz filtro só em "tem loja: sim/não". **Sugestão:** no SPIN, adicionar pergunta de volume explícita ("uns 50+ leads/mês?") e corte mínimo claro pra (a) encaminhar pro CHATBOT R$ 497, (b) descartar como sem fit, ou (c) marcar `Reativar_futuro`.

### Gap 5 — Indicação sem trilha especial
Sim #65 (Lúcia indicou) deveria seguir trilha diferente do lead frio. Prompt trata indicação igual. **Sugestão:** campo `origem_lead = indicacao_X` + etiqueta `Indicacao_quente` pulando direto pra SPIN curtíssimo (3 perguntas) e Estágio 6 (demo).

### Gap 6 — Plus size, gestante, manequim 48+
Sim #9, #34 mostram que o catálogo precisa estar **annotado** com restrições/possibilidades. A `base-conhecimento` atual lista tamanhos típicos por peça (P-GG ou PP-GG) mas não tem flag explícita pra gestante ou GG estendido. **Sugestão:** Igor enriquece base com tags por peça: `gestante_ok: sim`, `manequim_max: 46`, `tem_PP: sim/nao`. Assim o agente não inventa numeração.

### Gap 7 — Inconsistência preço/condições entre `ygor-emporio-stivanelli.md` e `base-conhecimento-emporio.md`
Prompt antigo (linha 162) diz **4x sem juros**. Base de conhecimento atual (`base-conhecimento` 2) diz **3x sem juros**. Risco: agente vai confundir conforme qual contexto pegar primeiro. **Sugestão:** Igor decide qual valor é o vigente e ALINHA os dois arquivos antes do go-live. Estas simulações já assumem 3x (instrução vigente).

### Gap 8 — Cross-canal pós-venda
Sim #52, #53 levantam: cliente que veio do ML / Shopee e abre Whats pode estar com pergunta sobre pedido (não nova venda). **Sugestão:** Ygor pergunta na primeira mensagem se é pedido novo ou pós-venda — economiza ciclo.

### Gap 9 — Outros nichos = explosão de casos
Bloco 3 (Sim #71-85) — 15 nichos diferentes (advocacia, vet, oficina, salão, B2B...). Ygor-OTIMIZE precisa de **mini-templates por nicho** ou atende mal. **Sugestão:** criar tabela na base de conhecimento OTIMIZE com 15-20 nichos + caso de uso pronto.

### Gap 10 — @ do Instagram e email RH não estão na base
Sim #36 (@ do Insta) e Sim #97 (email RH) — agente cairia em "inventar" se não tivesse fallback. Hoje a `base-conhecimento` não tem esses campos. **Sugestão:** Igor adiciona seção "Canais oficiais" na base com @ Insta, email RH, telefone fixo se houver.

---

## 3. Sugestões priorizadas para os prompts

### Prioridade ALTA (antes de subir produção)

1. **Resolver inconsistência 3x vs 4x** entre `ygor-emporio-stivanelli.md` linha 162 e `base-conhecimento-emporio.md` seção 2 — Igor confirma valor vigente, atualiza ambos.
2. **Adicionar Estágio 3B (Suporte)** no Ygor-Empório com fluxo reclamação/atraso/troca.
3. **Adicionar instrução de tratamento de áudio** em ambos agentes.
4. **Criar tabela de nichos com caso de uso** na base OTIMIZE (mínimo 10 nichos do Bloco 3).
5. **Definir corte mínimo volume ICP** no Ygor-OTIMIZE (sugestão: 50 leads/mês ou faturamento R$ 15k/mês).

### Prioridade MÉDIA (primeira revisão pós-go-live)

6. **Estado intermediário "suspeita_IA"** para handoff borderline.
7. **Trilha especial pra indicação** com SPIN abreviado.
8. **Annotar catálogo Empório** com tags (gestante, plus size, tecido, ocasião).
9. **Adicionar canais oficiais** (@ Insta, email RH) na base de conhecimento.
10. **Resposta padrão pra spam / cantada / off-topic** (lista de respostas-modelo).

### Prioridade BAIXA (otimização contínua)

11. **Política de idioma estrangeiro** (Sim #89) — responde em inglês? Redireciona?
12. **Template Meta de reativação financeira** (Sim #38 — quem adiou por dinheiro).
13. **Variação de tom para 50+** — Dona Tereza (Sim #91), Dona Inês (Sim #19) merecem tratamento mais formal.

---

## 4. Mapa de etiquetas consolidado (28 etiquetas usadas)

Frequência aproximada nas 100 simulações:

| Etiqueta | Frequência | Quando aplica |
|---|---|---|
| `Atendido_loja` | 80% | Toda primeira interação Empório |
| `Lead_quente_OTIMIZE` | 25% | Após handoff bem-sucedido |
| `Outro_nicho` | 15% | Bloco 3 |
| `Tem_loja_propria` | 10% | Lead lojista identificado |
| `Pergunta_IA` | 4% | Gatilho direto sobre IA |
| `Elogiou` | 3% | Gatilho elogio |
| `Presente` | 4% | Compra pra terceiro |
| `Loja_fisica` | 3% | Quer prova ou retirada |
| `Plus_size` | 2% | Manequim 46+ |
| `Sem_fit_ICP` | 5% | Filtro pré-pitch |
| `Precisa_humano` | 4% | Escala pra Igor |
| `Spam` / `Brincadeira` / `Procura_emprego` | 7% | Edge cases |
| `Urgente` | 3% | Casamento/evento próximo |
| `Reclamacao_grave` | 2% | Pós-venda problema |
| `SPIN_concluido` / `Pitch_feito` | 8% | Funil OTIMIZE avançado |
| `Hot` | 3% | Lead super quente |
| `Recuperacao` | 1% | Cliente revoltado |
| `Aguardando_orcamento` | 1% | Adiou por dinheiro |
| `Follow_up_silencio` | 3% | Lead sumiu pós-preço |
| `Inspiracao_externa` | 1% | Mandou foto de outra loja |
| `Suporte` / `Pos_venda` | 3% | Pós-venda neutro |
| `Migracao_API` | 2% | Lead usa Whats Business comum |
| `Cuidado_etica` | 1% | Advogado / médico |
| `Idioma_outro` | 1% | Mensagem em inglês/espanhol |

**Sugestão operacional:** Igor cria essas 28 etiquetas previamente na Helena pra os agentes terem onde aplicar (senão a habilidade `Etiquetas` falha).

---

## 5. Métricas-alvo pra acompanhar nas primeiras 100 conversas reais

1. **Acurácia do gatilho de handoff:** das mensagens que mencionaram "IA", "robô", "sistema", "quero pra minha loja" — quantas dispararam handoff? **Alvo: 95%.**
2. **Falsos positivos de handoff:** clientes comuns transferidos por engano. **Alvo: < 5%.**
3. **Taxa handoff → demo agendada:** **Alvo (Igor): 25%.**
4. **Tempo médio primeira resposta:** **Alvo < 10s.**
5. **Resolução em uma janela 24h:** % leads que fecharam ou desistiram dentro da janela. **Alvo: 70%.**
6. **Taxa de "deixa eu confirmar com o time":** quantas vezes o agente aciona humano por falta de dado na base. **Alvo: < 15%** (acima disso indica base de conhecimento incompleta).

---

## 6. Próximos passos sugeridos pro Igor

1. **Revisar os 10 gaps** dessa análise e decidir quais entram antes do go-live.
2. **Resolver inconsistência 3x vs 4x** já no commit imediato.
3. **Criar as 28 etiquetas** na Helena (lista item 4).
4. **Enriquecer base de conhecimento** Empório com tags por peça (gestante, plus size, ocasião).
5. **Adicionar tabela de nichos** na base OTIMIZE.
6. **Rodar 5-10 simulações com pessoas reais** (familiares, amigos) usando esses 100 cenários como roteiro — registrar onde o agente trava.
7. **Definir campos customizados na Helena**: `interesse_produto`, `manequim`, `motivo_handoff`, `tem_loja`, `faturamento_mensal`, `dor_atual`, `reacao_revelacao`, `data_demo`, `motivo_perda`, `cidade`, `nicho`, `volume`, `flag`, `comprando_para`, `urgencia`.
8. **Configurar Calendly + Google Cal** antes do Estágio 6 OTIMIZE ir ao ar.
9. **Pipeline OTIMIZE Systems na Helena** com etapas: Lead quente → Revelado → SPIN concluído → Demo agendada → Demo realizada → Proposta enviada → Fechou / Perdeu.

---

> **Fim do documento. 100 simulações + relatório executivo prontos pra calibrar Ygor-Empório e Ygor-OTIMIZE.**
