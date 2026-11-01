export enum Endpoint {
    SOURCES = 'sources',
    EVERYTHING = 'everything',
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
}

export enum ErrorCode {
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
}

export interface ISource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface IArticle {
    source: Pick<ISource, 'id' | 'name'>;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface ISourcesResponse {
    status: string;
    sources: ISource[];
}

export interface INewsResponse {
    status: string;
    totalResults: number;
    articles: IArticle[];
}

export type QueryOptions = Record<string, string>;

export interface IRequestConfig {
    endpoint: Endpoint | string;
    options?: Partial<QueryOptions>;
}

export type ReadonlyOptions = Readonly<QueryOptions>;

export type Callback<T> = (data: T) => void;
