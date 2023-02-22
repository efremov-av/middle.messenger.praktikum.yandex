const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export type HttpOptionsType = {
  method?: string;
  data?: Record<string, unknown> | FormData;
  headers?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
};

export type HttpResponsePromiseType = {
  isError: boolean;
  data: any;
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

type HTTPMethod = (url: string, options?: HttpOptionsType) => Promise<unknown>;
export default class HTTPTransport {
  private _baseUrl: string;
  private _headers: Record<string, string>;

  constructor(baseUrl: string, headers: Record<string, string>) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  private fullUrl = (url: string) => {
    return `${this._baseUrl}${url}`;
  };

  get: HTTPMethod = (url, options = {}) => {
    return this.requestPromise(
      this.request(this.fullUrl(url), { ...options, method: METHODS.GET })
    );
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.requestPromise(
      this.request(this.fullUrl(url), { ...options, method: METHODS.PUT })
    );
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.requestPromise(
      this.request(this.fullUrl(url), { ...options, method: METHODS.POST })
    );
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.requestPromise(
      this.request(this.fullUrl(url), { ...options, method: METHODS.DELETE })
    );
  };

  private request = (url: string, options: HttpOptionsType) => {
    const { method = METHODS.GET, data, headers, timeout = 5000, withCredentials = true } = options;
    if (method === METHODS.GET && data) {
      url = queryStringify(url, data);
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

      if (withCredentials) {
        xhr.withCredentials = true;
      }

      if (!headers) {
        Object.keys(this._headers).forEach((key) => {
          xhr.setRequestHeader(key, this._headers[key]);
        });
      } else {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        if (data instanceof FormData) {
          xhr.send(data);
        } else {
          xhr.send(JSON.stringify(data));
        }
      }
    });
  };

  private requestPromise = async (promise: Promise<unknown>): Promise<HttpResponsePromiseType> => {
    return promise
      .then((res: XMLHttpRequest) => {
        return { isError: res.status >= 400, data: res.response };
      })
      .catch((e) => {
        console.log('ERROR', e);
        return { isError: true, data: e };
      });
  };
}
