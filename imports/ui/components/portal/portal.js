import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import { name as Search } from '../search/search';
import { name as Mailbox } from '../mailbox/mailbox';
import { name as Account } from '../account/account';
import { name as Dashboard } from '../dashboard/dashboard';
import { name as Customise } from '../customise/customise';
import { name as Activities } from '../activities/activities';

import './portal.html';

const name = 'portal';

const config = ($stateProvider) => {
  'ngInject';

  $stateProvider.state('portal', {
    url: '/portal',
    abstract: true,
    template: '<portal layout="row" flex></portal>',
    resolve: {
      currentUser: ($q) => {
        'ngInject';

        if (Meteor.userId() === null) {
          return $q.reject('AUTH_REQUIRED');
        }

        return $q.resolve();
      },
    },
  });
};

class Portal {
  constructor($state) {
    'ngInject';


    /*
     * Bind services
     */
    this.state = $state;
  }


  /*
   * Actions
   */
  logout() {
    Accounts.logout();
    this.state.go('login');
  }
}

export default angular
  .module(name, [
    Search,
    Mailbox,
    Account,
    uiRouter,
    Dashboard,
    Customise,
    Activities,
    angularMeteor,
  ])
  .component(name, {
    controllerAs: name,
    controller: Portal,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .config(config);
