const router = require('express').Router();
const Planets = require('./planets-model');

router.get('/', (req, res) => {
    res.json('getting planets')
});

router.get('/:id', (req, res) => {
    res.json('getting planet')
});

module.exports = router;