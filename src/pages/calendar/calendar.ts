import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Events, Select } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

import { Api } from '../../providers';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})

export class CalendarPage
{
	@ViewChild('viewMode') viewMode: Select;
	
	account = {
		id: 0,
		perms: ''
	}
	quickMenu = {
		messages: [],
		notifications: [],
		warnings: []
	}
	data = {
		modeType: 'daily',
		event: '',
		collapseID: -1
	}
	msg = {
		warning_noConnection: ''
	}
	items: Array<{
		num: number,
		events: any,
		color: ''
	}>;
	
	constructor (public platform: Platform, public navCtrl: NavController, public events: Events, public translate: TranslateService, public storage: Storage, public api: Api)
	{
		this.storage.get('account').then((val) => {
			if (val)
				this.account = val;
			this.updateCounters();
			this.showCalendar();
		});
		this.translate.get('WARNING_NOCONNECTION').subscribe((value) => { this.msg.warning_noConnection = value; })
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
	
	
	
	showCalendar()
	{
		this.data.collapseID = -1;
		
		this.items = [];
		if (this.data.modeType=='daily')
		{
			for (let i = 0; i < 24; i++)
			{
				this.items.push({
					num: i,
					events: this.account,
					color: ''
				});
			}
		}
		else if (this.data.modeType=='weekly')
		{
			for (let i = 0; i < 7; i++)
			{
				this.items.push({
					num: i,
					events: this.account,
					color: ''
				});
			}
		}
	}
	
	refreshPage()
	{
		this.showCalendar();
	}
	
	selectViewMode()
	{
		this.viewMode.open();
	}
	
	collapseItem(item,ev)
	{
		for (let i = 0; i < this.items.length; i++)
		{
			this.items[i].color = '';
		}
		
		if (this.data.collapseID == -1 || this.data.collapseID != this.items.indexOf(item))
		{
			this.data.collapseID = this.items.indexOf(item);
			item.color = 'lGray';
		}
		else
		{
			this.data.collapseID = -1;
		}
	}
	
	addEvent()
	{
		// let addModal = this.modalCtrl.create(CalendarAddPage, null);
		// addModal.present();
	}
	
	previewEvent(item)
	{
		// let previewModal = this.modalCtrl.create(CalendarPreviewPage, { item: item });
		// previewModal.present();
	}
	
	editEvent(item)
	{
		// let editModal = this.modalCtrl.create(CalendarEditPage, { item: item });
		// editModal.present();
	}
	
	deleteEvent(item)
	{
		/*
		const confirm = this.alertCtrl.create({
			title: this.msg.deleteTitle,
			message: this.msg.deleteMessage,
			buttons: [
			{
				text: 'Yes',
				handler: () => {
					this.api.post('events-delete', { id: item.id, user: this.account.id }).subscribe((res: any) => {
						if (res.status == 'success')
						{
							var index = this.items.indexOf(item);
							if (index > -1) { this.items.splice(index,1); }
							
							let toast = this.toastCtrl.create({
								message: this.msg.deleteSucceed+' "'+item.name+'"',
								duration: 3000,
								position: 'top'
							});
							toast.present();
						}
						else
						{
							let toast = this.toastCtrl.create({
								message: this.msg.errorServer,
								duration: 3000,
								position: 'top'
							});
							toast.present();
						}
					}, err => {
						console.error('ERROR', err);
						
						let toast = this.toastCtrl.create({
							message: this.msg.errorInternet,
							duration: 3000,
							position: 'top'
						});
						toast.present();
					});
				}
			},
			{
				text: 'No',
				handler: () => {}
			}]
		});
		confirm.present();
		*/
	}
}
