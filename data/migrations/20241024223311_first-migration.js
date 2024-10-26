/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('planets', table => {
    table.increments('planet_id')
    table.string('planet_name').notNullable().unique()
    table.string('planet_type')
    table.integer('position_from_sun')
    table.integer('number_of_moons')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('planets')
};
