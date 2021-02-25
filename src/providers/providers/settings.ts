import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SettingsProvider
{
	private theme: BehaviorSubject<String>;
	
	
	
	constructor ()
	{
		this.theme = new BehaviorSubject('theme-light');
	}
	
	
	
	setActiveTheme(val)
	{
		this.theme.next(val);
	}
	
	getActiveTheme()
	{
		return this.theme.asObservable();
	}
}
