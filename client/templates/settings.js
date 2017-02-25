Template.Settings.helpers({
  myId: function() {
    return Meteor.userId();
  },
  botName: function() {
    return Meteor.settings.public.botName;
  },
  telegramId: function() {
    if(
      Meteor.user() &&
      Meteor.user().services &&
      Meteor.user().services.telegram) {
        return  Meteor.user().services.telegram.username;
    }
  },
  languages() {
   const obj = TAPi18n.getLanguages();
   const languages = [];
   for (const key in obj) {
     if (key) languages.push({ code: key, labels: obj[key] });
   }
   if (languages) return languages;
 },
 currentLanguage() {
   const currentLanguageCode = TAPi18n.getLanguage();
   const appLanguages = TAPi18n.getLanguages();
   for (const code in appLanguages) {
     if (code === currentLanguageCode) return appLanguages[code].name;
   }
 },
 selectedLanguage(lang) {
   return(lang === TAPi18n.getLanguage())? 'selected':'';
 }
});
Template.Settings.events({
  'change #language': function (event) {
    event.preventDefault();
    const lang = $("#language").val();
    Meteor.call('updateUserLanguage', lang);
    if(Meteor.isClient) {
      $.getJSON(lang + '.table.i18n.json', function(data) {
        $.fn.dataTable.defaults.oLanguage = data;
        TAPi18n.setLanguage(lang);
      });
    }
  }
});
