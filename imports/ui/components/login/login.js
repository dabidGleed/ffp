import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './login.html';

const name = 'login';

const config = ($stateProvider) => {
  'ngInject';

  $stateProvider.state('login', {
    url: '/login',
    template: '<login></login>',
  });
};

class Login {
  constructor($scope, $state) {
    'ngInject';


    /*
     * Bind services
     */
    this.state = $state;
    this.scope = $scope;


    /*
     * Synchronous data
     */
    this.credentials = {
      email: '',
      password: '',
    };


    /*
     * UI states
     */
    this.error = '';
  }


  /*
   * Actions
   */
  login() {
    const email = this.credentials.email;
    const password = this.credentials.password;

    Meteor.loginWithPassword(email, password, this.after.bind(this));
  }


  /*
   * Helpers
   */
  after(err) {
    if (err) {
      this.error = err;
    } else {
      this.state.go('portal.dashboard');
    }
  }
}

export default angular
  .module(name, [
    uiRouter,
    angularMeteor,
  ])
  .component(name, {
    controller: Login,
    controllerAs: name,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .config(config);
