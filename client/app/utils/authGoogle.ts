export const authGoogle = (window: Window) => {
    const storage = window.localStorage;
    const userToken = 'userToken';
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
            const url = `${authURI}?${urlBuilder.join('&')}`;
            const popup = window.open(url, '', options);

            if (popup) {
                window.focus();
                window.addEventListener('message', (event) => {
                    if (event.origin === window.location.origin && event.data.length > 0) {
                        console.log(event.data);

                        popup.close();
                    }
                });
            }
        }
    };

    return authGoogle;
};
