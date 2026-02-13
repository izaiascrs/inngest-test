import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/lib/inngest";

export async function POST(request: NextRequest) {
  try {
    const { prompt, userId } = await request.json();

    if (!prompt || !userId) {
      return NextResponse.json(
        { error: "Prompt e userId são obrigatórios" },
        { status: 400 }
      );
    }

    console.log(`🚀 Enviando evento ai/recommendation.requested para usuário: ${userId}`);
    console.log(`📝 Prompt: ${prompt}`);

    const result = await inngest.send({
      name: "ai/recommendation.requested",
      data: {
        prompt,
        userId,
      },
    });

    console.log(`✅ Evento enviado com sucesso. Run ID: ${result.ids[0]}`);

    return NextResponse.json({
      success: true,
      message: "Recomendação solicitada com sucesso",
      runId: result.ids[0],
    });
  } catch (error) {
    console.error("Erro ao processar recomendação:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
