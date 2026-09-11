describe('Formulário de Consultoria', () => {
    beforeEach(() => {
        cy.login()
         cy.goTo('Formulários', 'Consultoria')
    })

    it('Deve solicitar consultoria individual', () => {

        const consultancyForm = {
            name: 'Fernando Papito',
            email:'papito@teste.com.br',
            phone: '(11) 99999-9999',
            consultancyType: 'Individual',
            personType: 'cpf',
            document: '71207448010',
            discoveryChannels: [
                'Instagram',
                'LinkedIn',
                'Udemy',
                'YouTube',
                'Indicação de Amigo'
         ],
         file: '../cypress/fixtures/doc.pdf',
         description: 'Preciso de ajuda com desenvolvimento web.',
         techs: [
            'Cypress',
            'Selenium',
            'WebDriverIO',
            'Playwright',
            'Robot Framework',
         ],
         terms: true
        }



        cy.get('input[placeholder="Digite seu nome completo"]').type('Fernando Papito')
        cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email)
        cy.get('input[placeholder="(00) 00000-0000"]')
        .type(consultancyForm.phone)

        //.should('have.value', '(11) 99999-9999')

        cy.contains('label','Tipo de Consultoria')
         .parent()
         .find('select')
         .select(consultancyForm.consultancyType)

        if (consultancyForm.personType === 'cpf') {
        
        }

         //span[text()="Pessoa Física"]//

          if (consultancyForm.personType === 'cpf') {
            cy.contains('label', 'Pessoa Física')
         .find('input')
         .click()

         cy.contains('label', 'Pessoa Jurídica')
         .find('input')
         .should('be.not.checked')

        
        }

         cy.contains('label', 'CPF')
          .parent()
          .find('input')
          .type(consultancyForm.document)
          .should('have.value', '712.074.480-10')

      
        consultancyForm.discoveryChannels.forEach((channel)=>{
            cy.contains('label', channel)
             .find('input')
             .check()
             .should('be.checked')
        })

        cy.get('input[type="file"]')
        .selectFile(consultancyForm.file, { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
         .type(consultancyForm.description)

        consultancyForm.techs.forEach((tech)=>{
            cy.get('#technologies')
             .type(tech)
             .type('{enter}')
        })

        cy.contains('label', 'Tecnologias')
         .parent()
         .contains('span', 'Cypress')
         .should('be.visible')


        if (consultancyForm.terms === true) {
            cy.contains('label', 'termos de uso')
             .find('input')
             .check()
        }

        cy.contains('button', 'Enviar formulário')
         .click()

        cy.get('.modal', { timeout: 7000})
         .should('be.visible')
         .find('.modal-content')
         .should('be.visible')

       // cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
        // .should('be.visible')

        
})

 it('Deve solicitar consultoria In Company', () => {

       const consultancyForm = {
            name: 'Fernando Papito',
            email:'papito@teste.com.br',
            phone: '(11) 99999-9999',
            consultancyType: 'In Company',
            personType: 'cnpj',
            document: '60176313000127',
            discoveryChannels: [
                'LinkedIn',
                
         ],
         file: '../cypress/fixtures/doc.pdf',
         description: 'Preciso de ajuda com desenvolvimento web.',
         techs: [
            'Cypress',
         ],
         terms: true
        }



        cy.get('input[placeholder="Digite seu nome completo"]').type('Fernando Papito')
        cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email)
        cy.get('input[placeholder="(00) 00000-0000"]')
        .type(consultancyForm.phone)

        //.should('have.value', '(11) 99999-9999')

        cy.contains('label','Tipo de Consultoria')
         .parent()
         .find('select')
         .select(consultancyForm.consultancyType)

        if (consultancyForm.personType === 'cnpj') {
            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .click()

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')
        }

        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(consultancyForm.document)
            .should('have.value', '60.176.313/0001-27')

      
        consultancyForm.discoveryChannels.forEach((channel)=>{
            cy.contains('label', channel)
             .find('input')
             .check()
             .should('be.checked')
        })

        cy.get('input[type="file"]')
        .selectFile(consultancyForm.file, { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
         .type(consultancyForm.description)

        consultancyForm.techs.forEach((tech)=>{
            cy.get('#technologies')
             .type(tech)
             .type('{enter}')
        })

        cy.contains('label', 'Tecnologias')
         .parent()
         .contains('span', 'Cypress')
         .should('be.visible')


        if (consultancyForm.terms === true) {
            cy.contains('label', 'termos de uso')
             .find('input')
             .check()
        }

        cy.contains('button', 'Enviar formulário')
         .click()

        cy.get('.modal', { timeout: 7000})
         .should('be.visible')
         .find('.modal-content')
         .should('be.visible')
    })

   it('Deve verificar os campos obrigatórios', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.goTo('Formulários', 'Consultoria')

          cy.contains('button', 'Enviar formulário')
         .click()


        cy.contains('label', 'Nome Completo')
         .parent()
         .find('p')
         .should('be.visible')
         .should('have.text', 'Campo obrigatório')
         .and('have.class', 'text-red-400')
         .and('have.css', 'color', 'rgb(248, 113, 113)')


         cy.contains('label', 'Email')
         .parent()
         .find('p')
         .should('be.visible')
         .should('have.text', 'Campo obrigatório')
         .and('have.class', 'text-red-400')
         .and('have.css', 'color', 'rgb(248, 113, 113)')



         
         cy.contains('label', 'termos de uso')
         .parent()
         .find('p')
         .should('be.visible')
         .should('have.text', 'Você precisa aceitar os termos de uso')
         .and('have.class', 'text-red-400')
         .and('have.css', 'color', 'rgb(248, 113, 113)')

   })

})