'use strict';

const Model = use('Model');

class Group extends Model {
  /**
   * @method users
   *
   * @return {Object}
   */
  users() {
    return this.hasMany('App/Models/User');
  }
}

module.exports = Group;
