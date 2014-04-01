describe('Podcast', function () {
  beforeEach(function () {
    this.vent = _.extend({}, Backbone.Events);
    this.podcast = new Podcatcher.Podcast({vent: this.vent});
    this.server = sinon.fakeServer.create();
    this.result = { "Id":"7ebdb1a0-c419-43c6-9129-4d1f8c7951ee",
      "Title":"Convert to Raid: The podcast for raiders in World of Warcraft",
      "Uri":"http://converttoraid.libsyn.com/rss",
      "Summary":"Convert to Raid examines everything about the end game in World of Warcraft.",
      "Image":"http://assets.libsyn.com/content/5472375.jpg"
    };
  });

  afterEach(function () {
    this.podcast.clear({silent: true});
    this.server.restore();
  });

  describe('save', function () {
    it('successfully posts a podcast', function (done) {
      var url = "/api/podcast/",
        location = url + "some-id";

      this.podcast.set({Uri: 'some-uri'});
      this.server.respondWith("POST", url,
          [201, { "Content-Type": "application/json",
            "Location": location },
            JSON.stringify(this.result)]);

      this.podcast.save();
      this.server.respond();

      expect(this.server.requests[0].method).toEqual("POST");
      expect(this.server.requests[0].url).toEqual("/api/podcast/");
      expect(this.server.requests[0].responseHeaders.Location).toEqual(location);
      expect(JSON.parse(this.server.requests[0].responseText).Id).toEqual(this.podcast.attributes.Id);
    });

    it('calls success handler when response is CREATED', function () {
      var url = "/api/podcast/",
        location = url + "some-id";
        successHandler = sinon.stub(this.podcast, 'success');

      this.podcast.set({Uri: 'some-uri'});
      this.server.respondWith("POST", url,
          [201, { "Content-Type": "application/json",
            "Location": location },
            JSON.stringify(this.result)]);

      this.podcast.save(null, {success: this.podcast.success});
      this.server.respond();

      expect(this.podcast.success.calledOnce).toBe(true);

      this.podcast.success.restore();
    });
  });

  describe('success handler', function () {
    it('replaced the model with the data from the response', function () {
      var model = new Backbone.Model(this.result);
      this.podcast.success(model);
      expect(this.podcast.get('Id')).toBe(this.result.Id);
    });

    it('triggers an event to update the view', function () {
      sinon.stub(this.vent, 'trigger');
      var model = new Backbone.Model(this.result);
      this.podcast.success(model);

      expect(this.vent.trigger.calledOnce).toBe(true);
      expect(this.vent.trigger.calledWith('podcast:added', this.result)).toBe(true);

      this.vent.trigger.restore();
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