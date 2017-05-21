import { HeatingWebappPage } from './app.po';

describe('heating-webapp App', () => {
  let page: HeatingWebappPage;

  beforeEach(() => {
    page = new HeatingWebappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
