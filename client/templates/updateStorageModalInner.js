Template.updateStorageModalInner.helpers({
	storageInScope: function() {
		return Session.get('storageInScope');
	}
});

Template.updateStorageModalInner.events({
  'click #doDeleteStorage': function (event) {
    event.preventDefault();
    var uuid =  $("#updateStorage input[name='uuid']").val();
    Meteor.call('storages.delete', Session.get('storageInScope')._id);
  },
  'click #doUpdateStorage': function (event) {
    event.preventDefault();
    var name =   $("#updateStorage input[name='name']").val();
    var description =   $("#updateStorage input[name='description']").val();
    var location =   $("#updateStorage input[name='location']").val();

    var storageDoc = {
      uuid: Session.get('storageInScope').uuid,
      name: name,
      description: description,
      location: location
    };
    Meteor.call('storages.update', storageDoc);
  }
});
