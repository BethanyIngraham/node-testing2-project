// bring in database here

module.exports = {
    find,
    findById
}

function find() {
    return 'getting planets'
}

function findById(planet_id) {
    return `getting planet by id ${planet_id}`
}