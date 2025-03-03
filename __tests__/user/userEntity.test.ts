import User from "../../src/modules/user/entity/User";

test("Should create user", async function() {
  const user = await User.create('Soteldo', 'soteldo@gmail.com', 'So123123.');

  expect(user).toBeDefined();
  expect(user.id).toBe(0);
  expect(user.getActive()).toBe(false);
  expect(user.getPassword()).not.toBe('abc123');
});


test('Should not create user if email is invalid or is field empty', async function() {
  await expect(() => 
    User.create('Soteldo', '', 'So123123.')
  ).rejects.toThrow("The field is empty"); 

  await expect(() => 
    User.create('Soteldo', 'soteldo7gmailcom', 'So123123.')
  ).rejects.toThrow("Invalid email"); 

});


test('Should not create user if username is invalid or is field empty', async function() {
  await expect(() => 
    User.create('', 'email@gmail.com', 'So123123.')
  ).rejects.toThrow("The field is empty");

  await expect(() => 
    User.create('so', 'email@gmail.com', 'So123123.')
  ).rejects.toThrow('Invalid username');
});


test('Should validate password', async function() {
  const user = await User.create('Soteldo', 'soteldo@gmail.com', 'So123123.');
  expect(user).toBeDefined();
  await expect(user.verifyPassword('So123123.')).resolves.toBe(true);
});

test('Should invalidate password', async function() {
  const user = await User.create('Soteldo', 'soteldo@gmail.com', 'So123123.');
  expect(user).toBeDefined();
  await expect(user.verifyPassword('.321321oS')).resolves.toBe(false);
});


test('Should change user password', async function() {
  const user = await User.create('Soteldo', 'soteldo@gmail.com', 'So123123.');
  expect(user).toBeDefined();

  const hashedPassword = user.getPassword();
  await user.changePassword('.321321oS');
  expect(user.getPassword()).not.toBe(hashedPassword);
});

test('Should active/inactivate user', async function() {
  const user = await User.create('Soteldo', 'soteldo@gmail.com', 'So123123.');
  expect(user).toBeDefined();

  expect(user.getActive()).toBe(false);

  //actived
  user.actived();
  expect(user.getActive()).toBe(true);

  //inactived
  user.inactive();
  expect(user.getActive()).toBe(false);  
});