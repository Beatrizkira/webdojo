describe('PUT /api/users/:id', () => {
  context('Atualização', () => {
    let userId;

    const originalUser = {
      name: 'Peter Parker',
      email: 'parker@stark.com',
      password: 'pwd123456',
    };

    const updateUser = {
      name: 'Spiderman',
      email: 'spider@marvel.com',
      password: 'pwd123',
    };

    before(() => {
      cy.task('deleteUser', updateUser.email);
      cy.task('deleteUser', originalUser.email);

      cy.postUser(originalUser).then((response) => {
        cy.log(response.body.user.id);
        userId = response.body.user.id;
      });
    });

    it('Deve atualizar um usuário existente', () => {
      cy.putUser(userId, updateUser).then((response) => {
        expect(response.status).to.eq(204);
      });
    });

    after(() => {
      cy.getUsers().then((response) => {
        const spider = response.body.find((user) => user.id === userId);
        expect(spider).to.exist;
        expect(spider.name).to.eq(updateUser.name);
        expect(spider.email).to.eq(updateUser.email);
        expect(spider.password).to.eq(updateUser.password);
      });
    });
  });

  context('Campos obrigatórios', () => {
    let userId;

    before(() => {
      cy.task('deleteUser', 'storm@xmen.com');
      cy.task('deleteUser', 'wolverine@teste.com.br');

      cy.postUser({
        name: 'Wolverine',
        email: 'wolverine@teste.com.br',
        password: 'pwd123456',
      }).then((response) => {
        userId = response.body.user.id;
      });
    });

    it('Deve exigir o campo name', () => {
      const user = {
        email: 'storm@xmen.com',
        password: 'pwd123',
      };

      cy.putUser(userId, user).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq('Name is required');
      });
    });

    it('Deve exigir o campo email', () => {
      cy.putUser(userId, { name: 'Wolverine', password: 'pwd123' }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq('Email is required');
      });
    });

    it('Deve exigir o campo password', () => {
      cy.putUser(userId, { name: 'Wolverine', email: 'wolverine@teste.com.br' }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.error).to.eq('Password is required');
      });
    });
  });
});