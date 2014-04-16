var Podcatcher = Podcatcher || {};

Podcatcher.EpisodeView = Backbone.View.extend({
  template : _.template('<h2><%= Title %> <small><%= PublicationDate %></small></h2><div><%= Description %></div><audio src="<%= MediaLink %>" preload="none"></audio>'),
  tagName: 'DIV',
  className: 'episode-detail',

  render: function () {
    var output = this.template({
      Id: this.model.get('Id'),
      Title: this.model.get('Title'),
      Description: this.model.get('Description'),
      PublicationDate: this.model.get('PublicationDate'),
      MediaLink: this.model.get('MediaLink')
    });

    this.$el.html(output);
    return this;
  }
});