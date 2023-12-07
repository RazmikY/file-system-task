import {
    Component,
    ChangeDetectionStrategy,
    Output,
    EventEmitter,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { CurrentPath } from '@shared/models';
import { CoreService } from 'src/app/services/core.service';
import { UrlBarComponent } from './url-bar/url-bar.component';
import { BackButtonComponent } from './back-button/back-button.component';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [BackButtonComponent, UrlBarComponent, AsyncPipe],
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
