import Schema from 'ember-cli-mirage/schema';
import Model from 'ember-cli-mirage/model';
import Db from 'ember-cli-mirage/db';

module('mirage:schema');

test('it can be instantiated', function(assert) {
  var schema = new Schema(new Db());
  assert.ok(schema);
});

test('it can create models', function(assert) {
  var schema = new Schema(new Db());

  var User = Model.extend();
  schema.register('user', User);

  var user = schema.user.create({name: 'Link'});

  assert.ok(user instanceof Model);
  assert.ok(user instanceof User);
  assert.deepEqual(user.attrs, {id: 1, name: 'Link'});
});

test('it can return all models', function(assert) {
  var db = new Db();
  db.createCollection('users');
  db.users.insert([{id: 1, name: 'Link'}, {id: 2, name: 'Zelda'}]);
  var schema = new Schema(db);

  var User = Model.extend();
  schema.register('user', User);

  var users = schema.user.all();

  assert.ok(users[0] instanceof User);
  assert.equal(users.length, 2);
  assert.deepEqual(users[1].attrs, {id: 2, name: 'Zelda'});
});

test('it can find models', function(assert) {
  var db = new Db();
  db.createCollection('users');
  db.users.insert([{id: 1, name: 'Link'}, {id: 2, name: 'Zelda'}]);
  var schema = new Schema(db);

  var User = Model.extend();
  schema.register('user', User);

  var zelda = schema.user.find(2);

  assert.ok(zelda instanceof User);
  assert.deepEqual(zelda.attrs, {id: 2, name: 'Zelda'});
});
