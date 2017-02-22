Template.Settings.helpers({
  myId: function() {
    return Meteor.userId();
  },
  botName: function() {
    return Meteor.settings.public.botName;
  },
  telegramUsername: function() {
    if(
      Meteor.user() &&
      Meteor.user().services &&
      Meteor.user().services.telegram) {
        return  Meteor.user().services.telegram.username;
    }
  }
});
