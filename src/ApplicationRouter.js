var Podcatcher = Podcatcher || {};

Podcatcher.ApplicationRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'browse': 'browse',
    'add-podcast': 'addPodcast'
  },

  initialize: function(options) {
    this.vent = options.vent;
  },

  index: function () {
    console.log('index');
  },

  browse: function () {
    this.resetViews();
    var collection = new Podcatcher.PodcastCollection(),
        view = new Podcatcher.BrowsePodcastView({collection: collection});
    collection.fetch();
  },

  addPodcast: function () {
    this.resetViews();
    var podcast = new Podcatcher.Podcast(),
        view = new Podcatcher.PodcastSaveView({model: podcast, vent: this.vent});

    view.render();
  },

  resetViews: function () {
    $('article').hide();
  }
});