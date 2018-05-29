'use strict';
const Group = use('App/Models/Group');

class GroupController {
  async new({ request, auth }) {
    // const group = new Group();
    const { name } = request.all();

    // get current user
    const user = await auth.getUser();

    // create new group
    const group = await Group.create({ name });

    // set current user's group_id to newly created group
    user.group_id = group.id;

    // save user
    await user.save();

    console.log(user);
    return group;
  }

  async show({ request, response, auth, params: { id } }) {
    const group = await Group.find(id);

    if (!group) {
      return response.status(404).json({
        message: 'Project not found',
        id,
      });
    }

    // populate group's users
    group.users = await group.users();

    return group;
  }
}

module.exports = GroupController;
