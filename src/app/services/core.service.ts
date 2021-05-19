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
        localStorage.getItem('currentPath')
    );
    currentDirectory$: BehaviorSubject<string> = new BehaviorSubject(
        'univercity' ?? localStorage.getItem('currentDirectory')
    );

    constructor(private http: HttpClient) {}

    getData(): Observable<FileData[]> {
        return this.http.get<any>('../../assets/db/db.json').pipe(
            map((data: FileData[]) => this.transformData(data)),
        )
    }

    transformData(data: FileData[]): any {
        return data.map(item => this.splitPath(item)).map(item => ({
            ...item,
            childrem: []
        })).map(ele => console.log(ele.path))
    }

    splitPath(item: any): any {
        item.path = item.path.split('/');
        return item
    }

    groupData(data: any[], path: string): any {
        return data.reduce((acc: any, inc) => {
            return acc['childrem'].push(inc)
        });
    }

    setCurrentPath(path: string): void {
        localStorage.setItem('currentPath', path);
    }

    setCurrentDirectory(path: string): void {
        localStorage.setItem('currentDirectory', path);
    }
}
