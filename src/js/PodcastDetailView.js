var Podcatcher = Podcatcher || {};

Podcatcher.PodcastDetailView = Backbone.View.extend({
  tagName: 'article',
  className: 'podcast podcast-details',

  initialize: function (options) {
    this.model = options.model;
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    var view = this.addPodcastView(this.model);
    $(view).addClass('jumbotron');
    $('#podcatcher').html(view);
    return this;
  },

  addPodcastView: function (podcast) {
    var view = new Podcatcher.PodcastView({model: podcast});
    return view.render().el;
  }
});