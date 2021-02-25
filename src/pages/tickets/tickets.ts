import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, ToastController, AlertController, ModalController, Events, Select } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { Api } from '../../providers';

import { HomePage } from '../home/home';
import { TicketsNewPage } from './tickets-new/tickets-new';
import { TicketsPreviewPage } from './tickets-preview/tickets-preview';
import { TicketsEditPage } from './tickets-edit/tickets-edit';

@Component({
  selector: 'page-tickets',
  templateUrl: 'tickets.html'
})

export class TicketsPage
{
	@ViewChild('searchbarFilter') searchbarFilter: Select;
	
	account = { id: 0 }
	quickMenu = {
		messages: [],
		notifications: [],
		warnings: []
	}
	lang = {
		ticketsDeleteTitle: '',
		ticketsDeleteMessage: '',
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
		
		this.translate.get('TICKETS_DELETE_TITLE').subscribe((value) => { this.lang.ticketsDeleteTitle = value; });
		this.translate.get('TICKETS_DELETE_MESSAGE').subscribe((value) => { this.lang.ticketsDeleteMessage = value; });
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
		
		this.storage.get('ticketsList').then((val) => {
			if (val)
			{
				this.items = [];
				val.forEach((item) => {
                    this.items.push({
						id: item.id,
						client: item.client,
						forename: item.forename,
						lastname: item.lastname,
						address: item.address,
						phone: item.phone,
						email: item.email,
						creator: item.creator,
						created: item.created.slice(0,10)+', '+item.created.slice(11,19),
						status: item.status,
						priority: item.priority,
						category: item.category,
						payment: item.payment,
						starting: item.starting.slice(0,10)+', '+item.starting.slice(11,19),
						ending: item.ending.slice(0,10)+', '+item.ending.slice(11,19),
						description1: item.description1,
						description2: item.description2,
						description3: item.description3,
						note: item.note,
						employees: item.employees
					});
				});
				this.updateCounters();
			}
		});
		
		this.api.post('tickets-list', { filter: '%%' }).subscribe((res: any) => {
			if (res.status == 'success')
			{
				this.items = [];
				res.list.forEach((item) => {
                    this.items.push({
						id: item.id,
						client: item.client,
						forename: item.forename,
						lastname: item.lastname,
						address: item.address,
						phone: item.phone,
						email: item.email,
						creator: item.creator,
						created: item.created.slice(0,10)+', '+item.created.slice(11,19),
						status: item.status,
						priority: item.priority,
						category: item.category,
						payment: item.payment,
						starting: item.starting.slice(0,10)+', '+item.starting.slice(11,19),
						ending: item.ending.slice(0,10)+', '+item.ending.slice(11,19),
						description1: item.description1,
						description2: item.description2,
						description3: item.description3,
						note: item.note,
						employees: item.employees
					});
				});
				this.storage.set('ticketsList',res.list);
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
		
		this.storage.get('ticketsList').then((val) => {
			if (val)
			{
				this.data.collapseID = -1;
				
				this.items = [];
				val.forEach((item) => {
					if ((this.data.filterType == 'fullname' && (item.forename+' '+item.lastname).includes(this.data.filterValue))
					|| (this.data.filterType == 'address' && item.address.includes(this.data.filterValue)))
						this.items.push({
							id: item.id,
							client: item.client,
							forename: item.forename,
							lastname: item.lastname,
							address: item.address,
							phone: item.phone,
							email: item.email,
							creator: item.creator,
							created: item.created.slice(0,10)+', '+item.created.slice(11,19),
							status: item.status,
							priority: item.priority,
							category: item.category,
							payment: item.payment,
							starting: item.starting.slice(0,10)+', '+item.starting.slice(11,19),
							ending: item.ending.slice(0,10)+', '+item.ending.slice(11,19),
							description1: item.description1,
							description2: item.description2,
							description3: item.description3,
							note: item.note,
							employees: item.employees
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
		let modal = this.modalCtrl.create(TicketsNewPage, null);
		modal.present();
		// this.navCtrl.setRoot(TicketsNewPage);
	}
	
	previewItem(item)
	{
		let modal = this.modalCtrl.create(TicketsPreviewPage, { item: item });
		modal.present();
		// this.navCtrl.setRoot(TicketsPreviewPage);
	}
	
	editItem(item)
	{
		let modal = this.modalCtrl.create(TicketsEditPage, { item: item });
		modal.present();
		// this.navCtrl.setRoot(TicketsEditPage);
	}
	
	deleteItem(item)
	{
		const confirm = this.alertCtrl.create({
			title: this.lang.ticketsDeleteTitle,
			message: this.lang.ticketsDeleteMessage,
			buttons: [
			{
				text: this.lang.yes,
				handler: () => {
					this.api.post('tickets-delete', { id: item.id, user: this.account.id }).subscribe((res: any) => {
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
