import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlBarComponent } from './url-bar.component';

describe('UrlBarComponent', () => {
    let component: UrlBarComponent;
    let fixture: ComponentFixture<UrlBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UrlBarComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UrlBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
