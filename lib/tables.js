import Tabular from 'meteor/aldeed:tabular';
const moment = require('moment');

TabularTables = {};
TabularTables.Departments= new Tabular.Table({
  name: 'Departments',
  collection: Departments,
  responsive: true,
  autoWidth: true,
  stateSave: false,
  columns: [
    {data: "name", title: "Name"},
    {data: "description", title: "Description"}
  ]
});

TabularTables.Storages= new Tabular.Table({
  name: 'Storages',
  collection: Storages,
  responsive: true,
  autoWidth: true,
  stateSave: false,
  columns: [
    {data: "uuid", title: "UUID", visible: false},
    {data: "name", title: "Name"},
    {data: "description", title: "Description"},
    {data: "location", title:"Location"}
  ]
});

TabularTables.Items= new Tabular.Table({
  name: 'Items',
  collection: Items,
  responsive: true,
  autoWidth: true,
  stateSave: false,
  columns: [
    {data: "uuid", title: "UUID", visible:false},
    {data: "inventoryNumber", title: "Inventory Number"},
    {data: "name", title: "Name"},
    {data: "description", title: "Description"},
    {data: "department", title: "Department"},
    {data: "storage", title: "Storage"},
    {data: "caretaker", title: "Caretaker"},
    {data: "requiresVerification", title: "Verification Required",
      "render": function (data, type, row) {
          return (data === true) ?
            '<span class="glyphicon glyphicon-time"></span>' :
            '<span class="glyphicon glyphicon-remove"></span>';
      }
    },
    {data: "verificationDate", title: "Verification Date",
      "render": function (data, type, row) {
          return moment(data).format('DD/MM/YYYY');
      }
    }
  ]
});

TabularTables.Caretakers= new Tabular.Table({
  name: 'Caretakers',
  collection: Caretakers,
  responsive: true,
  autoWidth: true,
  stateSave: false,
  columns: [
    {data: "name", title: "Name"},
    {data: "description", title: "Description"},
    {data: "email", title: "Email"}
  ]
});

TabularTables.Admin = new Tabular.Table({
  name: 'Admin',
  collection: Meteor.users,
  responsive: true,
  autoWidth: false,
  stateSave: true,
  columns: [
    {data: "username", title: "Name"},
    {data: "cn", title: "Common Name"},
    {data: "profile.annotations", title: "Annotations"},
    {data: "roles.__global_roles__", title: "Roles"}
  ]
});
