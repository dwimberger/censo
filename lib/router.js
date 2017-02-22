const moment = require('moment');

Router.configure({
  defaultBreadcrumbLastLink: false
});

// register a iron router template helper to check if the route is active
UI.registerHelper('isPrefixActive', function(routeName) {
    var currentRoute = Router.current();
    return currentRoute && (currentRoute.route.getName().lastIndexOf(routeName, 0) === 0 )? 'active' : '';
});
UI.registerHelper('isActive', function(routeName) {
    var currentRoute = Router.current();
    return currentRoute && routeName === currentRoute.route.getName() ? 'active' : '';
});

// Protect all Routes
Router.onBeforeAction(function () {
  // all properties available in the route function
  // are also available here such as this.params

  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    Router.go('/login');
    this.next();
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }
});

Router.onAfterAction(function () {
  Session.set('active', Router.current().route.getName());
});

Router.route('/', function () {
  this.redirect('/items');
});

Router.route('/login', function () {
  if (Meteor.userId()) {
     this.redirect('/items');
  }
  this.layout('loginLayout');
  this.render('Login');
  this.render('Footer', {to: 'footer'});
});

Router.route('/departments', function () {
  this.layout('applicationLayout');
  this.render('Header', {to: 'header'});
  this.render('Departments');
  this.render('Footer', {to: 'footer'});
}, {
  title: function() {
    return TAPi18n.__("departments");
  },
  waitOn: function () {
        return [ Meteor.subscribe("roles") ];
  },
  onBeforeAction: function () {
    if (!Roles.userIsInRole(Meteor.userId(), ['departments', 'admin'])) {
      Router.go('/settings');
    } else {
            this.next();
    }
  }
}
);

Router.route('/storages', function () {
  this.layout('applicationLayout');
  this.render('Header', {to: 'header'});
  this.render('Storages');
  this.render('Footer', {to: 'footer'});
}, {
  title: function() {
    return TAPi18n.__("storages");
  },
  waitOn: function () {
        return [ Meteor.subscribe("roles") ];
  },
  onBeforeAction: function () {
    if (!Roles.userIsInRole(Meteor.userId(), ['storages', 'admin'])) {
      Router.go('/settings');
    } else {
            this.next();
    }
  }
}
);

Router.route('/items', function() {
  this.layout('applicationLayout');
  this.render('Header', {to: 'header'});
  this.render('Items');
  this.render('Footer', {to: 'footer'});
}, {
  title: function() {
    return TAPi18n.__("items");
  },
  waitOn: function () {
        return [ Meteor.subscribe("roles") ];
  },
  onBeforeAction: function () {
    if (!Roles.userIsInRole(Meteor.userId(), ['items', 'admin'])) {
      Router.go('/settings');
    } else {
            this.next();
    }
  }
});
Router.route('/item/:uuid', function() {
  this.layout('applicationLayout');
  this.render('Header', {to: 'header'});
  this.render('Item', {
      data: function () {
        var data = Items.findOne({uuid: this.params.uuid});
        Session.set('itemInScope', data);
        return data;
      }
  });
  this.render('Footer', {to: 'footer'});
}, {
  title: function() {
    return TAPi18n.__("items");
  },
  waitOn: function () {
        return [ Meteor.subscribe("roles") ];
  },
  onBeforeAction: function () {
    if (!Roles.userIsInRole(Meteor.userId(), ['items', 'admin'])) {
      Router.go('/settings');
    } else {
            this.next();
    }
  }
});

Router.route('/caretakers', function() {
  this.layout('applicationLayout');
  this.render('Header', {to: 'header'});
  this.render('Caretakers');
  this.render('Footer', {to: 'footer'});
}, {
  title: function() {
    return TAPi18n.__("carertakers");
  },
  waitOn: function () {
        return [ Meteor.subscribe("roles") ];
  },
  onBeforeAction: function () {
    if (!Roles.userIsInRole(Meteor.userId(), ['caretakers', 'admin'])) {
      Router.go('/settings');
    } else {
            this.next();
    }
  }
});

Router.route('/settings', function () {
  this.layout('applicationLayout');
  this.render('Header', {to: 'header'});
  this.render('Settings');
  this.render('Footer', {to: 'footer'});
}, {
  title: function() {
    return TAPi18n.__("settings");
  }
});

Router.route('/about', function () {
  this.layout('applicationLayout');
  this.render('Header', {to: 'header'});
  this.render('About');
  this.render('Footer', {to: 'footer'});
}, {
  title: function() {
    return TAPi18n.__("about");
  }
});

 Router.route('admin', function () {
 	this.layout('applicationLayout');
 	this.render('Header', {to: 'header'});
    this.render('Admin');
    this.render('Footer', {to: 'footer'});
}, {
  	title: function() {
   	 	return TAPi18n.__("admin");
  	},
  	 onBeforeAction: function() {
  	 	if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      		Router.go('/settings');
    	} else {
            this.next();
    	}

    }
});
