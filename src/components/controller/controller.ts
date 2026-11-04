import AppLoader from './appLoader';
import { Callback, Endpoint, INewsResponse, ISourcesResponse } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: Callback<ISourcesResponse>): void {
        super.getResp<ISourcesResponse>(
            {
                endpoint: Endpoint.SOURCES,
            },
            callback
        );
    }

    public getNews(e: Event, callback: Callback<INewsResponse>): void {
        const eventTarget = e.target;
        const newsContainer = e.currentTarget;

        if (!(eventTarget instanceof HTMLElement) || !(newsContainer instanceof HTMLElement)) {
            return;
        }

        let target: HTMLElement = eventTarget;
        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<INewsResponse>(
                        {
                            endpoint: Endpoint.EVERYTHING,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            if (target.parentElement) {
                target = target.parentElement;
            } else {
                break;
            }
        }
    }
}

export default AppController;
