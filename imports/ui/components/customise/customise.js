import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import './customise.html';
import './customiseNew.html';

const name = 'customise';

const config = ($stateProvider) => {
  'ngInject';

  $stateProvider.state('portal.customise', {
    url: '/customise',
    template: '<customise></customise>',
  });
};

class NewQuestion {
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

class Customise {
  constructor($window, $mdDialog) {
    'ngInject';

    /*
    * Bind services
    */
    this.mdDialog = $mdDialog;

    /*
     * Synchronous data
     */
    this.customQuestions = [{
      id: 1,
      order: 1,
      type: 'Multi-Select',
      question: 'A multi select question here',
      answers: ['Option 1', 'Option 2', 'Option 3'],
    }, {
      id: 2,
      order: 2,
      type: 'Select',
      question: 'A select question here',
      answers: ['Option 1', 'Option 2', 'Option 3'],
    }, {
      id: 3,
      order: 3,
      type: 'Text',
      question: 'A text question here',
    }, {
      id: 4,
      order: 4,
      type: 'Multi-Select',
      question: 'Another multi select question here, however this one is long.',
      answers: ['Option 1', 'Option 2', 'Option 3'],
    }, {
      id: 5,
      order: 5,
      type: 'Select',
      question: 'Another select question here',
      answers: ['Option 1', 'Option 2', 'Option 3'],
    }, {
      id: 6,
      order: 6,
      type: 'Text',
      question: 'Another text question here',
    }];
  }

  openQuestion() {
    this.mdDialog.show({
      controller: NewQuestion,
      controllerAs: 'questionnew',
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
    controller: Customise,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .config(config);
