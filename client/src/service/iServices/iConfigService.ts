import {AxiosCallbacks} from "../userService";

export default interface IConfigService {
  /**
   * All countries that can be selected for adding a Lab.
   */
  getLabSupportedCountries(callbacks?: AxiosCallbacks<string[]>): void;

  /**
   * All components that are currently supported by robot labs.
   */
  getRobotSupportedComponents(callbacks?: AxiosCallbacks<string[]>): void;

  /**
   * All countries that currently have Labs.
   */
  getLabCountries(callbacks?: AxiosCallbacks<string[]>): void;
}