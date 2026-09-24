<!-- For each scenario below, write the HTTP status code you'd return and a one-sentence explanation:

1. User successfully logged in
2. User tried to access a page without being logged in
3. User is logged in but tried to access another user's private data
4. User requested a blog post that doesn't exist
5. User successfully created a new task
6. User sent a POST request with invalid JSON
7. User deleted a task successfully (no data to return)
8. Database is down and the server can't handle the request
9. User exceeded the rate limit
10. User requested data and got it successfully -->

1. 200 OK: The login succeeded and the response carries the result, usually a token or session info.
2. 401 Unauthorized: The request has no valid credentials, so the server doesn't know who the user is. Despite the name, 401 means unauthenticated.
3. 403 Forbidden: The server knows who the user is, but they don't have permission for that resource. Some APIs return 404 instead so they don't reveal that the resource exists.
4. 404 Not Found: No blog post exists at that identifier.
5. 201 Created: A new resource was created, ideally with a Location header or the created task in the body.
6. 400 Bad Request: The request body is malformed and can't be parsed. 422 Unprocessable Entity is for JSON that parses fine but fails validation.
7. 204 No Content: The deletion succeeded and there's intentionally no response body.
8. 503 Service Unavailable: A dependency is down, so the server can't handle requests right now. It can include a Retry-After header. A generic 500 is also common if the failure wasn't anticipated.
9. 429 Too Many Requests: The client exceeded the allowed request rate, usually with Retry-After telling them when to try again.
10. 200 OK: The request succeeded and the requested data is in the response body.