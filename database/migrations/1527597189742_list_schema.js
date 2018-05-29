'use strict';

const Schema = use('Schema');

class ListSchema extends Schema {
  up() {
    this.create('lists', table => {
      table.increments();
      table.timestamps();
      table.string('title').unique();
      table
        .integer('group_id')
        .unsigned()
        .references('id')
        .inTable('group');
      table
        .integer('creator_id')
        .unsigned()
        .references('id')
        .inTable('user');
    });
  }

  down() {
    this.drop('lists');
  }
}

module.exports = ListSchema;
