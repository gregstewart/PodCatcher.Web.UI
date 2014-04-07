var Podcatcher = Podcatcher || {};

Podcatcher.EpisodeListView = Backbone.View.extend({
  tagName: 'section',
  className: 'episodes list-episodes',
  template : _.template('<ul class="episodes"></ul>'),
  listElementTemplate : _.template('<li class="episode"></li>'),
  notificationTemplate : _.template('<div class="notification"></div>'),

  initialize: function (options) {
    this.collection = options.collection;
    this.listenTo(this.collection, 'add', this.render);
  },

  render: function () {
    var self = this,
        output;

    if (this.collection.length > 0) {
      output = this.$el.html(this.template());
      this.collection.each(function(model) {
        self.$el.find('ul.episodes').append(self.addEpisodeView(model));
      });
    } else {
      output = this.$el.html(this.notificationTemplate());
      var notification = this.$el.find('.notification');
      notification.html('No episodes found');
    }

    $('#podcatcher').html(output);
    return this;
  },

  addEpisodeView: function (podcast) {
    var view = new Podcatcher.EpisodeView({model: podcast});
    return $(this.listElementTemplate()).html(view.render().el);
  }
});