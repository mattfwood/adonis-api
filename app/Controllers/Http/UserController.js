'use strict';
const User = use('App/Models/User');

class UserController {
  async create({ request, auth }) {
    const body = request.post();
    const user = new User();
    const { email, password } = request.all();

    Object.assign(user, body);

    await user.save();

    console.log(user);

    const token = await auth.attempt(email, password);

    return token;
  }

  async login({ request, auth }) {
    const { email, password } = request.all();
    // const token = await auth.attempt(email, password);
    const user = await User.findBy('email', email);
    const token = await auth.generate(user);

    // append user info to token and remove password
    token.user = user.$attributes;
    delete token.user.password;

    return token;
  }

  show({ auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return 'You cannot see someone else\'s profile';
    }
    return auth.user;
  }
}

module.exports = UserController;
