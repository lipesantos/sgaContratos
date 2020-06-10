import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ClienteComponentsPage, { ClienteDeleteDialog } from './cliente.page-object';
import ClienteUpdatePage from './cliente-update.page-object';
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

describe('Cliente e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let clienteComponentsPage: ClienteComponentsPage;
  let clienteUpdatePage: ClienteUpdatePage;
  let clienteDeleteDialog: ClienteDeleteDialog;
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

  it('should load Clientes', async () => {
    await navBarPage.getEntityPage('cliente');
    clienteComponentsPage = new ClienteComponentsPage();
    expect(await clienteComponentsPage.title.getText()).to.match(/Clientes/);

    expect(await clienteComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([clienteComponentsPage.noRecords, clienteComponentsPage.table]);

    beforeRecordsCount = (await isVisible(clienteComponentsPage.noRecords)) ? 0 : await getRecordsCount(clienteComponentsPage.table);
  });

  it('should load create Cliente page', async () => {
    await clienteComponentsPage.createButton.click();
    clienteUpdatePage = new ClienteUpdatePage();
    expect(await clienteUpdatePage.getPageTitle().getAttribute('id')).to.match(/sgaContratosApp.cliente.home.createOrEditLabel/);
    await clienteUpdatePage.cancel();
  });

  it('should create and save Clientes', async () => {
    await clienteComponentsPage.createButton.click();
    await clienteUpdatePage.setCnpjInput('5');
    expect(await clienteUpdatePage.getCnpjInput()).to.eq('5');
    await clienteUpdatePage.setRazaoSocialInput('razaoSocial');
    expect(await clienteUpdatePage.getRazaoSocialInput()).to.match(/razaoSocial/);
    await clienteUpdatePage.setNomeFantasiaInput('nomeFantasia');
    expect(await clienteUpdatePage.getNomeFantasiaInput()).to.match(/nomeFantasia/);
    await clienteUpdatePage.setPostalCodeInput('postalCode');
    expect(await clienteUpdatePage.getPostalCodeInput()).to.match(/postalCode/);
    await clienteUpdatePage.setCityInput('city');
    expect(await clienteUpdatePage.getCityInput()).to.match(/city/);
    await clienteUpdatePage.setStateProvinceInput('stateProvince');
    expect(await clienteUpdatePage.getStateProvinceInput()).to.match(/stateProvince/);
    await waitUntilDisplayed(clienteUpdatePage.saveButton);
    await clienteUpdatePage.save();
    await waitUntilHidden(clienteUpdatePage.saveButton);
    expect(await isVisible(clienteUpdatePage.saveButton)).to.be.false;

    expect(await clienteComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(clienteComponentsPage.table);

    await waitUntilCount(clienteComponentsPage.records, beforeRecordsCount + 1);
    expect(await clienteComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Cliente', async () => {
    const deleteButton = clienteComponentsPage.getDeleteButton(clienteComponentsPage.records.last());
    await click(deleteButton);

    clienteDeleteDialog = new ClienteDeleteDialog();
    await waitUntilDisplayed(clienteDeleteDialog.deleteModal);
    expect(await clienteDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sgaContratosApp.cliente.delete.question/);
    await clienteDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(clienteDeleteDialog.deleteModal);

    expect(await isVisible(clienteDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([clienteComponentsPage.noRecords, clienteComponentsPage.table]);

    const afterCount = (await isVisible(clienteComponentsPage.noRecords)) ? 0 : await getRecordsCount(clienteComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
