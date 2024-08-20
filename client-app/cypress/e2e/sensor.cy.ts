describe('The Sensor Page', () => {

  beforeEach(() => {
    let sensorData: any = [];
  
    // Charger les données initiales de sensor.json avant chaque test
    cy.fixture('sensor.json').then((data) => {
      sensorData = data;
    });
  
    cy.intercept('GET', '/api/Monitor', { fixture: 'monitor.json' }).as('getData');

    // Intercepter les requêtes GET pour renvoyer la liste actuelle
    cy.intercept('GET', '/api/sensor', (req) => {
      req.reply(sensorData);
    }).as('getData');
  
    // Intercepter la requête DELETE et renvoyer une réponse simulée
    cy.intercept('DELETE', '/api/sensor/1', {
      statusCode: 200, // Simule une suppression réussie
      body: { message: 'Item deleted successfully' }
    }).as('deleteItem');
  
    // Intercepter la requête POST pour ajouter un nouveau capteur
    cy.intercept('POST', '/api/sensor', (req) => {
      const newSensor = {
        ...req.body,  // Ajouter les données du corps de la requête
        sensorName: 'Sensor 98'   // Simuler l'ajout d'un nouvel ID
      };
  
      // Ajouter le nouveau capteur aux données simulées
      sensorData.push(newSensor);
  
      // Répondre à la requête avec les données du nouveau capteur
      req.reply({
        statusCode: 200,
        body: newSensor
      });
    }).as('postItem');
  });

  it('successfully loads', () => {
    cy.visit('/capteurs')
    
    cy.get('tr td').contains('Sensor 1')
    cy.contains('🗑️').click()
    cy.get('.swal2-confirm').click()

    cy.contains('Suivant').click()
    cy.contains('Précédent').click()
    
    cy.contains('➕').click()
    cy.get('#sensor-id').clear()
    cy.get('#sensor-id').type('98')
    cy.get('#longitude').clear()
    cy.get('#longitude').type('0.000000000000060')
    cy.get('#latitude').clear()
    cy.get('#latitude').type('0.0000000000000060')
    cy.get('#destination').type('west')
    cy.get('#position').type('rue du chapeau rouge')
    cy.get('select').select('1')
    cy.contains('Ajouter').click()

  })
})