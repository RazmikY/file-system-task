export interface HeaderData {
    name: string;
    value: string;
    dir: '' | 'desc' | 'asc';
    toggle: boolean;
    id: number;
}

export interface SortData {
    sortFieldName: string;
    sortDir: 'desc' | 'asc';
}
