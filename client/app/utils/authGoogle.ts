import { collectGenerateParams } from "next/dist/build/utils";

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

    let cachedToken: string | null;

    const authGoogle = {
        tuki: () => {

            console.log(authURI);
            console.log(urlBuilder.join("&"));
            window.open(`${authURI}?${urlBuilder.join('&')}`, '', options);

        },
        taka: () => {
            if (!cachedToken) {
                cachedToken = storage.getItem(userToken);
            }
            return cachedToken;
        },
        tiki: function () {
            return !!this.taka();
        },
        teke: function () {
            cachedToken = null;
            storage.removeItem(userToken);
            storage.removeItem('user');
        }
    };
    return authGoogle;
};