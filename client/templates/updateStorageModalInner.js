Template.updateStorageModalInner.helpers({
	storageInScope: function() {
		return Session.get('storageInScope');
	}
});

Template.updateStorageModalInner.events({
  'click #doDeleteStorage': function (event) {
    event.preventDefault();
    Meteor.call('storages.delete', Session.get('storageInScope')._id);
  },
  'click #doUpdateStorage': function (event) {
    event.preventDefault();
    var name =   $("#updateStorage input[name='name']").val();
    var description =   $("#updateStorage input[name='description']").val();
    var location =   $("#updateStorage input[name='location']").val();

    var storageDoc = {
      _id: Session.get('storageInScope')._id,
      name: name,
      description: description,
      location: location
    };
    Meteor.call('storages.update', storageDoc);
  }
});
