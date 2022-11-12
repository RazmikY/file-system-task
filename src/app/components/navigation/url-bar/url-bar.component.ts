import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    OnChanges,
    SimpleChanges,
    EventEmitter,
} from '@angular/core';
import { CurrentPath } from 'src/app/shared/models/currentPath.model';

@Component({
    selector: 'app-url-bar',
    templateUrl: './url-bar.component.html',
    styleUrls: ['./url-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UrlBarComponent implements OnChanges {
    @Input() currentPath!: string;
    @Output() goToPath = new EventEmitter<CurrentPath>();
    currentPathArr!: string[];

    ngOnChanges(changes: SimpleChanges): void {
        const { currentValue } = changes?.["currentPath"];
        this.currentPathArr = currentValue?.split('/');
    }

    getPath(pathPart: string, index: number): void {
        this.goToPath.emit({ pathPart, index });
    }
}
