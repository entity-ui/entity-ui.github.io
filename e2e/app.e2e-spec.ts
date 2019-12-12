import { EntityUiSitePage } from './app.po';

describe('entity-ui-site App', function() {
  let page: EntityUiSitePage;

  beforeEach(() => {
    page = new EntityUiSitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
