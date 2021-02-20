export interface RequestInterface {
  baseUrl: string;
}

export class Request {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  get(route: string, options: object) {
    return request(this.baseUrl + route, { method: "GET", ...options });
  }
  post(route: string, options: object) {
    return request(this.baseUrl + route, { method: "POST", ...options });
  }
  put(route: string, options: object) {
    return request(this.baseUrl + route, { method: "PUT", ...options });
  }
  delete(route: string, options: object) {
    return request(this.baseUrl + route, { method: "DELETE", ...options });
  }
  patch(route: string, options: object) {
    return request(this.baseUrl + route, { method: "PATCH", ...options });
  }
}
function request(url: string, options: object): Promise<object | string> {
  return fetch(url, options)
    .then((res) => {
      if (res.status != 200) {
        return {
          ok: false,
          error: "Whoa! Something doesn't look right.",
          sysError: `${res.status}: ${res.statusText}`,
        };
      }
      return res.json().then((data) => {
        if ("error" in data) {
          return {
            ok: false,
            error: data.error,
            sysError: false,
          };
        } else {
          return {
            ok: true,
            ...data,
          };
        }
      });
    })
    .catch((error) => {
      return {
        error: "Whoa! Something doesn't look right.",
        sysError: error,
        ok: false,
      };
    });
}
