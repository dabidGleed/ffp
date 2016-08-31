import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './registerOther.html';

const name = 'registerOther';

const config = ($stateProvider) => {
  'ngInject';

  $stateProvider.state('register.other', {
    url: '/other',
    template: '<register-other></register-other>',
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

class RegisterOther {
  constructor($window, $state) {
    'ngInject';


    /*
     * Bind services
     */
    this.state = $state;
    this.window = $window;


    /*
     * Synchronous data
     */
    this.school = Session.get('school');
  }


  /*
   * Actions
   */
  registerGoogle() {
    Meteor.call('getGoogleUrl', (err, res) => {
      const type = this.school.Enrolment_type;
      const status = this.school.Is_client__c ? 'member' : 'nonmember';

      this.window.location.href = `${res}${type}_${status}`;
    });
  }

  registerFacebook() {
    Meteor.call('getFacebookUrl', (err, res) => {
      const type = this.school.Enrolment_type;
      const status = this.school.Is_client__c ? 'member' : 'nonmember';

      this.window.location.href = `${res}${type}_${status}`;
    });
  }

  registerEmail() {
    if (this.school.Enrolment_type === 'student') {
      this.state.go('register.student');
    }

    if (!this.school.Is_client__c) {
      this.state.go('register.nonmember');
    }

    if (this.school.Enrolment_type === 'alumni') {
      this.state.go('register.email');
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
    angularMeteor,
  ])
  .component(name, {
    controllerAs: name,
    controller: RegisterOther,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .config(config);
