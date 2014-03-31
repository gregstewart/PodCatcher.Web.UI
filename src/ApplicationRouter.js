var Podcatcher = Podcatcher || {};

Podcatcher.ApplicationRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'browse': 'browse',
    'add-podcast': 'addPodcast'
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
    this.view = new Podcatcher.PodcastSaveView({model: new Podcatcher.Podcast()});
    this.view.render();
  },

  resetViews: function () {
    $('article').hide();
  }
});