import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { FileData } from '../shared/models/filedData';

@Injectable({
    providedIn: 'root',
})
export class CoreService {
    currentPath$: BehaviorSubject<string> = new BehaviorSubject(null);
    currentIndex$ = new BehaviorSubject<number>(0);
    fileData: FileData[] = [];

    constructor(private http: HttpClient) {}

    getData(): Observable<FileData[]> {
        if (this.fileData.length) {
            return of(this.fileData);
        }
        return this.http
            .get<FileData[]>('../../assets/db/db.json')
            .pipe(tap((val) => (this.fileData = val)));
    }

    setCurrentPath(path: string): void {
        this.currentPath$.next(path);
    }

    setCurrentIndex(index: number): void {
        this.currentIndex$.next(index);
    }
}
