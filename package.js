Package.describe({
  summary: "Reactive sets of HTML attributes."
});

Package.on_use(function (api, where) {
  api.use(["templating", "handlebars", "check"], ["client"]);
  api.add_files('lib/reactive-attributes.js', ['client']);
});

Package.on_test(function (api) {
  api.use('reactive-attributes');
  api.add_files('test/reactive-attributes-tests.js', ['client']);
});
