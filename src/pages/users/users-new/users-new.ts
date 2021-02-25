import { Component } from '@angular/core';
import { Platform, NavController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { Api } from '../../../providers';

@Component({
  selector: 'page-users-new',
  templateUrl: 'users-new.html'
})

export class UsersNewPage
{
	account = { id: 0 }
	lang = {
		errorFillFields: '',
		errorTooShortPassword: '',
		errorPasswordsNotMatch: '',
		operationSucceed: '',
		registerUsernameTaken: '',
		registerEmailTaken: '',
		registerEmailNotExists: '',
		errorServer: '',
		errorServerAccess: ''
	}
	data = {
		username: '',
		email: '',
		password: '',
		repass: '',
		group: 2,
		language: (this.translate.getBrowserLang() ? this.translate.getBrowserLang() : 'en'),
		forename: '',
		lastname: ''
	}
	
	constructor (public platform: Platform, public navCtrl: NavController, public toastCtrl: ToastController, public translate: TranslateService, public storage: Storage, public api: Api)
	{
		this.storage.get('account').then((val) => {
			if (val)
				this.account = val;
		});
		
		this.translate.get('ERROR_FILLFIELDS').subscribe((value) => { this.lang.errorFillFields = value; });
		this.translate.get('ERROR_TOOSHORTPASSWORD').subscribe((value) => { this.lang.errorTooShortPassword = value; });
		this.translate.get('ERROR_PASSWORDSNOTMATCH').subscribe((value) => { this.lang.errorPasswordsNotMatch = value; });
		this.translate.get('OPERATION_SUCCEED').subscribe((value) => { this.lang.operationSucceed = value; });
		this.translate.get('REGISTER_USERNAMETAKEN').subscribe((value) => { this.lang.registerUsernameTaken = value; });
		this.translate.get('REGISTER_EMAILTAKEN').subscribe((value) => { this.lang.registerEmailTaken = value; });
		this.translate.get('REGISTER_EMAILNOTEXISTS').subscribe((value) => { this.lang.registerEmailNotExists = value; });
		this.translate.get('ERROR_SERVER').subscribe((value) => { this.lang.errorServer = value; });
		this.translate.get('ERROR_SERVERACCESS').subscribe((value) => { this.lang.errorServerAccess = value; });
	}
	
	saveChanges()
	{
		if (this.data.username == '' || this.data.email == '' || this.data.password == '' || this.data.repass == '' || this.data.forename == '' || this.data.lastname == '')
		{
			let toast = this.toastCtrl.create({
				message: this.lang.errorFillFields,
				duration: 3000,
				position: 'top'
			});
			toast.present();
		}
		else if (this.data.password.length < 6)
		{
			let toast = this.toastCtrl.create({
				message: this.lang.errorTooShortPassword,
				duration: 3000,
				position: 'top'
			});
			toast.present();
		}
		else if (this.data.repass != this.data.password)
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
			this.api.post('users-new', { item: this.data, user: this.account.id }).subscribe((res: any) => {
				if (res.status == 'success')
				{
					let toast = this.toastCtrl.create({
						message: this.lang.operationSucceed,
						duration: 3000,
						position: 'top'
					});
					toast.present();
					this.navCtrl.pop();
				}
				else if (res.status == 'username_taken')
				{
					let toast = this.toastCtrl.create({
						message: this.lang.registerUsernameTaken,
						duration: 3000,
						position: 'top'
					});
					toast.present();
				}
				else if (res.status == 'email_taken')
				{
					let toast = this.toastCtrl.create({
						message: this.lang.registerEmailTaken,
						duration: 3000,
						position: 'top'
					});
					toast.present();
				}
				else if (res.status == 'email_notExists')
				{
					let toast = this.toastCtrl.create({
						message: this.lang.registerEmailNotExists,
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
}
