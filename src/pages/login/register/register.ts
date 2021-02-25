import { Component } from '@angular/core';
import { Platform, NavController, ToastController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Api } from '../../../providers';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

export class RegisterPage
{
	warnings = [];
	lang = {
		dismiss: '',
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
		language: (this.translate.getBrowserLang() ? this.translate.getBrowserLang() : 'en'),
		forename: '',
		lastname: ''
	}
	
	
	
	constructor (public platform: Platform, public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public translate: TranslateService, public api: Api)
	{
		this.translate.get('DISMISS').subscribe((value) => { this.lang.dismiss = value; });
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
	
	
	
	showWarnings()
	{
		let toast = this.alertCtrl.create({
			message: this.warnings[0],
			buttons: [this.lang.dismiss]
		});
		toast.present();
	}
	
	
	
	doRegister()
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
			this.api.post('register', this.data).subscribe((res: any) => {
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
		};
	}
}
