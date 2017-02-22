Template.createStorageModalInner.helpers({
  uniqueId: function() {
    return Session.get('storageUuid');
  }
});
Template.createStorageModalInner.events({
  'click #doCreateStorage': function (event) {
    event.preventDefault();
    var uuid =  $("#createStorage input[name='uuid']").val();
    var name =   $("#createStorage input[name='name']").val();
    var description =   $("#createStorage input[name='description']").val();
    var location =   $("#createStorage input[name='location']").val();

    var storageDoc = {
      uuid: uuid,
      name: name,
      description: description,
      location: location
    };
    Meteor.call('storages.insert', storageDoc);
  }
});
