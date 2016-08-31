import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './profile.html';

const name = 'profile';

const config = ($stateProvider) => {
  'ngInject';

  $stateProvider.state('portal.search.profile', {
    url: '/:id',
    template: '<profile></profile>',
  });
};

class Profile {
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
    controller: Profile,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .config(config);
