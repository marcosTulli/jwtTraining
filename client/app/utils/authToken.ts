export const authToken = (window: Window) => {
    const storage = window.localStorage;
    const userToken = 'userToken';

    let cachedToken: string | null;

    const authToken = {
        setToken: (token: string) => {
            cachedToken = token;
            storage.setItem(userToken, token);
        },
        getToken: () => {
            if (!cachedToken) {
                cachedToken = storage.getItem(userToken);
            }
            return cachedToken;
        },
        isAuthenticated: function () {
            return !!this.getToken();
        },
        removeToken: function () {
            cachedToken = null;
            storage.removeItem(userToken);
        }
    };
    return authToken;
};