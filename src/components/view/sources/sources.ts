import './sources.css';
import { ISource } from '../../../types';

class Sources {
    public draw(data: ISource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) return;

        data.forEach((item: ISource) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);
            if (!(sourceClone instanceof DocumentFragment)) return;

            const itemName = sourceClone.querySelector<HTMLElement>('.source__item-name');
            if (itemName) {
                itemName.textContent = item.name;
            }

            const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');
            if (sourceItem) {
                sourceItem.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        const sourcesElement = document.querySelector<HTMLElement>('.sources');
        if (sourcesElement) {
            sourcesElement.append(fragment);
        }
    }
}

export default Sources;
