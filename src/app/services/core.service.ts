import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import * as db from '../../assets/db/db.json';
import { FileData } from '../shared/models/filedData';

@Injectable({
    providedIn: 'root',
})
export class CoreService {
    private db: any = db;
    currentPath$: BehaviorSubject<string> = new BehaviorSubject(
        localStorage.getItem('currentPath')
    );
    currentDirectory$: BehaviorSubject<string> = new BehaviorSubject(
        'univercity' ?? localStorage.getItem('currentDirectory')
    );
    constructor() {}

    getData(): Observable<FileData[]> {
        const data = this.db.default;
        return of(data);
    }

    setCurrentPath(path: string): void {
        localStorage.setItem('currentPath', path);
    }

    setCurrentDirectory(path: string): void {
        localStorage.setItem('currentDirectory', path);
    }
}
