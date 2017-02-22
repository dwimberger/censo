Template.createItemModalInner.helpers({
  uniqueId: function() {
    return Session.get('itemUuid');
  },
  storages: function() {
    return Storages.find({}).fetch();
  },
  departments: function() {
    return Departments.find({}).fetch();
  },
  caretakers: function() {
    return Caretakers.find({}).fetch();
  },
  qrBaseURL: function() {
    return Meteor.settings.public.qrBaseURL;
  }
});
Template.createItemModalInner.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      $("#createItem input[name='verification']").datetimepicker({format: 'DD/MM/YYYY'});
    }
};
Template.createItemModalInner.events({
  'click #doCreateItem': function (event) {
    event.preventDefault();
    var uuid =  $("#createItem input[name='uuid']").val();
    var name =   $("#createItem input[name='name']").val();
    var description =   $("#createItem input[name='description']").val();
    var inventoryNumber = $("#createItem input[name='inventoryNumber']").val();
    var verificationDate = $("#createItem input[name='verification']").val();
    var requiresVerification = $("#createItem input[name='requiresVerification']").is(':checked');
    var department =   $("#createItemDepartment").val();
    var storage =   $("#createItemStorage").val();
    var caretaker =   $("#createItemCaretaker").val();

    var itemDoc = {
      uuid: uuid,
      name: name,
      inventoryNumber: inventoryNumber,
      description: description,
      department: department,
      storage: storage,
      requiresVerification: requiresVerification,
      verificationDate: verificationDate,
      caretaker: caretaker
    };

    Meteor.call('items.insert', itemDoc);
  }
});
