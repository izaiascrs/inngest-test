import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/lib/inngest";

export async function POST(request: NextRequest) {
  try {
    const { userId, email, name } = await request.json();

    // Validar dados obrigatórios
    if (!userId || !email || !name) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Disparar evento para processamento em background
    await inngest.send({
      name: "user/welcome",
      data: {
        userId,
        email,
        name,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Processo de boas-vindas iniciado",
    });
  } catch (error) {
    console.error("Erro ao processar boas-vindas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
