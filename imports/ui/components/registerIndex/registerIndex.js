import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './registerIndex.html';

const name = 'registerIndex';

const config = ($stateProvider) => {
  'ngInject';

  $stateProvider.state('register.index', {
    url: '',
    template: '<register-index></register-index>',
  });
};

class RegisterIndex {
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
    this.type = '';
    this.school = null;
    this.searchText = '';


    /*
     * Asynchronous data
     */
    this.schools = [];


    /*
     * Activate
     */
    this.getSchools();
  }


  /*
   * Getters
   */
  getSchools() {
    Meteor.call('registerGetSchools', (err, res) => {
      this.schools = res;
      this.scope.$apply();
    });
  }


  /*
   * Actions
   */
  register() {
    this.school.Enrolment_type = this.type;
    Session.setPersistent('school', this.school);
    this.state.go('register.linkedin');
  }


  /*
   * UI Methods
   */
  selectedType() {
    return this.type.length > 0;
  }

  querySearch(query) {
    if (query) {
      return this.listOfSchools().filter(this.contains(query));
    }

    return this.listOfSchools();
  }

  isValid() {
    return this.selectedType() && this.school;
  }

  showNotFound() {
    if (this.school) {
      return !this.school.Is_client__c;
    }

    return false;
  }


  /*
   * Helper methods
   */
  listOfSchools() {
    if (this.type === 'student') {
      return this.schools.filter((school) => school.Is_client__c);
    }

    return this.schools;
  }

  contains(query) {
    return (s) => {
      const lowerSchool = s.School_name__c.toLowerCase();
      return lowerSchool.includes(query.toLowerCase());
    };
  }
}

export default angular
  .module(name, [
    uiRouter,
    angularMeteor,
  ])
  .component(name, {
    controllerAs: name,
    controller: RegisterIndex,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .config(config);
