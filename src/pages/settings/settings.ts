import { Component } from '@angular/core';
import { Platform, NavController, ToastController, AlertController, ModalController, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { Api, SettingsProvider } from '../../providers';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage
{
	account = { id: 0, password: null, theme: '' }
	quickMenu = {
		messages: [],
		notifications: [],
		warnings: []
	}
	lang = {
		dismiss: '',
		errorTooShortPassword: '',
		errorPasswordsNotMatch: '',
		operationSucceed: '',
		errorServer: '',
		errorServerAccess: ''
	}
	data = {
		tabs: 0,
		oldPassword: '',
		newPassword: '',
		newRepass: ''
	}
	selectedTheme: String;
	
	
	
	constructor (public platform: Platform, public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController, public events: Events, public translate: TranslateService, public storage: Storage, public api: Api, public settings: SettingsProvider)
	{
		this.storage.get('account').then((val) => {
			if (val)
				this.account = val;
			this.updateCounters();
		});
		this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
		
		this.translate.get('DISMISS').subscribe((value) => { this.lang.dismiss = value; });
		this.translate.get('ERROR_TOOSHORTPASSWORD').subscribe((value) => { this.lang.errorTooShortPassword = value; });
		this.translate.get('ERROR_PASSWORDSNOTMATCH').subscribe((value) => { this.lang.errorPasswordsNotMatch = value; });
		this.translate.get('OPERATION_SUCCEED').subscribe((value) => { this.lang.operationSucceed = value; });
		this.translate.get('ERROR_SERVER').subscribe((value) => { this.lang.errorServer = value; });
		this.translate.get('ERROR_SERVERACCESS').subscribe((value) => { this.lang.errorServerAccess = value; });
	}
	
	
	
	openHomePage()
	{
		this.navCtrl.setRoot(HomePage);
	}
	openLastPage()
	{
		this.navCtrl.setRoot(HomePage);
	}
	updateCounters()
	{
		this.api.post('notifications-countNew', { user: this.account.id }).subscribe((res: any) => {
			if (res.status == 'success')
				this.quickMenu.notifications.length = res.counter;
				this.storage.set('quickMenu', this.quickMenu);
				this.events.publish('quickMenu');
		});
	}
	
	
	
	selectTabs(val)
	{
		this.data.tabs = val;
	}
	
	toggleAppTheme()
	{
		this.account.theme = this.selectedTheme.toString();
		this.settings.setActiveTheme(this.selectedTheme);
	}
	
	
	
	saveChanges()
	{
		if (this.data.newPassword.length > 0 && this.data.oldPassword != this.account.password)
		{
			let toast = this.toastCtrl.create({
				message: this.lang.errorPasswordsNotMatch,
				duration: 3000,
				position: 'top'
			});
			toast.present();
		}
		else if (this.data.newPassword.length > 0 && this.data.newPassword.length < 6)
		{
			let toast = this.toastCtrl.create({
				message: this.lang.errorTooShortPassword,
				duration: 3000,
				position: 'top'
			});
			toast.present();
		}
		else if (this.data.newPassword.length > 0 && this.data.newPassword != this.data.newRepass)
		{
			let toast = this.toastCtrl.create({
				message: this.lang.errorPasswordsNotMatch,
				duration: 3000,
				position: 'top'
			});
			toast.present();
		}
		else
		{
			this.api.post('settings-edit', { account: this.account, data: this.data }).subscribe((res: any) => {
				if (res.status == 'success')
				{
					this.storage.set('account', this.account);
					let toast = this.toastCtrl.create({
						message: this.lang.operationSucceed,
						duration: 3000,
						position: 'top'
					});
					toast.present();
				}
				else
				{
					let toast = this.toastCtrl.create({
						message: this.lang.errorServer,
						duration: 3000,
						position: 'top'
					});
					toast.present();
				}
			}, err => {
				console.error('ERROR', err);
				
				let toast = this.toastCtrl.create({
					message: this.lang.errorServerAccess,
					duration: 3000,
					position: 'top'
				});
				toast.present();
			});
		}
	}
	
	ionViewDidEnter()
	{
		if (this.account)
			this.updateCounters();
	}
}
