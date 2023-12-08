import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
    Output,
    Input,
    EventEmitter,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FileData } from '@shared/models';
import { FileTypePipe } from '@shared/pipes';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ReactiveFormsModule, FileTypePipe],
})
export class SearchBarComponent implements OnInit, OnDestroy {
    @Input() data!: FileData[];
    @Output() findData = new EventEmitter<string>();
    @Output() navigateToCurrentItem = new EventEmitter<string>();
    searchField!: FormControl;
    selectedItem!: FormControl;
    private _destroySub$ = new Subject<void>();

    constructor() {}

    ngOnInit(): void {
        this.initFormControl();
        this.searchFieldValueChanges();
    }

    initFormControl(): void {
        this.searchField = new FormControl();
        this.selectedItem = new FormControl();
    }

    searchFieldValueChanges(): void {
        this.searchField.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                takeUntil(this._destroySub$)
            )
            .subscribe((val: string) => this.findData.emit(val.trim()));
    }

    navigate(): void {
        this.navigateToCurrentItem.emit(this.selectedItem.value);
    }

    ngOnDestroy(): void {
        this._destroySub$.next();
        this._destroySub$.complete();
    }
}
