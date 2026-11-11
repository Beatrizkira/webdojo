Cypress.Commands.add('postUser', (user) => {
  return cy.request({
    method: 'POST',
    url: '/api/users/register',
    body: user,
    failOnStatusCode: false,
  });
});