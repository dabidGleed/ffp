import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './registerNonmember.html';

const name = 'registerNonmember';

const config = ($stateProvider) => {
  'ngInject';

  const template = '' +
    '<register-nonmember' +
      ' alumnus-data="register.alumnusData">' +
    '</register-nonmember>';

  $stateProvider.state('register.nonmember', {
    template,
    url: '/nonmember',
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

class RegisterNonmember {
  constructor($scope, $state, $location) {
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
    this.formData.image = '';
    this.formData.email = '';
    this.formData.title = '';
    this.formData.gender = '';
    this.formData.mobile = '';
    this.formData.lastName = '';
    this.formData.firstName = '';
    this.formData.leavingYear = '';
    this.formData.previousName = '';
    this.formData.supportOffered = [];
    this.formData.currentOccupation = '';
    this.formData.otherSupportOffered = '';
    this.formData.ableToAttendInPerson = '';


    /*
     * Lookups
     */
    this.gendersLookup = [];
    this.leavingYearLookup = [];
    this.supportOfferedLookup = [];
    this.currentOccupationLookup = [];
    this.ableToAttendInPersonLookup = [];


    /*
     * UI States
     */
    this.searchSupport = null;
    this.selectedSupport = null;


    /*
     * Activate
     */
    this.hydrateData();

    // Lookups
    this.getGendersLookup();
    this.getLeavingYearLookup();
    this.getSupportOfferedLookup();
    this.getCurrentOccupationLookup();
    this.getAbleToAttendInPersonLookup();
  }


  /*
   * Actions
   */
  register() {
    // Create the user on Salesforce
    // Create the user on Meteor
    this.state.go('register.nondone');
  }


  /*
   * UI Methods
   */
  showOther() {
    return this.formData.supportOffered.includes('Other');
  }

  showSchoolLogo() {
    return this.school.Is_client__c && this.school.School_logo__c;
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
      this.formData.dob = res.birthday || '';
      this.formData.gender = res.gender || '';
      this.formData.lastName = res.last_name || '';
      this.formData.firstName = res.first_name || '';
      this.formData.image = res.picture.data.url || '';
      this.scope.$apply();
    });
  }

  hydrateEmail() {
    this.formData.email = this.alumnusData.email || '';
    this.formData.lastName = this.alumnusData.lastName || '';
    this.formData.firstName = this.alumnusData.firstName || '';
    this.formData.previousName = this.alumnusData.previousName || '';
  }

  getGendersLookup() {
    Meteor.call('getGenderLookup', (err, res) => {
      this.gendersLookup = res;
      this.scope.$apply();
    });
  }

  getLeavingYearLookup() {
    Meteor.call('getYearGroupLookup', (err, res) => {
      this.leavingYearLookup = res;
      this.scope.$apply();
    });
  }

  getSupportOfferedLookup() {
    Meteor.call('getSupportOfferedLookup', (err, res) => {
      this.supportOfferedLookup = res;
      this.scope.$apply();
    });
  }

  getCurrentOccupationLookup() {
    Meteor.call('getCurrentOccupationLookup', (err, res) => {
      this.currentOccupationLookup = res;
      this.scope.$apply();
    });
  }

  getAbleToAttendInPersonLookup() {
    Meteor.call('getAbleToAttendLookup', (err, res) => {
      this.ableToAttendInPersonLookup = res;
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
    controller: RegisterNonmember,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    bindings: {
      alumnusData: '<',
    },
  })
  .config(config);
