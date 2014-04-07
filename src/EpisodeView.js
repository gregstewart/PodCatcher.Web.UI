var Podcatcher = Podcatcher || {};

Podcatcher.EpisodeView = Backbone.View.extend({
  template : _.template('<h2><%= Title %></h2><p><%= PublicationDate %></p><div><%= Description %></div>'),
  tagName: 'DIV',
  className: 'episode-detail',

  render: function () {
    var output = this.template({
      Id: this.model.get('Id'),
      Title: this.model.get('Title'),
      Description: this.model.get('Description'),
      PublicationDate: this.model.get('PublicationDate')
    });

    this.$el.html(output);

    return this;
  }
});