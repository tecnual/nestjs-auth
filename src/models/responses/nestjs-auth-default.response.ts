import { AuthErrorResponse } from './auth-error.response';
/**
 * Default response
 */
export class NestjsAuthDefaultResponse<T> {
  /** Data object */
  data: T;

  /** Number of total elements in data object */
  total: number;
  /** Errors */
  errors: AuthErrorResponse[];

  /**
   * Constructor
   * @param data Data object
   * @param total Number of total elements in data object
   * @param errors Errors
   */
  public constructor(data: T, total?: number, errors?: AuthErrorResponse[]) 
  {
    data ? this.data = data : null;
    total ? this.total = total : null;
    errors ? this.errors = errors : (this.errors = []);
  }
}
