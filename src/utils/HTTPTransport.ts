const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

function queryStringify(url: string, data: any) {
  let arr: string[] = [];
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      arr.push(`${key}=${data[key].join(',')}`);
    } else {
      arr.push(`${key}=${data[key]}`);
    }
  });
  return url + (arr.length > 0 ? '?' + arr.join('&') : '');
}

type HTTPMethod = (url: string, options?: any) => Promise<unknown>;
export default class HTTPTransport {
  public _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  private fullUrl = (url: string) => {
    return `${this._baseUrl}${url}`;
  };

  get: HTTPMethod = (url, options = {}) => {
    return this.request(this.fullUrl(url), { ...options, method: METHODS.GET }, options.timeout);
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(this.fullUrl(url), { ...options, method: METHODS.PUT }, options.timeout);
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(this.fullUrl(url), { ...options, method: METHODS.POST }, options.timeout);
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(this.fullUrl(url), { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options: any, timeout: number = 5000) => {
    const { method, data, headers = {} } = options;
    if (method === METHODS.GET) {
      url = queryStringify(url, data);
      console.log(url);
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
