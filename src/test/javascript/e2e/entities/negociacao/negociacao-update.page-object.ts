import { element, by, ElementFinder } from 'protractor';

export default class NegociacaoUpdatePage {
  pageTitle: ElementFinder = element(by.id('sgaContratosApp.negociacao.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dataInput: ElementFinder = element(by.css('input#negociacao-data'));
  descricaoInput: ElementFinder = element(by.css('input#negociacao-descricao'));
  propostasSelect: ElementFinder = element(by.css('select#negociacao-propostas'));
  clienteSelect: ElementFinder = element(by.css('select#negociacao-cliente'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDataInput(data) {
    await this.dataInput.sendKeys(data);
  }

  async getDataInput() {
    return this.dataInput.getAttribute('value');
  }

  async setDescricaoInput(descricao) {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput() {
    return this.descricaoInput.getAttribute('value');
  }

  async propostasSelectLastOption() {
    await this.propostasSelect.all(by.tagName('option')).last().click();
  }

  async propostasSelectOption(option) {
    await this.propostasSelect.sendKeys(option);
  }

  getPropostasSelect() {
    return this.propostasSelect;
  }

  async getPropostasSelectedOption() {
    return this.propostasSelect.element(by.css('option:checked')).getText();
  }

  async clienteSelectLastOption() {
    await this.clienteSelect.all(by.tagName('option')).last().click();
  }

  async clienteSelectOption(option) {
    await this.clienteSelect.sendKeys(option);
  }

  getClienteSelect() {
    return this.clienteSelect;
  }

  async getClienteSelectedOption() {
    return this.clienteSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
