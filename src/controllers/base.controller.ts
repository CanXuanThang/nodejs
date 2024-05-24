import ResponseService from "../services/response.service";

export default class BaseController {
  public resResponse: ResponseService;

  constructor() {
    this.resResponse = new ResponseService();
  }
}
