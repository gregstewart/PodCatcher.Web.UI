var Podcatcher = Podcatcher || {};

Podcatcher.BrowsePodcastView = Backbone.View.extend({
  tagName: 'article',
  className: 'podcast browse-podcasts',
  template : _.template('<ul class="podcasts"></ul>'),

  initialize: function (options) {
    this.collection = options.collection;
  },

  render: function () {
    var self = this;
    var listView = this.$el.html(this.template());

    this.collection.each(function(model) {
      self.$el.find('ul.podcasts').append(self.addPodcastView(model));
    });

    $('#podcatcher').html(listView);

    return this;
  },

  addPodcastView: function (podcast) {
    var view = new Podcatcher.PodcastView(podcast);
    return view.render().el;
  }
});