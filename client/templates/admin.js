Template.Admin.events({
  'click tbody > tr': function (event) {
  	event.preventDefault();
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (!rowData) return; // Won't be data if a placeholder row is clicked
    Session.set('userInScope', rowData);
    $('#updateaccount').modal('show');
  }
});