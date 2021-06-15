/// <reference types="cypress" />

context('CEP', () => {
    before(() => {
        cy.visit('http://localhost:3001/form-cep')
    })
    it('shold return cep', () => {
        addressRequest()
        cy.get('[data-testid="cep"]').type('95555000')
        cy.wait('@resAddress')
        cy.get('[data-testid="bairro"]').should('have.value', 'Arroio Teixeira')
        cy.get('[data-testid="logradouro"]').should('have.value', 'Rua Arabutã')
    })
})

const addressRequest = () => {
    cy.server()
    cy.route({
        method: 'GET',
        url: `https://viacep.com.br/ws/95555000/json`,
        response: 'fixture:address.json'
    }).as('resAddress')
}