import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './registerSteps5.html';

const name = 'registerSteps5';

const config = ($stateProvider) => {
  'ngInject';

  const template = '' +
    '<register-steps5' +
      ' form-data="registerSteps.formData"' +
      ' on-update="registerSteps.onUpdate(prop, value)">' +
    '</register-steps5>';

  $stateProvider.state('register.steps.5', {
    template,
    url: '/5',
  });
};

class RegisterSteps5 {
  constructor() {
    'ngInject';


    /*
     * Synchronous data
     */
    this.question1 = '';
    this.question2 = [];
    this.question3 = '';


    /*
     * Lookups
     */
    this.question2Lookups = [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
      'Option 5',
    ];


    /*
     * UI States
     */
    this.activeStep = 5;
    this.searchQuestion2 = '';
    this.selectedQuestion2 = '';

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
    let items = this.question2Lookups;

    if (query) {
      items = this.question2Lookups.filter(this.contains(query));
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
    controller: RegisterSteps5,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    bindings: {
      formData: '<',
      onUpdate: '&',
    },
  })
  .config(config);
