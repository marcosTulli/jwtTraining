export const authToken = (window: Window) => {
    const storage = window.localStorage;
    let cachedToken: string | null;
    return {
        setToken: (token: string) => {
            cachedToken = token;
            storage.setItem('userToken', token);
        },
        getToken: () => {
            if (!cachedToken) {
                cachedToken = storage.getItem('userToken');
            }
            return cachedToken;
        },
        isAuthenticated: function () {
            return !!this.getToken();
        }
    };
};