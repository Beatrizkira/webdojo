describe('Formulário de Consultoria', () => {

    it('Deve solicitar consultoria individual', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.goTo('Formulários', 'Consultoria')

        cy.get('input[placeholder="Digite seu nome completo"]').type('Fernando Papito')
        cy.get('input[placeholder="Digite seu email"]').type('papito@teste.com.br')
        cy.get('input[placeholder="(00) 00000-0000"]')
        .type('(11) 99999-9999')
        .should('have.value', '(11) 99999-9999')

        cy.contains('label','Tipo de Consultoria')
         .parent()
         .find('select')
         .select('Individual')

         //span[text()="Pessoa Física"]//
         cy.contains('label', 'Pessoa Física')
         .find('input')
         .click()

         cy.contains('label', 'Pessoa Jurídica')
         .find('input')
         .should('be.not.checked')

         cy.contains('label', 'CPF')
          .parent()
          .find('input')
          .type('71207448010')
          .should('have.value', '712.074.480-10')
        
})

})