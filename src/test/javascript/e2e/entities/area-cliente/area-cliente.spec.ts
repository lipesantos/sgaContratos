import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AreaClienteComponentsPage, { AreaClienteDeleteDialog } from './area-cliente.page-object';
import AreaClienteUpdatePage from './area-cliente-update.page-object';
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

describe('AreaCliente e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let areaClienteComponentsPage: AreaClienteComponentsPage;
  let areaClienteUpdatePage: AreaClienteUpdatePage;
  let areaClienteDeleteDialog: AreaClienteDeleteDialog;
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

  it('should load AreaClientes', async () => {
    await navBarPage.getEntityPage('area-cliente');
    areaClienteComponentsPage = new AreaClienteComponentsPage();
    expect(await areaClienteComponentsPage.title.getText()).to.match(/Area Clientes/);

    expect(await areaClienteComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([areaClienteComponentsPage.noRecords, areaClienteComponentsPage.table]);

    beforeRecordsCount = (await isVisible(areaClienteComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(areaClienteComponentsPage.table);
  });

  it('should load create AreaCliente page', async () => {
    await areaClienteComponentsPage.createButton.click();
    areaClienteUpdatePage = new AreaClienteUpdatePage();
    expect(await areaClienteUpdatePage.getPageTitle().getAttribute('id')).to.match(/sgaContratosApp.areaCliente.home.createOrEditLabel/);
    await areaClienteUpdatePage.cancel();
  });

  it('should create and save AreaClientes', async () => {
    await areaClienteComponentsPage.createButton.click();
    await areaClienteUpdatePage.setNomeInput('nome');
    expect(await areaClienteUpdatePage.getNomeInput()).to.match(/nome/);
    await areaClienteUpdatePage.clienteSelectLastOption();
    await waitUntilDisplayed(areaClienteUpdatePage.saveButton);
    await areaClienteUpdatePage.save();
    await waitUntilHidden(areaClienteUpdatePage.saveButton);
    expect(await isVisible(areaClienteUpdatePage.saveButton)).to.be.false;

    expect(await areaClienteComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(areaClienteComponentsPage.table);

    await waitUntilCount(areaClienteComponentsPage.records, beforeRecordsCount + 1);
    expect(await areaClienteComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last AreaCliente', async () => {
    const deleteButton = areaClienteComponentsPage.getDeleteButton(areaClienteComponentsPage.records.last());
    await click(deleteButton);

    areaClienteDeleteDialog = new AreaClienteDeleteDialog();
    await waitUntilDisplayed(areaClienteDeleteDialog.deleteModal);
    expect(await areaClienteDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sgaContratosApp.areaCliente.delete.question/);
    await areaClienteDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(areaClienteDeleteDialog.deleteModal);

    expect(await isVisible(areaClienteDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([areaClienteComponentsPage.noRecords, areaClienteComponentsPage.table]);

    const afterCount = (await isVisible(areaClienteComponentsPage.noRecords)) ? 0 : await getRecordsCount(areaClienteComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
