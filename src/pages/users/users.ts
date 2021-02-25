import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, ToastController, AlertController, ModalController, Events, Select } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { Api } from '../../providers';

import { HomePage } from '../home/home';
import { UsersNewPage } from './users-new/users-new';
import { UsersPreviewPage } from './users-preview/users-preview';
import { UsersEditPage } from './users-edit/users-edit';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})

export class UsersPage
{
	@ViewChild('searchbarFilter') searchbarFilter: Select;
	
	account = { id: 0 };
	quickMenu = {
		messages: [],
		notifications: [],
		warnings: []
	}
	lang = {
		dismiss: '',
		usersDeleteTitle: '',
		usersDeleteMessage: '',
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
		
		this.translate.get('DISMISS').subscribe((value) => { this.lang.dismiss = value; });
		this.translate.get('USERS_DELETE_TITLE').subscribe((value) => { this.lang.usersDeleteTitle = value; });
		this.translate.get('USERS_DELETE_MESSAGE').subscribe((value) => { this.lang.usersDeleteMessage = value; });
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
		
		this.storage.get('usersList').then((val) => {
			if (val)
			{
				this.items = [];
				val.forEach((item) => {
                    this.items.push({
						id: item.id,
						username: item.username,
						email: item.email,
						password: item.password,
						repass: item.password,
						group: item.group,
						active: item.active,
						language: item.language,
						forename: item.forename,
						lastname: item.lastname,
						created: item.created.slice(0,10)+', '+item.created.slice(11,19),
						logged: item.logged.slice(0,10)+', '+item.logged.slice(11,19),
						phone: item.phone
					});
				});
				this.updateCounters();
			}
		});
		
		this.api.post('users-list', { filterValue: '%%' }).subscribe((res: any) => {
			if (res.status == 'success')
			{
				this.items = [];
				res.list.forEach((item) => {
                    this.items.push({
						id: item.id,
						username: item.username,
						email: item.email,
						password: item.password,
						repass: item.password,
						group: item.group,
						active: item.active,
						language: item.language,
						forename: item.forename,
						lastname: item.lastname,
						created: item.created.slice(0,10)+', '+item.created.slice(11,19),
						logged: item.logged.slice(0,10)+', '+item.logged.slice(11,19),
						phone: item.phone
					});
				});
				this.storage.set('usersList',res.list);
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
		
		this.storage.get('usersList').then((val) => {
			if (val)
			{
				this.data.collapseID = -1;
				this.items = [];
				val.forEach((item) => {
					if ((this.data.filterType == 'fullname' && (item.forename+' '+item.lastname).toLowerCase().includes(this.data.filterValue.toLowerCase()))
					|| (this.data.filterType == 'email' && item.email.toLowerCase().includes(this.data.filterValue.toLowerCase()))
					|| (this.data.filterType == 'phone' && item.phone.includes(this.data.filterValue)))
						this.items.push({
							id: item.id,
							username: item.username,
							email: item.email,
							password: item.password,
							repass: item.password,
							group: item.group,
							active: item.active,
							language: item.language,
							forename: item.forename,
							lastname: item.lastname,
							created: item.created.slice(0,10)+', '+item.created.slice(11,19),
							logged: item.logged.slice(0,10)+', '+item.logged.slice(11,19),
							phone: item.phone
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
		let modal = this.modalCtrl.create(UsersNewPage, null);
		modal.present();
		// this.navCtrl.setRoot(UsersNewPage);
	}
	
	previewItem(item)
	{
		let modal = this.modalCtrl.create(UsersPreviewPage, { item: item });
		modal.present();
		// this.navCtrl.setRoot(UsersPreviewPage);
	}
	
	editItem(item)
	{
		let modal = this.modalCtrl.create(UsersEditPage, { item: item });
		modal.present();
		// this.navCtrl.setRoot(UsersEditPage);
	}
	
	deleteItem(item)
	{
		const confirm = this.alertCtrl.create({
			title: this.lang.usersDeleteTitle,
			message: this.lang.usersDeleteMessage,
			buttons: [
			{
				text: this.lang.yes,
				handler: () => {
					this.api.post('users-delete', { id: item.id, user: this.account.id }).subscribe((res: any) => {
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
