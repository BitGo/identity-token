import type { IdentityJWTPayload, LegacyAccessToken } from './types';

export class IdentityToken {
  public readonly userId: string;
  public readonly enterprises: string[];
  public readonly scopes: string[];
  public readonly payload: IdentityJWTPayload;
  private readonly token: string;

  constructor(token: string, payload: IdentityJWTPayload) {
    this.payload = payload;
    this.token = token;
    this.userId = payload.bitgo_id;
    this.enterprises = payload.enterprises;
    this.scopes = this.payload.scope.split(' ');
  }

  /**
   * Determines if the token has expired.
   * @returns boolean
   */
  public isExpired() {
    return new Date() >= this.parseEpoch(this.payload.exp);
  }

  /**
   * Determines if the given request origin is registered with
   * the requesting client.
   *
   * @param requestOrigin
   * @returns boolean
   */
  public isOriginAllowed(requestOrigin: string) {
    const _origin = this.cleanOrigin(requestOrigin);
    return this.payload['allowed-origins'].find((origin) =>
      origin.includes(_origin)
    )
      ? true
      : false;
  }

  /**
   * Determines if the identity token contains a given scope
   *
   * @param scope
   * @returns boolean
   */
  public hasScope(scope: string) {
    return this.scopes.includes(scope);
  }

  /**
   * Maps the OIDC jwt from the identity service to BitGo's access token
   * format.
   *
   * @param originToUse - the web origin to select when jwt contains more than
   * one allowed web origin
   */
  public mapToLegacy(originToUse?: string): LegacyAccessToken {
    return {
      id: this.payload.jti || '',
      client: this.payload.azp,
      user: this.payload.bitgo_id,
      scope: this.scopes,
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
      // extract the domain from the requested origin
      const cleanOrigin = this.cleanOrigin(originToUse);
      origin = allowedOrigins.find((origin) => origin.includes(cleanOrigin));
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
