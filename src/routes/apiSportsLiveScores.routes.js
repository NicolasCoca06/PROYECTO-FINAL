import express from 'express';
import request from 'request';

const router = express.Router();

// GET fixtures with dynamic parameters
router.get('/fixtures/live', function(req, res) {
    // Fetch live fixtures or fixtures based on date and team filters
    const options = {
        method: 'GET',
        url: 'https://v3.football.api-sports.io/fixtures',
        qs: {
            live: 'all' // Get all live fixtures
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
            res.json(data);
        }
    });
});

export default router;
