import { element, by, ElementFinder } from 'protractor';

export default class AreaClienteUpdatePage {
  pageTitle: ElementFinder = element(by.id('sgaContratosApp.areaCliente.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomeInput: ElementFinder = element(by.css('input#area-cliente-nome'));
  clienteSelect: ElementFinder = element(by.css('select#area-cliente-cliente'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomeInput(nome) {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput() {
    return this.nomeInput.getAttribute('value');
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
