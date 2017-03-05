Template.createStorageModalInner.events({
  'click #doCreateStorage': function (event) {
    event.preventDefault();
    var name =   $("#createStorage input[name='name']").val();
    var description =   $("#createStorage input[name='description']").val();
    var location =   $("#createStorage input[name='location']").val();

    var storageDoc = {
      name: name,
      description: description,
      location: location
    };
    Meteor.call('storages.insert', storageDoc);
  }
});
