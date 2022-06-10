import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { FinishComponent } from './pages/finish/finish.component';
import { ChangeBgDirective } from './change-bg.directive';
import { RankingComponent } from './shared/components/ranking/ranking.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent,
    FinishComponent,
    ChangeBgDirective,
    RankingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
