

describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário', () => {
    const user = {
      name: 'Wolverine',
      email: 'wolverine@teste.com.br',
      password: 'pwd123',
    };

    cy.task('deleteUserByEmail', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.user.id).to.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      );
      expect(response.body.message).to.eq('User registered successfully');
      expect(response.body.user.name).to.eq(user.name);
      expect(response.body.user.email).to.eq(user.email);
    });
  });

  it('Não deve cadastrar um email duplicado', () => {
    const user = {
      name: 'Wolverine',
      email: 'wolverine@teste.com.br',
      password: 'pwd123',
    };

    cy.task('deleteUserByEmail', user.email)
    
    cy.postUser(user).then((firstResponse) => {
      expect(firstResponse.status).to.eq(201);

      cy.postUser(user).then((duplicateResponse) => {
        expect(duplicateResponse.status).to.eq(409);
        expect(duplicateResponse.body.error).to.eq('Email already registered');
      });
    });
  });

  it('Deve exigir o campo name', () => {
    cy.postUser({ email: 'wolverine@teste.com.br', password: 'pwd123' }).then(
      (response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq('Name is required');
      },
    );
  });

  it('Deve exigir o campo email', () => {
    cy.postUser({ name: 'Wolverine', password: 'pwd123' }).then(
      (response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq('Email is required');
      },
    );
  });

  it('Deve exigir o campo password', () => {
    cy.postUser({ name: 'Wolverine', email: 'wolverine@teste.com.br' }).then(
      (response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq('Password is required');
      },
    );
  });

   it('Não deve passar quando o JSON está mal formatado', () => {
    const user = `{
      name: 'Fernando Papito',
      email: 'papito@teste.com.br',
      password: 'pwd123'
    }
    `;
   
    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq('Invalid JSON format');
    });
  });
});

Cypress.Commands.add('postUser', (user) => {
  return cy.api ({
    method: 'POST',
    url: 'http://localhost:3333/api/users/register',
    body:user,
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  })
})