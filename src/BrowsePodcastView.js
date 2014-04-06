var Podcatcher = Podcatcher || {};

Podcatcher.BrowsePodcastView = Backbone.View.extend({
  tagName: 'article',
  className: 'podcast browse-podcasts',
  template : _.template('<ul class="podcasts"></ul>'),
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
        self.$el.find('ul.podcasts').append(self.addPodcastView(model));
      });
    } else {
      output = this.$el.html(this.notificationTemplate());
      var notification = this.$el.find('.notification');
      notification.html('No podcasts found');
    }

    $('#podcatcher').html(output);
    return this;
  },

  addPodcastView: function (podcast) {
    var view = new Podcatcher.PodcastView({model: podcast});
    return view.render().el;
  }
});