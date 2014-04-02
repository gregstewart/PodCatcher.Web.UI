var Podcatcher = Podcatcher || {};

Podcatcher.PodcastSaveView = Backbone.View.extend({
  template : _.template('<div class="notification hidden"></div><form><input type="url" name="podcast-uri" id="podcast-uri" /><button>submit</button></form>'),
  tagName: 'article',
  className: 'podcast add-podcast',

  initialize: function(options) {
    this.model = options.model;
    this.vent = options.vent;

    this.vent.bind('podcast:added', this.podcastAdded, this);
    this.vent.bind('podcast:added:fail', this.podcastNotAdded, this);
  },

  savePodcast: function(e) {
    e.preventDefault();
    var self = this;
    var notification = this.$el.find('.notification');
    notification.addClass('hidden');
    notification.removeClass('error success');

    this.model.set({Uri: this.$el.find('input').val()});

    this.model.save(null, {success: function(response) {
        self.vent.trigger('podcast:added', response.attributes);
      }, error: function() {
        self.vent.trigger('podcast:added:fail');
      }
    }, {wait: true});

    if(!this.model.isValid()) {
      notification.removeClass('hidden');
      notification.addClass('error');
      notification.html(this.model.validationError);
    }
  },

  podcastAdded: function (data) {
    var notification = this.$el.find('.notification'),
        template = _.template('Podcast <%= Title %> added, <a href="podcast/details/<%= Id %>">you can view it here</a>');

    notification.addClass('success');
    notification.removeClass('hidden');
    notification.html(template({Id: data.Id, Title: data.Title}));
  },

  podcastNotAdded: function (data) {
    var notification = this.$el.find('.notification'),
        template = _.template('Podcast not added');

    notification.addClass('error');
    notification.removeClass('hidden');
    notification.html(template());
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