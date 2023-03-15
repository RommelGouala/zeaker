/* eslint-disable no-undef */
/// <reference types='Cypress' />



describe('Navbar', () => {
  beforeEach(()=>{
    cy.visit('/')
  })
  it('Navbigation Navbar Before Loggin', () => {

    cy.get('[data-cy="logo-home-route-navbar"]').as('logo-home-route').should('exist')
    cy.get('[data-cy="home-route-navbar"]').as('home-route').should('exist')
    cy.get('[data-cy="careers-route-navbar"]').as('careers-route').should('exist')
    cy.get('[data-cy="about-route-navbar"]').as('about-route').should('exist')
    cy.get('[data-cy="jobpost-route-navbar"]').should('not.exist').as('jobpost-route')
    cy.get('[data-cy="jobfeed-route-navbar"]').as('jobfeeed-route').should('exist')
    cy.get('[data-cy="button-logout-navbar"]').should('not.exist').as('button-logout-navbar')
    
    cy.get('@careers-route').should('exist').click()
    cy.location('pathname').should('eq','/signing')
    cy.get('@careers-route').go('back')
    cy.location('pathname').should('eq','/')
    cy.get('@about-route').click()
    cy.location('pathname').should('eq', '/About')
    cy.get('@about-route').go('back')
    cy.location('pathname').should('eq', '/')
    cy.get('@jobfeeed-route').click()
    cy.location('pathname').should('eq', '/jobfeed')
    cy.get('@jobfeeed-route').go('back')
    cy.location('pathname').should('eq', '/')
  })
})