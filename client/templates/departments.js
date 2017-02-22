Template.Departments.events({
  'click #addDepartment': function (event) {
  	event.preventDefault();
    Session.set('departmentInScope', {});
    $("#createDepartment input").val('');
    $('#departmentCreateModal').modal('show');
  },
  'click tbody > tr': function (event) {
    event.preventDefault();
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (!rowData) return; // Won't be data if a placeholder row is clicked
    if(Roles.userIsInRole(Meteor.userId(),
      ['departments-manager','admin'], Roles.GLOBAL_GROUP)) {
        Session.set('departmentInScope', rowData);
        $('#departmentUpdateModal').modal('show');
    }
  }
});
Template.Departments.helpers ({
  hasDepartmentsManager: function() {
    return Roles.userIsInRole(Meteor.userId(),
      ['departments-manager','admin'], Roles.GLOBAL_GROUP);
  }
});
