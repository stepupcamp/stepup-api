import BaseException from "./BaseException";

export default class CredentialException extends BaseException {
  constructor(message = `Credentials not found.`) {
    super(message, 403, "E_CREDENTIALS_NOT_FOUND");
  }
}
