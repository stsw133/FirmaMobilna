import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Api, NetProvider, SettingsProvider } from '../providers';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/login/register/register';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/home/profile/profile';
import { NotificationsPage } from '../pages/notifications/notifications';
import { UsersPage } from '../pages/users/users';
import { UsersNewPage } from '../pages/users/users-new/users-new';
import { UsersPreviewPage } from '../pages/users/users-preview/users-preview';
import { UsersEditPage } from '../pages/users/users-edit/users-edit';
import { ClientsPage } from '../pages/clients/clients';
import { ClientsNewPage } from '../pages/clients/clients-new/clients-new';
import { ClientsPreviewPage } from '../pages/clients/clients-preview/clients-preview';
import { ClientsEditPage } from '../pages/clients/clients-edit/clients-edit';
import { TicketsPage } from '../pages/tickets/tickets';
import { TicketsNewPage } from '../pages/tickets/tickets-new/tickets-new';
import { TicketsPreviewPage } from '../pages/tickets/tickets-preview/tickets-preview';
import { TicketsEditPage } from '../pages/tickets/tickets-edit/tickets-edit';
import { CalendarPage } from '../pages/calendar/calendar';
import { PermissionsPage } from '../pages/permissions/permissions';
import { SettingsPage } from '../pages/settings/settings';
import { HelpPage } from '../pages/help/help';

export function createTranslateLoader (http: HttpClient)
{
	return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
	LoginPage,
	RegisterPage,
    HomePage,
    ProfilePage,
	NotificationsPage,
	UsersPage,
	UsersNewPage,
	UsersPreviewPage,
	UsersEditPage,
	ClientsPage,
	ClientsNewPage,
	ClientsPreviewPage,
	ClientsEditPage,
	TicketsPage,
	TicketsNewPage,
	TicketsPreviewPage,
	TicketsEditPage,
	CalendarPage,
	PermissionsPage,
	SettingsPage,
	HelpPage
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
	TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
	IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	LoginPage,
	RegisterPage,
    HomePage,
    ProfilePage,
	NotificationsPage,
	UsersPage,
	UsersNewPage,
	UsersPreviewPage,
	UsersEditPage,
	ClientsPage,
	ClientsNewPage,
	ClientsPreviewPage,
	ClientsEditPage,
	TicketsPage,
	TicketsNewPage,
	TicketsPreviewPage,
	TicketsEditPage,
	CalendarPage,
	PermissionsPage,
	SettingsPage,
	HelpPage
  ],
  providers: [
    Api,
    NetProvider,
    SettingsProvider,
    SplashScreen,
    StatusBar,
	Network,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
