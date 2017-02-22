Template.updateCaretakerModalInner.helpers({
  caretakerInScope: function() {
		return Session.get('caretakerInScope');
	}
});

Template.updateCaretakerModalInner.events({
  'click #doDeleteCaretaker': function (event) {
    event.preventDefault();
    var uuid =  $("#updateCaretaker input[name='uuid']").val();
    Meteor.call('caretakers.delete', Session.get('caretakerInScope')._id);
  },
  'click #doUpdateCaretaker': function (event) {
    event.preventDefault();
    var name =   $("#updateCaretaker input[name='caretakerName']").val();
    var description =   $("#updateCaretaker input[name='caretakerDescription']").val();
    var email =   $("#updateCaretaker input[name='caretakerEmail']").val();

    var caretakerDoc = {
      _id: Session.get('caretakerInScope')._id,
      name: name,
      description: description,
      email:email
    };
    Meteor.call('caretakers.update', caretakerDoc);
  }
});
