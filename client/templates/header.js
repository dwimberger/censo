Template.Header.events({
    'click a.action-logout': function (e) {
      e.preventDefault();
      Meteor.logout();
    }
});
Template.Header.helpers ({
  hasDepartments: function() {
    return Roles.userIsInRole(Meteor.userId(), ['departments','admin'], Roles.GLOBAL_GROUP);
  },
  hasStorages: function() {
    return Roles.userIsInRole(Meteor.userId(), ['storages','admin'], Roles.GLOBAL_GROUP);
  },
  hasItems: function() {
    return Roles.userIsInRole(Meteor.userId(), ['items','admin'], Roles.GLOBAL_GROUP);
  },
  hasCaretakers: function() {
    return Roles.userIsInRole(Meteor.userId(), ['caretakers','admin'], Roles.GLOBAL_GROUP);
  },
  hasNoAuthorizations: function() {
	return !Roles.userIsInRole(Meteor.userId(),
	 ['items','storages','caretakers','departments','admin'], Roles.GLOBAL_GROUP);
  },
  isAdminUser: function() {
    return Roles.userIsInRole(Meteor.userId(), ['admin'], Roles.GLOBAL_GROUP);
  }
});
