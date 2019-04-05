import { SimplePassPage } from './app.po';

describe('simple-pass App', function() {
  let page: SimplePassPage;

  beforeEach(() => {
    page = new SimplePassPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
