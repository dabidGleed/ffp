import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './registerStudone.html';

const name = 'registerStudone';

const config = ($stateProvider) => {
  'ngInject';

  $stateProvider.state('register.studone', {
    url: '/studone',
    template: '<register-studone></register-studone>',
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

class RegisterStudone {
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
    controller: RegisterStudone,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .config(config);
