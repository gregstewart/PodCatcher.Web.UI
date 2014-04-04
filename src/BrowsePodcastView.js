var Podcatcher = Podcatcher || {};

Podcatcher.BrowsePodcastView = Backbone.View.extend({
  initialize: function (options) {
    this.collection = options.collection;

    this.collection.fetch();
  }
});