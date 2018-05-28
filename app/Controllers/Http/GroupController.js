'use strict';
const Group = use('App/Models/Group');

class GroupController {
  async new({ request, auth }) {
    const group = new Group();
    // const body = request.post();
    const { name } = request.all();

    group.name = name;

    await group.save();

    console.log(group);

    return group;
  }
}

module.exports = GroupController;
