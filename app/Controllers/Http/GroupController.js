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

  async show({ request, response, auth }) {
    // accepts a token and returns group info
    const { token } = request.all();
    const group = await Group.findBy('token', token);

    if (!group) {
      return response.status(404).json({
        message: 'Project not found',
      });
    }

    // populate group's users
    group.users = await group.users();

    return group;
  }

  async token({ request, response, auth }) {
    const user = await auth.getUser();

    if (!user) {
      return response.status(404).json({
        message: 'User not found',
      });
    }

    const group = await Group.find(user.group_id);

    if (!group) {
      return response.status(404).json({
        message: 'Project not found',
      });
    }

    return response.status(200).json({
      token: group.token,
    });
  }
}

module.exports = GroupController;
