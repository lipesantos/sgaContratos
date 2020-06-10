import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PropostaComponentsPage, { PropostaDeleteDialog } from './proposta.page-object';
import PropostaUpdatePage from './proposta-update.page-object';
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

describe('Proposta e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let propostaComponentsPage: PropostaComponentsPage;
  let propostaUpdatePage: PropostaUpdatePage;
  let propostaDeleteDialog: PropostaDeleteDialog;
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

  it('should load Propostas', async () => {
    await navBarPage.getEntityPage('proposta');
    propostaComponentsPage = new PropostaComponentsPage();
    expect(await propostaComponentsPage.title.getText()).to.match(/Propostas/);

    expect(await propostaComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([propostaComponentsPage.noRecords, propostaComponentsPage.table]);

    beforeRecordsCount = (await isVisible(propostaComponentsPage.noRecords)) ? 0 : await getRecordsCount(propostaComponentsPage.table);
  });

  it('should load create Proposta page', async () => {
    await propostaComponentsPage.createButton.click();
    propostaUpdatePage = new PropostaUpdatePage();
    expect(await propostaUpdatePage.getPageTitle().getAttribute('id')).to.match(/sgaContratosApp.proposta.home.createOrEditLabel/);
    await propostaUpdatePage.cancel();
  });

  it('should create and save Propostas', async () => {
    await propostaComponentsPage.createButton.click();
    await propostaUpdatePage.tipoSelectLastOption();
    await propostaUpdatePage.setDataInicioInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await propostaUpdatePage.getDataInicioInput()).to.contain('2001-01-01T02:30');
    await propostaUpdatePage.setDataFimInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await propostaUpdatePage.getDataFimInput()).to.contain('2001-01-01T02:30');
    await propostaUpdatePage.setReferenciaInput('referencia');
    expect(await propostaUpdatePage.getReferenciaInput()).to.match(/referencia/);
    await propostaUpdatePage.setDescricaoContratoInput('descricaoContrato');
    expect(await propostaUpdatePage.getDescricaoContratoInput()).to.match(/descricaoContrato/);
    await propostaUpdatePage.setDescricaoPropostaInput('descricaoProposta');
    expect(await propostaUpdatePage.getDescricaoPropostaInput()).to.match(/descricaoProposta/);
    await propostaUpdatePage.setValorInicialInput('5');
    expect(await propostaUpdatePage.getValorInicialInput()).to.eq('5');
    await propostaUpdatePage.clienteSelectLastOption();
    await propostaUpdatePage.unidadeComercialSelectLastOption();
    await propostaUpdatePage.areaClienteSelectLastOption();
    await waitUntilDisplayed(propostaUpdatePage.saveButton);
    await propostaUpdatePage.save();
    await waitUntilHidden(propostaUpdatePage.saveButton);
    expect(await isVisible(propostaUpdatePage.saveButton)).to.be.false;

    expect(await propostaComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(propostaComponentsPage.table);

    await waitUntilCount(propostaComponentsPage.records, beforeRecordsCount + 1);
    expect(await propostaComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Proposta', async () => {
    const deleteButton = propostaComponentsPage.getDeleteButton(propostaComponentsPage.records.last());
    await click(deleteButton);

    propostaDeleteDialog = new PropostaDeleteDialog();
    await waitUntilDisplayed(propostaDeleteDialog.deleteModal);
    expect(await propostaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/sgaContratosApp.proposta.delete.question/);
    await propostaDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(propostaDeleteDialog.deleteModal);

    expect(await isVisible(propostaDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([propostaComponentsPage.noRecords, propostaComponentsPage.table]);

    const afterCount = (await isVisible(propostaComponentsPage.noRecords)) ? 0 : await getRecordsCount(propostaComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
