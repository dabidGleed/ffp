import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMessages from 'angular-messages';
import angularMeteor from 'angular-meteor';

import './registerEmail.html';

const name = 'registerEmail';

const config = ($stateProvider) => {
  'ngInject';

  const template = '' +
    '<register-email' +
      ' update-alumnus-data="register.updateAlumnusData(alumnusData)">' +
    '</register-email>';

  $stateProvider.state('register.email', {
    template,
    url: '/email',
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

class RegisterEmail {
  constructor($state) {
    'ngInject';


    /*
     * Bind services
     */
    this.state = $state;


    /*
     * Synchronous data
     */
    this.alumnusData = {};

    this.alumnusData.email = '';
    this.alumnusData.lastName = '';
    this.alumnusData.firstName = '';
    this.alumnusData.previousName = '';

    this.school = Session.get('school');
  }


  /*
   * Actions
   */
  register() {
    this.updateAlumnusData({ alumnusData: this.alumnusData });

    if (this.school.Enrolment_type === 'alumni' && this.school.Is_client__c) {
      this.state.go('register.steps.index');
    } else if (this.school.Enrolment_type === 'alumni') {
      this.state.go('register.nonmember');
    } else {
      this.state.go('register.student');
    }
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

  showSchoolLogo() {
    return this.school.Is_client__c && this.school.School_logo__c;
  }
}

export default angular
  .module(name, [
    uiRouter,
    ngMessages,
    angularMeteor,
  ])
  .component(name, {
    controllerAs: name,
    controller: RegisterEmail,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    bindings: {
      updateAlumnusData: '&',
    },
  })
  .config(config);
