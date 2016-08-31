import moment from 'moment';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import RegisterEmpModal from '../registerEmpModal/registerEmpModal';

import './registerSteps3.html';

const name = 'registerSteps3';

const config = ($stateProvider) => {
  'ngInject';

  const template = '' +
    '<register-steps3' +
      ' form-data="registerSteps.formData"' +
      ' on-update="registerSteps.onUpdate(prop, value)">' +
    '</register-steps3>';

  $stateProvider.state('register.steps.3', {
    template,
    url: '/3',
  });
};

class RegisterSteps3 {
  constructor($mdDialog) {
    'ngInject';


    /*
     * Bind services
     */
    this.mdDialog = $mdDialog;


    /*
     * Synchronous data
     */
    // this.empHistory = this.formData.empHistory;
    this.empHistory = [{
      to: new Date(),
      role: 'Some role 1',
      from: new Date(),
      employer: 'Some employer',
      ongoing: false,
      onScheme: false,
      scheme: '',
    }, {
      to: new Date(),
      role: 'Some role 2',
      from: new Date(),
      employer: 'Some employer',
      ongoing: false,
      onScheme: false,
      scheme: '',
    }, {
      to: new Date(),
      role: 'Some role 3',
      from: new Date(),
      employer: 'Some employer',
      ongoing: false,
      onScheme: false,
      scheme: '',
    }, {
      to: new Date(),
      role: 'Some role 4',
      from: new Date(),
      employer: 'Some employer',
      ongoing: false,
      onScheme: false,
      scheme: '',
    }, {
      to: new Date(),
      role: 'Some role 5',
      from: new Date(),
      employer: 'Some employer',
      ongoing: false,
      onScheme: false,
      scheme: '',
    }];


    /*
     * UI States
     */
    this.activeStep = 3;


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
  openModal(employment = this.getEmptyEmployment(), type = 'add') {
    this.mdDialog.show({
      controller: RegisterEmpModal,
      controllerAs: 'registerEmpModal',
      parent: angular.element(document.body),
      templateUrl: 'imports/ui/components/registerEmpModal/registerEmpModal.html',
      resolve: {
        type: () => type,
        employment: () => employment,
      },
    })
    .then(this.updateEmployment(type));
  }

  remove(key) {
    this.empHistory = this.empHistory.filter((e) => e.$$hashKey !== key);
  }


  /*
   * UI Methods
   */
  datesToS(emp) {
    const from = this.format(emp.from);
    const end = emp.ongoing ? 'present' : this.format(emp.end);

    return `${from} to ${end}`;
  }


  /*
   * Helpers
   */
  getEmptyEmployment() {
    return {
      role: '',
      to: null,
      from: null,
      employer: '',
      ongoing: false,
      onScheme: false,
      scheme: '',
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
  updateEmployment(type) {
    return (updated) => {
      if (type === 'add') {
        this.empHistory.push(updated);
      } else {
        this.empHistory = this.empHistory.map(this.mapOnly(updated));
      }

      this.update('empHistory');
    };
  }

  mapOnly(updated) {
    return (employment) => {
      if (employment.$$hashKey === updated.hash) {
        return updated;
      }

      return employment;
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
    controller: RegisterSteps3,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    bindings: {
      onUpdate: '&',
      formData: '<',
    },
  })
  .config(config);
