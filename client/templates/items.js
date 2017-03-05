Template.Items.events({
  'click #addItem': function (event) {
  	event.preventDefault();
    Session.set('itemUuid', Meteor.uuid());
    Session.set('itemInScope', {});
    $("#createItem input").val('');
    $('#itemCreateModal').modal('show');
  },
  'click tbody > tr': function (event) {
    event.preventDefault();
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    if (!rowData) return; // Won't be data if a placeholder row is clicked
    if(Roles.userIsInRole(Meteor.userId(),
      ['items-manager','admin'], Roles.GLOBAL_GROUP)) {
      Session.set('itemInScope', rowData);
      $('#itemUpdateModal').modal('show');
    }
  },
  'click #download': function (event) {
    event.preventDefault();
    console.log('Download');
    var exportFromDate = $("input[name='export']").val();
    var nameFile = 'items_export.csv';
    Meteor.call('items.export', exportFromDate, function(err, fileContent) {
      if(fileContent) {
        var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
        window.saveAs(blob, nameFile);
      }
    });
  },
  'click #print': function (event) {
    event.preventDefault();
    console.log('Download');
    var exportFromDate = $("input[name='export']").val();
    var nameFile = 'items_print.txt';
    Meteor.call('items.print', exportFromDate, function(err, fileContent) {
      if(fileContent) {
        var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
        window.saveAs(blob, nameFile);
      }
    });
  }
});
Template.Items.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      $('#exportDatePicker').datetimepicker({format: 'DD/MM/YYYY'});
    }
};
Template.Items.helpers ({
  hasItemsManager: function() {
    return Roles.userIsInRole(Meteor.userId(), ['items-manager','admin'], Roles.GLOBAL_GROUP);
  }
});
