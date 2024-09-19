// hash password

import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

// validation

// Email regex
export function validateEmail(string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(string);
  }
export function errorCodes(e){
  if(e instanceof PrismaClientInitializationError){
    return 'Connection to Database is lost'
  }
  if(e instanceof PrismaClientKnownRequestError){
    return `This ${e.meta.target[0]} already Exists `
  }
  if (e instanceof PrismaClientValidationError){
    return `Schema Validation Failed`
  }
  else
  return e.message
}
 