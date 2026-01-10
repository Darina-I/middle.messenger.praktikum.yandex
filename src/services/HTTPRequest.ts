enum METHOD {
        GET = 'GET',
        POST = 'POST',
        PUT = 'PUT',
        DELETE = 'DELETE'
};

type HTTPBody = FormData | Record<string, string> | null;
type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>;

type Options = {
    method: METHOD;
    data?: HTTPBody;
};

class HTTPTransport {
    get: HTTPMethod = (url, options) => {
        return this.request(url, {...options, method: METHOD.GET});
    };

    post: HTTPMethod = (url, options) => {
        return this.request(url, {...options, method: METHOD.POST});
    };

    put: HTTPMethod = (url, options) => {
        return this.request(url, {...options, method: METHOD.PUT});
    };

    delete: HTTPMethod = (url, options) => {
        return this.request(url, {...options, method: METHOD.DELETE});
    };

    request: HTTPMethod = (url, options = { method: METHOD.GET }) => {
        const {method, data} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            let fullURL = url;
            if(method === METHOD.GET && data){
                const params = new URLSearchParams();
                Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
                    params.append(key, String(value));
                });
                fullURL += `?${params.toString()}`;
            }

            xhr.open(method, fullURL);
        
            xhr.onload = function() {
                resolve(xhr);
            };
    
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
        
            if (method === METHOD.GET || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            }
        });
    };
}





