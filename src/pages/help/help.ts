import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { Api } from '../../providers';

@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})

export class HelpPage
{
	account = { id: 0 }
	notifications = []; warnings = [];
	
	constructor (public platform: Platform, public navCtrl: NavController, public translate: TranslateService, public storage: Storage, public api: Api)
	{
		this.storage.get('account').then((val) => {
			if (val)
				this.account = val;
		});
	}
	
	openDocumentation()
	{
		// this.navCtrl.push(HelpDocumentationPage);
		window.open('../../assets/help/doc-en.pdf');
	}
}
