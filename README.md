# Recuperação de senha

**RF**

- o usuário deve poder recuperar sua senha informando seu e-mail;
- o usuário deve receber um e-mail com instrução de recuperação de senha;
- o usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para teste de e-mail em ambiente de teste;
- utilizar Amazon SES para envios de e-mail em produção;
- O envio de email deve acontecer em segundo plano (background job)

**RN**

- o e-mail com instrução de recuperação de senha deve expirar 2h;
- o usuário precisa confirmar sua senha ao resetar sua senha;

# Atualizar perfil

**RF**

- o usuário deve poder atualizar seu nome, e-mail e senha
  **RNF**

**RN**

- O usuario não deve atualizar o email para um email ja utilizado;
- Para atualizar sua senha, o usuário deve informar sua senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# painel do prestador

**RF**

- O usuários deve poder lisualizar todos os horarios agendados por ele do dia selecionado;
- Prestador deve receber e visualizar uma notificação de um novo agendamento não lidas;

**RNF**

- OS agendamentos do prestador no dia devem ser armazenados em cache
- As notificações do prestador no dia devem ser armazenados em MongoDB e socket.io

**RN**

# Agendamentos de Serviço

**RF**

- O usuario deve poder listar todos prestadores de seviços cadastrados;
- Ao clicar no prestardor, o usuario deve poder visualisar os dias diponivel por mes;
- Ao clicar dia diponivel, o usuario deve poder visualisar os horarios diponivel do dia;
- O usuário deve poder realizar agendamento com o prestador

**RNF**

- A listagem de prestadores deve ser armazenada em cache

**RN**

- Cada agendamento por padrão, deve durar 1h exatamente;
- Os agendamentos devem esta por padrão, disponives entre 8h às 18h (Primeiro às 8h, útimo as 17h)
- O usuário não pode agendar em um hóraio ja ocupado ou passado e nenhem consigo mesmo;
