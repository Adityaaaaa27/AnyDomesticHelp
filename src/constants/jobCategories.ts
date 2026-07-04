export interface JobCategory {
  label: string;
  value: string;
}

export const JOB_CATEGORIES: JobCategory[] = [
  { label: '-- Job Required --', value: '' },
  { label: 'Housemaid',          value: 'Housemaid' },
  { label: 'Cook',               value: 'Cook' },
  { label: 'Office Boy',         value: 'OfficeBoy' },
  { label: 'Helper',             value: 'Helper' },
  { label: 'Nanny',              value: 'Nanny' },
  { label: 'Japa',               value: 'Japa' },
  { label: 'Driver',             value: 'Driver' },
  { label: 'Elderly Care',       value: 'ElderlyCare' },
  { label: 'Patient Care',       value: 'PatientCare' },
  { label: 'Cook Helper',        value: 'CookHelper' },
  { label: 'Home Tuition',       value: 'HomeTuition' },
  { label: 'Restaurant Cook',    value: 'Staff_Restaurant' },
];
