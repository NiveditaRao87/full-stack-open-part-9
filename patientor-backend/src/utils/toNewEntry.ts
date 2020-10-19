/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NewEntry, 
  HealthCheckRating,
  EntryType } from '../types';
  import diagnoses from '../../data/diagnoses';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }
  return specialist;
}; 

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }
  return description;
}; 

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(`Incorrect or missing employer name: ${employerName}`);
  }
  return employerName;
}; 

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date of entry:  ${date}`);
  }
  return date;
};

const isType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const parseType = (type: any): EntryType => {
  if (!type || !isType(type)) {
    throw new Error(`Incorrect or missing type: ${type}`);
  }
  return type;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  const typeNumber = Number(param);
  return Object.values(HealthCheckRating).includes(typeNumber);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if ((!healthCheckRating && healthCheckRating !== 0) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Incorrect or missing health check rating: ${healthCheckRating}`);
  }
  return Number(healthCheckRating); //Dirty fix for radio button accepting only string error, look into it later
};

const parseDiagnosesCodes = (diagnosesCodes: any): string[] | undefined => {
  if(!diagnosesCodes){
    return undefined;
  }
  if(!Array.isArray(diagnosesCodes)
    || diagnosesCodes.find((code: any) => !isString(code))
    || diagnosesCodes.find((code: string) => !diagnoses.find(d => d.code === code))){
    throw new Error(`Incorrect diagnoses codes: ${diagnosesCodes}`);
  }

  return diagnosesCodes;
    
};

const parseDischarge = (discharge: any): {date: string, criteria: string} => {
  if(!discharge
    || !(typeof discharge === 'object')
    || !Object.prototype.hasOwnProperty.call(discharge, "date")
    || !Object.prototype.hasOwnProperty.call(discharge, "criteria")
    || !isDate(discharge.date)
    || !isString(discharge.criteria)){
      throw new Error(`Incorrect or missing discharge info: ${discharge}`);
    }
    return {date: discharge.date, criteria: discharge.criteria};
};

const parseSickLeave = (sickLeave: any): {startDate: string, endDate: string} | undefined => {
  if(!sickLeave){
    return undefined;
  }
  if(!(typeof sickLeave === 'object')
  || !Object.prototype.hasOwnProperty.call(sickLeave, "startDate")
  || !Object.prototype.hasOwnProperty.call(sickLeave, "endDate")
  || !isDate(sickLeave.startDate)
  || !isDate(sickLeave.endDate)){
    throw new Error(`Incorrect sickLeave ${sickLeave}`);
  }
  return {startDate: sickLeave.startDate, endDate: sickLeave.endDate};
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewEntry = (object: any): 
  NewEntry => {
  
  const type = parseType(object.type);
  const diagnosesCodes = parseDiagnosesCodes(object.diagnosesCodes);
  const baseDetails = {
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    description: parseDescription(object.description),
  };
  diagnosesCodes && Object.assign(baseDetails,{diagnosesCodes});
  switch (type) {
    case EntryType.Hospital:
      return {
        ...baseDetails,
        discharge: parseDischarge(object.discharge),
        type: EntryType.Hospital
      };
    case EntryType.HealthCheck:
      return {
        ...baseDetails,
        type: EntryType.HealthCheck,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    case EntryType.OccupationalHealthcare:
      const sickLeave = parseSickLeave(object.sickLeave);
      sickLeave && Object.assign(baseDetails,{ sickLeave });
      return {
        ...baseDetails,
        type: EntryType.OccupationalHealthcare,
        employerName: parseEmployerName(object.employerName)
      };
    default:
      throw new Error(`Invalid type ${type}`);
  }
};

export default toNewEntry;
  