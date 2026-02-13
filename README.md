# 🚀 Demo Inngest - Processamento em Background

Este é um exemplo prático de como usar o [Inngest](https://inngest.com) para processar tarefas em background com Next.js 15.

## 📋 O que este exemplo demonstra

- **Envio de emails em background**: Simula o processamento assíncrono de emails
- **Processo de boas-vindas**: Demonstra um workflow multi-etapas para onboarding de usuários
- **Interface de teste**: Formulários para testar as funcionalidades
- **Dashboard do Inngest**: Visualização das execuções e logs

## 🛠️ Tecnologias utilizadas

- **Next.js 15** - Framework React
- **Inngest** - Processamento de tarefas em background
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização

## 🚀 Como executar

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acesse a aplicação:**
   - Interface principal: [http://localhost:3000](http://localhost:3000)
   - Dashboard do Inngest: [http://localhost:3000/api/inngest](http://localhost:3000/api/inngest)

## 🧪 Como testar

### 1. Envio de Email
- Preencha o formulário "📧 Enviar Email" com:
  - **Para**: um email de exemplo
  - **Assunto**: assunto do email
  - **Mensagem**: conteúdo do email
  - **ID do Usuário**: um identificador único
- Clique em "Enviar Email"
- Observe os logs no console do servidor

### 2. Processo de Boas-vindas
- Preencha o formulário "🎉 Boas-vindas ao Usuário" com:
  - **ID do Usuário**: identificador único
  - **Email**: email do usuário
  - **Nome**: nome do usuário
- Clique em "Enviar Boas-vindas"
- Observe o processamento multi-etapas nos logs

## 📁 Estrutura do projeto

```
src/
├── app/
│   ├── api/
│   │   ├── inngest/route.ts      # Endpoint do Inngest
│   │   ├── send-email/route.ts   # API para envio de email
│   │   └── welcome-user/route.ts # API para boas-vindas
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página inicial
├── components/
│   ├── EmailForm.tsx             # Formulário de email
│   └── WelcomeForm.tsx           # Formulário de boas-vindas
└── lib/
    ├── inngest.ts                # Configuração do cliente
    └── functions.ts              # Funções do Inngest
```

## 🔧 Funcionalidades implementadas

### Função de Envio de Email (`sendEmail`)
- Processa emails de forma assíncrona
- Simula delay de processamento
- Retorna status de sucesso

### Função de Boas-vindas (`welcomeUser`)
- Workflow multi-etapas:
  1. Envio de email de boas-vindas
  2. Criação de perfil do usuário
  3. Envio de email de configuração
- Demonstra o uso de `step.run()` para etapas sequenciais

## 📊 Monitoramento

- **Console do servidor**: Logs detalhados de cada execução
- **Dashboard do Inngest**: Interface web para visualizar execuções, retries e erros
- **Logs estruturados**: Cada função retorna informações sobre o processamento

## 🎯 Conceitos demonstrados

1. **Eventos**: Como disparar eventos para processamento em background
2. **Funções**: Como criar funções que processam eventos
3. **Steps**: Como dividir funções em etapas para melhor controle
4. **Retries**: O Inngest automaticamente tenta novamente em caso de falha
5. **Observabilidade**: Como monitorar execuções e debuggar problemas

## 📚 Próximos passos

- Integrar com serviços reais de email (SendGrid, Resend, etc.)
- Adicionar persistência de dados (banco de dados)
- Implementar autenticação de usuários
- Adicionar mais tipos de eventos e funções
- Configurar webhooks para notificações

## 🔗 Links úteis

- [Documentação do Inngest](https://inngest.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Inngest GitHub](https://github.com/inngest/inngest)
