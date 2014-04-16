describe('EPISODE VIEW', function () {
  beforeEach(function () {
    this.model = new Backbone.Model({
      "Id": "008e81b3-83f7-4d33-8d31-4ec15f84224c",
      "Title": "#13 - Convert to Raid: Tornado Town",
      "Link": "http://converttoraid.libsyn.com/-13-convert-to-raid-tornado-town",
      "Comments": null,
      "PublicationDate": "2011-10-03T23:21:44Z",
      "PermaLink": "1d89c6c9ec5676dfa66a663871a850a5",
      "Description": "<p>This week the crew gives their impressions of the PTR, talk more about the Looking for Raid feature, and put Alysrazor's head on the chopping block for an awesome War Room segment and a TON more.</p>",
      "Subtitle": null,
      "Summary": null,
      "Author": null,
      "Explicit": true,
      "Duration": null,
      "MediaLink": "http://traffic.libsyn.com/converttoraid/ctr_13.mp3",
      "MediaDuration": 96873530,
      "MediaType": "audio/mpeg"
    });
    this.view = new Podcatcher.EpisodeView({model: this.model});
  });

  it('creates the base container element', function () {
    expect(this.view.el.tagName).toBe('DIV');
  });

  it('the element has the right class name', function () {
    expect(this.view.el.className).toBe('episode-detail');
  });

  describe('rendering', function () {
    it('returns the view object', function () {
      expect(this.view.render()).toBe(this.view);
    });

    it('produces the correct HTML', function() {
      this.view.render();

      expect(this.view.$el.html())
          .toEqual('<h2>'+this.model.get('Title')+' <small>'+this.model.get('PublicationDate')+'</small></h2><div>'+this.model.get('Description')+'</div><audio src="'+this.model.get('MediaLink')+'" preload="none"></audio>');
    });
  });
});