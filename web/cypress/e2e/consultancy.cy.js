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

        const discoveryChannels = [
            'Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo'
        ]

        discoveryChannels.forEach((channel)=>{
            cy.contains('label', channel)
             .find('input')
             .check()
             .should('be.checked')
        })

        cy.get('input[type="file"]')
        .selectFile('../cypress/fixtures/doc.pdf', { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
         .type('Preciso de ajuda com desenvolvimento web.')

        const techs = [
            'Cypress',
            'Selenium',
            'WebDriverIO',
            'Playwright',
            'Robot Framework',
        ]
    
        techs.forEach((tech)=>{
            cy.get('#technologies')
             .type(tech)
             .type('{enter}')
        })

        cy.contains('label', 'Tecnologias')
         .parent()
         .contains('span', 'Cypress')
         .should('be.visible')

        cy.contains('label', 'Li e aceito os termos de uso')
         .find('input')
         .check()

        cy.contains('button', 'Enviar formulário')
         .click()

        cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
         .should('be.visible')

        
})
   it.only('Deve verificar os campos obrigatórios', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.goTo('Formulários', 'Consultoria')

          cy.contains('button', 'Enviar formulário')
         .click()


       cy.contains('p', 'Digite nome e sobrenome')
       .should('be.visible')
       .and('have.class', 'text-red-400')
       .and('have.css', 'color', 'rgb(248, 113, 113)')

       cy.contains('p', 'Informe um email válido')
       .should('be.visible')
       .and('have.class', 'text-red-400')
       .and('have.css', 'color', 'rgb(248, 113, 113)')

       cy.contains('p', 'Você precisa aceitar os termos de uso')
       .should('be.visible')
       .and('have.class', 'text-red-400')
       .and('have.css', 'color', 'rgb(248, 113, 113)')


   })


})