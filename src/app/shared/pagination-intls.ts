import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class PaginationIntl extends MatPaginatorIntl {

    private readonly labelPagination = `Nombre d'éléments par page`;

    constructor() {
        super();
        this.firstPageLabel = 'Première page';
        this.lastPageLabel = 'Dernière page';
        this.nextPageLabel = 'Suivant';
        this.previousPageLabel = 'Précédent';
        this.itemsPerPageLabel = this.labelPagination;
    }

    getRangeLabel = function (page, pageSize, length): string {
        if (length === 0 || pageSize === 0) {
            return '0 à ' + length;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;
        return startIndex + 1 + ' à ' + endIndex + ' / ' + length;
    };

}
