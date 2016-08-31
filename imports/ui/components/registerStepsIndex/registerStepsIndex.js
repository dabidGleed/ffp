import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './registerStepsIndex.html';

const name = 'registerStepsIndex';

const config = ($stateProvider) => {
  'ngInject';

  $stateProvider.state('register.steps.index', {
    url: '',
    template: '<register-steps-index></register-steps-index>',
  });
};

class RegisterStepsIndex {
  constructor() {
    'ngInject';


    /*
     * Synchronous data
     */
    this.school = Session.get('school');
  }

  /*
   * UI Methods
   */
  getSchoolTextColour() {
    if (this.school.Is_client__c && this.school.Form_colour__c) {
      return { color: this.school.Form_colour__c };
    }

    return {};
  }

  getSchoolBackgroundColour() {
    if (this.school.Is_client__c && this.school.Form_colour__c) {
      return { background: this.school.Form_colour__c };
    }

    return {};
  }

  showSchoolLogo() {
    return this.school.Is_client__c && this.school.School_logo__c;
  }
}

export default angular
  .module(name, [
    uiRouter,
    angularMeteor,
  ])
  .component(name, {
    controllerAs: name,
    controller: RegisterStepsIndex,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .config(config);
