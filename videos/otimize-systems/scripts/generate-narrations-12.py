"""
generate-narrations-12.py
=========================
Gera 12 narracoes TTS pt-BR para os videos OTIMIZE Systems (V1A..V3D).
Voz: pt-BR-AntonioNeural (masculino, jovem, consultivo).

Saida: public/voiceover/V<ID>-narration.mp3 (12 arquivos)

Execucao:
    cd C:\\Users\\win\\Downloads\\OTIMIZE\\videos\\otimize-systems
    python scripts/generate-narrations-12.py

Dependencia:
    pip install edge-tts
"""

import asyncio
from pathlib import Path

try:
    import edge_tts
except ImportError as exc:
    raise SystemExit(
        "ERRO: edge-tts nao instalado. Rode: pip install edge-tts"
    ) from exc


# ----------------------------------------------------------------------------
# Configuracoes
# ----------------------------------------------------------------------------
VOICE = "pt-BR-AntonioNeural"
PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = PROJECT_ROOT / "public" / "voiceover"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


# ----------------------------------------------------------------------------
# Roteiros (texto literal pra TTS)
# Rate entre +5% e +10% conforme briefing do Igor.
# ----------------------------------------------------------------------------
NARRACOES = {
    "V1A": {
        "rate": "+8%",
        "texto": (
            "Sete da noite. Sua loja fechou. "
            "Cliente manda mensagem: tem aquele vestido em M? "
            "Voce responde no dia seguinte. Treze horas depois. "
            "Cliente ja comprou no concorrente. "
            "Agora com OTIMIZE: agente responde em quinze segundos "
            "com foto, preco e link de pagamento. "
            "Cliente fecha. Teste gratis sete dias."
        ),
    },
    "V1B": {
        "rate": "+8%",
        "texto": (
            "Sua loja recebe a mesma pergunta cinquenta vezes por dia? "
            "Tem M? Tem M? Tem M? "
            "Voce gasta tres horas respondendo o trivial. "
            "E se um robo respondesse o basico "
            "e voce so falasse com quem compra? "
            "OTIMIZE responde cem por cento das duvidas em segundos. "
            "Voce foca no lead quente. Teste gratis."
        ),
    },
    "V1C": {
        "rate": "+8%",
        "texto": (
            "Dois lojistas. Mesmo produto. Mesmo cliente. "
            "Quem responde primeiro vende. Sempre. "
            "Voce responde em quatro horas. "
            "Concorrente em quinze segundos. "
            "OTIMIZE responde em quinze. "
            "Voce ganha sete a cada dez batalhas. Teste gratis sete dias."
        ),
    },
    "V1D": {
        "rate": "+8%",
        "texto": (
            "Sabado. Vinte e tres horas. "
            "Cliente quer comprar agora. "
            "Sua loja fechou as dezoito. "
            "Whatsapp no silencio. "
            "E se tivesse vendedor vinte e quatro horas? "
            "Agente IA fechou venda as vinte e tres e doze. "
            "Voce so viu segunda. Teste gratis."
        ),
    },
    "V2A": {
        "rate": "+6%",
        "texto": (
            "Setenta por cento dos clientes esperam resposta em menos de uma hora. "
            "Sua loja responde em quantas? "
            "Sua loja fechou, cliente espera, compra no concorrente. "
            "Mesma pergunta cinquenta vezes por dia. "
            "Mensagens sem resposta viram vendas perdidas. "
            "OTIMIZE responde em quinze segundos vinte e quatro horas. "
            "Manda foto, video, catalogo. Follow-up automatico. "
            "Imagina na sua loja. Teste gratis."
        ),
    },
    "V2B": {
        "rate": "+6%",
        "texto": (
            "Seu funcionario tira trinta dias de ferias por ano. "
            "Mais dias doente. Mais feriados. "
            "Vinte e sete por cento do ano sem atender. "
            "A IA OTIMIZE: zero dias sem atender. "
            "Atende em janeiro. Atende no Natal. "
            "Atende quando voce dorme. Teste gratis sete dias."
        ),
    },
    "V2C": {
        "rate": "+6%",
        "texto": (
            "Nove em cada dez mensagens nao respondidas viram venda perdida. "
            "Olha seu whatsapp agora. Quantas nao respondidas? "
            "OTIMIZE responde cem por cento em quinze segundos. "
            "Nenhuma mensagem perdida. Cada lead tratado. "
            "Conversao sobe. Teste gratis."
        ),
    },
    "V2D": {
        "rate": "+6%",
        "texto": (
            "Voce vende em quantos lugares? "
            "Mercado Livre. Shopee. Instagram. WhatsApp. "
            "Quatro caixas pra olhar. Quatro vezes mais trabalho. "
            "E se tudo respondesse sozinho em um so lugar? "
            "OTIMIZE conecta tudo. Responde tudo. "
            "Um lugar pra gerenciar. Voce foca em vender. Teste gratis."
        ),
    },
    "V3A": {
        "rate": "+5%",
        "texto": (
            "Voce reparou? Aquela conversa que acabou de ter "
            "com o Emporio Stivanelli. "
            "As boas vindas, o catalogo, a foto do vestido, o preco, "
            "o follow-up de compra. "
            "Tudo foi feito cem por cento por agente IA. "
            "Boas vindas. Catalogo. Foto. Negociacao. Pagamento. "
            "Imagina isso na sua loja. Teste gratis."
        ),
    },
    "V3B": {
        "rate": "+6%",
        "texto": (
            "Cliente dificil de atender? "
            "Pergunta tecido. Pergunta tamanho. Pergunta cuidados. "
            "Pergunta prazo. Pergunta pagamento. "
            "Cada resposta. Em segundos. Cem por cento IA. "
            "Vendedor humano levaria trinta minutos. "
            "IA: noventa segundos. Teste gratis."
        ),
    },
    "V3C": {
        "rate": "+7%",
        "texto": (
            "Domingo. Tres da manha. "
            "Cliente ve produto no Instagram. Manda mensagem. "
            "Agente responde em quinze segundos com foto e Pix. "
            "Cliente fecha. Voce dormindo. Loja vendendo. "
            "Quem trabalhou? Agente IA OTIMIZE. "
            "Quanto voce perdeu enquanto dormia ontem? Teste gratis."
        ),
    },
    "V3D": {
        "rate": "+6%",
        "texto": (
            "Esse tipo de cliente: to em duvida. "
            "manda outra foto. em P serve? tem desconto? "
            "frete gratis? vou pensar. "
            "Voce cansaria. IA nao cansa. "
            "Paciencia infinita. Zero mau humor. "
            "Mesmo padrao sempre. Lead nunca esfria. Teste gratis sete dias."
        ),
    },
}


# ----------------------------------------------------------------------------
# Geracao
# ----------------------------------------------------------------------------
async def gerar(video_id: str, texto: str, rate: str) -> None:
    """Gera 1 narracao MP3."""
    fname = f"{video_id}-narration.mp3"
    destino = OUTPUT_DIR / fname

    if destino.exists():
        tamanho_existente = destino.stat().st_size / 1024
        print(f"  [{video_id}] JA EXISTE ({tamanho_existente:.1f} KB) -- pulando")
        return

    try:
        communicate = edge_tts.Communicate(texto, VOICE, rate=rate, pitch="+0Hz")
        await communicate.save(str(destino))
        tamanho = destino.stat().st_size / 1024
        print(f"  [{video_id}] OK ({tamanho:.1f} KB, rate={rate})")
    except Exception as exc:
        print(f"  [{video_id}] ERRO: {exc}")


async def main() -> None:
    print("=" * 60)
    print("OTIMIZE Narration Generator (12 videos V1A..V3D)")
    print("=" * 60)
    print(f"Voz:     {VOICE}")
    print(f"Destino: {OUTPUT_DIR}")
    print(f"Total:   {len(NARRACOES)} narracoes")
    print()

    for video_id, dados in NARRACOES.items():
        await gerar(video_id, dados["texto"], dados["rate"])

    print()
    print("Concluido.")
    print(f"Verifique: {OUTPUT_DIR}")


if __name__ == "__main__":
    asyncio.run(main())
