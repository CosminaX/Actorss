const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const domain = "http://localhost:3001";

function joinURL(baseURL, url) {
  return `${baseURL}/${url}`;
}

class serviceApi {
  request(url, method = "GET", data = null) {
    url = joinURL(domain, url);
    const options = { headers, method };
    if (data) {
      options.body = JSON.stringify({ ...data });
    }
    return fetch(url, options);
  }

  get(url, id) {
    const method = "GET";
    if (id) {
      url = `${url}/${id}`;
    }
    return this.request(url, method).then((res) => res.json());
  }
  post(url, data) {
    const method = "POST";
    return this.request(url, method, data).then((res) => res.json());
  }
  delete(url, id) {
    const method = "DELETE";
    if (id) {
      url = `${url}/${id}`;
    }
    return this.request(url, method);
  }
  put(url, data) {
    const method = "PUT";
    return this.request(url, method, data).then((res) => res.json());
  }
}
export default serviceApi;
