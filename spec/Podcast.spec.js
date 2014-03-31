describe('Podcast', function () {
  beforeEach(function () {
    this.podcast = new Podcatcher.Podcast();
    this.server = sinon.fakeServer.create();
  });

  afterEach(function () {
    this.podcast.clear({silent: true});
    this.server.restore();
  });

  describe('POST new podcast', function () {

    it('sets the collection URI with the response header value from the service and calls fetch', function (done) {
      var url = "/api/podcast/";
      var location = url + "some-id";

      var result = { "Id":"7ebdb1a0-c419-43c6-9129-4d1f8c7951ee",
        "Title":"Convert to Raid: The podcast for raiders in World of Warcraft",
        "Uri":"http://converttoraid.libsyn.com/rss",
        "Summary":"Convert to Raid examines everything about the end game in World of Warcraft.",
        "Image":"http://assets.libsyn.com/content/5472375.jpg"};

      this.podcast.set({Uri: 'some-uri'});
      this.server.respondWith("POST", url,
          [201, { "Content-Type": "application/json",
            "Location": location },
            JSON.stringify(result)]);

      this.podcast.save();
      this.server.respond();

      expect(this.server.requests[0].method).toEqual("POST");
      expect(this.server.requests[0].url).toEqual("/api/podcast/");
      expect(this.server.requests[0].responseHeaders.Location).toEqual(location);
      expect(JSON.parse(this.server.requests[0].responseText)).toEqual(this.podcast.attributes);
    });
  });

  describe('validate attributes', function () {

    it('should not save a podcast when the Uri is missing', function () {
      var error = sinon.spy();
      this.podcast.bind("invalid", error);

      this.podcast.save();

      expect(error.calledOnce).toBe(true);
      expect(error.calledWith(this.podcast, "cannot have empty Uri")).toBe(true);
    });

    it('should not save a podcast when the Uri is empty', function () {
      var error = sinon.spy();
      this.podcast.bind("invalid", error);

      this.podcast.save({Uri: ""});

      expect(error.calledOnce).toBe(true);
      expect(error.calledWith(this.podcast, "cannot have empty Uri")).toBe(true);
    });
  });
});