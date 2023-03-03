import nock from 'nock';

export const nockGetJWKSetCall = () => {
  // JWS keys are from identity.bitgo-dev.com
  nock(
    'http://identity-service-keycloakx-http.identity-service.svc.cluster.local'
  )
    .get('/realms/bitgo/protocol/openid-connect/certs')
    .reply(200, {
      keys: [
        {
          kid: '5u2jhvP0i2yO4kIEPozz59Mn4Dn2GESsXjLx5gd1Bjw',
          kty: 'RSA',
          alg: 'RS256',
          use: 'sig',
          n: 'qEBbDF42GiwGLUjvyXPCDnhsa7BVAOyyLiN8HG8P5WBHiiahByQIOQotYqS-OmC3lHAV7NCej3h47Nc6nUEwVyFOLsVj6U37lRNyX5KactPG4cPZ3_L4l4zRfX9pAB3bLgY-UoA7Rc9RjIKmGwqEX3_2KThlPjAGTbYUzd2yEIiGL7WKz28iGT0m46PmkzItbOFlMgMbH81HBI64ZMNSYVHCa-14VBXFkNtH8RYgSGd-3yBwQQjLgnAXYQoPbPSKAo_CsPO8MIYOFAaQScSLsy6hJK22kcuADX2k-BrA-1CDFQfUQeknGm9X9A8QaqmJBJUEOamS1RUs7OxYvSWtgQ',
          e: 'AQAB',
          x5c: [
            'MIICmTCCAYECBgGFxtjmUDANBgkqhkiG9w0BAQsFADAQMQ4wDAYDVQQDDAViaXRnbzAeFw0yMzAxMTgyMTQ0NDFaFw0zMzAxMTgyMTQ2MjFaMBAxDjAMBgNVBAMMBWJpdGdvMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqEBbDF42GiwGLUjvyXPCDnhsa7BVAOyyLiN8HG8P5WBHiiahByQIOQotYqS+OmC3lHAV7NCej3h47Nc6nUEwVyFOLsVj6U37lRNyX5KactPG4cPZ3/L4l4zRfX9pAB3bLgY+UoA7Rc9RjIKmGwqEX3/2KThlPjAGTbYUzd2yEIiGL7WKz28iGT0m46PmkzItbOFlMgMbH81HBI64ZMNSYVHCa+14VBXFkNtH8RYgSGd+3yBwQQjLgnAXYQoPbPSKAo/CsPO8MIYOFAaQScSLsy6hJK22kcuADX2k+BrA+1CDFQfUQeknGm9X9A8QaqmJBJUEOamS1RUs7OxYvSWtgQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQA3qftZQ2sIj9jUY3lWKF7xIVj0hDpTgYyuiZ/h1N9dKPZANZqpjdk6THnips1n00TowITY0R4CtnY3vvanATbbv6NpMN0nel1oKF8D2pgD6q3aRmKsdigxzCwp4TaVNnMd96g8+glLOAAJ5waBIJTSh5uS90ASBIUJrwLGjJAxt7Smq/gK/3EPpmrYsZLfY5/6ugD6W2UC2WitGayAb03kuzhFgD+7bKub//MYK/zzZuaZeoDTZvxu2yfjfP14sfd/IHIUc59poYJ0eCPLLTAx076t916z/KEdhTEVDXhYsWuD/bMcNR1pC8pE8DuRDkCpUKtJ5KCXI+NWut6Lh7DU',
          ],
          x5t: 'ibZEXgyE5isNbVUyuRVNuUBJnz4',
          'x5t#S256': 'zT_4vETy5rprojVPk-dXO2aIRtDofn4oLt3Y7Wxwozs',
        },
        {
          kid: '3N7Y9EvZXi2CDo77ynyci0eLB0cHRSPX3TNaMVk-kco',
          kty: 'RSA',
          alg: 'RSA-OAEP',
          use: 'enc',
          n: 'zem_zV095Zco_vOt194YyO2b9uNCdFLnwVw4SiJ3guA8Qlf0fK-DhSY20cLM1aeMCiUhb84PmFeGIBHdQqbHRuZ-aS2lNMNHbYvlxZqa772cKQpHnIUPqLQoiKSP6KaDCDuT-v5iqb64THB-7gqVkdlVcAgailGP0eSj-XlaR8gG0pWELTkMjRbDRLFXG3UfEkeAlMJiogZUSIG22-HrYepLaJ7gALcmqBIsHLVC3rxqFhJXnG2Kxz47AkFsHEyr3PF1R43LuhIDR0RPEoI2FeH_K1bkLSHOFpcZHRm5HObmfYDCU2JYTkNdI0NZE8RYv2yTOesuKW00tgaDO9zTRQ',
          e: 'AQAB',
          x5c: [
            'MIICmTCCAYECBgGFxtjndzANBgkqhkiG9w0BAQsFADAQMQ4wDAYDVQQDDAViaXRnbzAeFw0yMzAxMTgyMTQ0NDFaFw0zMzAxMTgyMTQ2MjFaMBAxDjAMBgNVBAMMBWJpdGdvMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzem/zV095Zco/vOt194YyO2b9uNCdFLnwVw4SiJ3guA8Qlf0fK+DhSY20cLM1aeMCiUhb84PmFeGIBHdQqbHRuZ+aS2lNMNHbYvlxZqa772cKQpHnIUPqLQoiKSP6KaDCDuT+v5iqb64THB+7gqVkdlVcAgailGP0eSj+XlaR8gG0pWELTkMjRbDRLFXG3UfEkeAlMJiogZUSIG22+HrYepLaJ7gALcmqBIsHLVC3rxqFhJXnG2Kxz47AkFsHEyr3PF1R43LuhIDR0RPEoI2FeH/K1bkLSHOFpcZHRm5HObmfYDCU2JYTkNdI0NZE8RYv2yTOesuKW00tgaDO9zTRQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQB/L1sT5jxwJfG+Fmvcd5DRKlmJ1ER7wUQOvoL7LhxAoqDJvPrLt73jPnKs0FY6zdSAIfXm7eJiXIr07y8+/A+gq1xBB3AGp1Crhc3Zhb9oHKKZz+rYYWu/MeT+BHS0cMTxJu7cDnqRoTONXxxqVXB5kk2MkYaHLNrMp23wdoxrlqmL523XeqnQw5ehsNon3GpDBv+dwBOHj72lhodtwMeMDgUvUPUZ3M4WRBJQAXl38J7efixssHG6ze0HsNEcpAh0L/QVYNzD9gRu15nelK1fYUTLVOWzjUdbMw6/49c1ASOhvYKdHjMoOKvNuAe18xA4fq/KNb13PonUcAnaCaN0',
          ],
          x5t: 'D9H9nh-_i2_wHWezik9GU02DTGo',
          'x5t#S256': 'ptyTLltlfmMreFS2YQsSmCyd-WS-PFoikdMd4GzgxAA',
        },
      ],
    });
};

export const nockGetJWKSetCallFailure = () => {
  nock(
    'http://identity-service-keycloakx-http.identity-service.svc.cluster.local'
  )
    .get('/realms/bitgo/protocol/openid-connect/certs')
    .reply(500);
};
