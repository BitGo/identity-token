import * as jose from 'jose';

import { isRight } from 'fp-ts/Either';
import { URL } from 'url';

import { IdentityToken } from './token';
import { GetKeyFunction, IdentityJWTPayload } from './types';

/**
 * Returns a client function that fetches the JWS from the identity service.
 * JWKS are cached to avoid slowing down the identity service server.
 *
 * @param baseUrl - identity-service host name (default: internal cluster dns)
 * @param options - options to set on the JWKS client
 */
export const getIdentityJWKSetFunction = (
  baseUrl?: string,
  options?: jose.RemoteJWKSetOptions
): GetKeyFunction => {
  const url = baseUrl || 'https://identity.bitgo.com';
  return jose.createRemoteJWKSet(
    new URL(`${url}/realms/bitgo/protocol/openid-connect/certs`),
    options
  );
};

/**
 * Verifies the signature of the JWT against the identity service JWS.
 *
 * The verification process checks the tokens signature, session status
 * and expiration.
 *
 * @param jwt the bearer token
 * @param jwks the jws get function to verify jwt signature
 */
export const verifyIdentityToken = async (jwt: string, jws: GetKeyFunction) => {
  const { payload } = await jose.jwtVerify(jwt, jws);
  const decodedPayload = IdentityJWTPayload.decode(payload);
  if (isRight(decodedPayload)) {
    return new IdentityToken(jwt, decodedPayload.right);
  }
  throw decodedPayload.left;
};
