import { FileType } from "../enums";

export interface FileData {
    path: string;
    modificationDate: string;
    type: FileType;
    size?: number;
}
