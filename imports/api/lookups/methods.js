import { Lookups } from './collection';


// Helpers
const getValues = (field) => Lookups.findOne(field, { reactive: false }).values;


// Methods
const getStatusLookup = () => {
  const output = getValues({ name: 'Status__c' });
  return output;
};

const getEventTypeLookup = () => {
  const output = getValues({ name: 'Event_type__c' });
  return output;
};

const getCustomQuestionTypeLookup = () => {
  const output = getValues({ name: 'Custom_question_type__c' });
  return output;
};

const getGovernmentSchemeLookup = () => {
  const output = getValues({ name: 'Government_scheme__c' });
  return output;
};

const getAbleToAttendLookup = () => {
  const output = getValues({ name: 'Able_to_attend_in_person__c' });
  return output;
};

const getSupportOfferedLookup = () => {
  const output = getValues({ name: 'Support_offered__c' });
  return output;
};

const getYearGroupLookup = () => {
  const output = getValues({ name: 'What_year_group_are_you_in__c' });
  return output;
};

const getCurrentOccupationLookup = () => {
  const output = getValues({ name: 'Current_occupation__c' });
  return output;
};

const getFuturePlansLookup = () => {
  const output = getValues({ name: 'Future_plans__c' });
  return output;
};

const getGenderLookup = () => {
  const output = getValues({ name: 'Gender__c' });
  return output;
};

const getNotificationFrequencyLookup = () => {
  const output = getValues({ name: 'Notification_frequency__c' });
  return output;
};

const getAprenticeshipLevelLookup = () => {
  const output = getValues({ name: 'Apprenticeship_level__c' });
  return output;
};

const getAprenticeshipSectorLookup = () => {
  const output = getValues({ name: 'Apprenticeship_sector__c' });
  return output;
};

const getASLevelLookup = () => {
  const output = getValues({ name: 'AS_level_subjects__c' });
  return output;
};

const getALevelLookup = () => {
  const output = getValues({ name: 'A_level_subjects__c' });
  return output;
};

const getEducationTypeLookup = () => {
  const output = getValues({ name: 'Education_type__c' });
  return output;
};

const getIBLookup = () => {
  const output = getValues({ name: 'IB_subjects__c' });
  return output;
};

const getPost16Lookup = () => {
  const output = getValues({ name: 'Other_post_16_qualifications__c' });
  return output;
};

const getPostgraduateLevelLookup = () => {
  const output = getValues({ name: 'Postgraduate_level__c' });
  return output;
};

const getPostgraduateLookup = () => {
  const output = getValues({ name: 'Postgraduate_subject__c' });
  return output;
};

const getUndergraduateLookup = () => {
  const output = getValues({ name: 'Undergraduate_subject__c' });
  return output;
};


// Publish
Meteor.methods({
  getIBLookup,
  getStatusLookup,
  getGenderLookup,
  getALevelLookup,
  getPost16Lookup,
  getASLevelLookup,
  getEventTypeLookup,
  getYearGroupLookup,
  getFuturePlansLookup,
  getAbleToAttendLookup,
  getPostgraduateLookup,
  getUndergraduateLookup,
  getEducationTypeLookup,
  getSupportOfferedLookup,
  getGovernmentSchemeLookup,
  getPostgraduateLevelLookup,
  getCurrentOccupationLookup,
  getCustomQuestionTypeLookup,
  getAprenticeshipLevelLookup,
  getAprenticeshipSectorLookup,
  getNotificationFrequencyLookup,
});
