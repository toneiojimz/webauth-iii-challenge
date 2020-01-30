const db = require('../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByUsername,
  findDepartmentUsers
};

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function findDepartmentUsers(department) {
  return db('users').where({ department });
}

function findByUsername(username) {
  return db('users').where({ username }).first();
}

