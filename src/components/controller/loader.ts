import { Callback, Endpoint, ErrorCode, HttpMethod, IRequestConfig, QueryOptions, ReadonlyOptions } from '../../types';

class Loader {
    private readonly baseLink: string;
    private readonly options: ReadonlyOptions;

    constructor(baseLink: string, options: QueryOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp<T>(
        { endpoint, options = {} }: IRequestConfig,
        callback: Callback<T> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(HttpMethod.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ErrorCode.UNAUTHORIZED || res.status === ErrorCode.NOT_FOUND) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Partial<QueryOptions>, endpoint: Endpoint | string): string {
        const urlOptions: Partial<QueryOptions> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            const value = urlOptions[key];
            if (value !== undefined) {
                url += `${key}=${value}&`;
            }
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: HttpMethod,
        endpoint: Endpoint | string,
        callback: Callback<T>,
        options: Partial<QueryOptions> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res: Response) => this.errorHandler(res))
            .then((res: Response) => res.json() as Promise<T>)
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
