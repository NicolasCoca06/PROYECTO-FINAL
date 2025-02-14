import express from 'express';
import request from 'request';

const router = express.Router();

// Helper function to fetch odds for a fixture
function fetchOdds(fixtureId) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            url: 'https://v3.football.api-sports.io/odds/live',
            qs: {
                fixture: fixtureId
            },
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': '7dbd6cf666ed28a580f0f99c49416c8d'
            }
        };

        request(options, function(error, response, body) {
            if (error) {
                reject(error.message);
            } else {
                const data = JSON.parse(body);
                resolve(data);
            }
        });
    });
}

// GET upcoming fixtures and odds
router.get('/fixtures-odds', async function(req, res) {
    try {
        // Fetch fixtures
        const fixturesOptions = {
            method: 'GET',
            url: 'https://v3.football.api-sports.io/fixtures',
            qs: { live: 'all' },
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': '7dbd6cf666ed28a580f0f99c49416c8d'
            }
        };

        const fixturesResponse = await new Promise((resolve, reject) => {
            request(fixturesOptions, function(error, response, body) {
                if (error) {
                    return reject(error);
                }
                console.log('Fixtures Response:', body); // Imprime la respuesta de la API
                resolve(JSON.parse(body));
            });
        });

        const fixtures = fixturesResponse.response || [];

        if (fixtures.length === 0) {
            console.log('No fixtures found');
        }

        // Fetch odds for each fixture
        const fixturesWithOdds = await Promise.all(fixtures.map(async (fixture) => {
            try {
                const oddsData = await fetchOdds(fixture.fixture.id);
                return {
                    fixture,
                    odds: oddsData.api.odds || []  // Add odds data here
                };
            } catch (error) {
                console.error(`Error fetching odds for fixture ${fixture.fixture.id}:`, error);
                return {
                    fixture,
                    odds: []  // Return empty odds in case of an error
                };
            }
        }));

        res.json(fixturesWithOdds);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
