import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './registerLinkedin.html';

const name = 'registerLinkedin';

const config = ($stateProvider) => {
  'ngInject';

  $stateProvider.state('register.linkedin', {
    url: '/linkedin',
    template: '<register-linkedin></register-linkedin>',
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

class registerLinkedin {
  constructor($window) {
    'ngInject';


    /*
     * Bind services
     */
    this.window = $window;


    /*
     * Synchronous data
     */
    this.school = Session.get('school');
  }


  /*
   * Actions
   */
  login() {
    Meteor.call('getLinkedinUrl', (err, res) => {
      const type = this.school.Enrolment_type;
      const status = this.school.Is_client__c ? 'member' : 'nonmember';

      this.window.location.href = `${res}${type}_${status}`;
    });
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
    controller: registerLinkedin,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .config(config);
