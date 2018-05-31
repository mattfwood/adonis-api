'use strict';
const User = use('App/Models/User');
const Group = use('App/Models/Group');

class UserController {
  async create({ request, auth }) {
    try {
      const body = request.post();
      const user = new User();
      const { username, email, password, token } = request.all();

      Object.assign(user, {
        username,
        email,
        password,
      });

      // if a token was included
      if (token !== '') {
        // find the group by the token and set the user's group to the same
        const group = await Group.findBy('token', token);
        user.group_id = group.id;
      }

      await user.save();

      const userToken = await auth.attempt(email, password);
      userToken.user = user.$attributes;
      delete userToken.user.password;

      return userToken;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async login({ request, auth, response }) {
    try {
      const { email, password } = request.post();
      const token = await auth.attempt(email, password);

      const user = await User.findBy('email', email);

      token.user = user.$attributes;
      delete token.user.password;

      return token;
    } catch (error) {
      console.error(error);
      response.status(500).json({
        message: error,
      });
    }
  }

  show({ auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return "You cannot see someone else's profile";
    }
    return auth.user;
  }

  async me({ auth, params }) {
    const user = await auth.getUser();
    delete user.password;

    const group = await Group.find(user.group_id);
    delete group.password;
    user.group = group;

    return user;
  }
}

module.exports = UserController;
