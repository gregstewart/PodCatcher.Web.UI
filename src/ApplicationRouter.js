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

    var view = new Podcatcher.PodcastListView({collection: this.collection});
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
    if (id) {
      var model = this.collection.findWhere({Id: id});
      // handle no models, i.e. you went to uri without going through browse
      var view = new Podcatcher.PodcastDetailView({model: model});
      view.render();
    }
  },

  resetViews: function () {
    $('article').hide();
  }
});