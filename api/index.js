const express = require('express');
const cors = require('cors'); // Corrigido: era "required('cors')"
const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const app = express();
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not configured');
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const port = 3333;

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
  console.log(err)

  if(err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Invalid JSON format'})
  }
  next()
})

app.get('/', (req, res) => {
  res.json({ message: 'API do curso Hello Ninja do Cypress!' });
});

app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body ?? {};

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
    // Check if user already exists
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Create new user record
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already registered' });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching users' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  console.log(req.params.id)

  const {id} = req.params

  const {name, email, password} = req.body

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  console.log(req.body)

  try {
    await prisma.user.update({
      where: {id: Number (id)},
      data: {
        name,
        email,
        password
      }
    })
     res.status(204).end()

  } catch (error) {
    res.status(500).json({error:'Error updating user :(' })
  }
 

  res.end()
 });

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});