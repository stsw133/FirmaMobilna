import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, ToastController, AlertController, Events, Select } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { Api } from '../../providers';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-permissions',
  templateUrl: 'permissions.html'
})

export class PermissionsPage
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
		group: 1
	}
	groups: Array<any> = []; modules: Array<any> = [];
	
	
	
	constructor (public platform: Platform, public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public events: Events, public translate: TranslateService, public storage: Storage, public api: Api)
	{
		this.storage.get('account').then((val) => {
			if (val)
				this.account = val;
			this.showItems();
		});
		
		this.translate.get('ERROR_SERVER').subscribe((value) => { this.lang.errorServer = value; })
		this.translate.get('ERROR_SERVERACCESS').subscribe((value) => { this.lang.errorServerAccess = value; })
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
		this.storage.get('groupsList').then((val) => {
			if (val)
			{
				this.groups = [];
				val.forEach((item) => {
                    this.groups.push({
						id: item.id,
						name: item.name,
						blockade: item.blockade,
						creator: item.creator
					});
				});
			}
		});
		this.storage.get('modulesList').then((val) => {
			if (val)
			{
				this.modules = [];
				val.forEach((item) => {
                    this.modules.push({
						id: item.id,
						name: item.name,
						icon: item.icon,
						actions: {}
					});
				});
				
				this.storage.get('actionsList').then((val2) => {
					if (val2)
					{
						for (let i = 0; i < this.modules.length; i++)
						{
							this.modules[i].actions = val2;
							this.modules[i].actions.forEach((item) => {
								item.allowed = false;
							});
						}
					}
				});
			}
		});
		
		this.storage.get('permissionsList').then((val) => {
			if (val)
			{
				val.forEach((item) => {
					// this.modules[this.modules.findIndex(x => x.id==item.module)].actions.push(item.action);
					if (item.action=='list' && item.group==this.data.group) this.modules[this.modules.findIndex(x => x.id==item.module)].actions.list = true;
					if (item.action=='get' && item.group==this.data.group) this.modules[this.modules.findIndex(x => x.id==item.module)].actions.get = true;
					if (item.action=='set' && item.group==this.data.group) this.modules[this.modules.findIndex(x => x.id==item.module)].actions.set = true;
					if (item.action=='del' && item.group==this.data.group) this.modules[this.modules.findIndex(x => x.id==item.module)].actions.del = true;
					if (item.action=='people' && item.group==this.data.group) this.modules[this.modules.findIndex(x => x.id==item.module)].actions.people = true;
				});
				this.updateCounters();
			}
		});
		
		this.api.post('permissions-list', { group: this.data.group }).subscribe((res: any) => {
			if (res.status == 'success')
			{
				for (let i = 0; i < this.modules.length; i++)
					this.modules[i].actions = { list: false, get: false, set: false, del: false, people: false };
				res.permissions.forEach((item) => {
					// this.modules[this.modules.findIndex(x => x.id==item.module)].actions.push(item.action);
					if (item.action=='list' && item.group==this.data.group) this.modules[this.modules.findIndex(x => x.id==item.module)].actions.list = true;
					if (item.action=='get' && item.group==this.data.group) this.modules[this.modules.findIndex(x => x.id==item.module)].actions.get = true;
					if (item.action=='set' && item.group==this.data.group) this.modules[this.modules.findIndex(x => x.id==item.module)].actions.set = true;
					if (item.action=='del' && item.group==this.data.group) this.modules[this.modules.findIndex(x => x.id==item.module)].actions.del = true;
					if (item.action=='people' && item.group==this.data.group) this.modules[this.modules.findIndex(x => x.id==item.module)].actions.people = true;
				});
				this.storage.set('permissionsList',res.permissions);
			}
		}, err => {
			console.error('ERROR', err);
		});
	}
	
	refreshPage()
	{
		this.showItems();
	}
	
	setPerm(module,action,value)
	{
		this.api.post('permissions-setPerm', { user: this.account.id, group: this.data.group, module: module.id, action: action, value: value }).subscribe((res: any) => {
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
	
	ionViewDidEnter()
	{
		if (this.account)
			this.updateCounters();
	}
}
