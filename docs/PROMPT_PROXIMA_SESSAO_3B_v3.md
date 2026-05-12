# PROMPT PRÓXIMA SESSÃO — Subprojeto 3B v3 (pós-Fase 3)

**Como usar:** copia bloco abaixo e cola em nova sessão Claude Code no path `C:\Users\win\Downloads\OTIMIZE`.

---

```
Sócio, Subprojeto 3B OTIMIZE Digital pós-Fase 3 concluida.

✅ Já feito (commits 429382b + Fase 3):
- 3 agentes Helena configurados (Ygor-OTIMIZE-Systems, Ygor-Emporio-Stivanelli, Ygor-Supervisor)
- Chatbot CRM-SDR YGOR publicado (ID 007545bb-f37c-4e86-a90e-9054443b0d76, draft a55e7785-1e80-41bc-9709-f3bbe468ad9c)
- Bug 1 fix (1 msg/turno) aplicado nos prompts
- Bug 2 RESOLVIDO: drag visual no Builder criou Novo Grupo 8 com Enviar mensagem + URL Calendly funcionando
- Validação WhatsApp Igor Stivanelli: Bot envia URL https://calendly.com/meucontatopara/demo-otimize-15min após qualificação SPIN

Modo: sócio sênior autônomo. Caveman terse. Erro 3x → para, pesquisa, replaneja.

DOCS A LER PRIMEIRO:
1. docs/RELATORIO_FASE3_3B_2026-05-12.md — estado atual + issues pendentes
2. docs/RELATORIO_FASE2_3B_2026-05-12.md — entrega anterior
3. docs/HELENA_EXPERT_REFERENCE.md — referência técnica
4. agentes/simulacoes-atendimento-100.md — roteiros testes
5. agentes/ygor-emporio-stivanelli.md + ygor-supervisor.md — prompts atuais

PENDÊNCIAS:

1. INVESTIGAR EMPÓRIO FOLLOW-UP (crítico, 30min):
   - Bot Empório responde saudação ("Oi! Aqui é Ygor do Empório") mas NÃO responde mensagens follow-up sobre produtos
   - Plano: abrir Helena admin → Atendimentos → conversa Igor Stivanelli → verificar status (concluído ou aberto?)
   - Se "concluído" automático: ajustar Aguardar mensagens do Ygor-Supervisor (tempo limite muito curto?)
   - Se "aberto" mas sem resposta: bot Empório travou — testar prompt no playground Helena

2. REFINAR PROMPT SUPERVISOR (15min):
   - Issue: Supervisor roteou "oi tem vestido floral" pra OTIMIZE em vez de Empório (palavra-chave #crm prévia)
   - Ajustar prompt: dar mais peso a intenção comercial (comprar vestido = Empório SEMPRE) e menos peso a #crm
   - Editar agentes/ygor-supervisor.md + aplicar no Helena admin

3. 27 TESTES WHATSAPP (40min):
   Roteiros em agentes/simulacoes-atendimento-100.md. Priorizar:
   - 5 Empório varejo (vestido/blusa/calça/preço/PIX)
   - 5 Empório atacado (10+ peças, frete, parcelado)
   - 5 OTIMIZE pricing (R$497/R$597/demo/contrato/cobertura)
   - 5 OTIMIZE edge cases (sem grana, já tem chatbot, quer falar sócio)
   - 5 stress test (kkk, áudio, foto, inglês, irritado)
   Cada teste: #fim → #crm → mensagem → screenshot → resultado em docs/RESULTADOS_TESTES_3B.md

4. COMMIT FINAL: docs(3B): Fase 4 - testes + iteração final

IDs CRÍTICOS:
- Ygor-Empório: b2bde313-5132-4fbf-8635-c21db7b9bb87
- Ygor-OTIMIZE: fd2c94ce-55b0-4315-a0ce-058c2ff9bf8a
- Ygor-Supervisor: a4a72106-19eb-4f82-ab65-9fcb7be184fd
- Chatbot publicado: 007545bb-f37c-4e86-a90e-9054443b0d76
- Chatbot draft: a55e7785-1e80-41bc-9709-f3bbe468ad9c
- Browser Helena: OTIMIZE-Helena (886467b1-fd30-4495-9903-fc01788156b9)
- Calendly URL: https://calendly.com/meucontatopara/demo-otimize-15min

REGRAS:
- Browser OTIMIZE-Helena (886467b1). Não trocar.
- WhatsApp conversa Igor Stivanelli (pesquisar nome no campo busca). NUNCA mandar pra outro contato.
- Atendimento travado → Atendimentos Helena → Concluir → WhatsApp + #crm
- Chrome MCP travar 3x: pula + documenta
- Cliente real Igor em paralelo: não interromper

URLs:
- Helena admin: https://otimize-crm.wts.chat
- WhatsApp Web: https://web.whatsapp.com (logado (19) 98130-6507)
- Repo: https://github.com/stivanellidrop-dotcom/otimize-digital

VAI.
```

---

## Notas pra você (não cola)

- Commits da sessão Fase 3: 429382b (handoff v2) + commit final desta sessão (a fazer)
- Bug 2 100% resolvido — validado por teste real WhatsApp 18:06
- Bug 1 validado: bot Empório responde 1 msg saudação sem disparo duplo
- Pendência crítica: Empório não conversa sobre produtos após saudação (issue nova)
- Próxima sessão foco: estabilizar Empório + Supervisor + 27 testes

Boa, sócio.
