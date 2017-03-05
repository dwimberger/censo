Template.Storages.events({
  'click #addStorage': function (event) {
  	event.preventDefault();
    Session.set('storageInScope', {});
    $("#createStorage input").val('');
    $('#storageCreateModal').modal('show');
  },
  'click tbody > tr': function (event) {
    event.preventDefault();
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (!rowData) return; // Won't be data if a placeholder row is clicked
    if(Roles.userIsInRole(Meteor.userId(),
      ['storages-manager','admin'], Roles.GLOBAL_GROUP)) {
        Session.set('storageInScope', rowData);
        $('#storageUpdateModal').modal('show');
    }
  }
});
Template.Storages.helpers ({
  hasStoragesManager: function() {
    return Roles.userIsInRole(Meteor.userId(),
      ['storages-manager','admin'], Roles.GLOBAL_GROUP);
  }
});
