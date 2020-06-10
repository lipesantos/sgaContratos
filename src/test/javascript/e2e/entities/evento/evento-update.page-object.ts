import { element, by, ElementFinder } from 'protractor';

export default class EventoUpdatePage {
  pageTitle: ElementFinder = element(by.id('sgaContratosApp.evento.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dataEmissaoInput: ElementFinder = element(by.css('input#evento-dataEmissao'));
  dataVencimentoInput: ElementFinder = element(by.css('input#evento-dataVencimento'));
  descricaoInput: ElementFinder = element(by.css('input#evento-descricao'));
  valorInput: ElementFinder = element(by.css('input#evento-valor'));
  propostaSelect: ElementFinder = element(by.css('select#evento-proposta'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDataEmissaoInput(dataEmissao) {
    await this.dataEmissaoInput.sendKeys(dataEmissao);
  }

  async getDataEmissaoInput() {
    return this.dataEmissaoInput.getAttribute('value');
  }

  async setDataVencimentoInput(dataVencimento) {
    await this.dataVencimentoInput.sendKeys(dataVencimento);
  }

  async getDataVencimentoInput() {
    return this.dataVencimentoInput.getAttribute('value');
  }

  async setDescricaoInput(descricao) {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput() {
    return this.descricaoInput.getAttribute('value');
  }

  async setValorInput(valor) {
    await this.valorInput.sendKeys(valor);
  }

  async getValorInput() {
    return this.valorInput.getAttribute('value');
  }

  async propostaSelectLastOption() {
    await this.propostaSelect.all(by.tagName('option')).last().click();
  }

  async propostaSelectOption(option) {
    await this.propostaSelect.sendKeys(option);
  }

  getPropostaSelect() {
    return this.propostaSelect;
  }

  async getPropostaSelectedOption() {
    return this.propostaSelect.element(by.css('option:checked')).getText();
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
