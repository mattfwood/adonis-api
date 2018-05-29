'use strict';
const Group = use('App/Models/Group');

class GroupController {
  async new({ request, auth }) {
    // const group = new Group();
    const { name } = request.all();

    // group.name = name;

    const user = await auth.getUser();
    const group = await Group.create({ name });
    await group.users().save(user);
    console.log(group);

    return group;
  }
}

module.exports = GroupController;
