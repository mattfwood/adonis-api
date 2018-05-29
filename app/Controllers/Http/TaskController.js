'use strict';
const Task = use('App/Models/Task');

class TaskController {
  async new({ request, response, auth }) {
    try {
      const { name, list_id } = request.all();

      const user = await auth.getUser();

      const task = await Task.create({
        name,
        completed: false,
        group_id: user.group_id,
        creator_id: user.id,
        list_id: parseInt(list_id, 10)
      });

      console.log(task);

      return task;
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: error,
      });
    }
  }
}

module.exports = TaskController;
