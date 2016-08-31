import moment from 'moment';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import angularMeteor from 'angular-meteor';

import { name as Login } from '../login/login';
import { name as Portal } from '../portal/portal';
import { name as Register } from '../register/register';
import { name as NotFound } from '../notFound/notFound';

import './futureFirst.html';

const name = 'futureFirst';

const redirectStudent = ($match, $state) => {
  'ngInject';

  Meteor.call('registerGetSchoolByUrl', $match.school_url, (err, res) => {
    if (res.length > 0) {
      Session.setPersistent('school', res[0]);
      $state.go('register.linkedin');
    } else {
      $state.go('register.index');
    }
  });
};

const configRoutes = ($locationProvider, $urlRouterProvider) => {
  'ngInject';

  // Remove # from the urls
  $locationProvider.html5Mode(true);

  // Redirect students and former students to /register/linkedin
  $urlRouterProvider.when('/student/:school_url', redirectStudent);
  $urlRouterProvider.when('/former-student/:school_url', redirectStudent);

  // Catch all invalid routes
  $urlRouterProvider.otherwise('/404');
};

const run = ($rootScope, $state) => {
  'ngInject';

  $rootScope.$on('$stateChangeError', (e, to, par, fromS, fromPar, err) => {
    if (err === 'AUTH_REQUIRED') {
      $state.go('login');
    }

    if (err === 'SCHOOL_REQUIRED') {
      $state.go('register.index');
    }
  });
};

const configLocale = ($mdDateLocaleProvider) => {
  'ngInject';

  const mdDateLocaleProvider = $mdDateLocaleProvider;

  mdDateLocaleProvider.formatDate = (date) => {
    if (date) {
      return moment(date).format('DD/MM/YYYY');
    }

    return date;
  };
};

const configTheme = ($mdThemingProvider) => {
  'ngInject';

  $mdThemingProvider.definePalette('futureFirstPallet', {
    50: 'E2E5EB',
    100: 'BAC0CE',
    200: '919BB1',
    300: '647190',
    400: '435379',
    500: '233662',
    600: '1F3159',
    700: '1C2B4F',
    800: '182645',
    900: '121C33',
    A100: 'FF80AB',
    A200: 'FF4081',
    A300: 'EA5286',
    A400: 'F50057',
    A500: 'E21E64',
    A700: 'C51162',
    contrastDefaultColor: 'light',
    contrastDarkColors: [
      '50',
      '100',
      '200',
      '300',
      '400',
      'A100',
    ],
    contrastLightColors: undefined,
  });

  $mdThemingProvider.theme('default').primaryPalette('futureFirstPallet');
};

class FutureFirst {
  /*
   * This controller may be used to control data and behaviour
   * available throughout the entire application
   */
}

export default angular
  .module(name, [
    uiRouter,
    ngMaterial,
    angularMeteor,
    'accounts.ui',

    Login,
    Portal,
    Register,
    NotFound,
  ])
  .component(name, {
    controllerAs: name,
    controller: FutureFirst,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .config(configTheme)
  .config(configRoutes)
  .config(configLocale)
  .run(run);
