require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Search - find_tickets no state filter', () => {
  zapier.tools.env.inject();

  it('should get an array with more than 1 element', async () => {
    const bundle = {
      authData: {
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
			filter: '[{"filters":[{"value":"TESTVALUE","propertyName":"vehicle","operator":"EQ"}]}]'
		},
    };

    const results = await appTester(
      App.searches['find_tickets'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.be.aboveOrEqual(1);
    results[0].should.have.property('id');
  });
  
  
});

describe('Search - find_tickets with state filter', () => {
  zapier.tools.env.inject();

  it('should get an array with 1 element containg ticket 161521798', async () => {
    const bundle = {
      authData: {
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
			filter: '[{"filters":[{"value":"TESTVALUE","propertyName":"vehicle","operator":"EQ"}]}]',
			state_inclusion: {
				4: 1
			}
		},
    };

    const results = await appTester(
      App.searches['find_tickets'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.equal(1);
    results[0].id.should.equal('161521798');
    results[0].properties.hs_pipeline_stage.should.equal('4');
  });
});

describe('Search - find_tickets with non-matching state filter', () => {
  zapier.tools.env.inject();

  it('should be an empty array', async () => {
    const bundle = {
      authData: {
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
			filter: '[{"filters":[{"value":"TESTVALUE","propertyName":"vehicle","operator":"EQ"}]}]',
			state_inclusion: {
				999999: 1
			}
		},
    };

    const results = await appTester(
      App.searches['find_tickets'].operation.perform,
      bundle
    );
    results.should.be.an.Array();
    results.length.should.equal(0);
    console.log(results);
  });
});
