var Podcatcher = Podcatcher || {};

Podcatcher.Podcast = Backbone.Model.extend({
  url: '/api/podcast/',

  validate: function(attrs) {

    if(!attrs.Uri || attrs.Uri === "") {
      return "cannot have empty Uri";
    }
  }
});