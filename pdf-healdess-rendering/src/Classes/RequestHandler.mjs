import ErrorWrapper from './ErrorWrapper';

import Config from '../Config';

class RequestHandler{

  static handle(callback, req, res){

      callback(req, res)
        .catch(RequestHandler.handleError.bind(this, res))

  }

  static handleWithSecret(callback, req, res){

    if(req.headers['x-access-secret'] !== Config.appSecret){

      console.log(`Given secret '${req.headers['x-access-secret']}' does not match.`)

      RequestHandler.handleError(res, new ErrorWrapper(ErrorWrapper.noAccess));
      return;

    }

    RequestHandler.handle(callback, req, res);

  }

  static handleError(res, e){

    ErrorWrapper.handleError(e)
      .then((error) => {

        res.setHeader('Content-Type', 'application/json');
        res.status(error.getHttpStatusCode()).send(error.toJson());

      })

  }

}

export default RequestHandler;