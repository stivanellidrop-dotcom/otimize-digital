# PROMPT PRÓXIMA SESSÃO — Subprojeto 3B v2

**Como usar:** copia bloco abaixo e cola na nova sessão Claude Code no path `C:\Users\win\Downloads\OTIMIZE`.

---

```
Sócio, continuação Subprojeto 3B OTIMIZE Digital. Sessão anterior entregou 95% (3 agentes configurados, chatbot publicado, humanização funcionando, SPIN+pricing+CTA OK). Restam só finalizações.

Modo: sócio sênior autônomo. Caveman mode (terse). Não aceita derrota. Erro 3x → para, pesquisa docs, monta plano, recomeça.

Português pt-BR. Backup antes de mexer .md grande.

DOCS A LER PRIMEIRO (ordem):
1. docs/RELATORIO_FASE2_3B_2026-05-12.md — estado completo entrega anterior
2. docs/AUDIT_HELENA_2026-05-12.md — audit inicial
3. docs/HELENA_EXPERT_REFERENCE.md — referência técnica
4. docs/superpowers/specs/2026-05-12-subprojeto-3B-agentes-helena-design.md — SPEC completa
5. agentes/simulacoes-atendimento-100.md — 100 roteiros testes
6. agentes/ygor-emporio-stivanelli.md + ygor-otimize-systems.md + ygor-supervisor.md — prompts

IDs CRÍTICOS:
- Ygor-Empório: b2bde313-5132-4fbf-8635-c21db7b9bb87
- Ygor-OTIMIZE: fd2c94ce-55b0-4315-a0ce-058c2ff9bf8a
- Ygor-Supervisor: a4a72106-19eb-4f82-ab65-9fcb7be184fd
- Chatbot CRM-SDR YGOR: 007545bb-f37c-4e86-a90e-9054443b0d76
- Chatbot Calendly Link OTIMIZE: 40352872-9e37-4ca1-8160-9321fce7e4d7
- Browser Helena: OTIMIZE-Helena (886467b1-fd30-4495-9903-fc01788156b9)
- Tab WhatsApp Web: 278763050 (palavra-chave #crm)
- Calendly URL: https://calendly.com/meucontatopara/demo-otimize-15min

ESTADO ATUAL:
✅ 3 agentes configurados (gpt-5.2 Médio/Médio/Médio, equipe CRM-OTIMIZE, tokens 500/1500/200)
✅ 10 estágios conversa (5 Empório + 5 OTIMIZE)
✅ Chatbot CRM-SDR YGOR publicado
✅ Supervisor 3 estágios decisão (Recebe→Decide→Aciona)
✅ Prompts humanizados v2 (sem listas, tom WhatsApp SP)
✅ Bug 1 (2 msgs) fix aplicado nos prompts
✅ Bug 2 Calendly 75% feito (Chatbot Automação + Habilidade Acionar Fluxo)

PENDÊNCIAS (sua missão):

1. FINALIZAR BUG 2 (5min):
   - Abre https://otimize-crm.wts.chat/builder/chatbots/007545bb-f37c-4e86-a90e-9054443b0d76/edit
   - Card Ygor-OTIMIZE tem linha "enviar_link_calendly" embaixo
   - Drag saída desta linha pra criar nó "Enviar mensagem" OU conectar ao chatbot "Calendly Link OTIMIZE"
   - Clica Publicar topo direito
   - Se drag visual falhar via Chrome MCP, documenta + segue

2. TESTAR BUG 2 (5min):
   - WhatsApp tab 278763050, conversa Igor Stivanelli
   - Manda #fim → #crm → "tenho loja moda feminina quero ver demo"
   - Bot deve responder + enviar URL Calendly completa
   - Se URL vier: ✅ Bug 2 resolvido. Se não: tenta Plano C (Acionar API webhook)

3. RE-VALIDAR BUG 1 (10min):
   - Testar Empório com prompt v2 ("JAMAIS 2 msgs em sequência")
   - "oi tem vestido floral" → bot manda 1 msg + espera
   - Se ainda 2 msgs: adicionar regra mais forte ou trocar Esforço

4. 27 TESTES WHATSAPP (30min):
   Roteiros prontos em agentes/simulacoes-atendimento-100.md
   Priorizar (se contexto apertar):
   - 5 Empório varejo (vestido/blusa/calça/preço/PIX)
   - 5 Empório atacado (10+ peças, frete Curitiba, parcelado)
   - 5 OTIMIZE pricing (R$497/R$597/demo/contrato/cobertura)
   - 5 OTIMIZE edge cases (sem grana, já tem chatbot, quer falar sócio)
   - 5 Bot stress test (kkk, áudio, foto, inglês, irritado)
   Cada teste: #fim → #crm → mensagem → screenshot → resultado

5. ITERAR PROMPTS conforme bugs encontrados.

6. COMMIT FINAL:
   docs/RELATORIO_FASE2_3B_2026-05-12.md atualizado
   docs/RESULTADOS_30_TESTES_3B.md novo
   Push main https://github.com/stivanellidrop-dotcom/otimize-digital

REGRAS OPERACIONAIS:
- Browser OTIMIZE-Helena (886467b1). Não trocar.
- WhatsApp tab 278763050 mesmo browser. NUNCA mandar msg pra outra conversa que não Igor Stivanelli.
- Se conversa Igor Stivanelli travar: vai Atendimentos admin Helena → Concluir → volta WhatsApp + #crm
- Chrome MCP travar 3x: documenta + pula
- Cliente real do Igor em paralelo no WhatsApp: NÃO interromper, espera horário livre.

URLs ATIVAS:
- Helena admin: https://otimize-crm.wts.chat
- WhatsApp Web: https://web.whatsapp.com (logado (19) 98130-6507)
- Repo: https://github.com/stivanellidrop-dotcom/otimize-digital

VAI.
```

---

## Notas pra você (não cola)

- Repo tem TUDO que precisa
- Commits anteriores sessão: 51178d3, f453575, 9275180, 5fba232, 0b95071, 38719c2, 69b6d1d, c358c41, 8b41391
- Bug 2 status: 75% feito, falta drag manual Builder
- Estágios Supervisor: implementado via prompt objetivo (não tem aba Comportamento)
- Próxima sessão: testar Bug 2 + 27 testes + iterar = ~1h

Boa, sócio.
