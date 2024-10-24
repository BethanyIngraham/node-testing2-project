// bring in database here

module.exports = {
    find,
    findById
}

function find() {
    return 'getting planets'
}

function findById(id) {
    return `getting planet by id ${id}`
}