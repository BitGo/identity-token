import * as t from 'io-ts';
import * as jose from 'jose';
import { nonEmptyArray } from 'io-ts-types';

export type GetKeyFunction = ReturnType<typeof jose.createRemoteJWKSet>;

export const IdentityJWTPayload = t.type({
  /** Client id registered in the identity service. */
  azp: t.string,

  /** Added to token payload via the bitgo-info token scope
   * which maps the users bitgo id as an user attribute.
   */
  bitgo_id: t.string,

  /** Added to token payload via the bitgo-info token scope
   * which maps the users enterprises as an user attribute.
   */
  enterprises: nonEmptyArray(t.string),

  /** Space seperated list of default and optional token scopes.
   * e.g. 'openid bitgo-info wallet-view-all'
   */
  scope: t.string,

  /**
   * Added to token payload via the 'web-origins' token scope.
   * Client applications must provide valid web origins to
   * prevent tokens being used outside of the their app.
   */
  'allowed-origins': t.array(t.string),

  /**
   * JWT Expiration Time
   *
   * @see [RFC7519#section-4.1.4](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.4)
   */
  exp: t.number,

  /**
   * JWT Issued At
   *
   * @see [RFC7519#section-4.1.6](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.6)
   */
  iat: t.number,

  /**
   * JWT ID
   *
   * @see [RFC7519#section-4.1.7](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.7)
   */
  jti: t.string,
});

export type IdentityJWTPayload = t.TypeOf<typeof IdentityJWTPayload>;

export type LegacyAccessToken = {
  id: string;
  client: string;
  user: string;
  scope: string[];
  created: Date;
  expires: Date;
  origin: string;
  label: string;
  isExtensible: boolean;
  token: string;
};
