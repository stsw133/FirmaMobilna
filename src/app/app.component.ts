import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform, Nav, AlertController, ModalController, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';

import { NetProvider, SettingsProvider } from '../providers';

import { LoginPage } from '../pages/login/login';
import { NotificationsPage } from '../pages/notifications/notifications';

@Component({
  templateUrl: 'app.html'
})

export class MyApp
{
	@ViewChild(Nav) nav: Nav;
	
	rootPage: any = LoginPage;
	selectedTheme: String;
	quickMenu = {
		messages: [],
		notifications: [],
		warnings: []
	}
	
	
	
	constructor (public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public alertCtrl: AlertController, public modalCtrl: ModalController, public translate: TranslateService, public storage: Storage, public events: Events, public network: Network, public netProvider: NetProvider, public settings: SettingsProvider)
	{
		this.initializeApp();
		this.initTranslate();
	}
	
	
	
	initializeApp()
	{
		this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
			this.netProvider.initializeNetworkEvents();
			
			// Network status event
			this.events.subscribe('network:offline', () => {
				this.quickMenu.warnings[0] = this.network.type;
			});
			this.events.subscribe('network:online', () => {
				this.quickMenu.warnings[0] = null;
			});
			// QuickMenu event
			this.events.subscribe('quickMenu', () => {
				this.storage.get('quickMenu').then((val) => {
					if (val)
					{
						this.quickMenu.messages = val.messages;
						this.quickMenu.notifications = val.notifications;
						this.quickMenu.warnings = val.warnings;
					}
				});
			});
		});
	}
	
	initTranslate()
	{
		this.translate.setDefaultLang('en');
		const browserLang = this.translate.getBrowserLang();
		
		this.storage.get('account').then((val) => {
			if (val)
				this.translate.use(val.language);
			else if (browserLang)
				this.translate.use(this.translate.getBrowserLang());
			else
				this.translate.use('en');
		});
	}
	
	
	
	showMessages()
	{
		// let modal = this.modalCtrl.create(MessagesPage, null);
		// modal.present();
	}
	showNotifications()
	{
		let modal = this.modalCtrl.create(NotificationsPage, null);
		modal.present();
	}
	showWarnings()
	{
		// let modal = this.modalCtrl.create(WarningsPage, null);
		// modal.present();
	}
}
