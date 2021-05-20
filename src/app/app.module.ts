import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { components } from './components/components';
import { SharedModule } from './shared/shared.module';
import { MainComponent } from './components/main/main.component';

@NgModule({
    declarations: [AppComponent, components],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, SharedModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
