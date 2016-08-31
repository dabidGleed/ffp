import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './registerNondone.html';

const name = 'registerNondone';

const config = ($stateProvider) => {
  'ngInject';

  $stateProvider.state('register.nondone', {
    url: '/nondone',
    template: '<register-nondone></register-nondone>',
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

class RegisterNondone {
  constructor() {
    'ngInject';
  }
}

export default angular
  .module(name, [
    uiRouter,
    angularMeteor,
  ])
  .component(name, {
    controllerAs: name,
    controller: RegisterNondone,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .config(config);
