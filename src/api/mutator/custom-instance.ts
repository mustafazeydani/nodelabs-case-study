import { XiorError } from "xior";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://case.nodelabs.dev/api"

export const customInstance = async <T>(
    url: string,
    {
        method,
        params,
        body,
    }: {
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
        params?: any;
        body?: BodyType<unknown>;
        responseType?: string;
    },
): Promise<T> => {
    let targetUrl = `${baseURL}${url}`;

    if (params) {
        targetUrl += '?' + new URLSearchParams(params);
    }

    const response = await fetch(targetUrl, {
        method,
        body,
    });

    return response.json();
};

export default customInstance;

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = XiorError<Error>;
// In case you want to wrap the body type (optional)
// (if the custom instance is processing data before sending it, like changing the case for example)
export type BodyType<BodyData> = CamelCase<BodyType>;