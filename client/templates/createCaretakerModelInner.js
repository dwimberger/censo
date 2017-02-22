Template.createCaretakerModalInner.events({
  'click #doCreateCaretaker': function (event) {
    event.preventDefault();
    var name =   $("#createCaretaker input[name='name']").val();
    var description =   $("#createCaretaker input[name='description']").val();
    var email =   $("#createCaretaker input[name='email']").val();

    var caretakerDoc = {
      name: name,
      description: description,
      email: email
    };
    console.log('%j', caretakerDoc);
    Meteor.call('caretakers.insert', caretakerDoc);
  }
});
