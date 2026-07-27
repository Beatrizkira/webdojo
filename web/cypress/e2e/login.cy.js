describe('template spec', () => {
  it('passes', () => {
    cy.viewport(1920,1080)
    cy.visit('http://localhost:3000')
  })
})

describe('Login', ()=>{
  it ('Deve logar com sucesso', ()=> {
    cy.viewport(1440,900)
    cy.visit('http://localhost:3000')

    cy.get('#email').type('papito@webdojo.com')
    cy.get('#password').type('katana123')
  })
})