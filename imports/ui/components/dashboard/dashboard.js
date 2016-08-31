import _ from 'lodash';
import moment from 'moment';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './dashboard.html';

const name = 'dashboard';

const config = ($stateProvider) => {
  'ngInject';

  $stateProvider.state('portal.dashboard', {
    url: '/dashboard',
    template: '<dashboard></dashboard>',
  });
};

class Dashboard {
  constructor($scope) {
    'ngInject';


    /*
     * Bind services
     */
    this.scope = $scope;


    /*
     * Asynchronous data
     */
    this.alumni = [];


    /*
     * Synchronous data
     */
    this.activityType = '';
    this.activity = this.getActivity();


    /*
     * UI States
     */
    this.selectedAlumnus = null;

    this.registrationsWeek = 0;
    this.registrationsTotal = 0;
    this.registrationsMonth = 0;

    this.newMessages = this.getMailboxCount();
    this.chartData = this.getChartData('year');


    /*
     * Lookups
     */
    this.activityTypes = this.getActivityTypes();


    /*
     * Activate
     */
    this.getAlumni();
  }


  /*
   * Helpers
   */
  getAlumni() {
    Meteor.call('dashboardGetAlumni', (err, res) => {
      const dates = _.map(res, 'CreatedDate');

      this.alumni = res;
      this.registrationsTotal = this.getRegistrationsTotal(dates);
      this.registrationsWeek = this.getRegistrationsWeek(dates);
      this.registrationsMonth = this.getRegistrationsMonth(dates);

      this.scope.$apply();
    });
  }

  getChartData(type) {
    if (type === 'week') {
      // return the week type
    }

    if (type === 'month') {
      // return the month type
    }

    // return the year type
    return {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [{
        label: 'Sign ups',
        data: [2, 4, 6],
      }],
    };
  }

  getActivity() {
    return {
      date: new Date(),
      title: 'My upcoming activity',
      description: 'Lorem ipsum dolor sit amet',
    };
  }

  getActivityTypes() {
    return [{
      _id: 1,
      name: 'Test 1',
    }, {
      _id: 2,
      name: 'Test 2',
    }, {
      _id: 3,
      name: 'Test 3',
    }];
  }

  getMailboxCount() {
    return 25;
  }

  getRegistrationsTotal(dates) {
    return dates.length;
  }

  getRegistrationsWeek(dates) {
    return _.filter(dates, (date) => {
      const output = moment(date.CreatedDate) > moment().startOf('week');
      return output;
    }).length;
  }

  getRegistrationsMonth(dates) {
    return _.filter(dates, (date) => {
      const output = moment(date.CreatedDate) > moment().startOf('month');
      return output;
    }).length;
  }
}

export default angular
  .module(name, [
    uiRouter,
    angularMeteor,
  ])
  .component(name, {
    controllerAs: name,
    controller: Dashboard,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .config(config);
