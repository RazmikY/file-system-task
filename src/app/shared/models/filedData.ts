export type FileType = 'file' | 'folder';

export interface FileData {
    path: string;
    modificationDate: string;
    type: FileType;
    size?: number;
}
