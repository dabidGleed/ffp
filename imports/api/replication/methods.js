import { conn as conn } from '../../startup/salesforce';

const schoolFields = [
  'Id',
  'Form_colour__c',
  'School_logo__c',
  'School_name__c',
  'School_type__c',
  'Welcome_email__c',
  'Short_name_for_URL__c',
];

const schoolMembershipFields = [
  'Id',
  'End__c',
  'Start__c',
  'Type__r.Is_client__c',
];

const schoolEventFields = [
  'Event__c',
];

const customQuestionsFields = [
  'Id',
  'Order__c',
  'School__c',
  'Question__c',
  'Custom_question_type__c',
];

const customQuestionsOptionFields = [
  'Id',
  'Order__c',
  'Answer__c',
];

const eventsFields = [
  'Event_name__c',
  'Event_type__c',
  'Event_notes__c',
  'Event_creator__c',
  'Staff_contact__c',
  'Start_date_time__c',
  'Number_of_students_taking_part__c',
];

const eventAlumnusFields = [
  'Status__c',
  'Alumnus__c',
];

const eventSchoolFields = [
  'School__c',
];

const userFields = [
  'Id',
  'Email_1__c',
  'User_type__c',
];

const userSchoolFields = [
  'School__c',
];

const alumniFields = [
  'Id',
  'Gender__c',
  'Birth_date__c',
  'Leaving_year__c',
  'Previous_name__c',
  'Profile_image__c',
  'Alumnus_title__c',
  'Support_offered__c',
  'Current_occupation__c',
  'Student_future_plan__c',
  'Alumnus_current_year__c',
  'Support_offered_other__c',
  'Able_to_attend_in_person__c',
];

const alumniUserFields = [
  'City__c',
  'Google__c',
  'Country__c',
  'Email_1__c',
  'Email_2__c',
  'Email_3__c',
  'Enabled__c',
  'Phone_1__c',
  'Phone_2__c',
  'Phone_3__c',
  'Twitter__c',
  'Facebook__c',
  'LinkedIn__c',
  'Postcode__c',
  'Verified__c',
  'Last_name__c',
  'First_name__c',
  'House_number__c',
  'Address_line_1__c',
  'Address_line_2__c',
];

const alumniNoteFields = [
  'Text__c',
  'Subject__c',
];

const alumniAnswersFields = [
  'Answer_text__c',
  'Answer_option__c',
  'Custom_question__c',
];

const alumniEmployementFields = [
  'Role__c',
  'Ongoing__c',
  'Date_end__c',
  'Date_start__c',
  'Organisation__c',
  'Government_scheme__c',
  'On_government_scheme_c',
];

const alumniEducationFields = [
  'Ongoing__c',
  'Date_end__c',
  'Date_start__c',
  'Organisation__c',
  'Education_type__c',
  'A_level_subjects__c',
  'AS_level_subjects__c',
  'IB_level_subjects__c',
  'Postgraduate_level__c',
  'Apprenticeship_level__c',
  'Apprenticeship_title__c',
  'Postgraduate_subject__c',
  'Training_description__c',
  'Undergraduate_subject__c',
  'Apprenticeship_sector__c',
  'Postgraduate_more_info__c',
  'Undergraduate_more_info__c',
  'Post16_qualification_other__c',
  'Other_education_description__c',
];

const teacherFields = [
  'Last_notification_date__c',
  'Notification_frequency__c',
];

const teacherUserFields = [
  'Enabled',
  'Email_1__c',
];

const getSchools = () => {
  const output = conn.sobject('School__c')
    .select(schoolFields.toString())
    .include('Memberships__r')
      .select(schoolMembershipFields.toString())
      .end()
    .include('School_alumni_event__r')
      .select(schoolEventFields.toString())
      .end()
    .execute((err, res) => {
      console.log(err);
      console.log('================== Schools ==================');
      console.log(res);
      console.log('================== /Schools ==================');
    });

  return output;
};

const getCustomQuestions = () => {
  const output = conn.sobject('School_custom_question__c')
    .select(customQuestionsFields.toString())
    .include('School_custom_question_option__r')
      .select(customQuestionsOptionFields.toString())
      .end()
    .execute((err, res) => {
      console.log(err);
      console.log('================== CustomQuestions ==================');
      console.log(res);
      console.log('================== /CustomQuestions ==================');
    });

  return output;
};

const getEvents = () => {
  const output = conn.sobject('Alumni_event__c')
    .select(eventsFields.toString())
    .include('Alumni_event_alumnus__r')
      .select(eventAlumnusFields.toString())
      .end()
    .include('School_alumni_event__r')
      .select(eventSchoolFields.toString())
      .end()
    .execute((err, res) => {
      console.log(err);
      console.log('================== Events ==================');
      console.log(res);
      console.log('================== /Events ==================');
    });

  return output;
};

const getUsers = () => {
  const output = conn.sobject('Platform_user__c')
    .select(userFields.toString())
    .include('User_school__r')
      .select(userSchoolFields.toString())
      .end()
    .execute((err, res) => {
      console.log(err);
      console.log('================== Users ==================');
      console.log(res);
      console.log('================== /Users ==================');
    });

  return output;
};

const getTeachers = () => {
  const output = conn.sobject('User_school_staff__c')
    .select(teacherFields.toString())
    .include('Platform_user__r')
      .select(teacherUserFields.toString())
      .end()
    .execute((err, res) => {
      console.log(err);
      console.log('================== Teachers ==================');
      console.log(res);
      console.log('================== /Teachers ==================');
    });

  return output;
};

const getAlumni = () => {
  const output = conn.sobject('User_alumnus__c')
    .select(alumniFields.toString())
    .include('Platform_user__r')
      .select(alumniUserFields.toString())
      .end()
    .include('Alumnus_note__r')
      .select(alumniNoteFields.toString())
      .end()
    .include('Alumnus_custom_answers__r')
      .select(alumniAnswersFields.toString())
      .end()
    .include('Alumnus_employment__r')
      .select(alumniEmployementFields.toString())
      .end()
    .include('Alumnus_education__r')
      .select(alumniEducationFields.toString())
      .end()
    .execute((err, res) => {
      console.log(err);
      console.log('================== Alumni ==================');
      console.log(res);
      console.log('================== /Alumni ==================');
    });

  return output;
};

getUsers();
getEvents();
getAlumni();
getSchools();
getTeachers();
getCustomQuestions();
