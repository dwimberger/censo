import Tabular from 'meteor/aldeed:tabular';
const moment = require('moment');
import {TAPi18n} from 'meteor/tap:i18n';

TabularTables = {};
TabularTables.Departments= new Tabular.Table({
  name: 'Departments',
  collection: Departments,
  responsive: true,
  autoWidth: true,
  stateSave: false,
  columns: [
    {data: "name", titleFn: function() {
      return TAPi18n.__("name");
    }},
    {data: "description", titleFn: function() {
      return TAPi18n.__("description");
    }}
  ]
});

TabularTables.Storages= new Tabular.Table({
  name: 'Storages',
  collection: Storages,
  responsive: true,
  autoWidth: true,
  stateSave: false,
  columns: [
    {data: "name", titleFn: function() {
      return TAPi18n.__("name");
    }},
    {data: "description", titleFn: function() {
      return TAPi18n.__("description");
    }},
    {data: "location", titleFn: function() {
      return TAPi18n.__("location");
    }}
  ]
});

TabularTables.Items= new Tabular.Table({
  name: 'Items',
  collection: Items,
  responsive: true,
  autoWidth: true,
  stateSave: false,
  columns: [
    {data: "uuid", titleFn: function() {
      return TAPi18n.__("uuid");
    }},
    {data: "inventoryNumber", titleFn: function() {
      return TAPi18n.__("inventoryNumber");
    }},
    {data: "name",  titleFn: function() {
      return TAPi18n.__("name");
    }},
    {data: "description",  titleFn: function() {
      return TAPi18n.__("description");
    }},
    {data: "department",  titleFn: function() {
      return TAPi18n.__("department");
    }},
    {data: "storage",  titleFn: function() {
      return TAPi18n.__("storage");
    }},
    {data: "caretaker",  titleFn: function() {
      return TAPi18n.__("caretaker");
    }},
    {data: "requiresVerification",  titleFn: function() {
      return TAPi18n.__("verificationRequired");
    },
      "render": function (data, type, row) {
          return (data === true) ?
            '<span class="glyphicon glyphicon-time"></span>' :
            '<span class="glyphicon glyphicon-remove"></span>';
      }
    },
    {data: "verificationDate",  titleFn: function() {
      return TAPi18n.__("verificationDate");
    },
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
    {data: "name", titleFn: function() {
      return TAPi18n.__("name");
    }},
    {data: "description", titleFn: function() {
      return TAPi18n.__("description");
    }},
    {data: "email", titleFn: function() {
      return TAPi18n.__("email");
    }}
  ]
});

TabularTables.Admin = new Tabular.Table({
  name: 'Admin',
  collection: Meteor.users,
  responsive: true,
  autoWidth: false,
  stateSave: true,
  columns: [
    {data: "username", titleFn: function() {
      return TAPi18n.__("username");
    }},
    {data: "displayName", titleFn: function() {
      return TAPi18n.__("fullName");
    }},
    {data: "profile.annotations", titleFn: function() {
      return TAPi18n.__("annotations");
    }},
    {data: "roles.__global_roles__", titleFn: function() {
      return TAPi18n.__("roles");
    }}
  ]
});
