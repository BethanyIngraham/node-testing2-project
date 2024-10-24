const router = require('express').Router()

router.get('/', (req, res) => {
    res.json('getting planets')
})

router.get('/:id', (req, res) => {
    res.json('getting planet')
})

module.exports = router