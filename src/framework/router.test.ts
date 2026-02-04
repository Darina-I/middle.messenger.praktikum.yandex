import Router from './router';

describe('Router', () => {
    let router: Router;

    const FakeBlockConstructor = jest.fn().mockImplementation(() => ({
        getContent: jest.fn().mockReturnValue(document.createElement('div')),
        show: jest.fn(),
        hide: jest.fn(),
    }));

    beforeEach(() => {
        document.body.innerHTML  = '<main id="app"></main>';
        router = new Router('#app');
    });

    describe('Базовый функционвл', () => {
        it('добавление роутеров', () => {
            router.use('/messenger', FakeBlockConstructor);
            expect(router.routes).toHaveLength(1);
        });
    });

    describe('Навигация', () => {
        it('go вызывает pushState', () => {
            router.use('/settings', FakeBlockConstructor);
            
            const pushStateSpy = jest.spyOn(history, 'pushState');
            router.go('/settings');
            
            expect(pushStateSpy).toHaveBeenCalledWith({}, '', '/settings');
        });

        it('back вызывает history.back()', () => {
            const backSpy = jest.spyOn(history, 'back');
            router.back();
            expect(backSpy).toHaveBeenCalled();
        });

        it('go рендерит блок в DOM', () => {
            router.use('/messenger', FakeBlockConstructor);
            router.go('/messenger');

            const app = document.querySelector('#app');
            expect(app?.children.length).toBeGreaterThan(0);
        });

        it('Переход на новую страницу должен менять состояние сущности history', () => {
            const pushStateSpy = jest.spyOn(history, 'pushState');
            pushStateSpy.mockClear();
        
            router.go('/login');
            router.go('/register'); 
            
            expect(pushStateSpy).toHaveBeenCalledTimes(2);
        });

    });
});





