import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './account.html';
import './accountNew.html';

const name = 'account';

const config = ($stateProvider) => {
  'ngInject';

  $stateProvider.state('portal.account', {
    url: '/account',
    abstract: true,
    template: '<div ui-view=""></div>',
  });

  $stateProvider.state('portal.account.index', {
    url: '',
    template: '<account></account>',
  });
};

class NewAccount {
  constructor($mdDialog) {
    'ngInject';

    /*
     * Bind services
     */
    this.mdDialog = $mdDialog;

    /*
     * UI States
     */
    this.htmlVariable = '';
    this.selectedAlumni = [];
  }

  /*
   * Actions
   */
  cancel() {
    this.mdDialog.cancel();
  }

  send() {
    this.mdDialog.hide('done');
  }
}

class Account {
  constructor($window, $mdDialog) {
    'ngInject';

    /*
     * Bind services
     */
    this.mdDialog = $mdDialog;

    /*
     * Synchronous data
     */
    this.frequency = 1;

    this.active = [{
      name: 'James',
      email: 'james@test.com',
    }, {
      name: 'James',
      email: 'james@test.com',
    }, {
      name: 'James',
      email: 'james@test.com',
    }, {
      name: 'James',
      email: 'james@test.com',
    }, {
      name: 'James',
      email: 'james@test.com',
    }, {
      name: 'James',
      email: 'james@test.com',
    }];

    this.inactive = [{
      name: 'James',
      email: 'james@test.com',
    }, {
      name: 'James',
      email: 'james@test.com',
    }, {
      name: 'James',
      email: 'james@test.com',
    }, {
      name: 'James',
      email: 'james@test.com',
    }];


    /*
     * UI states
     */
    this.searchText = '';
    this.showSearch = false;
  }


  /*
   * UI method
   */
  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  openAccount() {
    this.mdDialog.show({
      controller: NewAccount,
      controllerAs: 'accountnew',
      parent: angular.element(document.body),
      templateUrl: `imports/ui/components/${name}/${name}New.html`,
    });
  }
}


export default angular
  .module(name, [
    uiRouter,
    angularMeteor,
  ])
  .component(name, {
    controllerAs: name,
    controller: Account,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .config(config);
