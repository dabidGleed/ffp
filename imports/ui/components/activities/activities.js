import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import { name as Add } from '../activityAdd/activityAdd';
import { name as Edit } from '../activityEdit/activityEdit';

import './activities.html';

const name = 'activities';

const config = ($stateProvider) => {
  'ngInject';

  $stateProvider.state('portal.activities', {
    abstract: true,
    url: '/activities',
    template: '<div ui-view=""></div>',
  });

  $stateProvider.state('portal.activities.index', {
    url: '',
    template: '<activities></activities>',
  });
};

class Activities {
  constructor() {
    'ngInject';


    /*
     * UI States
     */
    this.searchText = '';
    this.showSearch = false;
    this.openMenu = ($mdOpenMenu, ev) => $mdOpenMenu(ev);

    this.activities = this.getActivities();
  }


  /*
   * Actions
   */
  deleteActivity(/* id */) {
    // todo
  }


  /*
   * UI methods
   */
  toggleSearch() {
    this.showSearch = !this.showSearch;
  }


  /*
   * Helpers
   */
  getActivities() {
    return [{
      type: 'In lesson support',
      name: 'Future activity',
      date: new Date(),
      contact: 'Test',
      notes: 'Lorem ipsum dolor sit amet',
      alumni: [{
        status: 'Attending',
        _id: 1,
        name: 'John',
        surname: 'Something',
      }],
    }, {
      type: 'In lesson support',
      name: 'Future activity',
      date: new Date(),
      contact: 'Test',
      notes: 'Lorem ipsum dolor sit amet',
      alumni: [{
        status: 'Attending',
        _id: 1,
        name: 'John',
        surname: 'Something',
      }],
    }, {
      type: 'In lesson support',
      name: 'Future activity',
      date: new Date(),
      contact: 'Test',
      notes: 'Lorem ipsum dolor sit amet',
      alumni: [{
        status: 'Attending',
        _id: 1,
        name: 'John',
        surname: 'Something',
      }],
    }];
  }
}

export default angular
  .module(name, [
    uiRouter,
    angularMeteor,

    Add,
    Edit,
  ])
  .component(name, {
    controllerAs: name,
    controller: Activities,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .config(config);
