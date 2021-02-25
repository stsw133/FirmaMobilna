import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-clients-preview',
  templateUrl: 'clients-preview.html'
})

export class ClientsPreviewPage
{
	account = { id: 0 }
	data = {
		tabs: 0
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
	
	
	
	selectTabs(val)
	{
		this.data.tabs = val;
	}
}
