import { CreateChatData, NewPasswordData, SignInData, UserData, SearchUserData, AddUserData, DeleteUsersData, DeleteChatData } from '../types/responseData';

enum METHOD {
        GET = 'GET',
        POST = 'POST',
        PUT = 'PUT',
        DELETE = 'DELETE'
};

type HTTPBody = FormData | SignInData | UserData | NewPasswordData 
    | CreateChatData | SearchUserData | AddUserData | DeleteUsersData 
    | DeleteChatData |null;
type HTTPMethod = (url: string, data?: HTTPBody) => Promise<XMLHttpRequest>;

type RequestMethod = (url: string, options?: RequestOptions) => Promise<XMLHttpRequest>;
type RequestOptions = {
    method: METHOD;
    data?: HTTPBody;
};

class HTTPTransport {
    protected readonly BASE_URL = 'https://ya-praktikum.tech/api/v2';
    protected baseURL: string;

    constructor(endpoint: string = ''){
        this.baseURL = this.BASE_URL + endpoint;
    }

    get: HTTPMethod = (url, data) => {
        return this.request(url, {data, method: METHOD.GET});
    };

    post: HTTPMethod = (url, data) => {
        return this.request(url, {data, method: METHOD.POST});
    };

    put: HTTPMethod = (url, data) => {
        return this.request(url, {data, method: METHOD.PUT});
    };

    delete: HTTPMethod = (url, data) => {
        return this.request(url, {data, method: METHOD.DELETE});
    };

    request: RequestMethod = (url, options = { method: METHOD.GET }) => {
        const {method, data} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            let fullURL = this.baseURL + url;
            if(method === METHOD.GET && data){
                const params = new URLSearchParams();
                Object.entries(data).forEach(([key, value]) => {
                    params.append(key, String(value));
                });
                fullURL += `?${params.toString()}`;
            }

            xhr.withCredentials = true;
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

export default HTTPTransport;



