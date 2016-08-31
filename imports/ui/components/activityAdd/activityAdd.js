import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './activityAdd.html';

const name = 'activityAdd';

const config = ($stateProvider) => {
  'ngInject';

  $stateProvider.state('portal.activities.add', {
    url: '/add',
    template: '<activity-add></activity-add>',
  });
};

class ActivityAdd {
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
    controller: ActivityAdd,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .config(config);
