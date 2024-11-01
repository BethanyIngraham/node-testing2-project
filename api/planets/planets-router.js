const router = require('express').Router();
const Planets = require('./planets-model');

router.get('/', async (req, res, next) => {
   try{
    const planets = await Planets.find();
    res.json(planets);
   } catch(err) {
    next(err);
   }
});

router.get('/:planet_id', async (req, res, next) => {
    try {
        const {planet_id} = req.params;
        const planet = await Planets.findById(planet_id);
        if(!planet) {
            res.status(404).json({
                message: 'Sorry, planet not found!'
            });
        } else {
            res.json(planet);
        }
    } catch(err) {
        next(err);
    }
});

module.exports = router;