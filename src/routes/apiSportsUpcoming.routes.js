import express from 'express';
import request from 'request';

const router = express.Router();

// GET upcoming fixtures with pagination
router.get('/fixtures', function(req, res) {
    /* const { page = 1, limit = 15 } = req.query;
    const offset = (page - 1) * limit; */

    // Fetch upcoming fixtures
    const options = {
        method: 'GET',
        url: 'https://v3.football.api-sports.io/odds/live',
        qs: {
            next: 99, // Number of upcoming fixtures
        },
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '886ea29b15da1b3c6297acf6910fe5ae'
        }
    };

    request(options, function(error, response, body) {
        if (error) {
            res.status(500).send(error.message);
        } else {
            const data = JSON.parse(body);
            res.json(data);
            /* const fixtures = data.response;
            const paginatedFixtures = fixtures.slice(offset, offset + limit);
            res.json({
                fixtures: paginatedFixtures,
                total: fixtures.length,
                page: Number(page),
                limit: Number(limit)
            }); */
        }
    });
});

export default router;
