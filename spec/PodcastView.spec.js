xdescribe('PODCAST VIEW', function () {
  beforeEach(function () {
    this.view = new Backbone.View();
    this.view.render = function () {
      this.el = createElement('li');
      return this;
    };

    this.renderSpy = sinon.spy(this.view, 'render');
    this.viewStub = sinon.stub(Podcatcher, 'PodcastView').returns(this.view);
  });

  it('appends the podcast to the podcast list', function() {
    console.log($(this.view.el));
    expect($(this.view.el).children().length).toEqual(3);
  });

});