import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './activityEdit.html';

const name = 'activityEdit';

const config = ($stateProvider) => {
  'ngInject';

  $stateProvider.state('portal.activities.edit', {
    url: '/:id',
    template: '<activity-edit></activity-edit>',
  });
};

class ActivityEdit {
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
    controller: ActivityEdit,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .config(config);
