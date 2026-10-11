import { getTodayDate} from "../support/actions/utils"

describe('Login', ()=>{
  it ('Deve logar com sucesso', ()=> {

    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    //Não é legal utilizar classes de utilização , IDs são excelentes propriedades para utliza na automação de testes,
    //Copiar Xpath de inspencionar nãe é legal, o ideal é montar um Xpath//
    // Cypress não tem suporte nativo para Xpath//

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      //Should é uma espectativa, ele mostra que precisa estar visivel//
      // A gente pode pedir para o dev escrever o data.cy no código para criar uma propriedade para facilitar a automação de testes//
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

    cy.getCookie('login_date').should('exist')

    cy.getCookie('login_date').should((cookie) => {
      expect(cookie.value).to.eq(getTodayDate())
    })

    cy.window().then((win) => {
      const token = win.localStorage.getItem('token')
      expect(token).to.not.be.null
      expect(token).to.match(/^[a-fA-F0-9]{32}$/)
    })
  })
})

describe('Login', ()=>{
  it ('Não deve logar com senha inválida', ()=> {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana32')
 
    cy.contains('Acesso negado! Tente novamente.')
     .should('be.visible')
  })   
})

describe('Login', ()=>{
  it ('Não deve logar com e-mail inválido', ()=> {
    cy.start()
    cy.submitLoginForm('404@webdojo.com', 'katana123')

    cy.contains('Acesso negado! Tente novamente.')
     .should('be.visible')
  })   
})