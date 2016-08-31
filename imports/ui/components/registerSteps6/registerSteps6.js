import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './registerSteps6.html';

const name = 'registerSteps6';

const config = ($stateProvider) => {
  'ngInject';

  const template = '' +
    '<register-steps6' +
      ' form-data="registerSteps.formData"' +
      ' on-update="registerSteps.onUpdate(prop, value)">' +
    '</register-steps6>';

  $stateProvider.state('register.steps.6', {
    template,
    url: '/6',
  });
};

class RegisterSteps6 {
  constructor() {
    'ngInject';


    /*
     * Synchronous data
     */
    this.otherSchools = [];


    /*
     * Lookups
     */
    this.schoolLookup = [
      'School A',
      'School B',
      'School C',
      'School D',
      'School E',
      'School F',
    ];


    /*
     * UI States
     */
    this.activeStep = 6;
    this.searchSchools = '';
    this.selectedSchool = '';


    /*
     * Activate
     */
    this.update('activeStep');
  }


  /*
   * Scope methods
   */
  update(prop) {
    this.onUpdate({ prop, value: this[prop] });
  }


  /*
   * UI methods
   */
  querySearch(query) {
    let items = this.schoolLookup;

    if (query) {
      items = this.schoolLookup.filter(this.contains(query));
    }

    return items;
  }


  /*
   * Helpers
   */
  contains(query) {
    return (s) => s.toLowerCase().includes(query.toLowerCase());
  }
}

export default angular
  .module(name, [
    uiRouter,
    angularMeteor,
  ])
  .component(name, {
    controllerAs: name,
    controller: RegisterSteps6,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    bindings: {
      formData: '<',
      onUpdate: '&',
    },
  })
  .config(config);
