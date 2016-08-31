import moment from 'moment';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './registerStudent.html';

const name = 'registerStudent';

const config = ($stateProvider) => {
  'ngInject';

  const template = '' +
    '<register-student alumnus-data="register.alumnusData"></register-student>';

  $stateProvider.state('register.student', {
    url: '/student',
    template,
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

class RegisterStudent {
  constructor($scope, $location, $state) {
    'ngInject';


    /*
     * Bind services
     */
    this.scope = $scope;
    this.state = $state;
    this.location = $location;


    /*
     * Synchronous data
     */
    this.school = Session.get('school');

    this.formData = {};

    this.formData.dob = '';
    this.formData.email = '';
    this.formData.image = '';
    this.formData.gender = '';
    this.formData.mobile = '';
    this.formData.lastName = '';
    this.formData.firstName = '';
    this.formData.currentYear = '';
    this.formData.futurePlans = [];


    /*
     * Lookups
     */
    this.genders = [];
    this.yearGroups = [];
    this.futurePlans = [];
    this.leavingYears = [];


    /*
     * UI States
     */
    this.searchPlan = null;
    this.selectedPlan = null;


    /*
     * Activate
     */
    this.hydrateData();

    // Lookups
    this.getGenders();
    this.getYearGroups();
    this.getFuturePlans();
    this.getLeavingYears();
  }


  /*
   * Actions
   */
  register() {
    // Create the user on Salesforce
    // Create the user on Meteor
    this.state.go('register.studone');
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

  querySearch(query) {
    let items = this.futurePlans;

    if (query) {
      items = items.filter(this.contains(query));
    }

    return items;
  }


  /*
   * Helpers
   */
  contains(query) {
    return (s) => s.label.toLowerCase().includes(query.toLowerCase());
  }

  hydrateData() {
    const t = this.location.search().type;
    this.location.search('type', null);

    if (t === 'linkedin') {
      this.hydrateLinkedin();
    } else if (t === 'google') {
      this.hydrateGoogle();
    } else if (t === 'facebook') {
      this.hydrateFacebook();
    } else {
      this.hydrateEmail();
    }
  }

  hydrateLinkedin() {
    Meteor.call('getLinkedinData', (err, res) => {
      this.formData.image = res.pictureUrl || '';
      this.formData.lastName = res.lastName || '';
      this.formData.email = res.emailAddress || '';
      this.formData.firstName = res.firstName || '';
      this.scope.$apply();
    });
  }

  hydrateGoogle() {
    Meteor.call('getGoogleData', (err, res) => {
      this.formData.email = res.email || '';
      this.formData.image = res.picture || '';
      this.formData.lastName = res.family_name || '';
      this.formData.firstName = res.given_name || '';
      this.scope.$apply();
    });
  }

  hydrateFacebook() {
    Meteor.call('getFacebookData', (err, res) => {
      this.formData.email = res.email || '';
      this.formData.gender = res.gender || '';
      this.formData.lastName = res.last_name || '';
      this.formData.firstName = res.first_name || '';
      this.formData.image = res.picture.data.url || '';
      this.formData.dob = res.birthday ? moment(res.birthday, 'MM-DD-YYYY') : '';
      this.scope.$apply();
    });
  }

  hydrateEmail() {
    this.formData.email = this.alumnusData.email || '';
    this.formData.lastName = this.alumnusData.lastName || '';
    this.formData.firstName = this.alumnusData.firstName || '';
    this.formData.previousName = this.alumnusData.previousName || '';
  }

  getGenders() {
    Meteor.call('getGenderLookup', (err, res) => {
      this.genders = res;
      this.scope.$apply();
    });
  }

  getYearGroups() {
    Meteor.call('getYearGroupLookup', (err, res) => {
      this.yearGroups = res;
      this.scope.$apply();
    });
  }

  getFuturePlans() {
    Meteor.call('getFuturePlansLookup', (err, res) => {
      this.futurePlans = res;
      this.scope.$apply();
    });
  }

  getLeavingYears() {
    Meteor.call('getYearGroupLookup', (err, res) => {
      this.leavingYears = res;
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
    controller: RegisterStudent,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    bindings: {
      alumnusData: '<',
    },
  })
  .config(config);
