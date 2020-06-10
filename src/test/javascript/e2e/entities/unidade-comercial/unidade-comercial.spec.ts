import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UnidadeComercialComponentsPage, { UnidadeComercialDeleteDialog } from './unidade-comercial.page-object';
import UnidadeComercialUpdatePage from './unidade-comercial-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('UnidadeComercial e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let unidadeComercialComponentsPage: UnidadeComercialComponentsPage;
  let unidadeComercialUpdatePage: UnidadeComercialUpdatePage;
  let unidadeComercialDeleteDialog: UnidadeComercialDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load UnidadeComercials', async () => {
    await navBarPage.getEntityPage('unidade-comercial');
    unidadeComercialComponentsPage = new UnidadeComercialComponentsPage();
    expect(await unidadeComercialComponentsPage.title.getText()).to.match(/Unidade Comercials/);

    expect(await unidadeComercialComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([unidadeComercialComponentsPage.noRecords, unidadeComercialComponentsPage.table]);

    beforeRecordsCount = (await isVisible(unidadeComercialComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(unidadeComercialComponentsPage.table);
  });

  it('should load create UnidadeComercial page', async () => {
    await unidadeComercialComponentsPage.createButton.click();
    unidadeComercialUpdatePage = new UnidadeComercialUpdatePage();
    expect(await unidadeComercialUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /sgaContratosApp.unidadeComercial.home.createOrEditLabel/
    );
    await unidadeComercialUpdatePage.cancel();
  });

  it('should create and save UnidadeComercials', async () => {
    await unidadeComercialComponentsPage.createButton.click();
    await unidadeComercialUpdatePage.setCnpjInput('5');
    expect(await unidadeComercialUpdatePage.getCnpjInput()).to.eq('5');
    await unidadeComercialUpdatePage.setRazaoSocialInput('razaoSocial');
    expect(await unidadeComercialUpdatePage.getRazaoSocialInput()).to.match(/razaoSocial/);
    await waitUntilDisplayed(unidadeComercialUpdatePage.saveButton);
    await unidadeComercialUpdatePage.save();
    await waitUntilHidden(unidadeComercialUpdatePage.saveButton);
    expect(await isVisible(unidadeComercialUpdatePage.saveButton)).to.be.false;

    expect(await unidadeComercialComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(unidadeComercialComponentsPage.table);

    await waitUntilCount(unidadeComercialComponentsPage.records, beforeRecordsCount + 1);
    expect(await unidadeComercialComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last UnidadeComercial', async () => {
    const deleteButton = unidadeComercialComponentsPage.getDeleteButton(unidadeComercialComponentsPage.records.last());
    await click(deleteButton);

    unidadeComercialDeleteDialog = new UnidadeComercialDeleteDialog();
    await waitUntilDisplayed(unidadeComercialDeleteDialog.deleteModal);
    expect(await unidadeComercialDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /sgaContratosApp.unidadeComercial.delete.question/
    );
    await unidadeComercialDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(unidadeComercialDeleteDialog.deleteModal);

    expect(await isVisible(unidadeComercialDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([unidadeComercialComponentsPage.noRecords, unidadeComercialComponentsPage.table]);

    const afterCount = (await isVisible(unidadeComercialComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(unidadeComercialComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
