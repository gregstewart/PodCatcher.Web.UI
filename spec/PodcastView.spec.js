describe('PODCAST VIEW', function () {
  beforeEach(function () {
    this.model = new Backbone.Model({
      Id:"7ebdb1a0-c419-43c6-9129-4d1f8c7951ee",
      Title:"Convert to Raid: The podcast for raiders in World of Warcraft",
      Uri:"http://converttoraid.libsyn.com/rss",
      Summary:"Convert to Raid examines everything about the end game in World of Warcraft.  Join our panel of avid raiders each episode and keep up to date on the latest buzz from Azeroth.  From noob to pro, we'll keep you in the loop on all the latest additions and changes that affect you most!",
      Image:"http://assets.libsyn.com/content/5472375.jpg",
      Metadata:{
        Link:"http://podcatcher.cloudapp.net/api/podcasts/7ebdb1a0-c419-43c6-9129-4d1f8c7951ee",
        SubscribeLink:"http://podcatcher.cloudapp.net/api/podcasts/7ebdb1a0-c419-43c6-9129-4d1f8c7951ee/subscribe"
      }
    });
    this.view = new Podcatcher.PodcastView({model: this.model});
  });

  it('creates the base list element', function () {
    expect(this.view.el.tagName).toBe('DIV');
  });

  it('the element has the right class name', function () {
    expect(this.view.el.className).toBe('podcast-detail');
  });

  describe('rendering', function () {
    it('returns the view object', function () {
      expect(this.view.render()).toBe(this.view);
    });

    it('produces the correct HTML', function() {
      this.view.render();

      expect(this.view.$el.html())
          .toEqual('<a href="#podcast/detail/'+this.model.get('Id')+'"><div><h2>'+this.model.get('Title')+'</h2><p>'+this.model.get('Summary')+'</p></div></a>');
    });
  });
});