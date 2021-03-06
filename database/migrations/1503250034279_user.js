'use strict';

const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.increments();
      table
        .string('username', 80)
        .notNullable();
      table
        .string('email', 254)
        .notNullable()
        .unique();
      table.string('password', 60).notNullable();
      table.timestamps();
      table
        .integer('group_id')
        .unsigned()
        .references('id')
        .inTable('group');
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
