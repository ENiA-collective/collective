const { isAuthorized } = require('../utils/auth-utils');
const User = require('../db/models/User');

exports.createUser = async (req, res) => {
  const { username, password, display_name, pronouns, pfp_src } = req.body;
  const usernameTaken = await User.findByUsername(username);
  if (usernameTaken) return res.send(false);
  // TODO: check if username is taken, and if it is what should you return?
  const user = await User.create(username, password, display_name, pronouns, pfp_src);
  req.session.userId = user.id;
  res.send(user);
};

exports.listUsers = async (req, res) => {
  const users = await User.list();
  res.send(users);
};

exports.showUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.find(id);
  if (!user) return res.sendStatus(404);

  res.send(user);
};

exports.updateUser = async (req, res) => {
  const { username, display_name, pronouns, bio, password, pfp_src } = req.body;
  const { id } = req.params;

  const usernameTaken = await User.findByUsername(username);
  if (usernameTaken && usernameTaken.id !== parseInt(id)) return res.send(false); // if users choose not to edit their username, they can keep it
  // Not only do users need to be logged in to update a user, they
  // need to be authorized to perform this action for this particular
  // user (users should only be able to change their own profiles)
  if (!isAuthorized(id, req.session)) return res.sendStatus(403);

  const updatedUser = await User.editUser(id, username, display_name, pronouns, bio, password, pfp_src);
  if (!updatedUser) return res.sendStatus(404);
  res.send(updatedUser);
};