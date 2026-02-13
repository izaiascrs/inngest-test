import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/lib/inngest";

export async function POST(request: NextRequest) {
  try {
    const { to, subject, body, userId } = await request.json();

    // Validar dados obrigatórios
    if (!to || !subject || !body || !userId) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Disparar evento para processamento em background
    await inngest.send({
      name: "email/send",
      data: {
        to,
        subject,
        body,
        userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Email adicionado à fila de processamento",
    });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
