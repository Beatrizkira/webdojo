describe('DELETE /api/users/:id', () => {
  context('Remoção', () => {
    let userId;

    const user = {
      name: 'Bruce Banner',
      email: 'hulk@marvel.com',
      password: 'pwd123',
    };

    before(() => {
      cy.task('deleteUserByEmail', user.email)
        .then(() => cy.postUser(user))
        .then((response) => {
          userId = response.body.user.id;
        });
    });

    it('Deve remover um usuário existente', () => {
      cy.deleteUser(userId).then((response) => {
        expect(response.status).to.eq(204);
      });

      cy.getUsers().then((response) => {
        const deletedUser = response.body.find((listedUser) => listedUser.id === userId);
        expect(deletedUser).to.be.undefined;
      });
    });
  });

  context('Quando o id não existe', () => {
    let userId;

    const user = {
      name: 'Tony Stark',
      email: 'tony@marvel.com',
      password: 'pwd123',
    };

    before(() => {
      cy.task('deleteUserByEmail', user.email)
        .then(() => cy.postUser(user))
        .then((response) => {
          userId = response.body.user.id;
          return cy.task('deleteUserByEmail', user.email);
        });
    });

    it('Deve retornar 404 e user not found', () => {
      cy.deleteUser(userId).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.error).to.eq('User not found.');
      });
    });
  });
});
