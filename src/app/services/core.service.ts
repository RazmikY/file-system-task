import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import * as db from '../../assets/db/db.json';
import { FileData } from '../shared/models/filedData';

@Injectable({
    providedIn: 'root',
})
export class CoreService {
    private db: any = db;
    constructor() {}

    getData(): Observable<FileData[]> {
        const data = this.db.default;
        return of(data);
    }
}
