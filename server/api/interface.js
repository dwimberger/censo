import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
const fs = require('fs');
const moment = require('moment');

Meteor.methods({
  'departments.insert'(doc) {

   // Make sure the user is logged in before inserting a task
   if (!this.userId
     ||!Roles.userIsInRole(Meteor.user(), ['admin','departments-manager'],
        Roles.GLOBAL_GROUP)) {
     throw new Meteor.Error(401, 'not-authorized');
   }
   doc.createdAt = new Date();
   doc.createdBy = this.userId;
   DepartmentContext.validate(doc);
   Departments.insert(
     doc
   );
 },
 'departments.delete'(departmentId) {
   if (! this.userId
     ||!Roles.userIsInRole(Meteor.user(), ['admin','departments-manager'],
        Roles.GLOBAL_GROUP)) {
     throw new Meteor.Error(401, 'not-authorized');
   }
   check(departmentId, String);

   Departments.remove(departmentId);
 },
 'departments.update'(doc) {

   // Make sure the user is logged in before inserting a task
   if (! this.userId
     ||!Roles.userIsInRole(Meteor.user(), ['admin','departments-manager'],
           Roles.GLOBAL_GROUP)) {
     throw new Meteor.Error(401, 'not-authorized');
   }
   doc.lastModified = new Date();
   doc.modifiedBy = this.userId;
   DepartmentContext.validate(doc);
   Departments.update(
     {uuid:doc.uuid},
     {$set: doc}
   );
  },
  'storages.insert'(doc) {

   // Make sure the user is logged in before inserting a task
   if (!this.userId
     ||!Roles.userIsInRole(Meteor.user(), ['admin','storages-manager'],
           Roles.GLOBAL_GROUP)) {
     throw new Meteor.Error(401, 'not-authorized');
   }
   doc.createdAt = new Date();
   doc.createdBy = this.userId;
   StorageContext.validate(doc);
   Storages.insert(
     doc
   );
 },
 'storages.delete'(storageId) {
   if (! this.userId
     ||!Roles.userIsInRole(Meteor.user(), ['admin','storages-manager'],
           Roles.GLOBAL_GROUP)) {
     throw new Meteor.Error(401, 'not-authorized');
   }
   check(storageId, String);

   Storages.remove(storageId);
 },
 'storages.update'(doc) {

  // Make sure the user is logged in before inserting a task
  if (! this.userId
    ||!Roles.userIsInRole(Meteor.user(), ['admin','storages-manager'],
          Roles.GLOBAL_GROUP)) {
    throw new Meteor.Error(401, 'not-authorized');
  }
  doc.lastModified = new Date();
  doc.modifiedBy = this.userId;
  StorageContext.validate(doc);
  Storages.update(
    {uuid:doc.uuid},
    {$set: doc}
  );
},
'items.insert'(doc) {

 // Make sure the user is logged in before inserting a task
 if (! this.userId
   ||!Roles.userIsInRole(Meteor.user(), ['admin','items-manager'],
         Roles.GLOBAL_GROUP)) {
   throw new Meteor.Error(401, 'not-authorized');
 }
 doc.createdAt = new Date();
 doc.createdBy = this.userId;
 var verificationDate = moment(doc.verificationDate,'DD/MM/YYYY');
 doc.verificationDate = verificationDate.toDate();
 ItemContext.validate(doc);
 Items.insert(
   doc
 );
},
'items.delete'(itemId) {
  if (! this.userId
    ||!Roles.userIsInRole(Meteor.user(), ['admin','items-manager'],
          Roles.GLOBAL_GROUP)) {
    throw new Meteor.Error(401, 'not-authorized');
  }
 check(itemId, String);

 Items.remove(itemId);
},
'items.update'(doc) {

// Make sure the user is logged in before inserting a task
if (! this.userId
  ||!Roles.userIsInRole(Meteor.user(), ['admin','items-manager'],
        Roles.GLOBAL_GROUP)) {
  throw new Meteor.Error(401, 'not-authorized');
}
doc.lastModified = new Date();
doc.modifiedBy = this.userId;
var verificationDate = moment(doc.verificationDate,'DD/MM/YYYY');
doc.verificationDate = verificationDate.toDate();
ItemContext.validate(doc);
Items.update(
  {uuid:doc.uuid},
  {$set: doc}
);
},
'items.export'(fromDate) {
   if (! this.userId
     ||!Roles.userIsInRole(Meteor.user(), ['admin','items-manager'],
           Roles.GLOBAL_GROUP)) {
    throw new Meteor.Error(401, 'not-authorized');
   }
   console.log('export %j', fromDate);
   var date = moment(fromDate,'DD/MM/YYYY');
   var query = { "createdAt" : { $gte : date.toDate() }};
   var fields = {fields: {inventoryNumber:1, uuid:1, _id: 0}};
   console.log('%Q= %j Proj=%j', query, fields);
   var exportItems = Items.find(query, fields).fetch();
   exportItems.forEach(function(elem, idx, arr) {
      elem.uuid = 'http://localhost:3000/item/' + elem.uuid;
   });
   console.log('%j', exportItems);
   var heading = false; // Optional, defaults to true
   var delimiter = ";" // Optional, defaults to ",";
   return exportcsv.exportToCSV(exportItems, heading, delimiter);
},
'caretakers.insert'(doc) {

 // Make sure the user is logged in before inserting a task
 if (! this.userId
   ||!Roles.userIsInRole(Meteor.user(), ['admin','caretakers-manager'],
         Roles.GLOBAL_GROUP)) {
   throw new Meteor.Error(401, 'not-authorized');
 }
 doc.createdAt = new Date();
 doc.createdBy = this.userId;
 CaretakersContext.validate(doc);
 Caretakers.insert(
   doc
 );
},
'caretakers.delete'(caretakerId) {
  if (! this.userId
    ||!Roles.userIsInRole(Meteor.user(), ['admin','caretakers-manager'],
          Roles.GLOBAL_GROUP)) {
    throw new Meteor.Error(401, 'not-authorized');
  }
 check(caretakerId, String);

 Caretakers.remove(caretakerId);
},
'caretakers.update'(doc) {

 // Make sure the user is logged in before inserting a task
 if (! this.userId
   ||!Roles.userIsInRole(Meteor.user(), ['admin','caretakers-manager'],
         Roles.GLOBAL_GROUP)) {
   throw new Meteor.Error(401, 'not-authorized');
 }
 doc.lastModified = new Date();
 doc.modifiedBy = this.userId;
 CaretakersContext.validate(doc);
 Caretakers.update(
   {uuid:doc.uuid},
   {$set: doc}
 );
},
'deleteUser'(userId) {
  var user = Meteor.user();
  if (!user || !Roles.userIsInRole(user, ['admin'], Roles.GLOBAL_GROUP))
    throw new Meteor.Error(401, "You need to be an admin to delete a user.");

  if (user._id == userId)
    throw new Meteor.Error(422, 'You can\'t delete yourself.');

  // remove the user
  Meteor.users.remove(userId);
},
'addUserRole'(userId, role) {
  var user = Meteor.user();
  if (!user || !Roles.userIsInRole(user, ['admin'], Roles.GLOBAL_GROUP))
    throw new Meteor.Error(401, "You need to be an admin to update a user.");

  // handle invalid role
  if (Meteor.roles.find({name: role}).count() < 1 )
    throw new Meteor.Error(422, 'Role ' + role + ' does not exist.');

  // handle user already has role
  if (Roles.userIsInRole(userId, role, Roles.GLOBAL_GROUP))
    throw new Meteor.Error(422, 'Account already has the role ' + role);
  // add the user to the role
  Roles.addUsersToRoles(userId, role, Roles.GLOBAL_GROUP);
},
'removeUserRole'(userId, role) {
  var user = Meteor.user();
  if (!user || !Roles.userIsInRole(user, ['admin'], Roles.GLOBAL_GROUP))
    throw new Meteor.Error(401, "You need to be an admin to update a user.");

  // handle invalid role
  if (Meteor.roles.find({name: role}).count() < 1 )
    throw new Meteor.Error(422, 'Role ' + role + ' does not exist.');

  // handle user already has role
  if (!Roles.userIsInRole(userId, role))
    throw new Meteor.Error(422, 'Account does not have the role ' + role);

  Roles.removeUsersFromRoles(userId, role, Roles.GLOBAL_GROUP);
},
'updateUserInfo'(id, property, value) {
  var user = Meteor.user();
  console.log('%j property %j value %j', user, property, value);
  if (!user || !Roles.userIsInRole(user, ['admin']))
    throw new Meteor.Error(401, "You need to be an admin to update a user.");

  if (
    property !== 'profile.name' &&
    property !== 'profile.annotations' &&
    property !== 'services.telegram.username' &&
    property !== 'services.ingress.username'
    ) {
    throw new Meteor.Error(422, "Only 'name' is supported.");
  }

  obj = {};
  obj[property] = value;
  console.log('%j',obj);
  Meteor.users.update({_id: id}, {$set: obj});
}
})
