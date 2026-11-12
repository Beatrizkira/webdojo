Cypress.Commands.add('postUser', (user) => {
  return cy.api({
    method: 'POST',
    url: 'http://localhost:3333/api/users/register',
    body: user,
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('getUsers', () => {
  return cy.api({
    method: 'GET',
    url: 'http://localhost:3333/api/users',
     headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('putUser', (userId, updateUser) => {
   return cy.api ({
            method: 'PUT',
            url: `http://localhost:3333/api/users/${userId}`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: updateUser,
            failOnStatusCode: false
        })
})