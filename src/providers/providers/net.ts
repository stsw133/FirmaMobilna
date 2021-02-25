import { Network } from '@ionic-native/network';
import { AlertController, Events } from 'ionic-angular';
import { Injectable } from '@angular/core';

export enum ConnectionStatusEnum
{
    Online,
    Offline
}

@Injectable()
export class NetProvider
{
	netStatus;
	
	
	
	constructor (public alertCtrl: AlertController, public network: Network, public events: Events)
	{
		this.netStatus = ConnectionStatusEnum.Online;
	}
	
	
	
	public initializeNetworkEvents(): void {
        this.network.onDisconnect().subscribe(() => {
            if (this.netStatus === ConnectionStatusEnum.Online) {
                this.events.publish('network:offline');
            }
            this.netStatus = ConnectionStatusEnum.Offline;
        });
        this.network.onConnect().subscribe(() => {
            if (this.netStatus === ConnectionStatusEnum.Offline) {
                this.events.publish('network:online');
            }
            this.netStatus = ConnectionStatusEnum.Online;
        });
    }
}
