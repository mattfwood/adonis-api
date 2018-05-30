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

      return task;
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: error,
      });
    }
  }

  async update({ request, response, auth, params: { task_id } }) {
    try {
      const { updatedTask } = request.all();

      const user = await auth.getUser();
      const task = await Task.find(task_id);

      if (task.group_id !== user.group_id) {
        throw new Error('You don\'t have permission to edit this task');
      }

      // may be expanded to more keys later, but for now this is all we care about
      const relevantKeys = ['completed', 'name'];

      relevantKeys.forEach(key => {
        task[key] = updatedTask[key];
      });

      await task.save();

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
