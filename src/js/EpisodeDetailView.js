var Podcatcher = Podcatcher || {};

Podcatcher.EpisodeDetailView = Backbone.View.extend({
  tagName: 'article',
  className: 'episode episode-details',

  render: function () {
    var view = this.addEpisodeView(this.model);
    $(view).addClass('jumbotron');
    $('#podcatcher').append(this.$el.html(view));
    return this;
  },

  addEpisodeView: function (episode) {
    var view = new Podcatcher.EpisodeView({model: episode});
    return view.render().el;
  }
});
