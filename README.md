Install
=======

__This package does not depend on any Atmosphere packages.__

Install using Meteorite:

`mrt add reactive-attributes`

Install without Meteorite:

Just `git clone` this repo into the /packages directory of your Meteor project.

Getting Started
===============

HTML:

```html
<template name="chat">
  <div {{{container}}}>
    ...
  </div>
</template>
```

CoffeeScript:

```coffeescript
Session.set "isChatVisible", true
classes = ["chat-container", "full-width"]

# HTML attributes as key: value, grouped into named sets
chatVisible =
  shown:
    class: classes

  hidden:
    class: classes
    style: "display: none;"

# A reactive computation to run to get the name of the set to load
getChatVisible = ->
  if Session.equals("isChatVisible", true)
    "shown"
  else
    "hidden"

# Make it happen!
attrSet "container"
  in: "chat", chatVisible, getChatVisible
```

...or, JavaScript:

```javascript
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
```