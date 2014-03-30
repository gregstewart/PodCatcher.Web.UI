var Podcatcher = Podcatcher || {};

Podcatcher.PodcastCollection = Backbone.Collection.extend({
  url: '/api/podcast/'
});