import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './registerStepsDone.html';

const name = 'registerStepsDone';

const config = ($stateProvider) => {
  'ngInject';

  const template = '' +
    '<register-steps-done' +
      ' form-data="registerSteps.formData"' +
    '</register-steps-done>';

  $stateProvider.state('register.steps.done', {
    template,
    url: '/done',
    resolve: {
      hasSchool: ($q) => {
        'ngInject';

        if (Session.get('school') === undefined) {
          return $q.reject('SCHOOL_REQUIRED');
        }

        return $q.resolve();
      },
    },
  });
};

class RegisterStepsDone {
  constructor() {
    'ngInject';


    /*
     * Synchronous data
     */
    this.name = this.formData.firstName;
    this.school = Session.get('school');
  }

  getSchoolBackgroundColour() {
    if (this.school.Is_client__c && this.school.Form_colour__c) {
      return { background: this.school.Form_colour__c };
    }

    return {};
  }
}

export default angular
  .module(name, [
    uiRouter,
    angularMeteor,
  ])
  .component(name, {
    controllerAs: name,
    controller: RegisterStepsDone,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    bindings: {
      formData: '<',
    },
  })
  .config(config);
