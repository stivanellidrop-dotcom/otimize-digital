"""Gera 12 narrações pt-BR com 3 vozes alternadas (Antonio/Francisca/Thalita)."""

import asyncio
import edge_tts
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "voiceover"
OUT.mkdir(parents=True, exist_ok=True)

VOICES = {
    "antonio": "pt-BR-AntonioNeural",
    "francisca": "pt-BR-FranciscaNeural",
    "thalita": "pt-BR-ThalitaNeural",
}

ASSIGNMENT = {
    "V1A": ("antonio", "+8%"),
    "V1B": ("francisca", "+6%"),
    "V1C": ("thalita", "+7%"),
    "V1D": ("antonio", "+8%"),
    "V2A": ("francisca", "+6%"),
    "V2B": ("thalita", "+7%"),
    "V2C": ("antonio", "+6%"),
    "V2D": ("francisca", "+5%"),
    "V3A": ("thalita", "+5%"),
    "V3B": ("antonio", "+5%"),
    "V3C": ("francisca", "+6%"),
    "V3D": ("thalita", "+7%"),
}

SCRIPTS = {
    "V1A": "Sete da noite. Sua loja fechou. Cliente manda mensagem: tem aquele vestido em M? Você responde no dia seguinte. Treze horas depois. Cliente já comprou no concorrente. Agora com agente IA: resposta em quinze segundos com foto, preço e link de pagamento. Cliente fecha. Teste grátis sete dias.",
    "V1B": "Sua loja recebe a mesma pergunta cinquenta vezes por dia? Tem M? Tem M? Tem M? Você gasta três horas respondendo o trivial. E se um agente IA respondesse o básico e você só falasse com quem compra? OTIMIZE responde cem por cento em segundos. Você foca no lead quente. Teste grátis.",
    "V1C": "Dois lojistas. Mesmo produto. Mesmo cliente. Quem responde primeiro vende. Você responde em quatro horas. Concorrente em quinze segundos. Com OTIMIZE você responde em quinze. Você ganha sete a cada dez batalhas. Teste grátis sete dias.",
    "V1D": "Sábado. Vinte e três horas. Cliente quer comprar agora. Sua loja fechou às dezoito. Whatsapp no silêncio. E se tivesse vendedor vinte e quatro horas? Agente IA fechou venda às vinte e três e doze. Você só viu segunda. Teste grátis.",
    "V2A": "Setenta por cento dos clientes esperam resposta em menos de uma hora. Sua loja responde em quantas? Mensagens sem resposta viram vendas perdidas. OTIMIZE responde em quinze segundos vinte e quatro horas. Manda foto, vídeo, catálogo. Follow-up automático. Imagina na sua loja. Teste grátis.",
    "V2B": "Seu funcionário tira trinta dias de férias por ano. Mais dias doente. Mais feriados. Vinte e sete por cento do ano sem atender. A IA OTIMIZE: zero dias sem atender. Atende em janeiro. Atende no Natal. Atende quando você dorme. Teste grátis sete dias.",
    "V2C": "Nove em cada dez mensagens não respondidas viram venda perdida. Olha seu whatsapp agora. Quantas não respondidas? OTIMIZE responde cem por cento em quinze segundos. Nenhuma mensagem perdida. Cada lead tratado. Conversão sobe. Teste grátis.",
    "V2D": "Você vende em quantos lugares? Mercado Livre. Shopee. Instagram. WhatsApp. Quatro caixas pra olhar. Quatro vezes mais trabalho. E se tudo respondesse sozinho em um só lugar? OTIMIZE conecta tudo. Responde tudo. Você foca em vender. Teste grátis.",
    "V3A": "Você reparou? Aquela conversa que acabou de ter com o Empório Stivanelli. As boas vindas, o catálogo, a foto do vestido, o preço, o follow-up de compra. Tudo foi feito cem por cento por agente IA. Imagina isso na sua loja. Teste grátis.",
    "V3B": "Cliente difícil de atender? Pergunta tecido. Pergunta tamanho. Pergunta cuidados. Pergunta prazo. Pergunta pagamento. Cada resposta. Em segundos. Cem por cento IA. Vendedor humano levaria trinta minutos. IA: noventa segundos. Teste grátis.",
    "V3C": "Domingo. Três da manhã. Cliente vê produto no Instagram. Manda mensagem. Agente responde em quinze segundos com foto e Pix. Cliente fecha. Você dormindo. Loja vendendo. Quem trabalhou? Agente IA OTIMIZE. Quanto você perdeu enquanto dormia ontem? Teste grátis.",
    "V3D": "Esse tipo de cliente: tô em dúvida. Manda outra foto. Em P serve? Tem desconto? Frete grátis? Vou pensar. Você cansaria. IA não cansa. Paciência infinita. Zero mau humor. Mesmo padrão sempre. Lead nunca esfria. Teste grátis sete dias.",
}


async def gen_one(vid_id: str):
    voice_key, rate = ASSIGNMENT[vid_id]
    voice = VOICES[voice_key]
    text = SCRIPTS[vid_id]
    fname = OUT / f"{vid_id}-narration.mp3"
    comm = edge_tts.Communicate(text, voice, rate=rate, pitch="+0Hz")
    await comm.save(str(fname))
    size = fname.stat().st_size
    print(f"OK {vid_id} -> {voice_key} ({voice}) rate={rate}, {size} bytes")


async def main():
    for vid_id in SCRIPTS:
        await gen_one(vid_id)


asyncio.run(main())
