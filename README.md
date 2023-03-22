# Identity Token

Validates and decodes access tokens issued by Sign in with BitGo

## Installation

```bash
npm install @bitgo/identity-token
```

## Usage

### Decoding JWT

Decode a JWT payload synchronously and validate its schema. If schema does not
much, an error is thrown.

> Signature is not verified when decoding, this is useful in client applications since network calls are not made.

```typescript
import { decodeIdentityToken } from "@bitgo/identity-token";

const identityToken = decodeIdentityToken(bearerToken);

if (identityToken.isExpired()) {
  throw new Error("Token is expired");
}

// shortcut properties
identityToken.userId;
identityToken.enterprises;

// entire jwt payload is also available
identityToken.payload;
```

### Verifying JWT

Verify a JWT signature was signed by BitGo and decode the JWT payload if verified.

> Backend services needing authorization should use this method.

```typescript
import {
  getIdentityJWKSetFunction,
  verifyIdentityToken,
} from "@bitgo/identity-token";

// fetches public certs from BitGo to verify signature when invoked
const identityJWKSetFunction = getIdentityJWKSetFunction();
let identityToken;
try {
  identityToken = await verifyIdentityToken(
    bearerToken,
    identityJWKSetFunction
  );
} catch (error) {
  // token is either expired, failed to decode, or signature does not match
  throw error;
}

// Example Usage
if (!identityToken.isOriginAllowed(req.header.origin)) {
  throw new Error("Request origin is not allowed");
}

if (!identityToken.hasScope("required_scope")) {
  throw new Error("Token does not contain required scope");
}
```


