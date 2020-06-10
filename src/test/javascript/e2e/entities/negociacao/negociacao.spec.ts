import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import NegociacaoComponentsPage, { NegociacaoDeleteDialog } from './negociacao.page-object';
import NegociacaoUpdatePage from './negociacao-update.page-object';
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

describe('Negociacao e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let negociacaoComponentsPage: NegociacaoComponentsPage;
  let negociacaoUpdatePage: NegociacaoUpdatePage;
  let negociacaoDeleteDialog: NegociacaoDeleteDialog;
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

  it('should load Negociacaos', async () => {
    await navBarPage.getEntityPage('negociacao');
    negociacaoComponentsPage = new NegociacaoComponentsPage();
    expect(await negociacaoComponentsPage.title.getText()).to.match(/Negociacaos/);

    expect(await negociacaoComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([negociacaoComponentsPage.noRecords, negociacaoComponentsPage.table]);

    beforeRecordsCount = (await isVisible(negociacaoComponentsPage.noRecords)) ? 0 : await getRecordsCount(negociacaoComponentsPage.table);
  });

  it('should load create Negociacao page', async () => {
    await negociacaoComponentsPage.createButton.click();
    negociacaoUpdatePage = new NegociacaoUpdatePage();
    expect(await negociacaoUpdatePage.getPageTitle().getAttribute('id')).to.match(/sgaContratosApp.negociacao.home.createOrEditLabel/);
    await negociacaoUpdatePage.cancel();
  });

  it('should create and save Negociacaos', async () => {
    await negociacaoComponentsPage.createButton.click();
    await negociacaoUpdatePage.setDataInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await negociacaoUpdatePage.getDataInput()).to.contain('2001-01-01T02:30');
    await negociacaoUpdatePage.setDescricaoInput('descricao');
    expect(await negociacaoUpdatePage.getDescricaoInput()).to.match(/descricao/);
    await negociacaoUpdatePage.clienteSelectLastOption();
    await waitUntilDisplayed(negociacaoUpdatePage.saveButton);
    await negociacaoUpdatePage.save();
    await waitUntilHidden(negociacaoUpdatePage.saveButton);
    expect(await isVisible(negociacaoUpdatePage.saveButton)).to.be.false;

    expect(await negociacaoComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(negociacaoComponentsPage.table);

    await waitUntilCount(negociacaoComponentsPage.records, beforeRecordsCount + 1);
    expect(await negociacaoComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Negociacao', async () => {
    const deleteButton = negociacaoComponentsPage.getDeleteButton(negociacaoComponentsPage.records.last());
    await click(deleteButton);

    negociacaoDeleteDialog = new NegociacaoDeleteDialog();
    await waitUntilDisplayed(negociacaoDeleteDialog.deleteModal);
    expect(await negociacaoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sgaContratosApp.negociacao.delete.question/);
    await negociacaoDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(negociacaoDeleteDialog.deleteModal);

    expect(await isVisible(negociacaoDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([negociacaoComponentsPage.noRecords, negociacaoComponentsPage.table]);

    const afterCount = (await isVisible(negociacaoComponentsPage.noRecords)) ? 0 : await getRecordsCount(negociacaoComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
