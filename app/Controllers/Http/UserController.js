'use strict';
const User = use('App/Models/User');

class UserController {
  async create({ request, auth }) {
    try {
      const body = request.post();
      const user = new User();
      const { email, password } = request.all();

      Object.assign(user, body);

      await user.save();

      console.log(user);

      const token = await auth.attempt(email, password);
      token.user = user.$attributes;
      delete token.user.password;

      return token;
    } catch (error) {
      console.error(error);
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
    return user;
  }
}

module.exports = UserController;
