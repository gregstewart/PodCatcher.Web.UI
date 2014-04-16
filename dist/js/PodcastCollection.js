var Podcatcher = Podcatcher || {};

Podcatcher.PodcastCollection = Backbone.Collection.extend({
  url: function () {
    return Podcatcher.baseUrl + '/api/podcasts';
  }
});