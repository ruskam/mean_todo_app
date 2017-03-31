import { FamilytasksPage } from './app.po';

describe('familytasks App', () => {
  let page: FamilytasksPage;

  beforeEach(() => {
    page = new FamilytasksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
