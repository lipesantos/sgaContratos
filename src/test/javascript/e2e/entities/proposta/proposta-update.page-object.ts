import { element, by, ElementFinder } from 'protractor';

export default class PropostaUpdatePage {
  pageTitle: ElementFinder = element(by.id('sgaContratosApp.proposta.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  tipoSelect: ElementFinder = element(by.css('select#proposta-tipo'));
  dataInicioInput: ElementFinder = element(by.css('input#proposta-dataInicio'));
  dataFimInput: ElementFinder = element(by.css('input#proposta-dataFim'));
  referenciaInput: ElementFinder = element(by.css('input#proposta-referencia'));
  descricaoContratoInput: ElementFinder = element(by.css('input#proposta-descricaoContrato'));
  descricaoPropostaInput: ElementFinder = element(by.css('input#proposta-descricaoProposta'));
  valorInicialInput: ElementFinder = element(by.css('input#proposta-valorInicial'));
  negociacoesSelect: ElementFinder = element(by.css('select#proposta-negociacoes'));
  unidadeComercialSelect: ElementFinder = element(by.css('select#proposta-unidadeComercial'));
  clienteSelect: ElementFinder = element(by.css('select#proposta-cliente'));
  areaClienteSelect: ElementFinder = element(by.css('select#proposta-areaCliente'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTipoSelect(tipo) {
    await this.tipoSelect.sendKeys(tipo);
  }

  async getTipoSelect() {
    return this.tipoSelect.element(by.css('option:checked')).getText();
  }

  async tipoSelectLastOption() {
    await this.tipoSelect.all(by.tagName('option')).last().click();
  }
  async setDataInicioInput(dataInicio) {
    await this.dataInicioInput.sendKeys(dataInicio);
  }

  async getDataInicioInput() {
    return this.dataInicioInput.getAttribute('value');
  }

  async setDataFimInput(dataFim) {
    await this.dataFimInput.sendKeys(dataFim);
  }

  async getDataFimInput() {
    return this.dataFimInput.getAttribute('value');
  }

  async setReferenciaInput(referencia) {
    await this.referenciaInput.sendKeys(referencia);
  }

  async getReferenciaInput() {
    return this.referenciaInput.getAttribute('value');
  }

  async setDescricaoContratoInput(descricaoContrato) {
    await this.descricaoContratoInput.sendKeys(descricaoContrato);
  }

  async getDescricaoContratoInput() {
    return this.descricaoContratoInput.getAttribute('value');
  }

  async setDescricaoPropostaInput(descricaoProposta) {
    await this.descricaoPropostaInput.sendKeys(descricaoProposta);
  }

  async getDescricaoPropostaInput() {
    return this.descricaoPropostaInput.getAttribute('value');
  }

  async setValorInicialInput(valorInicial) {
    await this.valorInicialInput.sendKeys(valorInicial);
  }

  async getValorInicialInput() {
    return this.valorInicialInput.getAttribute('value');
  }

  async negociacoesSelectLastOption() {
    await this.negociacoesSelect.all(by.tagName('option')).last().click();
  }

  async negociacoesSelectOption(option) {
    await this.negociacoesSelect.sendKeys(option);
  }

  getNegociacoesSelect() {
    return this.negociacoesSelect;
  }

  async getNegociacoesSelectedOption() {
    return this.negociacoesSelect.element(by.css('option:checked')).getText();
  }

  async unidadeComercialSelectLastOption() {
    await this.unidadeComercialSelect.all(by.tagName('option')).last().click();
  }

  async unidadeComercialSelectOption(option) {
    await this.unidadeComercialSelect.sendKeys(option);
  }

  getUnidadeComercialSelect() {
    return this.unidadeComercialSelect;
  }

  async getUnidadeComercialSelectedOption() {
    return this.unidadeComercialSelect.element(by.css('option:checked')).getText();
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

  async areaClienteSelectLastOption() {
    await this.areaClienteSelect.all(by.tagName('option')).last().click();
  }

  async areaClienteSelectOption(option) {
    await this.areaClienteSelect.sendKeys(option);
  }

  getAreaClienteSelect() {
    return this.areaClienteSelect;
  }

  async getAreaClienteSelectedOption() {
    return this.areaClienteSelect.element(by.css('option:checked')).getText();
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
