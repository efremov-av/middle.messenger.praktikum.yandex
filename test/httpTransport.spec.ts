import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { it } from 'mocha';
import { baseUrl, defaultHeaders } from '../src/utils/constants';
import HTTPTransport from '../src/utils/HTTPTransport';
import { expect } from 'chai';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    global.XMLHttpRequest = xhr as any;
    xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
    instance = new HTTPTransport(`${baseUrl}/auth`, defaultHeaders);
  });

  afterEach(() => {
    requests.length = 0;
    sinon.restore();
  });

  it('Проверка GET', async () => {
    instance.get('/user');
    const [request] = requests;

    expect(request.method).to.eq('GET');
  });

  it('Проверка POST', async () => {
    instance.post('/user');
    const [request] = requests;

    expect(request.method).to.eq('POST');
  });

  it('Проверка PUT', async () => {
    instance.put('/user');
    const [request] = requests;

    expect(request.method).to.eq('PUT');
  });

  it('Проверка DELETE', async () => {
    instance.delete('/user');
    const [request] = requests;

    expect(request.method).to.eq('DELETE');
  });
});
