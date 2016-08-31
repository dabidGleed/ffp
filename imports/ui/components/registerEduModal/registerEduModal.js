import './registerEduModal.html';

export default class RegisterEduModal {
  constructor($mdDialog, $scope, education, type) {
    'ngInject';


    /*
     * Bind services
     */
    this.scope = $scope;
    this.mdDialog = $mdDialog;


    /*
     * Synchronous data
     */
    this.type = type;
    this.education = this.reHash(education);


    /*
     * Lookups
     */
    this.post16Lookup = [];
    this.aLevelLookup = [];
    this.asLevelLookup = [];
    this.ibLevelLookup = [];
    this.educationLookup = [];
    this.postgraduateLookup = [];
    this.undergraduateLookup = [];
    this.apprenticeshipLookup = [];
    this.postgraduateLevelLookup = [];
    this.post16InstitutionLookup = [];
    this.apprenticeshipSectorLookup = [];
    this.apprenticeshipEmployerLookup = [];
    this.postgraduateInstitutionLookup = [];
    this.undergraduateInstitutionLookup = [];


    /*
     * UI States
     */
    this.selectedAlevel = null;
    this.selectedASlevel = null;
    this.selectedIBlevel = null;
    this.selected16level = null;

    this.searchAlevel = '';
    this.searchASlevel = '';
    this.searchIBlevel = '';
    this.search16level = '';
    this.searchEducation = '';
    this.searchPostgraduate = '';
    this.searchUndergraduate = '';
    this.searchPostgraduateLevel = '';
    this.searchPost16Institution = '';
    this.searchApprenticeshipLevel = '';
    this.searchApprenticeshipSector = '';
    this.searchApprenticeshipEmployer = '';
    this.searchPostgraduateInstitution = '';
    this.searchUndergraduateInstitution = '';


    /*
     * Activate
     */
    this.getPost16Lookup();
    this.getALevelLookup();
    this.getAsLevelLookup();
    this.getIbLevelLookup();
    this.getEducationLookup();
    this.getPostgraduateLookup();
    this.getUndergraduateLookup();
    this.getApprenticeshipLookup();
    this.getPostgraduateLevelLookup();
    this.getPost16InstitutionLookup();
    this.getApprenticeshipSectorLookup();
    this.getApprenticeshipEmployerLookup();
    this.getPostgraduateInstitutionLookup();
    this.getUndergraduateInstitutionLookup();
  }


  /*
   * Actions
   */
  cancel() {
    this.mdDialog.cancel();
  }

  save() {
    this.mdDialog.hide(this.education);
  }


  /*
   * UI methods
   */
  showDescription() {
    const list = [
      'Training',
      'A-Levels',
      'AS-Levels',
      'Apprenticeship',
      'International Baccalaureate',
      'Other sixth form / college course',
      'Undergraduate degree (BA, BSc, LLB etc.)',
      'Postgraduate degree (MA, LLM, MSc, MPhil, PhD etc.)',
    ];

    return this.education.education && !list.includes(this.education.education);
  }

  show16() {
    const list = [
      'A-Levels',
      'AS-Levels',
      'International Baccalaureate',
      'Other sixth form / college course',
    ];

    return list.includes(this.education.education);
  }

  showTraining() {
    return this.education.education === 'Training';
  }

  showAlevel() {
    return this.education.education === 'A-Levels';
  }

  showASlevel() {
    return this.education.education === 'AS-Levels';
  }

  showIB() {
    return this.education.education === 'International Baccalaureate';
  }

  showSixthForm() {
    return this.education.education === 'Other sixth form / college course';
  }

  showUndergraduate() {
    const txt = 'Undergraduate degree (BA, BSc, LLB etc.)';
    return this.education.education === txt;
  }

  showPostgraduate() {
    const txt = 'Postgraduate degree (MA, LLM, MSc, MPhil, PhD etc.)';
    return this.education.education === txt;
  }

  showApprenticeship() {
    return this.education.education === 'Apprenticeship';
  }

  q(query, prop) {
    let items = this[prop];

    if (query) {
      items = this[prop].filter(this.contains(query));
    }

    return items;
  }

  clearTo() {
    if (this.education.ongoing) {
      this.education.to = null;
    }
  }

  isNew() {
    return this.type === 'add';
  }


  /*
   * Helpers
   */
  contains(query) {
    return (s) => s.toLowerCase().includes(query.toLowerCase());
  }

  reHash(education) {
    return {
      to: education.to || null,
      from: education.from || null,
      ongoing: education.ongoing || false,
      education: education.education || '',
      description: education.description || '',
      aLevelSubjects: education.aLevelSubjects || [],
      asLevelSubjects: education.asLevelSubjects || [],
      ibLevelSubjects: education.ibLevelSubjects || [],
      postgraduateLevel: education.postgraduateLevel || '',
      post16Institution: education.post16Institution || '',
      sixthLevelSubjects: education.sixthLevelSubjects || [],
      apprenticeshipRole: education.apprenticeshipRole || '',
      trainingDescription: education.trainingDescription || '',
      apprenticeshipLevel: education.apprenticeshipLevel || '',
      postgraduateSubject: education.postgraduateSubjects || '',
      apprenticeshipSector: education.apprenticeshipSector || '',
      undergraduateSubject: education.undergraduateSubjects || '',
      postgraduateMoreInfo: education.postgraduateMoreInfo || null,
      undergraduateMoreInfo: education.undergraduateMoreInfo || null,
      apprenticeshipEmployer: education.apprenticeshipEmployer || '',
      postgraduateInstitution: education.postgraduateInstitution || '',
      undergraduateInstitution: education.undergraduateInstitution || '',
    };
  }

  getPost16Lookup() {
    return Meteor.call('getPost16Lookup', (err, res) => {
      this.post16Lookup = res;
      this.scope.$apply();
    });
  }

  getALevelLookup() {
    return Meteor.call('getALevelLookup', (err, res) => {
      this.aLevelLookup = res;
      this.scope.$apply();
    });
  }

  getAsLevelLookup() {
    return Meteor.call('getASLevelLookup', (err, res) => {
      this.asLevelLookup = res;
      this.scope.$apply();
    });
  }

  getIbLevelLookup() {
    return Meteor.call('getIBLookup', (err, res) => {
      this.ibLevelLookup = res;
      this.scope.$apply();
    });
  }

  getEducationLookup() {
    return Meteor.call('getEducationTypeLookup', (err, res) => {
      this.educationLookup = res;
      this.scope.$apply();
    });
  }

  getPostgraduateLookup() {
    return Meteor.call('getPostgraduateLookup', (err, res) => {
      this.postgraduateLookup = res;
      this.scope.$apply();
    });
  }

  getUndergraduateLookup() {
    return Meteor.call('getUndergraduateLookup', (err, res) => {
      this.undergraduateLookup = res;
      this.scope.$apply();
    });
  }

  getApprenticeshipLookup() {
    return Meteor.call('getAprenticeshipLevelLookup', (err, res) => {
      this.apprenticeshipLookup = res;
      this.scope.$apply();
    });
  }

  getPostgraduateLevelLookup() {
    return Meteor.call('getPostgraduateLevelLookup', (err, res) => {
      this.postgraduateLevelLookup = res;
      this.scope.$apply();
    });
  }

  getApprenticeshipSectorLookup() {
    return Meteor.call('getAprenticeshipSectorLookup', (err, res) => {
      this.apprenticeshipSectorLookup = res;
      this.scope.$apply();
    });
  }

  getPost16InstitutionLookup() {
    // have to lookup on Account
    // return Meteor.call('', (err, res) => {
    //   this.post16InstitutionLookup = res;
    //   this.scope.$apply();
    // });

    this.post16InstitutionLookup = ['Thing', 'Stuff', 'Object'];
  }

  getApprenticeshipEmployerLookup() {
    // have to lookup on Account
    // return Meteor.call('', (err, res) => {
    //   this.apprenticeshipEmployerLookup = res;
    //   this.scope.$apply();
    // });

    this.apprenticeshipEmployerLookup = ['Thing', 'Stuff', 'Object'];
  }

  getPostgraduateInstitutionLookup() {
    // have to lookup on Account
    // return Meteor.call('', (err, res) => {
    //   this.postgraduateInstitutionLookup = res;
    //   this.scope.$apply();
    // });

    this.postgraduateInstitutionLookup = ['Thing', 'Stuff', 'Object'];
  }

  getUndergraduateInstitutionLookup() {
    // have to lookup on Account
    // return Meteor.call('', (err, res) => {
    //   this.undergraduateInstitutionLookup = res;
    //   this.scope.$apply();
    // });

    this.undergraduateInstitutionLookup = ['Thing', 'Stuff', 'Object'];
  }

}
