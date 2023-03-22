import { assert } from 'chai';

import { decodeIdentityToken } from '../src';

describe('Decode Identity Token', () => {
  it('should return an identity token given a valid jwt', async () => {
    const bearerToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1dTJqaHZQMGkyeU80a0lFUG96ejU5TW40RG4yR0VTc1hqTHg1Z2QxQmp3In0.eyJleHAiOjE4NTIyMTgyODcsImlhdCI6MTY3OTQxODI4NywiYXV0aF90aW1lIjoxNjc5NDE4Mjg3LCJqdGkiOiIwYzZkNzNlZC03MjhhLTQwMWYtOGJiOS05YWU0OWU5YWJmN2YiLCJpc3MiOiJodHRwczovL2lkZW50aXR5LmJpdGdvLWRldi5jb20vcmVhbG1zL2JpdGdvIiwic3ViIjoiZjoxMjY2ZWNmNy1kMzZiLTQ2NGEtOThiZi1kODBjZjE0YWZiNDg6ZXhwZXJpZW5jZSt0ZXN0LWFkbWluK2RvLW5vdC1kZWxldGVAYml0Z28uY29tIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiY29tLmJpdGdvLnRlc3R3ZWJhcHAiLCJzZXNzaW9uX3N0YXRlIjoiMDZhZDZkMTMtYWM5NS00MDY4LTkyNmItYzA3Y2UxOTQ3MDBjIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJdLCJzY29wZSI6Im9wZW5pZCB1c2VyX21hbmFnZSB3YWxsZXRfc3BlbmRfYWxsIGJpdGdvLWluZm8gcHJvZmlsZSB3YWxsZXRfdmlld19hbGwgd2FsbGV0X2NyZWF0ZSIsInNpZCI6IjA2YWQ2ZDEzLWFjOTUtNDA2OC05MjZiLWMwN2NlMTk0NzAwYyIsImJpdGdvX2lkIjoiNWNhZTMxMzBmOGY0NTYxZDUxZGZjYmZkYWFmYmE5YjkiLCJuYW1lIjoiZXhwZXJpZW5jZSt0ZXN0LWFkbWluK2RvLW5vdC1kZWxldGUgYWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJleHBlcmllbmNlK3Rlc3QtYWRtaW4rZG8tbm90LWRlbGV0ZUBiaXRnby5jb20iLCJnaXZlbl9uYW1lIjoiZXhwZXJpZW5jZSt0ZXN0LWFkbWluK2RvLW5vdC1kZWxldGUiLCJmYW1pbHlfbmFtZSI6ImFkbWluIiwiZW50ZXJwcmlzZXMiOlsiNWNhZTMxMzFmOGY0NTYxZDUxZGZjYzAwMTY2ODdiOTYiLCI1Y2FiZTNlOGExYjU2OTIzNTFjMzZmYzQ5ZmZkZDY4MCIsIjVjY2EwYzgxZTdlYTRhMzcwNWJlYjE3NDViNmEwNDJiIiwiNjFkZjNkZWUwMDA0NTgwMDA3M2QxMmU4NDRkYTk3ZGEiXX0.A1mmxX0_rXoPb5SEMRNE-zA5y44JYKRQlLN-Y8TSUkP8Yyo3RoA3QNr0351Da9TTNc73HpT2ahVwKoBPdT2z8unIvQ_Gsz-tHWmQyZ95HKt5Lja82lJvS0K2aRhCcTSF1Zw3AGLeaMesl7umMQLkIf5s4aN380Tyx1FeJReVF8dM1_bAvRzrffZQSOUFACU2Qd4LJ2JYaPrIrPLZkDOJ0vQzfBCOsRox-Y6m29oQ6Lw8-hbuN1gtk-DUkMX8AdWto4f74T0d0mKIN929-GYmmriieuqnrk5HqZ7blYrF3GB6jF8-eD5GJe3nhLJAEZ9OJVzKJS6fGyL6zgK-HyZsPg';

    const identityToken = decodeIdentityToken(bearerToken);

    assert.isDefined(identityToken);
    assert.isNotEmpty(identityToken?.payload);
  });

  it('should throw an error given a valid jwt but with an invalid payload schema', async () => {
    const bearerToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.NHVaYe26MbtOYhSKkoKYdFVomg4i8ZJd8_-RU8VNbftc4TSMb4bXP3l3YlNWACwyXPGffz5aXHc6lty1Y2t4SWRqGteragsVdZufDn5BlnJl9pdR_kdVFUsra2rWKEofkZeIC4yWytE58sMIihvo9H1ScmmVwBcQP6XETqYd0aSHp1gOa9RdUPDvoXQ5oqygTqVtxaDr6wUFKrKItgBMzWIdNZ6y7O9E0DhEPTbE9rfBo6KTFsHAZnMg4k68CDp2woYIaXbmYTWcvbzIuHO7_37GT79XdIwkm95QJ7hYC9RiwrV7mesbY4PAahERJawntho0my942XheVLmGwLMBkQ';

    try {
      decodeIdentityToken(bearerToken);
      assert.fail();
    } catch (err) {}
  });

  it('should throw an error given an invalid jwt', async () => {
    const bearerToken =
      'v2x0b75a97dd8caf93b94c0739c8f66478f841217f4ddad7a3cf2e68d2e6a8c5805';

    try {
      decodeIdentityToken(bearerToken);
      assert.fail();
    } catch (err) {}
  });
});
