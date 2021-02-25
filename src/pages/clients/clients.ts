import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, ToastController, AlertController, ModalController, Events, Select } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { Api } from '../../providers';

import { HomePage } from '../home/home';
import { ClientsNewPage } from './clients-new/clients-new';
import { ClientsPreviewPage } from './clients-preview/clients-preview';
import { ClientsEditPage } from './clients-edit/clients-edit';

@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html'
})

export class ClientsPage
{
	@ViewChild('searchbarFilter') searchbarFilter: Select;
	
	account = { id: 0 }
	quickMenu = {
		messages: [],
		notifications: [],
		warnings: []
	}
	lang = {
		clientsDeleteTitle: '',
		clientsDeleteMessage: '',
		yes: '',
		no: '',
		operationSucceed: '',
		errorServer: '',
		errorServerAccess: ''
	}
	data = {
		filterType: 'fullname',
		filterValue: '',
		collapseID: -1
	}
	items: Array<any> = [];
	
	
	
	constructor (public platform: Platform, public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController, public events: Events, public translate: TranslateService, public storage: Storage, public api: Api)
	{
		this.storage.get('account').then((val) => {
			if (val)
				this.account = val;
			this.showItems();
		});
		
		this.translate.get('CLIENTS_DELETE_TITLE').subscribe((value) => { this.lang.clientsDeleteTitle = value; });
		this.translate.get('CLIENTS_DELETE_MESSAGE').subscribe((value) => { this.lang.clientsDeleteMessage = value; });
		this.translate.get('YES').subscribe((value) => { this.lang.yes = value; });
		this.translate.get('NO').subscribe((value) => { this.lang.no = value; });
		this.translate.get('OPERATION_SUCCEED').subscribe((value) => { this.lang.operationSucceed = value; });
		this.translate.get('ERROR_SERVER').subscribe((value) => { this.lang.errorServer = value; });
		this.translate.get('ERROR_SERVERACCESS').subscribe((value) => { this.lang.errorServerAccess = value; });
	}
	
	
	
	openHomePage()
	{
		this.navCtrl.setRoot(HomePage);
	}
	openLastPage()
	{
		this.navCtrl.setRoot(HomePage);
	}
	updateCounters()
	{
		this.api.post('notifications-countNew', { user: this.account.id }).subscribe((res: any) => {
			if (res.status == 'success')
				this.quickMenu.notifications.length = res.counter;
				this.storage.set('quickMenu', this.quickMenu);
				this.events.publish('quickMenu');
		});
	}
	
	
	
	showItems()
	{
		this.data.collapseID = -1;
		
		this.storage.get('clientsList').then((val) => {
			if (val)
			{
				this.items = [];
				val.forEach((item) => {
                    this.items.push({
						id: item.id,
						forename: item.forename,
						lastname: item.lastname,
						address: item.address,
						phone: item.phone,
						email: item.email,
						creator: item.creator,
						created: item.created.slice(0,10)+', '+item.created.slice(11,19),
						type: item.type,
						status: item.status,
						pesel: item.pesel,
						note: item.note
					});
				});
				this.updateCounters();
			}
		});
		
		this.api.post('clients-list', { filter: '%%' }).subscribe((res: any) => {
			if (res.status == 'success')
			{
				this.items = [];
				res.list.forEach((item) => {
                    this.items.push({
						id: item.id,
						forename: item.forename,
						lastname: item.lastname,
						address: item.address,
						phone: item.phone,
						email: item.email,
						creator: item.creator,
						created: item.created.slice(0,10)+', '+item.created.slice(11,19),
						type: item.type,
						status: item.status,
						pesel: item.pesel,
						note: item.note
					});
				});
				this.storage.set('clientsList',res.list);
			}
		}, err => {
			console.error('ERROR', err);
		});
	}
	
	refreshPage()
	{
		this.showItems();
	}
	
	selectSearchbarFilter()
	{
		this.searchbarFilter.open();
	}
	
	searchItems(ev)
	{
		this.data.filterValue = ev.target.value || '';
		
		this.storage.get('clientsList').then((val) => {
			if (val)
			{
				this.data.collapseID = -1;
				
				this.items = [];
				val.forEach((item) => {
					if ((this.data.filterType == 'fullname' && (item.forename+' '+item.lastname).toLowerCase().includes(this.data.filterValue.toLowerCase()))
					|| (this.data.filterType == 'address' && item.address.toLowerCase().includes(this.data.filterValue.toLowerCase())))
						this.items.push({
							id: item.id,
							forename: item.forename,
							lastname: item.lastname,
							address: item.address,
							phone: item.phone,
							email: item.email,
							creator: item.creator,
							created: item.created.slice(0,10)+', '+item.created.slice(11,19),
							type: item.type,
							status: item.status,
							pesel: item.pesel,
							note: item.note
						});
				});
			}
		});
	}
	
	collapseItem(item)
	{
		for (let i = 0; i < this.items.length; i++)
		{
			this.items[i].color = '';
		}
		
		if (this.data.collapseID == -1 || this.data.collapseID != this.items.indexOf(item))
		{
			this.data.collapseID = this.items.indexOf(item);
			item.color = 'lgray';
		}
		else
		{
			this.data.collapseID = -1;
		}
	}
	
	newItem()
	{
		let modal = this.modalCtrl.create(ClientsNewPage, null);
		modal.present();
		// this.navCtrl.setRoot(ClientsNewPage);
	}
	
	previewItem(item)
	{
		let modal = this.modalCtrl.create(ClientsPreviewPage, { item: item });
		modal.present();
		// this.navCtrl.setRoot(ClientsPreviewPage);
	}
	
	editItem(item)
	{
		let modal = this.modalCtrl.create(ClientsEditPage, { item: item });
		modal.present();
		// this.navCtrl.setRoot(ClientsEditPage);
	}
	
	deleteItem(item)
	{
		const confirm = this.alertCtrl.create({
			title: this.lang.clientsDeleteTitle,
			message: this.lang.clientsDeleteMessage,
			buttons: [
			{
				text: this.lang.yes,
				handler: () => {
					this.api.post('clients-delete', { id: item.id, user: this.account.id }).subscribe((res: any) => {
						if (res.status == 'success')
						{
							var index = this.items.indexOf(item);
							if (index > -1) { this.items.splice(index,1); }
							
							let toast = this.toastCtrl.create({
								message: this.lang.operationSucceed,
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
			},
			{
				text: this.lang.no,
				handler: () => {}
			}]
		});
		confirm.present();
	}
	
	ionViewDidEnter()
	{
		if (this.account)
			this.updateCounters();
	}
}
