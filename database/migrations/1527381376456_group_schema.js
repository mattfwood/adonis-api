'use strict';

const Schema = use('Schema');

class GroupSchema extends Schema {
  up() {
    this.create('groups', table => {
      table.increments();
      table.timestamps();
      table.string('name');
      table.string('token', 60).notNullable();
    });
  }

  down() {
    this.drop('groups');
  }
}

module.exports = GroupSchema;
