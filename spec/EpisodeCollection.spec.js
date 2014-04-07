describe('EPISODE COLLECTION', function () {
  beforeEach(function () {
    Podcatcher.baseUrl = '';
    this.id = '7ebdb1a0-c419-43c6-9129-4d1f8c7951ee';

    this.collection = new Podcatcher.EpisodeCollection();

    this.response =
        [
          {
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
          },
          {
            "Id": "016e3f82-f6e9-48d2-a37d-69a19a4ba64e",
            "Title": "#114 - Convert to Raid: The Amazing Race with Affinitii!",
            "Link": "http://converttoraid.libsyn.com/-114-convert-to-raid-the-amazing-race-with-affinitii",
            "Comments": null,
            "PublicationDate": "2013-10-07T22:19:10Z",
            "PermaLink": "aaafcac7377f574bce757cb8555587f7",
            "Description": "<p>This week, Affinitii from Blood Legion joins the gang (in his robe) to talk all about the race to world first. Not only does he give his thoughts on the Siege of Orgrimmar, but his opinions on healer balance, the differences of the race between the East and the West, and more. &nbsp;The guys will give you the latest changes to LFR and give a great idea to Blizzard on how to make it better for everyone. &nbsp;Plus, find out what's in your Virtual Ticket goodie bag, check out the details on the Warcraft movie, and perhaps ponder this question: why would anyone think of doing Flex Raid progression? &nbsp;All of that and a ton of fun in another great show!</p>",
            "Subtitle": null,
            "Summary": null,
            "Author": null,
            "Explicit": true,
            "Duration": null,
            "MediaLink": "http://traffic.libsyn.com/converttoraid/ctr_114.mp3",
            "MediaDuration": 97080574,
            "MediaType": "audio/mpeg"
          }
        ];
  });

  afterEach(function () {
    this.collection.reset();
  });

  it('initialises with an empty collection', function () {
    expect(this.collection.length).toBe(0);
  });

  describe('fetch podcasts from server', function () {
    beforeEach(function () {
      this.server = sinon.fakeServer.create();
      this.url = '/api/podcasts/'+this.id+'/episodes';
      this.server.respondWith('GET', this.url,
          [200, { "Content-Type": 'application/json' },
            JSON.stringify(this.response)]);
      this.collection.fetch({podcastId:this.id});
      this.server.respond();
    });

    afterEach(function () {
      this.server.restore();
    });

    it('creates the correct url', function () {
      expect(this.collection.url()).toBe(this.url);
    });

    it('populates the collection from the response', function () {
      expect(this.collection.length).toBe(2);
    });

    it('sets the correct episode Id', function () {
      var model = this.collection.at(0);
      expect(model.get('Id')).toBe(this.response[0].Id);
    });

    it('sets the correct episode from the response', function () {
      var model = this.collection.at(0);
      expect(model.get('Title')).toBe(this.response[0].Title);
    });

  });

});