'use strict';

const Model = use('Model');

class Task extends Model {
  list() {
    return this.belongsTo('App/Models/List');
  }
}

module.exports = Task;
