Template.Item.helpers({
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
  rawJSON: function() {
    return JSON.stringify(Session.get('itemInScope'));
  }
});
