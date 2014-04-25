var Podcatcher = Podcatcher || {};

Podcatcher.ApplicationRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'browse': 'browse',
    'add-podcast': 'addPodcast',
    'podcast/detail/:id': 'podcastDetail',
    'episode/:id': 'episodeDetail'
  },

  initialize: function(options) {
    this.vent = options.vent;
    this.collection = new Podcatcher.PodcastCollection();
    this.episodeCollection = new Podcatcher.EpisodeCollection();
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
      var model, view, episodeCollection, episodeView;

      model = this.collection.findWhere({Id: id});

      if(!model) {
        model = new Podcatcher.Podcast({Id: id});
        model.fetch();
      }
      view = new Podcatcher.PodcastDetailView({model: model});

      episodeView = new Podcatcher.EpisodeListView({collection: this.episodeCollection});

      view.render();
      // consider using a defered promise here, e.g.
      // var this.collection.deferred = this.collection.fetch()
      // this.collection.deferred.done(function () {self.collection.deferred})
      // or
      // listening on reset event should work too
      this.episodeCollection.fetch({podcastId:id});
    }
  },

  episodeDetail: function (id) {
    this.resetViews();

    var model = this.episodeCollection.findWhere({Id: id}),
        view = new Podcatcher.EpisodeDetailView({model: model});

    view.render();
  },

  resetViews: function () {
    $('article').hide();
  }
});