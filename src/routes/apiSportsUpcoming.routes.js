import express from 'express';
import request from 'request';

const router = express.Router();

// GET upcoming fixtures with optional date and team filters
router.get('/fixtures', function(req, res) {
    const date = req.query.date;
    const teamName = req.query.team;

    const options = {
        method: 'GET',
        url: 'https://v3.football.api-sports.io/fixtures',
        qs: {
            next: 99, // Number of upcoming fixtures
        },
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '7dbd6cf666ed28a580f0f99c49416c8d'
        }
    };

    request(options, function(error, response, body) {
        if (error) {
            res.status(500).send(error.message);
        } else {
            const data = JSON.parse(body);
            let filteredFixtures = data.response;

            if (date) {
                // Filter fixtures by date
                filteredFixtures = filteredFixtures.filter(fixture =>
                    new Date(fixture.fixture.date).toISOString().split('T')[0] === date
                );
            }

            if (teamName) {
                // Filter fixtures by team name
                filteredFixtures = filteredFixtures.filter(fixture =>
                    fixture.teams.home.name.toLowerCase().includes(teamName.toLowerCase()) ||
                    fixture.teams.away.name.toLowerCase().includes(teamName.toLowerCase())
                );
            }

            res.json({ response: filteredFixtures });
        }
    });
});

export default router;
