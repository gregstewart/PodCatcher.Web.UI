var Podcatcher = Podcatcher || {};

Podcatcher.PodcastView = Backbone.View.extend({
  template : _.template('<a href="#podcast/detail/<%= Id %>"><div><h2><%= Title %></h2><p><%= Summary %></p></div></a>'),
  tagName: 'DIV',
  className: 'podcast-detail',

  render: function () {
    var output = this.template({Id: this.model.get('Id'),
      Image: this.model.get('Image'),
      Title: this.model.get('Title'),
      Summary: this.model.get('Summary')});
    this.$el.css({background: 'url(' + this.model.get('Image') + ') no-repeat center'});
    this.$el.html(output);

    return this;
  }
});