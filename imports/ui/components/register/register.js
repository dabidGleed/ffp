import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './register.html';

import { name as registerIndex } from '../registerIndex/registerIndex';
import { name as registerEmail } from '../registerEmail/registerEmail';
import { name as registerOther } from '../registerOther/registerOther';
import { name as registerSteps } from '../registerSteps/registerSteps';
import { name as registerStudent } from '../registerStudent/registerStudent';
import { name as registerNondone } from '../registerNondone/registerNondone';
import { name as registerStudone } from '../registerStudone/registerStudone';
import { name as registerLinkedin } from '../registerLinkedin/registerLinkedin';
import { name as registerNonmem } from '../registerNonmember/registerNonmember';

const name = 'register';

const config = ($stateProvider) => {
  'ngInject';

  $stateProvider.state('register', {
    abstract: true,
    url: '/register',
    template: '<register></register>',
  });
};

class Register {
  constructor() {
    'ngInject';


    /*
     * Synchronous data
     */
    this.alumnusData = {};
  }


  /*
   * Scope methods
   */
  updateAlumnusData(alumnusData) {
    this.alumnusData = alumnusData;
  }
}

export default angular
  .module(name, [
    uiRouter,
    angularMeteor,

    registerIndex,
    registerEmail,
    registerOther,
    registerSteps,
    registerNonmem,
    registerNondone,
    registerStudone,
    registerStudent,
    registerLinkedin,
  ])
  .component(name, {
    controllerAs: name,
    controller: Register,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .config(config);
