import {ClientAppError, ValidationError} from "./errors";
import {labCountries, robotComponents} from "../../const";

export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {

  public static againstNullOrUndefined(argument: any, argumentName: string) {
    if (argument === null || argument === undefined)
      throw new ValidationError(argumentName + ' is null or undefined');
  }

  public static againstNullOrUndefinedBulk(args: GuardArgumentCollection) {
    for (let arg of args)
      this.againstNullOrUndefined(arg.argument, arg.argumentName);
  }

  public static isOneOf(value: any, validValues: any[], argumentName: string) {
    let isValid = false;
    for (let validValue of validValues)
      if (value === validValue) {
        isValid = true;
        break;
      }

    if (!isValid)
      throw new ValidationError(argumentName + ' isn\'t oneOf the correct types in '
        + JSON.stringify(validValues) + '. Got "' + value + '".');
  }

  public static inRange(num: number, min: number, max: number, argumentName: string) {
    const isInRange = num >= min && num <= max;
    if (!isInRange)
      throw new ValidationError(`${argumentName} is not within range ${min} to ${max}.`);
  }

  public static isInteger(n: number, argumentName: string) {
    if (Number.isNaN(n) || !Number.isInteger(n))
      throw new ValidationError(argumentName + ' is not an integer.');
  }

  public static allInRange(numbers: number[], min: number, max: number, argumentName: string) {
    for (let num of numbers)
      this.inRange(num, min, max, argumentName);
  }

  public static isEmail(str: string) {
    this.matchRegex(str, /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/,
      new ValidationError(`${str} is an invalid e-mail`));
  }

  static sha256hash(str: string, argName: string) {
    this.matchRegex(str, /^[A-Fa-f\d]{64}$/,
      new ClientAppError(`Client sent an invalid SHA-256 hash for ${argName}.`));
  }

  static matchRegex(str: string, regex: RegExp, e: Error) {
    if (!regex.test(str)) throw e;
  }

  static isSupportedCountry(country: string): void {
    if (!labCountries.includes(country))
      throw new ValidationError(`The country "${country}" is not on the supported list of countries.`);
  }

  static isSupportedRobotComponent(component: string): void {
    if (!robotComponents.includes(component))
      throw new ValidationError(`The component "${component}" is not on the supported list of components.`);
  }

  static isSupportedRobotComponentList(components: string[]): void {
    components.forEach(component => this.isSupportedRobotComponent(component));
  }

}