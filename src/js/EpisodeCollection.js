var Podcatcher = Podcatcher || {};

Podcatcher.EpisodeCollection = Backbone.Collection.extend({
  url: function () {
    return Podcatcher.baseUrl + '/api/podcasts/'+this.podcastId+'/episodes';
  },

  fetch: function (options) {
    this.podcastId = options.podcastId;
    return Backbone.Collection.prototype.fetch.call(this);
  }
});