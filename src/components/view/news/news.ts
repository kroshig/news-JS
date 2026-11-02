import './news.css';
import { IArticle } from '../../../types';

class News {
    public draw(data: IArticle[]): void {
        const news = data.length >= 10 ? data.filter((_item: IArticle, idx: number) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) return;

        news.forEach((item: IArticle, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true);
            if (!(newsClone instanceof DocumentFragment)) return;

            const newsItem = newsClone.querySelector<HTMLElement>('.news__item');
            if (idx % 2 && newsItem) {
                newsItem.classList.add('alt');
            }

            const metaPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const metaAuthor = newsClone.querySelector<HTMLElement>('.news__meta-author');
            if (metaAuthor) {
                metaAuthor.textContent = item.author || item.source.name;
            }

            const metaDate = newsClone.querySelector<HTMLElement>('.news__meta-date');
            if (metaDate) {
                metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const descTitle = newsClone.querySelector<HTMLElement>('.news__description-title');
            if (descTitle) {
                descTitle.textContent = item.title;
            }

            const descSource = newsClone.querySelector<HTMLElement>('.news__description-source');
            if (descSource) {
                descSource.textContent = item.source.name;
            }

            const descContent = newsClone.querySelector<HTMLElement>('.news__description-content');
            if (descContent) {
                descContent.textContent = item.description ?? '';
            }

            const readMoreLink = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');
            if (readMoreLink) {
                readMoreLink.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const newsElement = document.querySelector<HTMLElement>('.news');
        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export default News;
