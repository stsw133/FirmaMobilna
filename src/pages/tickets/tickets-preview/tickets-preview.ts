import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-tickets-preview',
  templateUrl: 'tickets-preview.html'
})

export class TicketsPreviewPage
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
