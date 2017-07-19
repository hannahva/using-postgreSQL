
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('milestones', (table) => {
      table.increments();
      table.string('description');
      table.date('date_achieved');
    })
  ])
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('milestones')
  ])
};
