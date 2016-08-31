import angular from 'angular';
import textAngular from 'textangular';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';

import 'textAngular/dist/textAngular-sanitize';

import './mailbox.html';
import './mailboxMail.html';

const name = 'mailbox';

const configTextAngular = (taRegisterTool, $delegate) => {
  'ngInject';

  const taOptions = $delegate;

  // Attachment is not part of the standard tools pallet
  // has to be registered befored setting up the other icons
  taRegisterTool('attachment', {
    iconclass: 'material-icons attach-file',
  });

  taOptions.toolbar = [
    ['bold', 'italics', 'underline'],
    ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
    ['ul', 'ol', 'quote'],
    ['insertLink', 'insertImage', 'redo', 'undo', 'attachment'],
  ];

  return taOptions;
};

const configTextAngularIcons = ($delegate) => {
  'ngInject';

  const taTools = $delegate;

  taTools.ul.iconclass = 'material-icons format-list-bulleted';
  taTools.ol.iconclass = 'material-icons format-list-numbered';
  taTools.redo.iconclass = 'material-icons redo';
  taTools.undo.iconclass = 'material-icons undo';
  taTools.bold.iconclass = 'material-icons format-bold';
  taTools.quote.iconclass = 'material-icons format-quote';
  taTools.indent.iconclass = 'material-icons format-indent-decrease';
  taTools.italics.iconclass = 'material-icons format-italic';
  taTools.outdent.iconclass = 'material-icons format-indent-decrease';
  taTools.underline.iconclass = 'material-icons format-underlined';
  taTools.insertLink.iconclass = 'material-icons insert-link';
  taTools.insertImage.iconclass = 'material-icons image';
  taTools.justifyLeft.iconclass = 'material-icons format-align-left';
  taTools.justifyRight.iconclass = 'material-icons format-align-center';
  taTools.justifyCenter.iconclass = 'material-icons format-align-right';

  return taTools;
};

const config = ($stateProvider, $provide) => {
  'ngInject';

  $stateProvider.state('portal.mailbox', {
    url: '/mailbox',
    template: '<mailbox></mailbox>',
  });

  $provide.decorator('taOptions', configTextAngular);
  $provide.decorator('taTools', configTextAngularIcons);
};

class NewMail {
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
    this.subject= '';
    /*
     * Synchronous data
     */
    this.alumni = this.getAlumni();
  }


  /*
   * Actions
   */
  cancel() {
    this.mdDialog.cancel();
  }

  send() {
    let mailData = {
      from:"testUser@gmail.com",
      mail:this.selectedAlumni,
      subject: this.subject,
      message:this.htmlVariable
    };
    Meteor.call('sendMail',mailData);
    this.mdDialog.hide('done');
  }


  /*
   * UI Methods
   */
  queryAlumni(query) {
    return this.alumni.filter((alumnus) => {
      const lowerAlumuns = alumnus.name.toLowerCase();
      return lowerAlumuns.includes(query);
    });
  }


  /*
   * Helpers
   */
  getAlumni() {
    return [{
      name: 'Abid',
      email: 'devecha.abid@gmail.com',
      image: '/images/person1.png',
    }, {
      name: 'swamy',
      email: 'swamy@gleedtech.com',
      image: '/images/person2.png',
    }, {
      name: 'Andrew',
      email: 'andrew@thing.com',
      image: '/images/person1.png',
    }];
  }
}

class Mailbox {
  constructor($window, $mdDialog) {
    'ngInject';
    /*
     * Bind services
     */
    this.mdDialog = $mdDialog;
    /*
     * Synchronous data
     */
    this.inbox = this.getInbox();
    this.outbox = this.getOutbox();
    this.alumni = this.getAlumni();
    this.newSms = {};
    this.newMail = {};

    /*
     * UI States
     */
    this.searchText = '';
    this.columns = 'both';
    this.showSearch = false;
    this.height = { height: this.getHeight($window.innerHeight) };
  }


  /*
   * Actions
   */
  openMenu(mdOpenMenu, ev) {
    mdOpenMenu(ev);
  }

  openMail() {
    this.mdDialog.show({
      controller: NewMail,
      controllerAs: 'mailboxmail',
      parent: angular.element(document.body),
      templateUrl: `imports/ui/components/${name}/${name}Mail.html`,
    })
    .then(() => {
      // console.log(answer);
    }, () => {
      // console.log('cancelled');
    });
  }


  /*
   * UI Methods
   */
  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  getHeight(height) {
    const output = height - 320;

    if (output > 3000) {
      return 3000;
    }

    if (output < 100) {
      return 100;
    }

    return output;
  }


  /*
   * Helpers
   */
  getInbox() {
    return [{
      from: {
        name: 'Jacky',
        image: '/images/person2.png',
      },
      date: new Date(),
      subject: 'Lorem ipsum',
      attachments: ['/images/person1.png', '/images/person2.png'],
    }, {
      from: {
        name: 'Jacky',
        image: '/images/person2.png',
      },
      date: new Date(),
      subject: 'Lorem ipsum',
      attachments: ['/images/person1.png', '/images/person2.png'],
    }, {
      from: {
        name: 'Jacky',
        image: '/images/person2.png',
      },
      date: new Date(),
      subject: 'Lorem ipsum',
      attachments: ['/images/person1.png', '/images/person2.png'],
    }];
  }

  getOutbox() {
    return [{
      to: {
        name: 'Oliver',
        image: '/images/person1.png',
      },
      from: {
        name: 'Jacky',
        image: '/images/person2.png',
      },
      date: new Date(),
      subject: 'Lorem ipsum',
      attachments: ['/images/person1.png', '/images/person2.png'],
    }, {
      to: {
        name: 'Oliver',
        image: '/images/person1.png',
      },
      from: {
        name: 'Jacky',
        image: '/images/person2.png',
      },
      date: new Date(),
      subject: 'Lorem ipsum',
      attachments: ['/images/person1.png', '/images/person2.png'],
    }, {
      to: {
        name: 'Oliver',
        image: '/images/person1.png',
      },
      from: {
        name: 'Jacky',
        image: '/images/person2.png',
      },
      date: new Date(),
      subject: 'Lorem ipsum',
      attachments: ['/images/person1.png', '/images/person2.png'],
    }];
  }

  getAlumni() {
    return [{
      name: 'Jose',
      surname: 'Gomes',
      registered: new Date(),
      email: 'jose@thinkup.io',
      image: '/images/person2.png',
    }, {
      name: 'Josh',
      surname: 'Gromes',
      registered: new Date(),
      email: 'josh@thinkup.io',
      image: '/images/person1.png',
    }, {
      name: 'Katy',
      surname: 'Perry',
      registered: new Date(),
      email: 'katy@perry.com',
      image: '/images/person2.png',
    }];
  }
}

export default angular
  .module(name, [
    uiRouter,
    textAngular,
    angularMeteor,

  ])
  .component(name, {
    controllerAs: name,
    controller: Mailbox,
    templateUrl: `imports/ui/components/${name}/${name}.html`,
  })
  .config(config);
