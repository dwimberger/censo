Template.updateDepartmentModalInner.helpers({
  departmentInScope: function() {
		return Session.get('departmentInScope');
	}
});

Template.updateDepartmentModalInner.events({
  'click #doDeleteDepartment': function (event) {
    event.preventDefault();
    var uuid =  $("#updateDepartment input[name='uuid']").val();
    Meteor.call('departments.delete', Session.get('departmentInScope')._id);
  },
  'click #doUpdateDepartment': function (event) {
    event.preventDefault();
    var name =   $("#updateDepartment input[name='departmentName']").val();
    var description =   $("#updateDepartment input[name='departmentDescription']").val();

    var departmentDoc = {
      _id: Session.get('departmentInScope')._id,
      name: name,
      description: description
    };
    Meteor.call('departments.update', departmentDoc);
  }
});
