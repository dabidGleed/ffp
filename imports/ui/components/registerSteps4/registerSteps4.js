import moment from 'moment';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import RegisterEduModal from '../registerEduModal/registerEduModal';

import './registerSteps4.html';

const name = 'registerSteps4';

const config = ($stateProvider) => {
  'ngInject';

  const template = '' +
    '<register-steps4' +
      ' form-data="registerSteps.formData"' +
      ' on-update="registerSteps.onUpdate(prop, value)">' +
    '</register-steps4>';

  $stateProvider.state('register.steps.4', {
    template,
    url: '/4',
  });
};


class RegisterSteps4 {
  constructor($mdDialog) {
    'ngInject';


    /*
     * Bind services
     */
    this.mdDialog = $mdDialog;


    /*
     * Synchronous data
     */
    // this.eduHistory = this.formData.eduHistory;
    this.eduHistory = [{
      to: new Date(),
      ongoing: false,
      from: new Date(),
      education: 'A-Levels',
      post16Institution: 'Thing',
      aLevelSubjects: ['Latin', 'Arabic'],
    }, {
      to: new Date(),
      ongoing: false,
      from: new Date(),
      education: 'A-Levels',
      post16Institution: 'Thing',
      aLevelSubjects: ['Arabic'],
    }];


    /*
     * UI States
     */
    this.activeStep = 4;


    /*
     * Activate
     */
    this.update('activeStep');
  }


  /*
   * Scope methods
   */
  update(prop) {
    this.onUpdate({ prop, value: this[prop] });
  }


  /*
   * Actions
   */
  openModal(education = this.getEmptyEducation(), type = 'add') {
    this.mdDialog.show({
      controller: RegisterEduModal,
      controllerAs: 'registerEduModal',
      parent: angular.element(document.body),
      templateUrl: 'imports/ui/components/registerEduModal/registerEduModal.html',
      resolve: {
        type: () => type,
        education: () => education,
      },
    })
    .then(this.updateEducation(type));
  }

  remove(key) {
    this.eduHistory = this.eduHistory.filter((e) => e.$$hashKey !== key);
  }


  /*
   * UI Methods
   */
  datesToS(edu) {
    const from = this.format(edu.from);
    const end = edu.ongoing ? 'present' : this.format(edu.end);

    return `${from} - ${end}`;
  }


  /*
   * Helpers
   */
  getEmptyEducation() {
    return {
      to: null,
      from: null,
      education: '',
      ongoing: false,
      description: '',
      aLevelSubjects: [],
      asLevelSubjects: [],
      ibLevelSubjects: [],
      postgraduateLevel: '',
      post16Institution: '',
      sixthLevelSubjects: [],
      apprenticeshipRole: '',
      trainingDescription: '',
      postgraduateSubject: '',
      apprenticeshipLevel: '',
      undergraduateSubject: '',
      apprenticeshipSector: '',
      apprenticeshipEmployer: '',
      postgraduateMoreInfo: null,
      undergraduateMoreInfo: null,
      postgraduateInstitution: '',
      undergraduateInstitution: '',
    };
  }

  format(date) {
    return moment(date).format('DD/MM/YYYY');
  }

  // There may be a way to simplify this
  // the reason for taking this 'reHashing' approach
  // was to get around the data schema modification
  // because the structure was uncertain, we shifted the
  // logic to the frontend
  updateEducation(type) {
    return (updated) => {
      if (type === 'add') {
        this.eduHistory.push(updated);
      } else {
        this.eduHistory = this.eduHistory.map(this.mapOnly(updated));
      }

      this.update('eduHistory');
    };
  }

  mapOnly(updated) {
    return (education) => {
      if (education.$$hashKey === updated.hash) {
        return updated;
      }

      return education;
    };
  }
}

export default angular
  .module(name, [
    uiRouter,
    angularMeteor,
  ])
  .component(name, {
    controllerAs: name,
    controller: RegisterSteps4,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    bindings: {
      formData: '<',
      onUpdate: '&',
    },
  })
  .config(config);
