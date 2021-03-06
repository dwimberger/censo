import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Socket } from 'net';
const fs = require('fs');
const moment = require('moment');

const monarchTemplate =
  '{F,1,A,R,E,300,200,"DRWE2Q" |\n' +
  'T,1,20,V,70,10,0,10,1,1,B,L,0,0 |\n' +
  'B,2,200,V,10,10,36,0,51,0,B,0 |\n' +
  '}\n' +
  '{B,1,N,001 |\n' +
  '1,"$TXT$"|\n' +
  '2,"LAA$QRTXT$" |\n' +
  '}\n';

const monarchPort = parseInt(process.env.MONARCH_PORT);
const monarchIP = process.env.MONARCH_IP;

const printLabel = function (data) {
  var client = new Socket();
  client.on('connect', function () {
    console.log('Established printer connection.');
    client.write(data);
    client.destroy();
  });
  client.on('close', function () {
    console.log('Closing printer connection.');
  });
  client.connect(monarchPort, monarchIP);
}

Meteor.methods({
  'departments.insert'(doc) {

    // Make sure the user is logged in before inserting a task
    if (!this.userId
      || !Roles.userIsInRole(Meteor.user(), ['admin', 'departments-manager'],
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
    if (!this.userId
      || !Roles.userIsInRole(Meteor.user(), ['admin', 'departments-manager'],
        Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error(401, 'not-authorized');
    }
    check(departmentId, String);

    Departments.remove(departmentId);
  },
  'departments.update'(doc) {

    // Make sure the user is logged in before inserting a task
    if (!this.userId
      || !Roles.userIsInRole(Meteor.user(), ['admin', 'departments-manager'],
        Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error(401, 'not-authorized');
    }
    doc.lastModified = new Date();
    doc.modifiedBy = this.userId;
    DepartmentContext.validate(doc);
    Departments.update(
      { _id: doc._id },
      { $set: doc }
    );
  },
  'storages.insert'(doc) {

    // Make sure the user is logged in before inserting a task
    if (!this.userId
      || !Roles.userIsInRole(Meteor.user(), ['admin', 'storages-manager'],
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
    if (!this.userId
      || !Roles.userIsInRole(Meteor.user(), ['admin', 'storages-manager'],
        Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error(401, 'not-authorized');
    }
    check(storageId, String);

    Storages.remove(storageId);
  },
  'storages.update'(doc) {

    // Make sure the user is logged in before inserting a task
    if (!this.userId
      || !Roles.userIsInRole(Meteor.user(), ['admin', 'storages-manager'],
        Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error(401, 'not-authorized');
    }
    doc.lastModified = new Date();
    doc.modifiedBy = this.userId;
    StorageContext.validate(doc);
    Storages.update(
      { _id: doc._id },
      { $set: doc }
    );
  },
  'items.insert'(doc) {

    // Make sure the user is logged in before inserting a task
    if (!this.userId
      || !Roles.userIsInRole(Meteor.user(), ['admin', 'items-manager'],
        Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error(401, 'not-authorized');
    }
    doc.createdAt = new Date();
    doc.createdBy = this.userId;
    var verificationDate = moment(doc.verificationDate, 'DD/MM/YYYY');
    doc.verificationDate = verificationDate.toDate();
    ItemContext.validate(doc);
    Items.insert(
      doc
    );
  },
  'items.delete'(itemId) {
    if (!this.userId
      || !Roles.userIsInRole(Meteor.user(), ['admin', 'items-manager'],
        Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error(401, 'not-authorized');
    }
    check(itemId, String);

    Items.remove(itemId);
  },
  'items.update'(doc) {

    // Make sure the user is logged in before inserting a task
    if (!this.userId
      || !Roles.userIsInRole(Meteor.user(), ['admin', 'items-manager'],
        Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error(401, 'not-authorized');
    }
    doc.lastModified = new Date();
    doc.modifiedBy = this.userId;
    var verificationDate = moment(doc.verificationDate, 'DD/MM/YYYY');
    doc.verificationDate = verificationDate.toDate();
    ItemContext.validate(doc);
    Items.update(
      { uuid: doc.uuid },
      { $set: doc }
    );
  },
  'items.export'(fromDate) {
    if (!this.userId
      || !Roles.userIsInRole(Meteor.user(), ['admin', 'items-manager'],
        Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error(401, 'not-authorized');
    }
    console.log('export %j', fromDate);
    var date = moment(fromDate, 'DD/MM/YYYY');
    var query = { "createdAt": { $gte: date.toDate() } };
    var fields = { fields: { inventoryNumber: 1, uuid: 1, _id: 0 } };
    console.log('%Q= %j Proj=%j', query, fields);
    var exportItems = Items.find(query, fields).fetch();
    exportItems.forEach(function (elem, idx, arr) {
      elem.uuid = Meteor.settings.public.qrBaseURL + '/item/' + elem.uuid;
    });
    console.log('%j', exportItems);
    var heading = false; // Optional, defaults to true
    var delimiter = ";" // Optional, defaults to ",";
    return exportcsv.exportToCSV(exportItems, heading, delimiter);
  },
  'items.print'(fromDate) {
    if (!this.userId
      || !Roles.userIsInRole(Meteor.user(), ['admin', 'items-manager'],
        Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error(401, 'not-authorized');
    }
    console.log('print %j', fromDate);
    var date = moment(fromDate, 'DD/MM/YYYY');
    var query = { "createdAt": { $gte: date.toDate() } };
    var fields = { fields: { inventoryNumber: 1, uuid: 1, _id: 0 } };
    console.log('%Q= %j Proj=%j', query, fields);
    var exportItems = Items.find(query, fields).fetch();
    var data = '';
    exportItems.forEach(function (elem, idx, arr) {
      var qrtext = Meteor.settings.public.qrBaseURL + '/item/' + elem.uuid;
      var txt = elem.inventoryNumber;
      // Use first segment of uuid if no inventory number was given
      if(!txt || txt === '') {
        txt = elem.uuid.substring(0, elem.uuid.indexOf('-'));
      }
      data += monarchTemplate
        .replace('$TXT$', txt)
        .replace('$QRTXT$', qrtext);
    });
    printLabel(data);
  },
  'items.printItem'(itemId) {
    if (!this.userId
      || !Roles.userIsInRole(Meteor.user(), ['admin', 'items-manager'],
        Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error(401, 'not-authorized');
    }
    var query = { "_id": itemId };
    var fields = { fields: { inventoryNumber: 1, uuid: 1, _id: 0 } };
    console.log('%Q= %j Proj=%j', query, fields);
    var item = Items.findOne(query, fields);
    if (item) {
      console.log('Item=%j', item);
      var qrtext = Meteor.settings.public.qrBaseURL + '/item/' + item.uuid;
      var txt = item.inventoryNumber;
      // Use first segment of uuid if no inventory number was given
      if(!txt || txt === '') {
        txt = item.uuid.substring(0, item.uuid.indexOf('-'));
      }
      var data = monarchTemplate
        .replace('$TXT$', txt)
        .replace('$QRTXT$', qrtext);
      printLabel(data);
    }
  },
  'caretakers.insert'(doc) {

    // Make sure the user is logged in before inserting a task
    if (!this.userId
      || !Roles.userIsInRole(Meteor.user(), ['admin', 'caretakers-manager'],
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
    if (!this.userId
      || !Roles.userIsInRole(Meteor.user(), ['admin', 'caretakers-manager'],
        Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error(401, 'not-authorized');
    }
    check(caretakerId, String);

    Caretakers.remove(caretakerId);
  },
  'caretakers.update'(doc) {

    // Make sure the user is logged in before inserting a task
    if (!this.userId
      || !Roles.userIsInRole(Meteor.user(), ['admin', 'caretakers-manager'],
        Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error(401, 'not-authorized');
    }
    doc.lastModified = new Date();
    doc.modifiedBy = this.userId;
    CaretakersContext.validate(doc);
    Caretakers.update(
      { _id: doc._id },
      { $set: doc }
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
    if (Meteor.roles.find({ name: role }).count() < 1)
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
    if (Meteor.roles.find({ name: role }).count() < 1)
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
    console.log('%j', obj);
    Meteor.users.update({ _id: id }, { $set: obj });
  },
  'updateUserLanguage'(value) {
    var user = Meteor.user();
    console.log('%j lang %j value %j', user, value);
    Meteor.users.update(
      { _id: this.userId },
      { $set: { 'language': value } }
    );
  }
})
