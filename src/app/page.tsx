"use client";

// ℹ️ Import the hook from the hooks sub-package:
import { useInngestSubscription } from "@inngest/realtime/hooks";
import { useState, useEffect } from "react";
import { fetchRealtimeSubscriptionToken } from "./actions/get-subscribe-token";

export default function Home() {
  const [userId, setUserId] = useState("123");
  const [prompt, setPrompt] = useState("Como fazer um bolo?");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // The hook automatically fetches the token from the server.
  // The server checks that the user is authorized to subscribe to
  // the channel and topic, then returns a token:
  const { data, error, freshData, state, latestData } = useInngestSubscription({
    refreshToken: () => fetchRealtimeSubscriptionToken(userId),
  });

  // Debug: mostrar estrutura das mensagens
  useEffect(() => {
    if (data && data.length > 0) {
      console.log("📨 Mensagens recebidas:", data);
      data.forEach((message, index) => {
        console.log(`📋 Mensagem ${index + 1}:`, {
          timestamp: message.data.timestamp,
          response: message.data.response,
          success: message.data.success,
          fullMessage: message
        });
      });
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/ai/recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, userId }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`✅ ${result.message} (Run ID: ${result.runId})`);
      } else {
        setMessage(`❌ ${result.error}`);
      }
    } catch (err) {
      console.error("Erro ao processar recomendação:", err);
      setMessage("❌ Erro ao processar recomendação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Inngest Demo App
          </h1>
          <p className="text-xl text-gray-600">
            Exemplo da documentação oficial do Inngest Realtime
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">🔧 Configuração do Hook</h2>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
              User ID para o canal:
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o ID do usuário..."
            />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold mb-2">📊 Estado do Hook:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li><strong>State:</strong> {state}</li>
              <li><strong>Data length:</strong> {data?.length || 0}</li>
              <li><strong>Has error:</strong> {error ? "Sim" : "Não"}</li>
              <li><strong>Has fresh data:</strong> {freshData ? "Sim" : "Não"}</li>
              <li><strong>Latest data:</strong> {latestData ? "Sim" : "Não"}</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">🚀 Testar Recomendação</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
                Prompt:
              </label>
              <input
                type="text"
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite sua pergunta..."
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processando..." : "Gerar Recomendação"}
            </button>
          </form>

          {message && (
            <div className="mt-4 p-3 rounded-md bg-blue-50 border border-blue-200">
              <p className="text-blue-800">{message}</p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">📨 Mensagens Recebidas</h2>
            <div className="flex items-center gap-3">
              {data && data.length > 0 && (
                <div className="text-sm text-gray-600">
                  {data.length} etapa(s) concluída(s)
                </div>
              )}
              {data && data.length > 0 && (
                <button
                  onClick={() => window.location.reload()}
                  className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>
          
          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200">
              <p className="text-red-800">Erro: {error.message}</p>
            </div>
          )}
          
          {data && data.length > 0 ? (
            <div className="space-y-3">
              {data.map((message, i) => (
                <div key={i} className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-blue-600">
                      Etapa {i + 1}
                    </div>
                    <div className="text-xs text-blue-500">
                      {message.data.timestamp ? new Date(message.data.timestamp).toLocaleTimeString() : new Date().toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="text-blue-800 font-medium">
                    {message.data.response}
                  </div>
                  <div className="mt-2 text-xs text-blue-600">
                    Status: {message.data.success ? "✅ Sucesso" : "❌ Falha"}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">
              Nenhuma mensagem recebida ainda. Execute a função para ver as etapas em tempo real.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
