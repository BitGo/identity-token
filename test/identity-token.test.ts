import { assert } from 'chai';

import { nockGetJWKSetCall } from './utils';

import {
  getIdentityJWKSetFunction,
  IdentityToken,
  verifyIdentityToken,
} from '../src';

describe('Identity Token', () => {
  let identityToken: IdentityToken;

  before(async () => {
    // Expires Wed Aug 9th 2028
    const bearerToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1dTJqaHZQMGkyeU80a0lFUG96ejU5TW40RG4yR0VTc1hqTHg1Z2QxQmp3In0.eyJleHAiOjE4NDk0NDM5MTQsImlhdCI6MTY3NjY0MzkxNCwianRpIjoiOGNiNWNjMTktNGIyNi00MzY5LTk0MmYtNTg4NzhhYjA1YTYzIiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5iaXRnby1kZXYuY29tL3JlYWxtcy9iaXRnbyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmOjEyNjZlY2Y3LWQzNmItNDY0YS05OGJmLWQ4MGNmMTRhZmI0ODpleHBlcmllbmNlK3Rlc3QtYWRtaW4rZG8tbm90LWRlbGV0ZUBiaXRnby5jb20iLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjb20uYml0Z28uY2xpIiwic2Vzc2lvbl9zdGF0ZSI6ImE5ZDc4OTY4LTY0ODMtNGM2Ni05NWNiLWQ3YzM3MDcyYjc1MCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiY2hyb21lLWV4dGVuc2lvbjovL2twY29qaGdkaG5qbW1lZ2hpYmxwamVpY2Jrb2VsYm1mIiwiaHR0cDovL2xvY2FsaG9zdCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiYml0Z28taW5mbyB3YWxsZXRfc3BlbmQgZW1haWwgcHJvZmlsZSB3YWxsZXRfdmlldyB3YWxsZXRfY3JlYXRlIiwic2lkIjoiYTlkNzg5NjgtNjQ4My00YzY2LTk1Y2ItZDdjMzcwNzJiNzUwIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImJpdGdvX2lkIjoiNWNhZTMxMzBmOGY0NTYxZDUxZGZjYmZkYWFmYmE5YjkiLCJuYW1lIjoiZXhwZXJpZW5jZSt0ZXN0LWFkbWluK2RvLW5vdC1kZWxldGUgYWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJleHBlcmllbmNlK3Rlc3QtYWRtaW4rZG8tbm90LWRlbGV0ZUBiaXRnby5jb20iLCJnaXZlbl9uYW1lIjoiZXhwZXJpZW5jZSt0ZXN0LWFkbWluK2RvLW5vdC1kZWxldGUiLCJmYW1pbHlfbmFtZSI6ImFkbWluIiwiZW1haWwiOiJleHBlcmllbmNlK3Rlc3QtYWRtaW4rZG8tbm90LWRlbGV0ZUBiaXRnby5jb20ifQ.Oq_txq17ApirE6-o_RRBhjhvJmGW6NAa6G9Km7WpxQoJV0-8yN1ddSnQ5W3UljM4ArsQwwitG9NvTKxm1YuwZ-e7vzcOmtnmMbsC_DKGO3PyatG4ndQmAHw4XAw9eYKf8lVl_Mk_mJf45mbOOJ_zXM8SKBruHPJa1LqJxeMrWmuZKssPvuvB76UnqPNmdx0F-iiQE9Rs7_7y3OKFtaBrSG8K6euzx3AY8P7wkK-z6Wlfelz5hh9AAZ81tjlNwii5ZEUAMygxjPQWp9VD9wo4D7LEM51Ad4y4-vUQmZHAXyGPphQHcODNgQxJa_Uly_tOQGtdqRdodldwFZcGOxQX3Q';

    nockGetJWKSetCall();

    const identityJWKSetFunction = getIdentityJWKSetFunction();
    identityToken = await verifyIdentityToken(
      bearerToken,
      identityJWKSetFunction
    );
  });

  it('should map to legacy access token using default web origin', async () => {
    const accessToken = identityToken.mapToLegacy();

    assert.equal(accessToken.client, 'com.bitgo.cli');
    assert.equal(accessToken.user, '5cae3130f8f4561d51dfcbfdaafba9b9');
    assert.equal(accessToken.label, 'identity-session');

    // harbor dev extension
    assert.equal(accessToken.origin, 'kpcojhgdhnjmmeghiblpjeicbkoelbmf');
  });

  it('should map to legacy access token using selected web origin', async () => {
    const accessToken = identityToken.mapToLegacy('http://localhost');

    assert.equal(accessToken.client, 'com.bitgo.cli');
    assert.equal(accessToken.user, '5cae3130f8f4561d51dfcbfdaafba9b9');
    assert.equal(accessToken.label, 'identity-session');

    // harbor dev extension
    assert.equal(accessToken.origin, 'localhost');
  });

  it('should extract domain from url with port and protocol', async () => {
    const origin = identityToken._extractWebOrigin(['http://localhost:3000']);
    assert.equal(origin, 'localhost');
  });

  it('should extract domain from url without port or protocol', async () => {
    const origin = identityToken._extractWebOrigin(['localhost']);
    assert.equal(origin, 'localhost');
  });

  it('should not extract domain given no allowed origins', async () => {
    const origin = identityToken._extractWebOrigin([]);
    assert.equal(origin, '');
  });
});
