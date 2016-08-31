import './registerEmpModal.html';

export default class RegisterEmpModal {
  constructor($mdDialog, employment, type) {
    'ngInject';


    /*
     * Bind services
     */
    this.mdDialog = $mdDialog;


    /*
     * Synchronous data
     */
    this.type = type;
    this.employment = this.reHash(employment);


    /*
     * Lookups
     */
    this.employersLookup = ['Visa', 'Vale', 'Verizon', 'Vodafone'];


    /*
     * UI States
     */
    this.searchEmployer = null;
  }


  /*
   * Actions
   */
  cancel() {
    this.mdDialog.cancel();
  }

  save() {
    this.mdDialog.hide(this.employment);
  }


  /*
   * UI methods
   */
  q(query) {
    let items = this.employersLookup;

    if (query) {
      items = this.employersLookup.filter(this.contains(query));
    }

    return items;
  }

  clearTo() {
    if (this.employment.ongoing) {
      this.employment.to = null;
    }
  }

  isNew() {
    return this.type === 'add';
  }


  /*
   * Helpers
   */
  contains(query) {
    return (s) => s.toLowerCase().includes(query.toLowerCase());
  }

  reHash(employment) {
    return {
      to: employment.to || null,
      role: employment.role || '',
      from: employment.from || null,
      scheme: employment.scheme || '',
      hash: employment.$$hashKey || null,
      employer: employment.employer || '',
      ongoing: employment.ongoing || false,
      onScheme: employment.onScheme || false,
    };
  }
}
