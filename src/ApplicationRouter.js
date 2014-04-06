var Podcatcher = Podcatcher || {};

Podcatcher.ApplicationRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'browse': 'browse',
    'add-podcast': 'addPodcast',
    'podcast/detail/:id': 'podcastDetail'
  },

  initialize: function(options) {
    this.vent = options.vent;
    this.collection = new Podcatcher.PodcastCollection();
  },

  index: function () {
    console.log('index');
  },

  browse: function () {
    this.resetViews();

    var view = new Podcatcher.BrowsePodcastView({collection: this.collection});
    this.collection.fetch();
  },

  addPodcast: function () {
    this.resetViews();
    var podcast = new Podcatcher.Podcast(),
        view = new Podcatcher.PodcastSaveView({model: podcast, vent: this.vent});

    view.render();
  },

  podcastDetail: function (id) {
    this.resetViews();
    var model = this.collection.findWhere({Id: id});
    var view = new Podcatcher.PodcastDetailView({model: model, vent: this.vent});

  },

  resetViews: function () {
    $('article').hide();
  }
});