import {
    Component,
    ChangeDetectionStrategy,
    Output,
    EventEmitter,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoreService } from 'src/app/services/core.service';
import { CurrentPath } from 'src/app/shared/models/currentPath.model';
import { FileData } from 'src/app/shared/models/filedData';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
    @Output() getCurrentPath = new EventEmitter<CurrentPath>();
    @Output() backToParent = new EventEmitter<void>();
    currentPath$ = this.coreService.currentPath$;

    constructor(private coreService: CoreService) {}

    onBack(): void {
        this.backToParent.emit();
    }

    navigate(pathObj: CurrentPath): void {
        this.getCurrentPath.emit(pathObj);
    }
}
