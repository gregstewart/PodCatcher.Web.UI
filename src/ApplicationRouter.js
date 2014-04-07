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
      // handle no models, i.e. you went to uri without going through browse
      var model = this.collection.findWhere({Id: id}),
          view = new Podcatcher.PodcastDetailView({model: model}),
          episodeColllection = new Podcatcher.EpisodeCollection();

      view.render();
      episodeColllection.fetch({podcastId:id});
    }
  },

  resetViews: function () {
    $('article').hide();
  }
});