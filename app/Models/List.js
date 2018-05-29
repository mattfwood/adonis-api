'use strict';

const Model = use('Model');

class List extends Model {
  group() {
    return this.belongsTo('App/Models/Group');
  }

  tasks() {
    return this.hasMany('App/Models/Task');
  }
}

module.exports = List;
