var Podcatcher = Podcatcher || {};

Podcatcher.PodcastSaveView = Backbone.View.extend({
  template : _.template('<div class="error hidden"></div><form><input type="url" name="podcast-uri" id="podcast-uri" /><button>submit</button></form>'),
  tagName: 'article',
  className: 'podcast add-podcast',

  savePodcast: function(e) {
    e.preventDefault();
    var error = this.$el.find('.error');
    error.addClass('hidden');

    this.model.set({Uri: this.$el.find('input').val()});
    this.model.save();

    if(!this.model.isValid()) {
      error.removeClass('hidden');
      error.html(this.model.validationError);
    }
  },

  events: {
    'click button': 'savePodcast'
  },

  render: function () {
    var saveView = this.$el.html(this.template());
    $('#podcatcher').html(saveView);
    return this;
  }

});