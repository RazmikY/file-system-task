import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';

import { CurrentPath } from '@shared/models';

@Component({
    selector: 'app-url-bar',
    templateUrl: './url-bar.component.html',
    styleUrls: ['./url-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class UrlBarComponent {
    @Input({
        transform: (value: string) => {
            return value?.split('/');
        },
    })
    currentPath: string[];

    @Output() goToPath = new EventEmitter<CurrentPath>();
    currentPathArr!: string[];

    getPath(pathPart: string, index: number): void {
        this.goToPath.emit({ pathPart, index });
    }
}
