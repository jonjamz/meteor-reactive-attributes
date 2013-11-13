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
  <div class="chat-container" {{{attrSet container}}}>
    ...
  </div>
</template>
```

CoffeeScript:

```coffeescript
Session.set "isChatVisible", true

chatVisible =
  shown: {}
  hidden:
    style: "display: none;"

getChatVisible = ->
  if Session.equals("isChatVisible", true)
    "shown"
  else
    "hidden"

attrSet "container"
  in: "chat", chatVisible, getChatVisible
```

...or, JavaScript:

```javascript
Session.set('isChatVisible', true);

var chatVisible = {
  shown: {},
  hidden: {
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