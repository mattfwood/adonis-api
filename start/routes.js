'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route');
const Database = use('Database');

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' };
});

Route.post('login', 'UserController.login');

Route.post('users/create', 'UserController.create');

// Route.get('users/:id', 'UserController.show').middleware('auth');

Route.get('users/me', 'UserController.me').middleware('auth');

Route.get('/groups', async ({ request, auth }) => {
  console.log(await auth.getUser());
  return await Database.table('groups').select('*');
});

Route.get('/groups/:id', 'GroupController.show');

Route.post('/groups/new', 'GroupController.new');

/**
 * LISTS
 */

Route.get('/lists', 'ListController.index');

Route.post('/lists/new', 'ListController.new');

/**
 * Tasks
 */

Route.post('/tasks/new', 'TaskController.new');
