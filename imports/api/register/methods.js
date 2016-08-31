import jsforce from 'jsforce';
import { conn as conn } from '../../startup/salesforce';

// Fields
const schoolFields = [
  'Id',
  'School_name__c',
  'School_logo__c',
  'Form_colour__c',
  'Short_name_for_URL__c',
];

const membershipFields = [
  '*',
  'Type__r.Is_client__c',
];

// Helpers
const hasValidMemberhip = (memberships) => {
  const output = memberships.filter((m) => m.Type__r.Is_client__c).length > 0;
  return output;
};

const isClient = (school) => {
  if (school.Memberships__r) {
    return hasValidMemberhip(school.Memberships__r.records);
  }

  return false;
};


// Methods
const registerGetSchools = () => {
  const output = conn.sobject('School__c')
    .select(schoolFields.toString())
    .include('Memberships__r')
      .select(membershipFields.toString())
      .where({
        End__c: { $gte: jsforce.Date.TODAY },
        Start__c: { $lte: jsforce.Date.TODAY },
      })
      .end()
    .execute((err, schools) => {
      const modified = schools.map((school) => {
        const obj = {
          Id: school.Id,
          Is_client__c: isClient(school),
          School_name__c: school.School_name__c,
          School_logo__c: school.School_logo__c,
          Form_colour__c: school.Form_colour__c,
          Short_name_for_URL__c: school.Short_name_for_URL__c,
        };

        return obj;
      });

      return modified;
    });

  return output;
};

const registerGetSchoolByUrl = (url) => {
  const output = conn.sobject('School__c')
    .select(schoolFields.toString())
    .where({
      Short_name_for_URL__c: url,
    })
    .include('Memberships__r')
      .select(membershipFields.toString())
      .where({
        End__c: { $gte: jsforce.Date.TODAY },
        Start__c: { $lte: jsforce.Date.TODAY },
      })
      .end()
    .execute((err, schools) => {
      const modified = schools.map((school) => {
        const obj = {
          Id: school.Id,
          Is_client__c: isClient(school),
          School_name__c: school.School_name__c,
          School_logo__c: school.School_logo__c,
          Form_colour__c: school.Form_colour__c,
          Short_name_for_URL__c: school.Short_name_for_URL__c,
        };

        return obj;
      });

      return modified;
    });

  return output;
};


// Publish
Meteor.methods({
  registerGetSchools,
  registerGetSchoolByUrl,
});
