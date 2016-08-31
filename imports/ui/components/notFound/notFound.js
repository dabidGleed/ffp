import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './notFound.html';

const name = 'notFound';

const config = ($stateProvider) => {
  'ngInject';

  $stateProvider.state('notFound', {
    url: '/404',
    template: '<not-found></not-found>',
  });
};

class NotFound {
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
  controller: NotFound,
  templateUrl: `imports/ui/components/${name}/${name}.html`,
})
.config(config);
