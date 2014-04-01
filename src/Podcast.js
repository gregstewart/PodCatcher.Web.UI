var Podcatcher = Podcatcher || {};

Podcatcher.Podcast = Backbone.Model.extend({
  url: '/api/podcast/',

  initialize: function(options) {
    this.vent = options.vent;
  },

  validate: function(attrs) {

    if(!attrs.Uri || attrs.Uri === "") {
      return "cannot have empty Uri";
    }
  },

  success: function(response) {
    this.attributes = response.attributes;
    this.vent.trigger('podcast:added', response.attributes);
  },

  error: function(response) {
    this.vent.trigger('podcast:added:fail');
  }
});