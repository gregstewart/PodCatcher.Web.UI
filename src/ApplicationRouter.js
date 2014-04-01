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

    console.log('browse');
  },

  addPodcast: function () {

    this.resetViews();
    var podcast = new Podcatcher.Podcast({vent: this.vent});
    this.view = new Podcatcher.PodcastSaveView({model: podcast, vent: this.vent});
    this.view.render();
  },

  resetViews: function () {
    $('article').hide();
  }
});