# JWT handling

## The access token

In some requests made to the API, an access token must be sent as a header in order to authorize resource usage.

It will be a JsonWebToken, created on log-in. This means that on log-in, a JSON object - unique to the user - will be encrypted using the ACCESS_TOKEN_SECRET environment variable string. The encrypted JSON object will have this format:

```typescript
interface IUserHiddenPwd {
  domainId: string,
  email: string
}
```

This object defines a user without exposing his/her password.

Upon receiving a request, the server-side will decrypt the JWT using the ACCESS_TOKEN_SECRET string and verify authorization.

## The refresh token

On log-in, the client-side gets an access token (and stores it in memory), but most importantly a refresh token (and stores it in a cookie).

Just like the access token, the refresh token is unique for each user. Its JSON format is the same as the former's, but the secret encryption string is different - defined in the REFRESH_TOKEN_SECRET environment variable.

The refresh token is going to allow the client-side not to have the need to store the access token - neither in local storage nor in a cookie, which avoids cross-site scripting attacks (which use the locally-stored access tokens) and cross-site request forgery (which use the cookie-stored access tokens). The client-side is going to store the access token in a local variable (RAM), which is unreachable for attackers, but this means it's going to be lost between page reloads.

After a page reload, a logged-in user will still be holding the refresh token in the cookie. Knowing it doesn't have an access token, the client-side will make a specific request to the server-side API with the refresh token, in order to get the access token, which will be used for all other requests.

With this approach, attackers that want the client's access token for forging requests aren't able to access it directly, and are instead forced to make a request to the API and read the response.