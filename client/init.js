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

const userLanguage = () => {
  // If the user is logged in, retrieve their saved language
  if (Meteor.user()) {
    console.log('Getting user language ' +   Meteor.user().language);
    return Meteor.user().language;
  }
};

if (Meteor.isClient) {
  Meteor.startup(() => {
    Tracker.autorun(() => {
      let lang;

      // URL Language takes priority
      if (userLanguage()) {
        // User language is set if no url lang
        lang = userLanguage();
      } else {
        // If no user language, try setting by browser (default en)
        const localeFromBrowser = window.navigator.userLanguage || window.navigator.language;
        let locale = 'en';

        if (localeFromBrowser.match(/en/)) locale = 'en';
        if (localeFromBrowser.match(/de/)) locale = 'de';

        lang = locale;
      }
      $.getJSON(lang + '.table.i18n.json', function(data) {
        $.fn.dataTable.defaults.oLanguage = data;
        TAPi18n.setLanguage(lang);
      });
    });
  });
}
