Meteor.publish('departments', function() {
    return Departments.find({});
});

Meteor.publish('storages', function() {
    return Storages.find({});
});

Meteor.publish('items', function() {
    return Items.find({});
});

Meteor.publish('caretakers', function() {
    return Caretakers.find({});
});

Meteor.publish("userData", function () {
	console.log('userData');
    var q = {};
	if (!Roles.userIsInRole(this.userId, ['admin'])) {
		q._id = this.userId;
	}
    return Meteor.users.find(q,
          {fields: {
              'services.telegram.username': 1,
              'services.google.id': 1,
              'services.google.name': 1,
              'services.google.email': 1,
              'services.ingress.username': 1,
              'profile.annotations': 1,
              'username': 1,
              'displayName': 1,
              'language': 1,
              'roles':1
            }
    	});

});

Meteor.publish('roles', function(){
    return Meteor.roles.find({});
});
