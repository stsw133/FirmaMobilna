import { Component } from '@angular/core';
import { Platform, NavController, ToastController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { Api, SettingsProvider } from '../../providers';

import { RegisterPage } from './register/register';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage
{
	warnings = [];
	lang = {
		dismiss: '',
		loginUserBlocked: '',
		loginInvalid: '',
		errorServer: '',
		errorServerAccess: ''
	}
	data = {
		nip: '',
		username: '',
		password: '',
		staylogged: true
	}
	
	
	
	constructor (public platform: Platform, public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public translate: TranslateService, public storage: Storage, public api: Api, public settings: SettingsProvider)
	{
		storage.get('account').then((val) => {
			if (val)
			{
				if (val.theme)
					this.settings.setActiveTheme(val.theme);
				this.navCtrl.setRoot(HomePage);
			}
		});
		
		this.translate.get('DISMISS').subscribe((value) => { this.lang.dismiss = value; });
		this.translate.get('LOGIN_USERBLOCKED').subscribe((value) => { this.lang.loginUserBlocked = value; });
		this.translate.get('LOGIN_INVALID').subscribe((value) => { this.lang.loginInvalid = value; });
		this.translate.get('ERROR_SERVER').subscribe((value) => { this.lang.errorServer = value; });
		this.translate.get('ERROR_SERVERACCESS').subscribe((value) => { this.lang.errorServerAccess = value; });
	}
	
	
	
	showWarnings()
	{
		let toast = this.alertCtrl.create({
			message: this.warnings[0],
			buttons: [this.lang.dismiss]
		});
		toast.present();
	}
	
	
	
	doLogin()
	{
		this.api.post('login', this.data).subscribe((res: any) => {
			if (res.status == 'success')
			{
				if (!res.data.active)
				{
					let toast = this.toastCtrl.create({
						message: this.lang.loginUserBlocked,
						duration: 3000,
						position: 'top'
					});
					toast.present();
				}
				else
				{
					this.storage.set('account', res.data);
					this.translate.use(res.data.language);
					this.settings.setActiveTheme(res.data.theme);
					this.navCtrl.setRoot(HomePage);
				}
			}
			else if (res.status)
			{
				let toast = this.toastCtrl.create({
					message: this.lang.loginInvalid,
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
	
	goRegister()
	{
		this.navCtrl.push(RegisterPage);
	}
}
