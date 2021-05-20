import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { FileData } from '../shared/models/filedData';

@Injectable({
    providedIn: 'root',
})
export class CoreService {
    currentPath$: BehaviorSubject<string> = new BehaviorSubject(
        sessionStorage.getItem('currentPath')
    );
    currentDirectory$: BehaviorSubject<string> = new BehaviorSubject(
        'univercity' ?? sessionStorage.getItem('currentDirectory')
    );

    currentIndex$ = new BehaviorSubject<number>(
        1 ?? +sessionStorage.getItem('currentIndex')
    );

    constructor(private http: HttpClient) {}

    getData(): Observable<FileData[]> {
        return this.http.get<any>('../../assets/db/db.json');
    }

    setCurrentPath(path: string): void {
        this.currentPath$.next(path);
        sessionStorage.setItem('currentPath', path);
    }

    setCurrentDirectory(path: string): void {
        this.currentDirectory$.next(path);
        sessionStorage.setItem('currentDirectory', path);
    }

    setCurrentIndex(index: number): void {
        this.currentIndex$.next(index);
        sessionStorage.setItem('currentIndex', index.toString());
    }
}
