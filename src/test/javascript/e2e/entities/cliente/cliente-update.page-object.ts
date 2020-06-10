import { element, by, ElementFinder } from 'protractor';

export default class ClienteUpdatePage {
  pageTitle: ElementFinder = element(by.id('sgaContratosApp.cliente.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  cnpjInput: ElementFinder = element(by.css('input#cliente-cnpj'));
  razaoSocialInput: ElementFinder = element(by.css('input#cliente-razaoSocial'));
  nomeFantasiaInput: ElementFinder = element(by.css('input#cliente-nomeFantasia'));
  postalCodeInput: ElementFinder = element(by.css('input#cliente-postalCode'));
  cityInput: ElementFinder = element(by.css('input#cliente-city'));
  stateProvinceInput: ElementFinder = element(by.css('input#cliente-stateProvince'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCnpjInput(cnpj) {
    await this.cnpjInput.sendKeys(cnpj);
  }

  async getCnpjInput() {
    return this.cnpjInput.getAttribute('value');
  }

  async setRazaoSocialInput(razaoSocial) {
    await this.razaoSocialInput.sendKeys(razaoSocial);
  }

  async getRazaoSocialInput() {
    return this.razaoSocialInput.getAttribute('value');
  }

  async setNomeFantasiaInput(nomeFantasia) {
    await this.nomeFantasiaInput.sendKeys(nomeFantasia);
  }

  async getNomeFantasiaInput() {
    return this.nomeFantasiaInput.getAttribute('value');
  }

  async setPostalCodeInput(postalCode) {
    await this.postalCodeInput.sendKeys(postalCode);
  }

  async getPostalCodeInput() {
    return this.postalCodeInput.getAttribute('value');
  }

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return this.cityInput.getAttribute('value');
  }

  async setStateProvinceInput(stateProvince) {
    await this.stateProvinceInput.sendKeys(stateProvince);
  }

  async getStateProvinceInput() {
    return this.stateProvinceInput.getAttribute('value');
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
