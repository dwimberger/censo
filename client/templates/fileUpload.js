import { Template }    from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import Images  from '/lib/fileCollections.js';

function getUUID() {
  var itemInScope = Session.get('itemInScope');
    if(itemInScope) {
      uuidString = itemInScope.uuid;
    }
    if(!uuidString) {
      uuidString = Session.get('itemUuid');
    }
    return uuidString;
}

Template.fileUpload.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.fileUpload.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  },
  uploadedFile: function () {
    return Images.findOne({_id: getUUID()});
  }
});

Template.fileUpload.events({
  'change #fileInput'(e, template) {

    var uuid = getUUID();
    Images.remove({_id: uuid}, function (error) {
      var f = e.currentTarget.files[0];
      console.log('File %j' ,f);
      if (e.currentTarget.files && f) {
        // We upload only one file, in case
        // multiple files were selected
        const upload = Images.insert({
          file: f,
          fileId: getUUID(),
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false);
  
        upload.on('start', function () {
          template.currentUpload.set(this);
        });
  
        upload.on('end', function (error, fileObj) {
          if (error) {            
            alert(TAPi18n.__('thingyImageUploadFailed') +  error);
          } else {
            alert(TAPi18n.__('thingyImageUploadSuccess') + fileObj.name ); 
          }
          template.currentUpload.set(false);
        });
  
        upload.start();
    }
    });
  }
});