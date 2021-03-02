export interface PromiseInterface {
  ok: boolean;
  error?: string;
  sysError?: string | boolean;
  data?: any;
}

export default class Request {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  get(route: string, options?: object) {
    return request(this.baseUrl + route, { method: "GET", ...options });
  }
  post(route: string, options?: object) {
    return request(this.baseUrl + route, { method: "POST", ...options });
  }
  put(route: string, options?: object) {
    return request(this.baseUrl + route, { method: "PUT", ...options });
  }
  delete(route: string, options?: object) {
    return request(this.baseUrl + route, { method: "DELETE", ...options });
  }
  patch(route: string, options?: object) {
    return request(this.baseUrl + route, { method: "PATCH", ...options });
  }
}
async function request(
  url: string,
  options?: RequestInit
): Promise<PromiseInterface> {
  console.log("Request URL: " + url);
  try {
    const res = await fetch(url, options);
    if (res.status != 200) {
      return {
        ok: false,
        error: "Whoa! Something doesn't look right.",
        sysError: `${res.status}: ${res.statusText}`,
      };
    }
    const data = await res.json();
    if ("error" in data) {
      return {
        ok: false,
        error: data.error,
        sysError: false,
      };
    } else {
      return {
        ok: true,
        data: data,
      };
    }
  } catch (error) {
    return {
      error: "Whoa! Fetch failed",
      sysError: error,
      ok: false,
    };
  }
}
