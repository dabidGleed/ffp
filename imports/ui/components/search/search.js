import _ from 'lodash';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import angularMeteor from 'angular-meteor';

import { name as Profile } from '../profile/profile';

import './search.html';
import './searchSlider.html';
import './searchNotesSheet.html';

const name = 'search';

const config = ($stateProvider) => {
  'ngInject';

  $stateProvider.state('portal.search', {
    url: '/search',
    abstract: true,
    template: '<div ui-view=""></div>',
  });

  $stateProvider.state('portal.search.index', {
    url: '',
    template: '<search></search>',
  });
};

// https://github.com/FDIM/md-range-slider
const rangeSlider = () => {
  const output = {
    scope: {
      max: '=',
      min: '=',
      step: '=',
      minGap: '=',
      lowerValue: '=lowerValue',
      upperValue: '=upperValue',
    },
    templateUrl: `imports/ui/components/${name}/${name}Slider.html`,
    controller: ($scope) => {
      'ngInject';

      const scope = $scope;

      if (!scope.step) {
        scope.step = 1;
      }

      scope.lowerMax = scope.max - scope.step;
      scope.upperMin = scope.lowerValue + scope.step;

      if (!scope.lowerValue || scope.lowerValue < scope.min) {
        scope.lowerValue = scope.min;
      } else {
        scope.lowerValue *= 1;
      }

      if (!scope.upperValue || scope.upperValue > scope.max) {
        scope.upperValue = scope.min;
      } else {
        scope.upperValue *= 1;
      }

      scope.$watch('lowerValue', () => {
        const left = scope.max - (scope.lowerValue + scope.step);
        const right = scope.max - scope.min;

        const number = (left / right) * 100;

        scope.upperMin = scope.lowerValue + scope.step;
        scope.upperWidth = `${number}%`;

        const test = scope.upperValue - scope.minGap;

        if (scope.lowerValue > test && scope.upperValue < scope.max) {
          scope.upperValue = scope.lowerValue + scope.minGap;
        }
      });
    },
  };

  return output;
};

class Search {
  constructor($scope, $window, $mdBottomSheet) {
    'ngInject';


    /*
     * Bind services
     */
    this.scope = $scope;
    this.mdBottomSheet = $mdBottomSheet;


    /*
     * Synchronous data
     */
    this.filters = this.getFilters();

    this.min = 1915;
    this.max = 2016;
    this.lower = 1915;
    this.upper = 2016;


    /*
     * Asynchronous data
     */
    this.gender = [];
    this.alumni = [];

    // Init data
    this.getGender();
    this.getAlumni();


    /*
     * UI States
     */
    this.fabopen = false;
    this.showSearch = false;
    this.showFilterTabs = false;
    this.selectAllCheck = false;

    // The height of the infinite scroll list
    this.height = { height: this.getHeight($window.innerHeight) };
  }


  /*
   * Helpers
   */
  getGender() {
    Meteor.call('getGender', (err, res) => {
      this.gender = res;
    });
  }

  getAlumni() {
    Meteor.call('searchGetAlumni', (err, res) => {
      this.alumni = res;
      this.scope.$apply();
    });
  }

  getFilters() {
    return {
      education: {
        summary: [],
        post16: [],
        apprenticeship: [],
        undergraduateInstitute: [],
        undergraduateSubject: [],
        postgraduateInstitute: [],
        postgraduateSubject: [],
      },
      employment: {
        title: [],
        sector: [],
        employer: [],
      },
      general: {
        gender: [],
        ableToVisit: [],
        occupation: [],
        support: [],
        leavingYearFrom: 1915,
        leavingYearUntil: 2016,
        // signedFrom: ,
        // signedUntil:
      },
      activity: {
        activity: [],
        type: [],
        attendedPrevious: [],
        // from: ,
        // until:
      },
      // questions: {
        // ?
      // },
    };
  }


  /*
   * UI methods
   */
  getHeight(height) {
    const output = height - 285;

    if (output > 3000) {
      return 3000;
    }

    if (output < 100) {
      return 100;
    }

    return output;
  }

  openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

  toggleTab() {
    this.showFilterTabs = !this.showFilterTabs;
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  hasElementsCheckedClass() {
    if (_.findIndex(this.alumni, (a) => a.isChecked) > -1) {
      return 'active';
    }

    return 'inactive';
  }

  showNotesSheet(notes) {
    this.mdBottomSheet.show({
      controller: 'notesSheet',
      controllerAs: 'notesSheet',
      resolve: { notes: () => notes },
      parent: angular.element(document.getElementById('ff-card')),
      templateUrl: `imports/ui/components/${name}/${name}NotesSheet.html`,
    });
  }

  selectAll() {
    for (let i = 0; i < this.alumni.length; i++) {
      this.alumni[i].isChecked = true;
    }
  }

  selectNone() {
    for (let i = 0; i < this.alumni.length; i++) {
      this.alumni[i].isChecked = false;
    }
  }

  toggleSelectAll() {
    if (this.selectAllCheck) {
      this.selectNone();
    } else {
      this.selectAll();
    }
  }
}

class NotesSheet {
  constructor($mdBottomSheet, notes) {
    'ngInject';


    /*
     * Bind services
     */
    this.mdBottomSheet = $mdBottomSheet;


    /*
     * Synchronous data
     */
    this.notes = notes;
  }


  /*
   * UI methods
   */
  clicked() {
    this.mdBottomSheet.cancel();
  }
}

export default angular
  .module(name, [
    uiRouter,
    ngMaterial,
    angularMeteor,

    Profile,
  ])
  .component(name, {
    controllerAs: name,
    controller: Search,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .controller('notesSheet', NotesSheet)
  .directive('rangeSlider', rangeSlider)
  .config(config);
