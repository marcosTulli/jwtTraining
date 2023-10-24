import axios from "axios";

export const authGoogle = (window: Window) => {
    const storage = window.localStorage;
    const userToken = 'userToken';
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const authURI = process.env.NEXT_PUBLIC_AUTH_URI;
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const options = `
    width=500,
    height=500,
    left=${(window.outerWidth - 500) / 2}
    top=${(window.outerHeight - 500) / 2.5}
    `;
    const urlBuilder: string[] = [];
    urlBuilder.push(
        'response_type=code',
        `client_id=${clientId}`,
        `redirect_uri=${window.location.origin}`,
        'scope=profile email'
    );

    const authGoogle = {
        openAuth: async () => {
            let isRequestSent = false;
            const url = `${authURI}?${urlBuilder.join('&')}`;
            const popup = window.open(url, '', options);
            if (popup) {
                window.focus();
                window.addEventListener('message', (event) => {
                    const authCode = event.data;
                    popup.close();
                    if (authCode && !isRequestSent) {
                        axios.post(`
                        ${apiUrl}/auth/google`,
                            {
                                code: authCode,
                                clientId: clientId,
                                redirectUri: window.location.origin
                            });
                        isRequestSent = true;
                    }
                });
            }
        }
    };

    return authGoogle;
};
