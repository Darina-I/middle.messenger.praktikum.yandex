import HTTPTransport from './HTTPRequest';

describe('HTTPTransport', () => {
    let transport: HTTPTransport;
    let mockXHR: any;

    beforeEach(() => {
        mockXHR = {
        withCredentials: true,
        open: jest.fn(),
        send: jest.fn(),
        setRequestHeader: jest.fn(),
        onload: jest.fn(),
        onerror: jest.fn()
        };
    
        // @ts-ignore
        global.XMLHttpRequest = jest.fn(() => mockXHR);
        transport = new HTTPTransport('');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Конструктор', () => {
        it('должен формировать baseURL', () => {
            expect(transport['baseURL']).toBe('https://ya-praktikum.tech/api/v2');
        });
    });

    describe('GET', () => {
        it('без параметров', async () => {
            const promise = transport.get('/chats');
            mockXHR.onload();
            
            await promise;
            
            expect(mockXHR.open).toHaveBeenCalledWith('GET', 'https://ya-praktikum.tech/api/v2/chats');
        });

        it('с параметрами', async () => {
            const promise = transport.get('/chats', { id: '1' });
            mockXHR.onload();
            
            await promise;
            
            expect(mockXHR.open).toHaveBeenCalledWith('GET', expect.stringContaining('id=1'));
        });
    });

    describe('POST', () => {
        it('c JSON', async () => {
            const data = { login: 'test' };
            const promise = transport.post('/signin', data);
            mockXHR.onload();
            
            await promise;
            
            expect(mockXHR.open).toHaveBeenCalledWith('POST', expect.any(String));
            expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(data));
        });
    });

    describe('PUT', () => {
        it('c JSON', async () => {
            const data = { first_name: 'updated' };
            const promise = transport.put('/user/profile', data);
            mockXHR.onload();
            
            await promise;
            
            expect(mockXHR.open).toHaveBeenCalledWith('PUT', expect.any(String));
            expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(data));
        });
    });

    describe('DELETE', () => {
        it('с JSON', async () => {
            const data = { chatId: '1'};
            const promise = transport.delete('/chats', data);
            mockXHR.onload();
            
            await promise;
            
            expect(mockXHR.open).toHaveBeenCalledWith('DELETE', expect.any(String));
            expect(mockXHR.send).toHaveBeenCalledWith(JSON.stringify(data));
        });
    });
});






