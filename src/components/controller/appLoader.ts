import Loader from './loader';

declare const process: {
    env: {
        API_URL?: string;
        API_KEY?: string;
    };
};

class AppLoader extends Loader {
    constructor() {
        super(process.env.API_URL ?? 'https://rss-news-api.onrender.com/', {
            apiKey: process.env.API_KEY ?? '',
        });
    }
}

export default AppLoader;
