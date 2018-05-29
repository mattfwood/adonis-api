'use strict';

const Model = use('Model');

class Group extends Model {
  static get hidden() {
    return ['password'];
  }

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
