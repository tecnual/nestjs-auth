/**
 * Default Error Response
 */
export class AuthErrorResponse {
    /** Error code */
    code: string;
    /** Error description */
    message: string;

    /**
     * constructor
     * @param code Error code
     * @param message Error description
     */
    constructor(code, message) {
        code? this.code = code: null;
        message? this.message = message: null;
    }
}