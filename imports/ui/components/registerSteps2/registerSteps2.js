import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './registerSteps2.html';

const name = 'registerSteps2';

const config = ($stateProvider) => {
  'ngInject';

  const template = '' +
    '<register-steps2' +
      ' form-data="registerSteps.formData"' +
      ' on-update="registerSteps.onUpdate(prop, value)">' +
    '</register-steps2>';

  $stateProvider.state('register.steps.2', {
    template,
    url: '/2',
  });
};

class RegisterSteps2 {
  constructor($scope) {
    'ngInject';


    /*
     * Bind services
     */
    this.scope = $scope;


    /*
     * Synchronous data
     */
    this.supportOffered = this.formData.supportOffered;
    this.otherSupportOffered = this.formData.otherSupportOffered;


    /*
     * Lookups
     */
    this.supportOfferedLookup = [];


    /*
     * UI States
     */
    this.activeStep = 2;
    this.searchSupport = null;
    this.selectedSupport = null;


    /*
     * Activate
     */
    this.update('activeStep');
    this.getSupportOfferedLookup();
  }


  /*
   * Scope methods
   */
  update(prop) {
    this.onUpdate({ prop, value: this[prop] });
  }


  /*
   * UI Methods
   */
  showOther() {
    return this.supportOffered.includes('Other');
  }

  querySearch(query) {
    let items = this.supportOfferedLookup;

    if (query) {
      items = this.supportOfferedLookup.filter(this.contains(query));
    }

    return items;
  }


  /*
   * Helpers
   */
  contains(query) {
    return (s) => s.label.toLowerCase().includes(query.toLowerCase());
  }

  getSupportOfferedLookup() {
    Meteor.call('getSupportOfferedLookup', (err, res) => {
      this.supportOfferedLookup = res;
      this.scope.$apply();
    });
  }
}

export default angular
  .module(name, [
    uiRouter,
    angularMeteor,
  ])
  .component(name, {
    controllerAs: name,
    controller: RegisterSteps2,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    bindings: {
      onUpdate: '&',
      formData: '<',
    },
  })
  .config(config);
