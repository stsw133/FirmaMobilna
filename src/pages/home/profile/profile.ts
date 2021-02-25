import { Component } from '@angular/core';
import { Platform, NavController, ToastController, AlertController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { Api } from '../../../providers';

import { NotificationsPage } from '../../notifications/notifications';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage
{
	account = { id: 0, group: 0 }
	messages = []; notifications = []; warnings = [];
	data = {
		groupName: ''
	}
	
	
	
	constructor (public platform: Platform, public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController, public translate: TranslateService, public storage: Storage, public api: Api)
	{
		this.storage.get('account').then((val) => {
			if (val)
				this.account = val;
			
			this.storage.get('groupsList').then((val2) => {
				if (val2)
					this.data.groupName = val2[val2.findIndex(x => x.id==this.account.group)].name;
			});
			
			this.updateCounters();
		});
	}
	
	
	
	updateCounters()
	{
		this.api.post('notifications-countNew', { user: this.account.id }).subscribe((res: any) => {
			if (res.status == 'success')
				this.notifications.length = res.counter;
		});
	}
	
	showNotifications()
	{
		let modal = this.modalCtrl.create(NotificationsPage, null);
		modal.present();
	}
	
	ionViewWillEnter()
	{
		if (this.account)
			this.updateCounters();
	}
}
