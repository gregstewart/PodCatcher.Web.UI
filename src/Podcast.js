var Podcatcher = Podcatcher || {};

Podcatcher.Podcast = Backbone.Model.extend({
  url: function () {
    var metadata = this.get('Metadata');

    if(metadata && metadata.Link) {
      return this.attributes.Metadata.Link;
    }
    return Podcatcher.baseUrl+'/api/podcasts';
  },

  validate: function(attrs) {

    if(!attrs.Uri || attrs.Uri === "") {
      return "cannot have empty Uri";
    }
  }
});