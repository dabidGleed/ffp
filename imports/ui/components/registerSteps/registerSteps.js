import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import { name as step1 } from '../registerSteps1/registerSteps1';
import { name as step2 } from '../registerSteps2/registerSteps2';
import { name as step3 } from '../registerSteps3/registerSteps3';
import { name as step4 } from '../registerSteps4/registerSteps4';
import { name as step5 } from '../registerSteps5/registerSteps5';
import { name as step6 } from '../registerSteps6/registerSteps6';
import { name as stepDone } from '../registerStepsDone/registerStepsDone';
import { name as stepIndex } from '../registerStepsIndex/registerStepsIndex';

import './registerSteps.html';

const name = 'registerSteps';

const config = ($stateProvider) => {
  'ngInject';

  const template = '' +
    '<register-steps ' +
      'class="ff-register-steps" ' +
      'alumnus-data="register.alumnusData">' +
    '</register-steps>';

  $stateProvider.state('register.steps', {
    template,
    url: '/steps',
    abstract: true,
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

class RegisterSteps {
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
    this.formData = {};

    this.formData.email = '';
    this.formData.image = '';
    this.formData.lastName = '';
    this.formData.firstName = '';

    // step 1
    this.formData.dob = '';
    this.formData.mobile = '';
    this.formData.gender = '';
    this.formData.previousName = '';

    // step 2
    this.formData.supportOffered = [];
    this.formData.otherSupportOffered = '';

    // step 3
    this.formData.empHistory = [];

    // step 4
    this.formData.eduHistory = [];

    // setp 5
    this.formData.customQuestions = [];


    /*
     * UI States
     */
    this.formData.activeStep = 0;
    this.formData.completeSteps = [];


    /*
     * Activate
     */
    this.hydrateData();
  }


  /*
   * Scope methods
   */
  onUpdate(prop, value) {
    this.formData[prop] = value;
  }


  /*
   * UI Methods
   */
  canNavigateToStep(num) {
    return this.formData.completeSteps.includes(num);
  }

  arrowNext() {
    if (this.isLast()) {
      this.finish();
    }

    this.next();
  }

  next() {
    if (!this.isLast()) {
      if (this.formData.completeSteps.includes(this.formData.activeStep)) {
        this.formData.completeSteps.push(this.formData.activeStep);
      }

      this.state.go(`register.steps.${this.formData.activeStep + 1}`);
    }
  }

  back() {
    if (!this.isFirst()) {
      this.state.go(`register.steps.${this.formData.activeStep - 1}`);
    }
  }

  finish() {
    this.state.go('register.steps.done');
  }

  isFirst() {
    return this.formData.activeStep === 1;
  }

  isLast() {
    return this.formData.activeStep === 6;
  }

  showNavigation() {
    return !this.state.includes('register.steps.done');
  }

  showWelcome() {
    return this.state.is('register.steps.index');
  }


  /*
   * Helpers
   */
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

      if (res.positions) {
        this.hydratePositions(res.positions);
      }

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

      if (res.education) {
        this.hydrateEducation(res.education);
      }

      this.scope.$apply();
    });
  }

  hydrateEmail() {
    this.formData.email = this.alumnusData.email || '';
    this.formData.lastName = this.alumnusData.lastName || '';
    this.formData.firstName = this.alumnusData.firstName || '';
    this.formData.previousName = this.alumnusData.previousName || '';
  }

  hydratePositions(/* positions */) {
    // console.log(positions);
  }

  hydrateEducation(/* education */) {
    // we may want to hydrate the facebook education
  }
}

export default angular
  .module(name, [
    uiRouter,
    angularMeteor,

    step1,
    step2,
    step3,
    step4,
    step5,
    step6,
    stepDone,
    stepIndex,
  ])
  .component(name, {
    controllerAs: name,
    controller: RegisterSteps,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    bindings: {
      alumnusData: '<',
    },
  })
  .config(config);
