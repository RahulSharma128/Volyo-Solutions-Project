/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.up = function (knex) {
    return knex.schema.createTable('new', function (table) {
      table.increments('id').primary();
      table.timestamp('time-stamp').defaultTo(knex.fn.now());
      table.string('title');
      table.boolean('completed').defaultTo(false);
    });
  };
  
  /**
   * @param {import("knex").Knex} knex
   * @returns {Promise<void>}
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('new');
  };
  