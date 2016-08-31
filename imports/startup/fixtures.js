import { conn as conn } from './salesforce';
import { Lookups } from '../api/lookups';


// Helpers
const equals = (label) => (f) => f.name === label;

const pickValues = (fields, label) => {
  const values = fields.filter(equals(label))[0].picklistValues;
  return values.map((item) => item.value);
};


// Insert lookups on DB
// Will have to be abstracted to be called by a cron job
Meteor.startup(() => {
  if (false) {
    Lookups.remove({});

    conn.describe('Alumni_attendance__c', Meteor.bindEnvironment((e, r) => {
      Lookups.insert({
        name: 'Status__c',
        values: pickValues(r.fields, 'Status__c'),
      });
    }));

    conn.describe('Alumni_activity__c', Meteor.bindEnvironment((e, r) => {
      Lookups.insert({
        name: 'Event_type__c',
        values: pickValues(r.fields, 'Event_type__c'),
      });
    }));

    conn.describe('Alumni_custom_question__c', Meteor.bindEnvironment((e, r) => {
      Lookups.insert({
        name: 'Custom_question_type__c',
        values: pickValues(r.fields, 'Custom_question_type__c'),
      });
    }));

    conn.describe('Employment_history__c', Meteor.bindEnvironment((e, r) => {
      Lookups.insert({
        name: 'Government_scheme__c',
        values: pickValues(r.fields, 'Government_scheme__c'),
      });
    }));

    conn.describe('Account_contact__c', Meteor.bindEnvironment((e, r) => {
      Lookups.insert({
        name: 'Able_to_attend_in_person__c',
        values: pickValues(r.fields, 'Able_to_attend_in_person__c'),
      });

      Lookups.insert({
        name: 'Support_offered__c',
        values: pickValues(r.fields, 'Support_offered__c'),
      });

      Lookups.insert({
        name: 'What_year_group_are_you_in__c',
        values: pickValues(r.fields, 'What_year_group_are_you_in__c'),
      });
    }));

    conn.describe('Contact', Meteor.bindEnvironment((e, r) => {
      Lookups.insert({
        name: 'Current_occupation__c',
        values: pickValues(r.fields, 'Current_occupation__c'),
      });

      Lookups.insert({
        name: 'Future_plans__c',
        values: pickValues(r.fields, 'Future_plans__c'),
      });

      Lookups.insert({
        name: 'Gender__c',
        values: pickValues(r.fields, 'Gender__c'),
      });

      Lookups.insert({
        name: 'Notification_frequency__c',
        values: pickValues(r.fields, 'Notification_frequency__c'),
      });
    }));

    conn.describe('Education_history__c', Meteor.bindEnvironment((e, r) => {
      Lookups.insert({
        name: 'A_level_subjects__c',
        values: pickValues(r.fields, 'A_level_subjects__c'),
      });

      Lookups.insert({
        name: 'AS_level_subjects__c',
        values: pickValues(r.fields, 'AS_level_subjects__c'),
      });

      Lookups.insert({
        name: 'Apprenticeship_level__c',
        values: pickValues(r.fields, 'Apprenticeship_level__c'),
      });

      Lookups.insert({
        name: 'Apprenticeship_sector__c',
        values: pickValues(r.fields, 'Apprenticeship_sector__c'),
      });

      Lookups.insert({
        name: 'Education_type__c',
        values: pickValues(r.fields, 'Education_type__c'),
      });

      Lookups.insert({
        name: 'IB_subjects__c',
        values: pickValues(r.fields, 'IB_subjects__c'),
      });

      Lookups.insert({
        name: 'Other_post_16_qualifications__c',
        values: pickValues(r.fields, 'Other_post_16_qualifications__c'),
      });

      Lookups.insert({
        name: 'Postgraduate_level__c',
        values: pickValues(r.fields, 'Postgraduate_level__c'),
      });

      Lookups.insert({
        name: 'Postgraduate_subject__c',
        values: pickValues(r.fields, 'Postgraduate_subject__c'),
      });

      Lookups.insert({
        name: 'Undergraduate_subject__c',
        values: pickValues(r.fields, 'Undergraduate_subject__c'),
      });
    }));
  }
});
