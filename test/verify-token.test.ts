import { assert } from 'chai';

import { nockGetJWKSetCall, nockGetJWKSetCallFailure } from './utils';

import { getIdentityJWKSetFunction, verifyIdentityToken } from '../src';

describe('Verify Identity Token', () => {
  it('should return an identity token given a valid jwt from the identity service', async () => {
    const bearerToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1dTJqaHZQMGkyeU80a0lFUG96ejU5TW40RG4yR0VTc1hqTHg1Z2QxQmp3In0.eyJleHAiOjE4NTIyMjA2OTUsImlhdCI6MTY3OTQyMDY5NSwianRpIjoiYTZlMTJhNzktM2QyZC00Mzc2LWE3MTAtYWVlZDQxMjkyN2RhIiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5iaXRnby1kZXYuY29tL3JlYWxtcy9iaXRnbyIsInN1YiI6ImY6MTI2NmVjZjctZDM2Yi00NjRhLTk4YmYtZDgwY2YxNGFmYjQ4OmV4cGVyaWVuY2UrdGVzdC1hZG1pbitkby1ub3QtZGVsZXRlQGJpdGdvLmNvbSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNvbS5iaXRnby5jbGkiLCJzZXNzaW9uX3N0YXRlIjoiNjRmOThiMTQtMTM5Zi00ZmRjLWEyYzItZGJkN2QzZjljZjAyIiwiYWxsb3dlZC1vcmlnaW5zIjpbImNocm9tZS1leHRlbnNpb246Ly9rcGNvamhnZGhuam1tZWdoaWJscGplaWNia29lbGJtZiIsImh0dHA6Ly9sb2NhbGhvc3QiXSwic2NvcGUiOiJ1c2VyX21hbmFnZSB3YWxsZXRfc3BlbmRfYWxsIGJpdGdvLWluZm8gcHJvZmlsZSB3YWxsZXRfdmlld19hbGwgd2FsbGV0X2NyZWF0ZSIsInNpZCI6IjY0Zjk4YjE0LTEzOWYtNGZkYy1hMmMyLWRiZDdkM2Y5Y2YwMiIsImJpdGdvX2lkIjoiNWNhZTMxMzBmOGY0NTYxZDUxZGZjYmZkYWFmYmE5YjkiLCJuYW1lIjoiZXhwZXJpZW5jZSt0ZXN0LWFkbWluK2RvLW5vdC1kZWxldGUgYWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJleHBlcmllbmNlK3Rlc3QtYWRtaW4rZG8tbm90LWRlbGV0ZUBiaXRnby5jb20iLCJnaXZlbl9uYW1lIjoiZXhwZXJpZW5jZSt0ZXN0LWFkbWluK2RvLW5vdC1kZWxldGUiLCJmYW1pbHlfbmFtZSI6ImFkbWluIiwiZW50ZXJwcmlzZXMiOlsiNWNhZTMxMzFmOGY0NTYxZDUxZGZjYzAwMTY2ODdiOTYiLCI1Y2FiZTNlOGExYjU2OTIzNTFjMzZmYzQ5ZmZkZDY4MCIsIjVjY2EwYzgxZTdlYTRhMzcwNWJlYjE3NDViNmEwNDJiIiwiNjFkZjNkZWUwMDA0NTgwMDA3M2QxMmU4NDRkYTk3ZGEiXX0.BjgEc9Ou1j0A4X-78l_SkBnGUbIzPmh5j0_777olZqjcTnmNSaOqp3bhfqBVnNhcf4DedaGEDwE5D0O3FzfgO-r0MUekwmr_hEvLkctOGM9CfQEEW1e_JTtX8csG7-JdQYy_iIcv81zd6gHgscsvUCI0fFQNlrknFRNCwiU5lqEkIBBAxobuM6H37mREVFudn6vtWwhPVSb4ZHPgRPDXUM-16rfywBGIWBlZnBZKTp1pI0_yuWiHDdL1lrDz7j7IBsDncKPkT4wwjI-jgoZM5uxY9gfBiY6zbIdPk9r2zj75vqm9maz0cA4_PCln4L90XQc4TnOlteffGcd6eToeEw';

    nockGetJWKSetCall();

    const identityJWKSetFunction = getIdentityJWKSetFunction();
    const identityToken = await verifyIdentityToken(
      bearerToken,
      identityJWKSetFunction
    );

    assert.isDefined(identityToken);
    assert.isNotEmpty(identityToken?.payload);
  });

  it('should not return an identity token when unable to fetch JWKS', async () => {
    const bearerToken =
      'v2x0b75a97dd8caf93b94c0739c8f66478f841217f4ddad7a3cf2e68d2e6a8c5805';
    nockGetJWKSetCallFailure();

    const identityJWKSetFunction = getIdentityJWKSetFunction();

    try {
      await verifyIdentityToken(bearerToken, identityJWKSetFunction);
      assert.fail();
    } catch (err) {}
  });

  it('should not return an identity token when unable to fetch JWKS', async () => {
    const bearerToken =
      'v2x0b75a97dd8caf93b94c0739c8f66478f841217f4ddad7a3cf2e68d2e6a8c5805';
    nockGetJWKSetCallFailure();

    const identityJWKSetFunction = getIdentityJWKSetFunction();

    try {
      await verifyIdentityToken(bearerToken, identityJWKSetFunction);
      assert.fail();
    } catch (err) {}
  });
});
