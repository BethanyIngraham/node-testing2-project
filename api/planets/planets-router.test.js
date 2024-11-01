const db = require('../../data/db-config');
const request = require('supertest');
const server = require('../server');

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
}) 

describe('[GET] /planets', () => {
    test('responds with status 200 OK', async () => {
        const res = await request(server).get('/api/planets')
        expect(res.status).toBe(200)
    })
    test('responds with all the planets', async () => {
        const res = await request(server).get('/api/planets')
        expect(res.body).toHaveLength(8)
    })
    test('responds with empty array if no planets in database and status 200',
        async () => {
            await db('planets').truncate()
            const res = await request(server).get('/api/planets')
            expect(res.body).toEqual([])
            expect(res.status).toBe(200)
    })
    test('responds with and array of objects', async () => {
        const res = await request(server).get('/api/planets')
        expect(res.body).toBeInstanceOf(Array)
        res.body.forEach(planet => {
            expect(planet).toBeInstanceOf(Object)
        })
    })
    test('each obj contains id, name, type, position and num of moons properties',
        async () => {
            const res = await request(server).get('/api/planets')
            
            res.body.forEach(planet => {
                expect(planet).toEqual(expect.objectContaining({
                    planet_id: expect.any(Number),
                    planet_name: expect.any(String),
                    planet_type: expect.any(String),
                    position_from_sun: expect.any(Number),
                    number_of_moons: expect.any(Number)
                }))
            })
        }
    )
})

describe('[GET] /planets/:planet_id', () => {
    test('responds with proper status 200 OK', async () => {
        const [planet] = await db('planets')
        const existingPlanet = planet ? planet.planet_id : null
        const res = await request(server).get(`/api/planets/${existingPlanet}`)
        expect(res.status).toBe(200)
    })
    test('responds with status 404 if planet does not exist', async () => {
        const nonExistingPlanet = 1234
        const res = await request(server).get(`/api/planets/${nonExistingPlanet}`)
        expect(res.status).toBe(404)   
    })
    test('responds with proper error message: "Sorry, planet not found!"', async () => {
        const nonExistingPlanet = 1234
        const res = await request(server).get(`/api/planets/${nonExistingPlanet}`)
        expect(res.body.message).toBe('Sorry, planet not found!')   
    })
    test('returns planet object, not a collection', async () => {
        const [planet] = await db('planets')
        const existingPlanet = planet ? planet.planet_id : null
        const res = await request(server).get(`/api/planets/${existingPlanet}`)
        expect(res.status).toBe(200)
        expect(res.body).toBeInstanceOf(Object)
        expect(Array.isArray(res.body)).toBe(false)
    })
    test('returned obj has id, name, type, position and number of moons from database',
        async () => {
            const [planet] = await db('planets')
            const existingPlanet = planet ? planet.planet_id : null
            const expectedPlanet = await db('planets').where({planet_id: existingPlanet}).first()
            const res = await request(server).get(`/api/planets/${existingPlanet}`)
            expect(res.body).toEqual(expectedPlanet)
        }
    )
})
