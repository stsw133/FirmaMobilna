import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-users-preview',
  templateUrl: 'users-preview.html'
})

export class UsersPreviewPage
{
	account = { id: 0 }
	data = {
		extendedInfo: false,
		showUsername: false,
		showPassword: false
	}
	selectedItem: any;
	
	constructor (public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public storage: Storage)
	{
		this.storage.get('account').then((val) => {
			if (val)
				this.account = val;
		});
		this.selectedItem = navParams.get('item');
	}
	
	extendInfo()
	{
		this.data.extendedInfo = !this.data.extendedInfo;
	}
	showUsername()
	{
		this.data.showUsername = !this.data.showUsername;
	}
	showPassword()
	{
		this.data.showPassword = !this.data.showPassword;
	}
}
