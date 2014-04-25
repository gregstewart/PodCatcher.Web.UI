var Podcatcher = Podcatcher || {};

Podcatcher.EpisodeListView = Backbone.View.extend({
  tagName: 'section',
  className: 'episodes list-episodes',
  template : _.template('<ul class="episodes"></ul>'),
  listElementTemplate : _.template('<li class="episode"></li>'),
  episodeDetailLinkTemplate : _.template('<a class="episode-detail-link" href="#episode/<%= Id %>">View details</a>'),
  notificationTemplate : _.template('<div class="notification"></div>'),

  initialize: function (options) {
    this.collection = options.collection;
    this.listenTo(this.collection, 'reset', this.render);
  },

  render: function () {
    var self = this,
        output;

    if (this.collection.length > 0) {
      output = this.$el.html(this.template());
      this.collection.each(function(model) {
        var episodeView = self.addEpisodeView(model);
        var episodeLink = self.addEpisodeLink(model);

        episodeView.append(episodeLink);
        self.$el.find('ul.episodes').append(episodeView);
      });
    } else {
      output = this.$el.html(this.notificationTemplate());
      var notification = this.$el.find('.notification');
      notification.html('No episodes found');
    }

    $('.podcast.podcast-details').append(output);
    return this;
  },

  addEpisodeView: function (episode) {
    var view = new Podcatcher.EpisodeView({model: episode});
    return $(this.listElementTemplate()).html(view.render().el);
  },

  addEpisodeLink: function (episode) {
    return this.episodeDetailLinkTemplate({Id: episode.get('Id')});
  }

});