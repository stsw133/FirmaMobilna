import { Component } from '@angular/core';
import { Platform, NavController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { Api } from '../../../providers';

@Component({
  selector: 'page-tickets-new',
  templateUrl: 'tickets-new.html'
})

export class TicketsNewPage
{
	account = { id: 0 }
	lang = {
		errorFillFields: '',
		operationSucceed: '',
		errorServer: '',
		errorServerAccess: ''
	}
	data = {
		tabs: 0,
		client: null,
		forename: '',
		lastname: '',
		address: '',
		phone: '',
		email: '',
		creator: this.account.id,
		created: '',
		status: 'order',
		priority: 2,
		category: '',
		payment: 0.00,
		starting: new Date().toISOString(),
		ending: new Date().toISOString(),
		description1: '',
		description2: '',
		description3: '',
		note: '',
		employees: ''+this.account.id
	}
	
	
	
	constructor (public platform: Platform, public navCtrl: NavController, public toastCtrl: ToastController, public translate: TranslateService, public storage: Storage, public api: Api)
	{
		this.storage.get('account').then((val) => {
			if (val)
				this.account = val;
		});
		
		this.translate.get('ERROR_FILLFIELDS').subscribe((value) => { this.lang.errorFillFields = value; });
		this.translate.get('OPERATION_SUCCEED').subscribe((value) => { this.lang.operationSucceed = value; });
		this.translate.get('ERROR_SERVER').subscribe((value) => { this.lang.errorServer = value; });
		this.translate.get('ERROR_SERVERACCESS').subscribe((value) => { this.lang.errorServerAccess = value; });
	}
	
	
	
	selectTabs(val)
	{
		this.data.tabs = val;
	}
	
	saveChanges()
	{
		if (this.data.client == '')
		{
			let toast = this.toastCtrl.create({
				message: this.lang.errorFillFields,
				duration: 3000,
				position: 'top'
			});
			toast.present();
		}
		else
		{
			this.api.post('tickets-new', { item: this.data, user: this.account.id }).subscribe((res: any) => {
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
