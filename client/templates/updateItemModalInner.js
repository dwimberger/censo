const moment = require('moment');
Template.updateItemModalInner.helpers({
	itemInScope: function() {
		return Session.get('itemInScope');
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
  selectedDepartment: function(name) {
    return (name === Session.get('itemInScope').department) ? 'selected':'';
  },
  selectedStorage: function(name) {
    return (name === Session.get('itemInScope').storage) ? 'selected':'';
  },
  isVerificationRequired: function() {
    return (Session.get('itemInScope').requiresVerification)? 'checked':'';
  },
  selectedCaretaker: function(name) {
    return (name === Session.get('itemInScope').caretaker) ? 'selected':'';
  },
  qrBaseURL: function() {
      return Meteor.settings.public.qrBaseURL;
  },
  displayVerificationDate() {
    return moment(Session.get('itemInScope').verificationDate)
      .format('DD/MM/YYYY');
  }
});
Template.updateItemModalInner.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      $("#updateItem input[name='verification']")
        .datetimepicker({format: 'DD/MM/YYYY'});
    }
};
Template.updateItemModalInner.events({
  'click #doDeleteItem': function (event) {
    event.preventDefault();
    Meteor.call('items.delete', Session.get('itemInScope')._id);
  }, 'click #doPrintItem': function (event) {
    event.preventDefault();
    Meteor.call('items.printItem', Session.get('itemInScope')._id);
  },
  'click #doUpdateItem': function (event) {
    event.preventDefault();
    var name =   $("#updateItem input[name='name']").val();
    var description =   $("#updateItem input[name='description']").val();
    var inventoryNumber = $("#updateItem input[name='inventoryNumber']").val();
    var storage =   $("#updateItemStorage").val();
    var department = $("#updateItemDepartment").val();
    var verificationDate = $("#updateItem input[name='verification']").val();
    var requiresVerification = $("#updateItem input[name='requiresVerification']").is(':checked');
    var caretaker =   $("#updateItemCaretaker").val();
    var itemDoc = {
      uuid: Session.get('itemInScope').uuid,
      name: name,
      inventoryNumber: inventoryNumber,
      description: description,
      verificationDate: verificationDate,
      requiresVerification: requiresVerification,
      storage: storage,
      department: department,
      caretaker: caretaker
    };
    Meteor.call('items.update', itemDoc);
  }
});
