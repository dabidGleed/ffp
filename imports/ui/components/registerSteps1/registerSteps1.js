import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './registerSteps1.html';

const name = 'registerSteps1';

const config = ($stateProvider) => {
  'ngInject';

  const template = '' +
    '<register-steps1' +
      ' form-data="registerSteps.formData"' +
      ' on-update="registerSteps.onUpdate(prop, value)">' +
    '</register-steps1>';

  $stateProvider.state('register.steps.1', {
    template,
    url: '/1',
  });
};

class RegisterSteps1 {
  constructor($scope) {
    'ngInject';


    /*
     * Bind services
     */
    this.scope = $scope;


    /*
     * Synchronous data
     */
    this.dob = this.formData.dob;
    this.mobile = this.formData.mobile;
    this.gender = this.formData.gender;
    this.previousName = this.formData.previousName;


    /*
     * Lookups
     */
    this.genders = [];


    /*
     * UI States
     */
    this.activeStep = 1;


    /*
     * Activate
     */
    this.getGenders();
    this.update('activeStep');
  }


  /*
   * Scope methods
   */
  update(prop) {
    this.onUpdate({ prop, value: this[prop] });
  }


  /*
   * Helpers
   */
  getGenders() {
    Meteor.call('getGenderLookup', (err, res) => {
      this.genders = res;
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
    controllerAs: 'steps1',
    controller: RegisterSteps1,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    bindings: {
      onUpdate: '&',
      formData: '<',
    },
  })
  .config(config);
