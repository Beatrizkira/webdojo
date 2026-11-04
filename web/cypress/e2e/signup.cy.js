describe('Cadastro', () => {
  beforeEach(() => {
    cy.goToSignup()
  })

  it('Deve cadastrar um novo usuário', () => {
    cy.get('#name').type('Fernando Papito')
    cy.get('#email').type('papito@teste.com.br')
    cy.get('#password').type('123456')

    cy.contains('button', 'Criar conta').click()
      
  })
})