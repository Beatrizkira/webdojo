const express = require('express');
const cors = require('cors'); // Corrigido: era "required('cors')"
const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const app = express();
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const port = 3333;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API do curso Hello Ninja do Cypress!' });
});

app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  try {
    // Verifica se o e-mail já está cadastrado
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Cria o novo usuário no banco PostgreSQL
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // Nota: Em produção, lembre-se de criptografar com bcrypt!
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao cadastrar usuário' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});