import { SearchboxPage } from './app.po';

describe('searchbox App', () => {
  let page: SearchboxPage;

  beforeEach(() => {
    page = new SearchboxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
