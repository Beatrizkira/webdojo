describe ('Validações de Alertas em Javascript', () => {
    beforeEach(() => {
      cy.login()
      cy.goTo('Alertas JS', 'JavaScript Alerts')
    })

    it('Deve validar a mensagem de alerta', () => {

        cy.on('window:alert', (msg) => {
             expect(msg).to.equal('Olá QA, eu sou uma Alert Box!')
        })
        cy.log('todo')

        cy.contains('button', 'Mostrar Alert' ).click()
    })
})