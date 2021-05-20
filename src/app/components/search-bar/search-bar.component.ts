import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
    Output,
    Input,
    EventEmitter,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FileData } from 'src/app/shared/models/filedData';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit, OnChanges, OnDestroy {
    @Input() data: FileData[];
    @Output() findData = new EventEmitter<string>();
    @Output() navigateToCurrentItem = new EventEmitter<string>();
    searchField: FormControl;
    selectedItem: FormControl;
    private sub = new Subscription();

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(changes?.data);
    }

    ngOnInit(): void {
        this.initFormControl();
        this.searchFieldValueChanges();
    }

    initFormControl(): void {
        this.searchField = new FormControl();
        this.selectedItem = new FormControl();
    }

    searchFieldValueChanges(): void {
        this.sub.add(
            this.searchField.valueChanges
                .pipe(debounceTime(500), distinctUntilChanged())
                .subscribe((val: string) => this.findData.emit(val.trim()))
        );
    }

    navigate(): void {
        this.navigateToCurrentItem.emit(this.selectedItem.value);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
