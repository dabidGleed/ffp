import { conn as conn } from '../../startup/salesforce';


// Helpers
const hydrateAlumni = (alumni) => {
  const output = alumni.map((alumnus) => {
    const obj = alumnus;

    obj.display = true;
    obj.isChecked = false;
    obj.image = '/images/person1.png';
    obj.notes = ['Note1', 'Note2', 'Note3'];

    return obj;
  });

  return output;
};


// Methods
const searchGetAlumni = () => {
  const fields = [
    'Id',
    'Name',
    'Email__c',
    'Gender__c',
    'Mobile__c',
    'Twitter__c',
    'Facebook__c',
    'CreatedDate',
    'Linkedin__c',
    'Last_name__c',
    'Job_title__c',
    'Birth_date__c',
    'Future_plans__c',
    'Leaving_year__c',
    'Previous_name__c',
    'Support_offered__c',
    'Current_occupation__c',
    'Leaving_year_group__c',
    'Training_description__c',
    'Support_offered_other__c',
    'Education_current_other__c',
    'Undergraduate_institution__c',
    'Expected_finish_date_of_education__c',
  ].toString();
  const query = `SELECT ${fields} FROM Alumnus__c`;
  return hydrateAlumni(Meteor.wrapAsync(conn.query, conn)(query).records);
};


// Publish
Meteor.methods({
  searchGetAlumni,
});
