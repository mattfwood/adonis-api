'use strict';
const Group = use('App/Models/Group');
const List = use('App/Models/List');

class ListController {
  async index({ request, response, auth }) {
    try {
      const user = await auth.getUser();

      const lists = await List.query()
        .with('tasks')
        .where('group_id', user.group_id)
        .fetch();

      console.log(lists);

      if (!lists) {
        return response.status(404).json({
          message: 'Project not found',
        });
      }

      return lists;
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: error,
      });
    }
  }

  async new({ request, response, auth }) {
    try {
      const { title } = request.all();

      const user = await auth.getUser();

      const list = await List.create({
        title,
        group_id: user.group_id,
        creator_id: user.id,
      });

      console.log(list);

      return list;
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: error,
      });
    }
  }
}

module.exports = ListController;
