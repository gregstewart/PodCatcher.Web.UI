var Podcatcher = Podcatcher || {};

Podcatcher.PodcastView = Backbone.View.extend({
  template : _.template('<a href="#podcast/detail/<%= Id %>"><div><h2><%= Title %></h2><p><%= Summary %></p></div></a>'),
  tagName: 'DIV',
  className: 'podcast-detail',

  render: function () {
    var output = this.template({Id: this.model.get('Id'), Title: this.model.get('Title'), Summary: this.model.get('Summary')});
    this.$el.html(output);

    return this;
  }
});