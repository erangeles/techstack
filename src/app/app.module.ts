import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { HeaderComponent } from './components/header/header.component';
import { SocialLinksComponent } from './components/header/social-links/social-links.component';

@NgModule({
    declarations: [AppComponent, HeaderComponent, SocialLinksComponent],
    imports: [
        BrowserModule,
        MatCardModule,
        MatSnackBarModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        ClipboardModule,
        AppRoutingModule,
        FormsModule,
        CodemirrorModule,
        ReactiveFormsModule,
        MatToolbarModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
