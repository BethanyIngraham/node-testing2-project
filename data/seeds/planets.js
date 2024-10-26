/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('planets').truncate()
  await knex('planets').insert([
    {planet_name: 'Mercury', planet_type: 'Terrestrial', position_from_sun: 1, number_of_moons: 0},
    {planet_name: 'Venus', planet_type: 'Terrestrial', position_from_sun: 2, number_of_moons: 0},
    {planet_name: 'Earth', planet_type: 'Terrestrial', position_from_sun: 3, number_of_moons: 1},
    {planet_name: 'Mars', planet_type: 'Terrestrial', position_from_sun: 4, number_of_moons: 2},
    {planet_name: 'Jupiter', planet_type: 'Gas Giant', position_from_sun: 5, number_of_moons: 95},
    {planet_name: 'Saturn', planet_type: 'Gas Giant', position_from_sun: 6, number_of_moons: 146},
    {planet_name: 'Uranus', planet_type: 'Ice Giant', position_from_sun: 7, number_of_moons: 28},
    {planet_name: 'Neptune', planet_type: 'Ice Giant', position_from_sun: 8, number_of_moons: 16}
  ]);
};
