import { Component } from '@angular/core';
import { Platform, NavController, NavParams, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { Api } from '../../../providers';

@Component({
  selector: 'page-clients-edit',
  templateUrl: 'clients-edit.html'
})

export class ClientsEditPage
{
	account = { id: 0 }
	lang = {
		errorFillFields: '',
		operationSucceed: '',
		errorServer: '',
		errorServerAccess: ''
	}
	data = {
		tabs: 0
	}
	selectedItem: any;
	
	
	
	constructor (public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public translate: TranslateService, public storage: Storage, public api: Api)
	{
		this.storage.get('account').then((val) => {
			if (val)
				this.account = val;
		});
		this.selectedItem = navParams.get('item');
		
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
		if (this.selectedItem.forename == '' || this.selectedItem.lastname == '' || this.selectedItem.address == '')
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
			this.api.post('clients-edit', { item: this.selectedItem, user: this.account.id }).subscribe((res: any) => {
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
