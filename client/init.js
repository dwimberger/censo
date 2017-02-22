import { $ } from 'meteor/jquery';
import dataTablesBootstrap from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
dataTablesBootstrap(window, $);

Meteor.subscribe("storages");
Meteor.subscribe("items");
Meteor.subscribe("departments");
Meteor.subscribe("caretakers");
Meteor.subscribe("roles");
Meteor.subscribe("userData");
