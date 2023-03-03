import type { AccessTokenResponse } from '@bitgo-private/wallet-platform-types';
import type { IdentityJWTPayload } from './types';

export class IdentityToken {
  public readonly payload: IdentityJWTPayload;
  private readonly token: string;

  constructor(token: string, payload: IdentityJWTPayload) {
    this.payload = payload;
    this.token = token;
  }

  /**
   * Maps the OIDC jwt from the identity service to BitGo's access token
   * format.
   *
   * @param originToUse - the web origin to select when jwt contains more than
   * one allowed web origin
   */
  public mapToLegacy(originToUse?: string): AccessTokenResponse {
    return {
      id: this.payload.jti || '',
      client: this.payload.azp,
      user: this.payload.bitgo_id,
      scope: this.payload.scope.split(' '),
      created: this.parseEpoch(this.payload.iat),
      expires: this.parseEpoch(this.payload.exp),
      origin: this._extractWebOrigin(
        this.payload['allowed-origins'],
        originToUse
      ),
      label: 'identity-session',
      isExtensible: false,
      token: this.token,
    };
  }

  public _extractWebOrigin(
    allowedOrigins: string[],
    originToUse?: string
  ): string {
    let origin: string | undefined;

    if (originToUse && allowedOrigins.length > 1) {
      origin = allowedOrigins.find((origin) => origin.includes(originToUse));
    } else {
      origin = allowedOrigins[0];
    }
    return origin ? this.cleanOrigin(origin) : '';
  }

  private parseEpoch(seconds: number): Date {
    return new Date(seconds * 1000);
  }

  private cleanOrigin(origin: string): string {
    // format origin to expected format
    // https://github.com/BitGo/bitgo-microservices/blob/develop/packages/wallet-platform/app/controllers/api/auth.js#L431
    let formattedOrigin = origin.includes('://')
      ? origin.split('://')[1]
      : origin; // peel off protocol
    formattedOrigin = formattedOrigin.includes(':')
      ? formattedOrigin.split(':')[0]
      : formattedOrigin; // peel off any included port.
    return formattedOrigin;
  }
}
