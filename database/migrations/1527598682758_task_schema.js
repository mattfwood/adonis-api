'use strict';

const Schema = use('Schema');

class TaskSchema extends Schema {
  up() {
    this.create('tasks', table => {
      table.increments();
      table.timestamps();
      table.string('name');
      table.boolean('completed');
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
      table
        .integer('list_id')
        .unsigned()
        .references('id')
        .inTable('list');
    });
  }

  down() {
    this.drop('tasks');
  }
}

module.exports = TaskSchema;
