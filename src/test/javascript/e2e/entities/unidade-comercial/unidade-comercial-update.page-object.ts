import { element, by, ElementFinder } from 'protractor';

export default class UnidadeComercialUpdatePage {
  pageTitle: ElementFinder = element(by.id('sgaContratosApp.unidadeComercial.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  cnpjInput: ElementFinder = element(by.css('input#unidade-comercial-cnpj'));
  razaoSocialInput: ElementFinder = element(by.css('input#unidade-comercial-razaoSocial'));

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
