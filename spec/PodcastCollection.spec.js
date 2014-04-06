describe('PodcastCollection', function () {
  beforeEach(function () {
    Podcatcher.baseUrl = '';

    this.collection = new Podcatcher.PodcastCollection();

    this.response =
        [
          { "Id":"7ebdb1a0-c419-43c6-9129-4d1f8c7951ee",
            "Title":"Convert to Raid: The podcast for raiders in World of Warcraft",
            "Uri":"http://converttoraid.libsyn.com/rss",
            "Summary":"Convert to Raid examines everything about the end game in World of Warcraft.  Join our panel of avid raiders each episode and keep up to date on the latest buzz from Azeroth.  From noob to pro, we'll keep you in the loop on all the latest additions and changes that affect you most!",
            "Image":"http://assets.libsyn.com/content/5472375.jpg",
            "Metadata":{
              "Link":"http://podcatcher.cloudapp.net/api/podcasts/7ebdb1a0-c419-43c6-9129-4d1f8c7951ee",
              "SubscribeLink":"http://podcatcher.cloudapp.net/api/podcasts/7ebdb1a0-c419-43c6-9129-4d1f8c7951ee/subscribe"
            }
          },
          { "Id":"efdc309a-0dcd-4c69-9bda-5f7c6321deb7",
            "Title":"Hanselminutes",
            "Uri":"http://pwop.com/feed.aspx?show=hanselminutes&filetype=master",
            "Summary":"Hanselminutes is a weekly audio talk show with noted web developer and technologist Scott Hanselman and hosted by Carl Franklin. Scott discusses utilities and tools, gives practical how-to advice, and discusses ASP.NET or Windows issues and workarounds.",
            "Image":"http://www.pwop.com/itunes_hanselminutes.jpg",
            "Metadata":
            {
              "Link":"http://podcatcher.cloudapp.net/api/podcasts/efdc309a-0dcd-4c69-9bda-5f7c6321deb7",
              "SubscribeLink":"http://podcatcher.cloudapp.net/api/podcasts/efdc309a-0dcd-4c69-9bda-5f7c6321deb7/subscribe"
            }
          }
        ];
  });

  afterEach(function () {

  });

  it('initialises with an empty collection', function () {
    expect(this.collection.length).toBe(0);
  });

  describe('fetch podcasts from server', function () {
    beforeEach(function () {
      this.server = sinon.fakeServer.create();
      var url = "/api/podcasts";
      this.server.respondWith("GET", url,
          [200, { "Content-Type": "application/json" },
            JSON.stringify(this.response)]);
      this.collection.url = url;
      this.collection.fetch();
      this.server.respond();
    });

    afterEach(function () {
      this.server.restore();
    });

    it('populates the collection from the response', function () {
      expect(this.collection.length).toBe(2);
    });

    it('sets the correct podcast Id', function () {
      var model = this.collection.at(0);
      expect(model.get('Id')).toBe(this.response[0].Id);
    });

    it('sets the correct podcast from the response', function () {
      var model = this.collection.at(0);
      expect(model.get('Title')).toBe(this.response[0].Title);
    });

    it('sets the correct collection of metadata for the podcast from the response', function () {
      var model = this.collection.at(0);

      expect(model.get('Metadata').length).toBe(this.response[0].Metadata.length);
    });
  });

});