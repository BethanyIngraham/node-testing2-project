const db = require('../../data/db-config');

module.exports = {
    find,
    findById
}

function find() {
    return db('planets')
}

function findById(planet_id) {
    return db('planets').where('planet_id', planet_id).first()
}