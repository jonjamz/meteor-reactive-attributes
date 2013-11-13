if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to meteor-reactive-attributes.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });


  // Reactive attributes example
  Session.set('isChatVisible', true);
  classes = ["chat-container", "full-width"]

  var chatVisible = {
    shown: {
      class: classes
    },
    hidden: {
      class: classes,
      style: 'display: none;'
    }
  };

  var getChatVisible = function () {
    if (Session.equals('isChatVisible', true)) {
      return 'shown';
    } else {
      return 'hidden';
    }
  };

  attrSet('container', {in: 'chat'}, chatVisible, getChatVisible);

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
