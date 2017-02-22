Accounts.onCreateUser(function(options, user) {

  console.log('OPTS: %j, USER: %j', user);
  if (options.profile) {
    user.profile = options.profile;
  } else {
    user.profile = {};
  }
  user.profile.newUser = true;
  user.profile.level=0;
  if(!user.services) {
    user.services = {};
  }
  user.services.telegram = {
    uuid: Math.floor(Math.random() * 1000000000)*-1,
    username: 'unknown'
  };

  return user;
});
Accounts.onLogin(function(info) {
   console.log("onLogin fired");
 });
 
