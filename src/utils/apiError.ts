export const apiError = (error: {status: number }) => {
    if(error.status === 404){
        window.router.go('/error404');
    }
    else if(error.status === 500){
        window.router.go('/error500');
    }
};



