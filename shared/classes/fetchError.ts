export class FetchError extends Error {
  private _status: number;
  private _msgError: string;
  private _clientMsg: string;
  private _origin?: Error;

  constructor(
    status: number,
    msgError: string,
    clientMsg: string,
    origin?: Error
  ) {
    super(msgError);
    this._status = status;
    this._msgError = msgError;
    this._clientMsg = clientMsg;
    this._origin = origin;
  }

  get data() {
    return {
      status: this._status,
      msgError: this._msgError,
      clientMsg: this._clientMsg,
      origin: this._origin,
    }
  }
}