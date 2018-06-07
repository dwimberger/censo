import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const Images = new FilesCollection({
    debug: true,
    storagePath: '/images',
    permissions: 0o774,
    parentDirPermissions: 0o774,
    collectionName: 'Images',
    allowClientCode: true, // Disallow remove files from Client
    onBeforeUpload: function (file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 1024 * 1024 * 10 && /png|jpg|jpeg/i.test(file.extension)) {
            return true;
        } else {
            return 'Please upload image, with size equal or less than 10MB';
        }
    }
});

if (Meteor.isServer) {
    Images.denyClient();
    Meteor.publish('files.images.all', function () {
        return Images.find().cursor;
    });
} else {
    Meteor.subscribe('files.images.all');
}
export default Images;