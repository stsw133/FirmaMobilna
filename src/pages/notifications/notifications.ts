import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, ToastController, AlertController, ModalController, Select } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { Api } from '../../providers';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})

export class NotificationsPage
{
	@ViewChild('searchbarFilter') searchbarFilter: Select;
	
	account = { id: 0 }
	quickMenu = {
		messages: [],
		notifications: [],
		warnings: []
	}
	lang = {
		errorServer: '',
		errorServerAccess: ''
	}
	data = {
		filterType: 'creator',
		filterValue: '',
		tabs: 0,
		showAll: false
	}
	items: Array<any> = [];
	
	
	
	constructor (public platform: Platform, public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController, public translate: TranslateService, public storage: Storage, public api: Api)
	{
		this.storage.get('account').then((val) => {
			if (val)
				this.account = val;
			this.showItems();
		});
		
		this.translate.get('ERROR_SERVER').subscribe((value) => { this.lang.errorServer = value; })
		this.translate.get('ERROR_SERVERACCESS').subscribe((value) => { this.lang.errorServerAccess = value; })
	}
	
	
	
	selectTabs(val)
	{
		if (val!=this.data.tabs)
			this.changeVisibility();
		this.data.tabs = val;
	}
	
	showItems()
	{
		this.storage.get('notificationsList').then((val) => {
			if (val)
			{
				this.items = [];
				val.forEach((item) => {
                    this.items.push({
						id: item.id,
						content: item.content,
						subject: item.subject,
						creator: item.creator,
						creatorName: item.creatorName,
						created: item.created.slice(0,10)+', '+item.created.slice(11,19),
						read: item.read,
						important: item.important
					});
				});
			}
		});
		
		this.api.post('notifications-list', { user: this.account.id, read: (this.data.showAll ? null : false) }).subscribe((res: any) => {
			if (res.status == 'success')
			{
				this.items = [];
				res.list.forEach((item) => {
                    this.items.push({
						id: item.id,
						content: item.content,
						subject: item.subject,
						creator: item.creator,
						creatorName: item.creatorName,
						created: item.created.slice(0,10)+', '+item.created.slice(11,19),
						read: item.read,
						important: item.important
					});
				});
				this.storage.set('notificationsList',res.list);
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
		
		this.storage.get('notificationsList').then((val) => {
			if (val)
			{
				this.items = [];
				val.forEach((item) => {
					if ((this.data.filterType == 'creator' && item.creatorName.toLowerCase().includes(this.data.filterValue.toLowerCase()))
					|| (this.data.filterType == 'content' && item.content.toLowerCase().includes(this.data.filterValue.toLowerCase()))
					|| (this.data.filterType == 'subject' && item.subject.includes(this.data.filterValue))
					|| (this.data.filterType == 'timestamp' && item.created.includes(this.data.filterValue)))
						this.items.push({
							id: item.id,
							content: item.content,
							subject: item.subject,
							creator: item.creator,
							creatorName: item.creatorName,
							created: item.created.slice(0,10)+', '+item.created.slice(11,19),
							read: item.read,
							important: item.important
						});
				});
			}
		});
	}
	
	changeVisibility()
	{
		this.data.showAll = !this.data.showAll;
		this.showItems();
	}
	
	setRead(item)
	{
		this.api.post('notifications-setRead', { id: item.id, read: item.read }).subscribe((res: any) => {
			if (res.status == 'success')
			{
				this.showItems();
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
}
