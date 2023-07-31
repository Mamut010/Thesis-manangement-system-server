/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */

/**
 * HTTP response status codes indicate whether a specific HTTP request has been successfully completed. 
 * Responses are grouped in five classes:

   Informational responses (100 – 199)

   Successful responses (200 – 299)

   Redirection messages (300 – 399)

   Client error responses (400 – 499)

   Server error responses (500 – 599)
*/
export const HTTP_CODES = {
   /**
    * The request succeeded. The result meaning of "success" depends on the HTTP method:

      GET: The resource has been fetched and transmitted in the message body.

      HEAD: The representation headers are included in the response without any message body.

      PUT or POST: The resource describing the result of the action is transmitted in the message body.

      TRACE: The message body contains the request message as received by the server.
   */
   Ok: 200,

   /**
    * The request succeeded, and a new resource was created as a result. 
    * This is typically the response sent after POST requests, or some PUT requests.
    */
   Created: 201,

   /**
    * The request has been received but not yet acted upon. 
    * It is noncommittal, since there is no way in HTTP to later send an asynchronous response indicating the outcome of the request. 
    * It is intended for cases where another process or server handles the request, or for batch processing.
    */
   Accepted: 202,

   /**
    * There is no content to send for this request, but the headers may be useful. 
    * The user agent may update its cached headers for this resource with the new ones.
    */
   NoContent: 204,

   /**
    * The server cannot or will not process the request due to something that is perceived to be a client error 
    * (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
    */
   BadRequest: 400,

   /**
    * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". 
    * That is, the client must authenticate itself to get the requested response.
    */
   Unauthorized: 401,

   /**
    * The client does not have access rights to the content; 
    * that is, it is unauthorized, so the server is refusing to give the requested resource. 
    * Unlike 401 Unauthorized, the client's identity is known to the server.
    */
   Forbidden: 403,

   /**
    * The server cannot find the requested resource. In the browser, this means the URL is not recognized. 
    * In an API, this can also mean that the endpoint is valid but the resource itself does not exist. 
    * Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. 
    * This response code is probably the most well known due to its frequent occurrence on the web.
    */
   NotFound: 404,

   /**
    * This response is sent when a request conflicts with the current state of the server.
    */
   Conflict: 409,

   /**
    * The server has encountered a situation it does not know how to handle.
    */
   InternalServerError: 500,
} as const;