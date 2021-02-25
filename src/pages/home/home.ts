import { Component } from '@angular/core';
import { Platform, NavController, ToastController, AlertController, ModalController, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { Api } from '../../providers';

import { LoginPage } from '../login/login';
import { ProfilePage } from './profile/profile';
import { UsersPage } from '../users/users';
import { NotificationsPage } from '../notifications/notifications';
import { ClientsPage } from '../clients/clients';
import { TicketsPage } from '../tickets/tickets';
import { CalendarPage } from '../calendar/calendar';
import { PermissionsPage } from '../permissions/permissions';
import { SettingsPage } from '../settings/settings';
// import { HelpPage } from '../help/help';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage
{
	account = { id: 0, language: 'en', group: 0 };
	quickMenu = {
		messages: [],
		notifications: [],
		warnings: []
	}
	lang = {
		dismiss: '',
		errorNoAccessToModule: ''
	}
	data = {
		filterValue: ''
	}
	modules: Array<any> = []; permissions: Array<any> = [];
	
	
	
	constructor (public platform: Platform, public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController, public events: Events, public translate: TranslateService, public storage: Storage, public api: Api)
	{
		this.storage.get('account').then((val) => {
			if (val)
				this.account = val;
			this.checkPermissions();
		});
		
		this.translate.get('DISMISS').subscribe((value) => { this.lang.dismiss = value; })
		this.translate.get('ERROR_NOACCESSTOMODULE').subscribe((value) => { this.lang.errorNoAccessToModule = value; })
	}
	
	
	
	updateCounters()
	{
		this.api.post('notifications-countNew', { user: this.account.id }).subscribe((res: any) => {
			if (res.status == 'success')
				this.quickMenu.notifications.length = res.counter;
				// if (this.modules[0]) this.modules[this.modules.findIndex(x => x.component=='NotificationsPage')].counter = res.counter;
				this.storage.set('quickMenu', this.quickMenu);
				this.events.publish('quickMenu');
		});
	}
	checkPermissions()
	{
		this.api.post('permissions-list', null).subscribe((res: any) => {
			if (res.status == 'success')
			{
				this.storage.set('groupsList',res.groups);
				this.storage.set('modulesList',res.modules);
				this.storage.set('permissionsList',res.permissions);
			}
			this.showItems();
		});
	}
	
	
	
	showItems()
	{
		this.storage.get('modulesList').then((val) => {
			if (val)
			{
				this.modules = [];
				val.forEach((item) => {
                    this.modules.push({
						id: item.id,
						name: item.name,
						component: item.component,
						icon: item.icon,
						disabled: item.disabled
					});
				});
				this.updateCounters();
			}
		});
		
		this.storage.get('permissionsList').then((val) => {
			if (val)
			{
				this.permissions = [];
				val.forEach((item) => {
					this.permissions.push({
						id: item.id,
						group: item.group,
						groupName: item.groupName,
						module: item.module,
						moduleName: item.moduleName,
						action: item.action
					});
				});
			}
		});
	}
	
	searchItems(ev)
	{
		this.data.filterValue = ev.target.value || '';
		
		this.storage.get('modulesList').then((val) => {
			if (val)
			{
				this.modules = [];
				val.forEach((item) => {
					if (item.name.toLowerCase().includes(this.data.filterValue.toLowerCase()))
						this.modules.push({
							id: item.id,
							name: item.name,
							component: item.component,
							icon: item.icon,
							disabled: item.disabled
						});
				});
			}
		});
	}
	
	openProfilePage()
	{
		let modal = this.modalCtrl.create(ProfilePage, null);
		modal.present();
	}
	
	openPage(page)
	{
		if (this.permissions[this.permissions.findIndex(x => (x.group==this.account.group && x.module==page.id && x.action=='list'))])
		{
			if (page.component=='UsersPage') this.navCtrl.setRoot(UsersPage);
			else if (page.component=='ClientsPage') this.navCtrl.setRoot(ClientsPage);
			else if (page.component=='TicketsPage') this.navCtrl.setRoot(TicketsPage);
			else if (page.component=='CalendarPage') this.navCtrl.setRoot(CalendarPage);
			else if (page.component=='PermissionsPage') this.navCtrl.setRoot(PermissionsPage);
			else if (page.component=='SettingsPage') this.navCtrl.setRoot(SettingsPage);
			else if (page.component=='HelpPage') window.open('../../assets/help/doc-'+this.account.language+'.pdf');
		}
		else
		{
			let toast = this.alertCtrl.create({
				message: this.lang.errorNoAccessToModule,
				buttons: [this.lang.dismiss]
			});
			toast.present();
		}
	}
	
	logout()
	{
		this.storage.clear();
		this.navCtrl.setRoot(LoginPage);
	}
	
	ionViewDidEnter()
	{
		if (this.account)
			this.checkPermissions();
	}
}
