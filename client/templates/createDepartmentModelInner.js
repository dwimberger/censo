Template.createDepartmentModalInner.events({
  'click #doCreateDepartment': function (event) {
    event.preventDefault();
    var name =   $("#createDepartment input[name='name']").val();
    var description =   $("#createDepartment input[name='description']").val();

    var departmentDoc = {
      name: name,
      description: description,
    };
    Meteor.call('departments.insert', departmentDoc);
  }
});
