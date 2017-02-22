Template.Caretakers.events({
  'click #addCaretaker': function (event) {
  	event.preventDefault();
    Session.set('caretakerInScope', {});
    $("#createCaretaker input").val('');
    $('#caretakerCreateModal').modal('show');
  },
  'click tbody > tr': function (event) {
    event.preventDefault();
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (!rowData) return; // Won't be data if a placeholder row is clicked
    if(Roles.userIsInRole(Meteor.userId(),
      ['caretakers-manager','admin'], Roles.GLOBAL_GROUP)) {      
      Session.set('caretakerInScope', rowData);
      $('#caretakerUpdateModal').modal('show');
    }
  }
});
Template.Caretakers.helpers ({
  hasCaretakersManager: function() {
    return Roles.userIsInRole(Meteor.userId(), ['caretakers-manager','admin'], Roles.GLOBAL_GROUP);
  }
});
