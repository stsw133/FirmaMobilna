webpackJsonp([0],{

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__register_register__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = /** @class */ (function () {
    function LoginPage(platform, navCtrl, toastCtrl, alertCtrl, translate, storage, api, settings) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.storage = storage;
        this.api = api;
        this.settings = settings;
        this.warnings = [];
        this.lang = {
            dismiss: '',
            loginUserBlocked: '',
            loginInvalid: '',
            errorServer: '',
            errorServerAccess: ''
        };
        this.data = {
            nip: '',
            username: '',
            password: '',
            staylogged: true
        };
        storage.get('account').then(function (val) {
            if (val) {
                if (val.theme)
                    _this.settings.setActiveTheme(val.theme);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
            }
        });
        this.translate.get('DISMISS').subscribe(function (value) { _this.lang.dismiss = value; });
        this.translate.get('LOGIN_USERBLOCKED').subscribe(function (value) { _this.lang.loginUserBlocked = value; });
        this.translate.get('LOGIN_INVALID').subscribe(function (value) { _this.lang.loginInvalid = value; });
        this.translate.get('ERROR_SERVER').subscribe(function (value) { _this.lang.errorServer = value; });
        this.translate.get('ERROR_SERVERACCESS').subscribe(function (value) { _this.lang.errorServerAccess = value; });
    }
    LoginPage.prototype.showWarnings = function () {
        var toast = this.alertCtrl.create({
            message: this.warnings[0],
            buttons: [this.lang.dismiss]
        });
        toast.present();
    };
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        this.api.post('login', this.data).subscribe(function (res) {
            if (res.status == 'success') {
                if (!res.data.active) {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.loginUserBlocked,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
                else {
                    _this.storage.set('account', res.data);
                    _this.translate.use(res.data.language);
                    _this.settings.setActiveTheme(res.data.theme);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
                }
            }
            else if (res.status) {
                var toast = _this.toastCtrl.create({
                    message: _this.lang.loginInvalid,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: _this.lang.errorServer,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
        }, function (err) {
            console.error('ERROR', err);
            var toast = _this.toastCtrl.create({
                message: _this.lang.errorServerAccess,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
    };
    LoginPage.prototype.goRegister = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__register_register__["a" /* RegisterPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\login\login.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			\n		</ion-buttons>\n		<ion-title text-center>{{ \'LOGIN\' | translate }}</ion-title>\n		<ion-buttons margin-right right style="width:80px">\n			<button ion-button icon-only [disabled]="!warnings.length" (click)="showWarnings()">\n				<ion-icon name="warning"></ion-icon>\n				<ion-badge color="danger">{{ warnings.length }}</ion-badge>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<form (submit)="data">\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label fixed><b>NIP:</b></ion-label>\n			<ion-input name="login_nip" placeholder="NIP" [(ngModel)]="data.nip" type="text"></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_USERNAME\' | translate }}:</b></ion-label>\n			<ion-input name="login_username" placeholder="{{ \'ACCOUNT_USERNAME\' | translate }}" [(ngModel)]="data.username" type="text"></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_PASSWORD\' | translate }}:</b></ion-label>\n			<ion-input name="login_password" placeholder="{{ \'ACCOUNT_PASSWORD\' | translate }}" [(ngModel)]="data.password" type="password"></ion-input>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label>{{ \'LOGIN_STAYLOGGED\' | translate }}</ion-label>\n			<ion-checkbox disabled name="login_staylogged" [(ngModel)]="data.staylogged"></ion-checkbox>\n		</ion-item>\n	</ion-list>\n	</form>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<br>\n		<div text-center>\n			<button ion-button color="primary" style="width:200px; max-width:40%;" (click)="doLogin()">{{ \'LOGIN\' | translate }}</button>\n			<button ion-button color="lgray" style="width:200px; max-width:40%;" (click)="goRegister()">{{ \'REGISTER\' | translate }}</button>\n		</div>\n		<br>\n	</ion-toolbar>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\login\login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* Api */], __WEBPACK_IMPORTED_MODULE_4__providers__["c" /* SettingsProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NotificationsPage = /** @class */ (function () {
    function NotificationsPage(platform, navCtrl, toastCtrl, alertCtrl, modalCtrl, translate, storage, api) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.translate = translate;
        this.storage = storage;
        this.api = api;
        this.account = { id: 0 };
        this.quickMenu = {
            messages: [],
            notifications: [],
            warnings: []
        };
        this.lang = {
            errorServer: '',
            errorServerAccess: ''
        };
        this.data = {
            filterType: 'creator',
            filterValue: '',
            tabs: 0,
            showAll: false
        };
        this.items = [];
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
            _this.showItems();
        });
        this.translate.get('ERROR_SERVER').subscribe(function (value) { _this.lang.errorServer = value; });
        this.translate.get('ERROR_SERVERACCESS').subscribe(function (value) { _this.lang.errorServerAccess = value; });
    }
    NotificationsPage.prototype.selectTabs = function (val) {
        if (val != this.data.tabs)
            this.changeVisibility();
        this.data.tabs = val;
    };
    NotificationsPage.prototype.showItems = function () {
        var _this = this;
        this.storage.get('notificationsList').then(function (val) {
            if (val) {
                _this.items = [];
                val.forEach(function (item) {
                    _this.items.push({
                        id: item.id,
                        content: item.content,
                        subject: item.subject,
                        creator: item.creator,
                        creatorName: item.creatorName,
                        created: item.created.slice(0, 10) + ', ' + item.created.slice(11, 19),
                        read: item.read,
                        important: item.important
                    });
                });
            }
        });
        this.api.post('notifications-list', { user: this.account.id, read: (this.data.showAll ? null : false) }).subscribe(function (res) {
            if (res.status == 'success') {
                _this.items = [];
                res.list.forEach(function (item) {
                    _this.items.push({
                        id: item.id,
                        content: item.content,
                        subject: item.subject,
                        creator: item.creator,
                        creatorName: item.creatorName,
                        created: item.created.slice(0, 10) + ', ' + item.created.slice(11, 19),
                        read: item.read,
                        important: item.important
                    });
                });
                _this.storage.set('notificationsList', res.list);
            }
        }, function (err) {
            console.error('ERROR', err);
        });
    };
    NotificationsPage.prototype.refreshPage = function () {
        this.showItems();
    };
    NotificationsPage.prototype.selectSearchbarFilter = function () {
        this.searchbarFilter.open();
    };
    NotificationsPage.prototype.searchItems = function (ev) {
        var _this = this;
        this.data.filterValue = ev.target.value || '';
        this.storage.get('notificationsList').then(function (val) {
            if (val) {
                _this.items = [];
                val.forEach(function (item) {
                    if ((_this.data.filterType == 'creator' && item.creatorName.toLowerCase().includes(_this.data.filterValue.toLowerCase()))
                        || (_this.data.filterType == 'content' && item.content.toLowerCase().includes(_this.data.filterValue.toLowerCase()))
                        || (_this.data.filterType == 'subject' && item.subject.includes(_this.data.filterValue))
                        || (_this.data.filterType == 'timestamp' && item.created.includes(_this.data.filterValue)))
                        _this.items.push({
                            id: item.id,
                            content: item.content,
                            subject: item.subject,
                            creator: item.creator,
                            creatorName: item.creatorName,
                            created: item.created.slice(0, 10) + ', ' + item.created.slice(11, 19),
                            read: item.read,
                            important: item.important
                        });
                });
            }
        });
    };
    NotificationsPage.prototype.changeVisibility = function () {
        this.data.showAll = !this.data.showAll;
        this.showItems();
    };
    NotificationsPage.prototype.setRead = function (item) {
        var _this = this;
        this.api.post('notifications-setRead', { id: item.id, read: item.read }).subscribe(function (res) {
            if (res.status == 'success') {
                _this.showItems();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: _this.lang.errorServer,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
        }, function (err) {
            console.error('ERROR', err);
            var toast = _this.toastCtrl.create({
                message: _this.lang.errorServerAccess,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('searchbarFilter'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Select */])
    ], NotificationsPage.prototype, "searchbarFilter", void 0);
    NotificationsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notifications',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\notifications\notifications.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			<button ion-button icon-only navPop>\n				<ion-icon name="close"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'NOTIFICATIONS\' | translate }}</ion-title>\n		<ion-buttons margin-right right style="width:80px">\n			\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<ion-buttons left>\n			<button ion-button icon-only (click)="selectSearchbarFilter()">\n				<ion-icon name="funnel"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-searchbar placeholder="{{ \'SEARCH\' | translate }}" (ionInput)="searchItems($event)"></ion-searchbar>\n		<ion-buttons right>\n			<button ion-button icon-only (click)="refreshPage()">\n				<ion-icon name="refresh"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-toolbar>\n	<br>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<button ion-button [color]="data.tabs==0 ? \'primary\' : \'lgray\'" (click)="selectTabs(0)">{{ \'ACTIVE\' | translate }}</button>\n		<button ion-button [color]="data.tabs==1 ? \'primary\' : \'lgray\'" (click)="selectTabs(1)">{{ \'ALL\' | translate }}</button>\n	</ion-toolbar>\n	<br>\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item-sliding *ngFor="let item of items">\n			<ion-item>\n				<div padding item-left>\n					{{ items.indexOf(item)+1 }}.\n				</div>\n				<div padding-left item-left>\n					{{ \'FROM\' | translate }}: <b>{{ item.creatorName }}</b>\n					<h3>{{ item.content | translate }}: <u>{{ item.subject }}</u></h3>\n					<p>{{ item.created }}</p>\n				</div>\n				<div item-right>\n					<ion-checkbox color="primary" [(ngModel)]="item.read" (click)="setRead(item)"></ion-checkbox>\n				</div>\n			</ion-item>\n		</ion-item-sliding>\n		<ion-item *ngIf="items===undefined || items.length==0">\n			{{ \'WARNING_EMPTYLIST\' | translate }}\n		</ion-item>\n	</ion-list>\n	<ion-item hidden>\n		<ion-label>{{ \'FILTERS\' | translate }}</ion-label>\n		<ion-select [(ngModel)]="data.filterType" #searchbarFilter>\n			<ion-option value="creator">{{ \'FILTER_CREATOR\' | translate }}</ion-option>\n			<ion-option value="content">{{ \'FILTER_CONTENT\' | translate }}</ion-option>\n			<ion-option value="subject">{{ \'FILTER_SUBJECT\' | translate }}</ion-option>\n			<ion-option value="timestamp">{{ \'FILTER_TIMESTAMP\' | translate }}</ion-option>\n		</ion-select>\n	</ion-item>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\notifications\notifications.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* Api */]])
    ], NotificationsPage);
    return NotificationsPage;
}());

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_api__ = __webpack_require__(441);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__providers_api__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_net__ = __webpack_require__(442);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__providers_net__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_settings__ = __webpack_require__(443);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__providers_settings__["a"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 173:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 173;

/***/ }),

/***/ 243:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 243;

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterPage = /** @class */ (function () {
    function RegisterPage(platform, navCtrl, toastCtrl, alertCtrl, translate, api) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.api = api;
        this.warnings = [];
        this.lang = {
            dismiss: '',
            errorFillFields: '',
            errorTooShortPassword: '',
            errorPasswordsNotMatch: '',
            operationSucceed: '',
            registerUsernameTaken: '',
            registerEmailTaken: '',
            registerEmailNotExists: '',
            errorServer: '',
            errorServerAccess: ''
        };
        this.data = {
            username: '',
            email: '',
            password: '',
            repass: '',
            language: (this.translate.getBrowserLang() ? this.translate.getBrowserLang() : 'en'),
            forename: '',
            lastname: ''
        };
        this.translate.get('DISMISS').subscribe(function (value) { _this.lang.dismiss = value; });
        this.translate.get('ERROR_FILLFIELDS').subscribe(function (value) { _this.lang.errorFillFields = value; });
        this.translate.get('ERROR_TOOSHORTPASSWORD').subscribe(function (value) { _this.lang.errorTooShortPassword = value; });
        this.translate.get('ERROR_PASSWORDSNOTMATCH').subscribe(function (value) { _this.lang.errorPasswordsNotMatch = value; });
        this.translate.get('OPERATION_SUCCEED').subscribe(function (value) { _this.lang.operationSucceed = value; });
        this.translate.get('REGISTER_USERNAMETAKEN').subscribe(function (value) { _this.lang.registerUsernameTaken = value; });
        this.translate.get('REGISTER_EMAILTAKEN').subscribe(function (value) { _this.lang.registerEmailTaken = value; });
        this.translate.get('REGISTER_EMAILNOTEXISTS').subscribe(function (value) { _this.lang.registerEmailNotExists = value; });
        this.translate.get('ERROR_SERVER').subscribe(function (value) { _this.lang.errorServer = value; });
        this.translate.get('ERROR_SERVERACCESS').subscribe(function (value) { _this.lang.errorServerAccess = value; });
    }
    RegisterPage.prototype.showWarnings = function () {
        var toast = this.alertCtrl.create({
            message: this.warnings[0],
            buttons: [this.lang.dismiss]
        });
        toast.present();
    };
    RegisterPage.prototype.doRegister = function () {
        var _this = this;
        if (this.data.username == '' || this.data.email == '' || this.data.password == '' || this.data.repass == '' || this.data.forename == '' || this.data.lastname == '') {
            var toast = this.toastCtrl.create({
                message: this.lang.errorFillFields,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        else if (this.data.password.length < 6) {
            var toast = this.toastCtrl.create({
                message: this.lang.errorTooShortPassword,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        else if (this.data.repass != this.data.password) {
            var toast = this.toastCtrl.create({
                message: this.lang.errorPasswordsNotMatch,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        else {
            this.api.post('register', this.data).subscribe(function (res) {
                if (res.status == 'success') {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.operationSucceed,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                    _this.navCtrl.pop();
                }
                else if (res.status == 'username_taken') {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.registerUsernameTaken,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
                else if (res.status == 'email_taken') {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.registerEmailTaken,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
                else if (res.status == 'email_notExists') {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.registerEmailNotExists,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
                else {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.errorServer,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
            }, function (err) {
                console.error('ERROR', err);
                var toast = _this.toastCtrl.create({
                    message: _this.lang.errorServerAccess,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            });
        }
        ;
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\login\register\register.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			<button ion-button icon-only navPop>\n				<ion-icon name="arrow-back"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'REGISTER\' | translate }}</ion-title>\n		<ion-buttons margin-right right style="width:80px">\n			<button ion-button icon-only [disabled]="!warnings.length" (click)="showWarnings()">\n				<ion-icon name="warning"></ion-icon>\n				<ion-badge color="danger">{{ warnings.length }}</ion-badge>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_USERNAME\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_USERNAME\' | translate }}" [(ngModel)]="data.username" type="text"></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_EMAIL\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_EMAIL\' | translate }}" [(ngModel)]="data.email" type="email"></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_PASSWORD\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_PASSWORD\' | translate }}" [(ngModel)]="data.password" type="password"></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'REPEAT\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'REPEAT\' | translate }}" [(ngModel)]="data.repass" type="password"></ion-input>\n		</ion-item>\n	</ion-list>\n	<br>\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_FORENAME\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_FORENAME\' | translate }}" [(ngModel)]="data.forename" type="text"></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_LASTNAME\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_LASTNAME\' | translate }}" [(ngModel)]="data.lastname" type="text"></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'LANGUAGE\' | translate }}:</b></ion-label>\n			<ion-select [(ngModel)]="data.language">\n				<ion-option value="en">English</ion-option>\n				<ion-option value="pl">Polski</ion-option>\n			</ion-select>\n		</ion-item>\n	</ion-list>\n	<br>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<div text-center>\n			<button ion-button color="primary" style="width:200px; max-width:40%;" (click)="doRegister()">{{ \'REGISTER_CREATEACCOUNT\' | translate }}</button>\n		</div>\n	</ion-toolbar>\n	<br>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\login\register\register.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__providers__["a" /* Api */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notifications_notifications__ = __webpack_require__(162);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProfilePage = /** @class */ (function () {
    function ProfilePage(platform, navCtrl, toastCtrl, alertCtrl, modalCtrl, translate, storage, api) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.translate = translate;
        this.storage = storage;
        this.api = api;
        this.account = { id: 0, group: 0 };
        this.messages = [];
        this.notifications = [];
        this.warnings = [];
        this.data = {
            groupName: ''
        };
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
            _this.storage.get('groupsList').then(function (val2) {
                if (val2)
                    _this.data.groupName = val2[val2.findIndex(function (x) { return x.id == _this.account.group; })].name;
            });
            _this.updateCounters();
        });
    }
    ProfilePage.prototype.updateCounters = function () {
        var _this = this;
        this.api.post('notifications-countNew', { user: this.account.id }).subscribe(function (res) {
            if (res.status == 'success')
                _this.notifications.length = res.counter;
        });
    };
    ProfilePage.prototype.showNotifications = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__notifications_notifications__["a" /* NotificationsPage */], null);
        modal.present();
    };
    ProfilePage.prototype.ionViewWillEnter = function () {
        if (this.account)
            this.updateCounters();
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\home\profile\profile.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			<button ion-button icon-only navPop>\n				<ion-icon name="close"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'PROFILE\' | translate }}</ion-title>\n		<ion-buttons margin-right right style="width:80px">\n			\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_FORENAME\' | translate }}:</b></ion-label>\n			<ion-label *ngIf="account.forename!==undefined">{{ account.forename }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_LASTNAME\' | translate }}:</b></ion-label>\n			<ion-label *ngIf="account.lastname!==undefined">{{ account.lastname }}</ion-label>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_EMAIL\' | translate }}:</b></ion-label>\n			<ion-label *ngIf="account.email!==undefined">{{ account.email }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_PHONE\' | translate }}:</b></ion-label>\n			<ion-label *ngIf="account.phone!==undefined">{{ account.phone }}</ion-label>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_GROUP\' | translate }}:</b></ion-label>\n			<ion-label *ngIf="account.group!==undefined">{{ data.groupName.charAt(0).toUpperCase()+data.groupName.slice(1) }}</ion-label>\n		</ion-item>\n		<!-- <ion-item> -->\n			<!-- <ion-label fixed style="opacity:1"><b>{{ \'ACTIVE\' | translate }}:</b></ion-label> -->\n			<!-- <ion-toggle disabled style="opacity:1" *ngIf="account.active!==undefined" [checked]="account.active"></ion-toggle> -->\n		<!-- </ion-item> -->\n		<ion-item>\n			<ion-label fixed><b>{{ \'LANGUAGE\' | translate }}:</b></ion-label>\n			<ion-label *ngIf="account.language!==undefined">{{ \'LANGUAGE_\'+account.language.toUpperCase() | translate }}</ion-label>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'CREATED\' | translate }}:</b></ion-label>\n			<ion-label *ngIf="account.created!==undefined">{{ account.created.slice(0,10) }}, {{ account.created.slice(11,19) }}</ion-label>\n		</ion-item>\n	</ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\home\profile\profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* Api */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__users_new_users_new__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__users_preview_users_preview__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__users_edit_users_edit__ = __webpack_require__(372);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var UsersPage = /** @class */ (function () {
    function UsersPage(platform, navCtrl, toastCtrl, alertCtrl, modalCtrl, events, translate, storage, api) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.translate = translate;
        this.storage = storage;
        this.api = api;
        this.account = { id: 0 };
        this.quickMenu = {
            messages: [],
            notifications: [],
            warnings: []
        };
        this.lang = {
            dismiss: '',
            usersDeleteTitle: '',
            usersDeleteMessage: '',
            yes: '',
            no: '',
            operationSucceed: '',
            errorServer: '',
            errorServerAccess: ''
        };
        this.data = {
            filterType: 'fullname',
            filterValue: '',
            collapseID: -1
        };
        this.items = [];
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
            _this.showItems();
        });
        this.translate.get('DISMISS').subscribe(function (value) { _this.lang.dismiss = value; });
        this.translate.get('USERS_DELETE_TITLE').subscribe(function (value) { _this.lang.usersDeleteTitle = value; });
        this.translate.get('USERS_DELETE_MESSAGE').subscribe(function (value) { _this.lang.usersDeleteMessage = value; });
        this.translate.get('YES').subscribe(function (value) { _this.lang.yes = value; });
        this.translate.get('NO').subscribe(function (value) { _this.lang.no = value; });
        this.translate.get('OPERATION_SUCCEED').subscribe(function (value) { _this.lang.operationSucceed = value; });
        this.translate.get('ERROR_SERVER').subscribe(function (value) { _this.lang.errorServer = value; });
        this.translate.get('ERROR_SERVERACCESS').subscribe(function (value) { _this.lang.errorServerAccess = value; });
    }
    UsersPage.prototype.openHomePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    UsersPage.prototype.openLastPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    UsersPage.prototype.updateCounters = function () {
        var _this = this;
        this.api.post('notifications-countNew', { user: this.account.id }).subscribe(function (res) {
            if (res.status == 'success')
                _this.quickMenu.notifications.length = res.counter;
            _this.storage.set('quickMenu', _this.quickMenu);
            _this.events.publish('quickMenu');
        });
    };
    UsersPage.prototype.showItems = function () {
        var _this = this;
        this.data.collapseID = -1;
        this.storage.get('usersList').then(function (val) {
            if (val) {
                _this.items = [];
                val.forEach(function (item) {
                    _this.items.push({
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
                        created: item.created.slice(0, 10) + ', ' + item.created.slice(11, 19),
                        logged: item.logged.slice(0, 10) + ', ' + item.logged.slice(11, 19),
                        phone: item.phone
                    });
                });
                _this.updateCounters();
            }
        });
        this.api.post('users-list', { filterValue: '%%' }).subscribe(function (res) {
            if (res.status == 'success') {
                _this.items = [];
                res.list.forEach(function (item) {
                    _this.items.push({
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
                        created: item.created.slice(0, 10) + ', ' + item.created.slice(11, 19),
                        logged: item.logged.slice(0, 10) + ', ' + item.logged.slice(11, 19),
                        phone: item.phone
                    });
                });
                _this.storage.set('usersList', res.list);
            }
        }, function (err) {
            console.error('ERROR', err);
        });
    };
    UsersPage.prototype.refreshPage = function () {
        this.showItems();
    };
    UsersPage.prototype.selectSearchbarFilter = function () {
        this.searchbarFilter.open();
    };
    UsersPage.prototype.searchItems = function (ev) {
        var _this = this;
        this.data.filterValue = ev.target.value || '';
        this.storage.get('usersList').then(function (val) {
            if (val) {
                _this.data.collapseID = -1;
                _this.items = [];
                val.forEach(function (item) {
                    if ((_this.data.filterType == 'fullname' && (item.forename + ' ' + item.lastname).toLowerCase().includes(_this.data.filterValue.toLowerCase()))
                        || (_this.data.filterType == 'email' && item.email.toLowerCase().includes(_this.data.filterValue.toLowerCase()))
                        || (_this.data.filterType == 'phone' && item.phone.includes(_this.data.filterValue)))
                        _this.items.push({
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
                            created: item.created.slice(0, 10) + ', ' + item.created.slice(11, 19),
                            logged: item.logged.slice(0, 10) + ', ' + item.logged.slice(11, 19),
                            phone: item.phone
                        });
                });
            }
        });
    };
    UsersPage.prototype.collapseItem = function (item) {
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].color = '';
        }
        if (this.data.collapseID == -1 || this.data.collapseID != this.items.indexOf(item)) {
            this.data.collapseID = this.items.indexOf(item);
            item.color = 'lgray';
        }
        else {
            this.data.collapseID = -1;
        }
    };
    UsersPage.prototype.newItem = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__users_new_users_new__["a" /* UsersNewPage */], null);
        modal.present();
        // this.navCtrl.setRoot(UsersNewPage);
    };
    UsersPage.prototype.previewItem = function (item) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__users_preview_users_preview__["a" /* UsersPreviewPage */], { item: item });
        modal.present();
        // this.navCtrl.setRoot(UsersPreviewPage);
    };
    UsersPage.prototype.editItem = function (item) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__users_edit_users_edit__["a" /* UsersEditPage */], { item: item });
        modal.present();
        // this.navCtrl.setRoot(UsersEditPage);
    };
    UsersPage.prototype.deleteItem = function (item) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: this.lang.usersDeleteTitle,
            message: this.lang.usersDeleteMessage,
            buttons: [
                {
                    text: this.lang.yes,
                    handler: function () {
                        _this.api.post('users-delete', { id: item.id, user: _this.account.id }).subscribe(function (res) {
                            if (res.status == 'success') {
                                var index = _this.items.indexOf(item);
                                if (index > -1) {
                                    _this.items.splice(index, 1);
                                }
                                var toast = _this.toastCtrl.create({
                                    message: _this.lang.operationSucceed,
                                    duration: 3000,
                                    position: 'top'
                                });
                                toast.present();
                            }
                            else {
                                var toast = _this.toastCtrl.create({
                                    message: _this.lang.errorServer,
                                    duration: 3000,
                                    position: 'top'
                                });
                                toast.present();
                            }
                        }, function (err) {
                            console.error('ERROR', err);
                            var toast = _this.toastCtrl.create({
                                message: _this.lang.errorServerAccess,
                                duration: 3000,
                                position: 'top'
                            });
                            toast.present();
                        });
                    }
                },
                {
                    text: this.lang.no,
                    handler: function () { }
                }
            ]
        });
        confirm.present();
    };
    UsersPage.prototype.ionViewDidEnter = function () {
        if (this.account)
            this.updateCounters();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('searchbarFilter'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Select */])
    ], UsersPage.prototype, "searchbarFilter", void 0);
    UsersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-users',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\users\users.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			<button ion-button icon-only (click)="openHomePage()">\n				<ion-icon name="home"></ion-icon>\n			</button>\n			<button ion-button icon-only (click)="openLastPage()">\n				<ion-icon name="arrow-back"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'USERS\' | translate }}</ion-title>\n		<ion-buttons margin-right right style="width:80px" menuToggle>\n			<button ion-button icon-only>\n				<ion-badge [hidden]="quickMenu.messages.length+quickMenu.notifications.length+quickMenu.warnings.length<1" [color]="quickMenu.warnings.length>0 ? \'danger\' : \'primary\'">{{ quickMenu.messages.length+quickMenu.notifications.length }}</ion-badge>&nbsp;\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<ion-buttons left>\n			<button ion-button icon-only (click)="selectSearchbarFilter()">\n				<ion-icon name="funnel"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-searchbar placeholder="{{ \'SEARCH\' | translate }}" (ionInput)="searchItems($event)"></ion-searchbar>\n		<ion-buttons right>\n			<button ion-button icon-only (click)="refreshPage()">\n				<ion-icon name="refresh"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-toolbar>\n	<br>\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<button ion-item color="primary" (click)="newItem()" [disabled]="account.group!=1">\n			<div margin-left item-left>\n				<ion-icon name="add" item-left></ion-icon>\n			</div>\n			<div margin-left item-left>\n				{{ \'USERS_NEW\' | translate }}\n			</div>\n		</button>\n	</ion-list>\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item-sliding *ngFor="let item of items">\n			<ion-item [color]="item.color" (click)="collapseItem(item)">\n				<!-- <ion-icon name="contact" item-left></ion-icon> -->\n				<div padding item-left>\n					<!-- {{ items.indexOf(item)+1 }}. -->\n					{{ item.id }}.\n				</div>\n				<div item-left>\n					<ion-icon name="radio-button-on" *ngIf="account.id===item.id" color="secondary"></ion-icon>\n					<ion-icon style="opacity:0.4" name="radio-button-on" *ngIf="account.id!==item.id" color="gray"></ion-icon>\n				</div>\n				<div item-left>\n					<b>{{ item.forename }} {{ item.lastname }}</b><br>\n					<span>{{ item.email }}</span><br>\n					<span>{{ item.phone }}</span>\n					<br *ngIf="data.collapseID==items.indexOf(item)">\n					<br *ngIf="data.collapseID==items.indexOf(item)">\n					<button *ngIf="data.collapseID==items.indexOf(item)" ion-button color="primary" (click)="previewItem(item)">\n						<ion-icon name="document"> {{ \'PREVIEW\' | translate }}</ion-icon>\n					</button>\n					<br *ngIf="data.collapseID==items.indexOf(item)">\n					<button *ngIf="data.collapseID==items.indexOf(item)" [hidden]="(account.group!=1 && item.id!==account.id) || (item.perms===\'admin\' && item.id!==account.id)" ion-button color="secondary" (click)="editItem(item)">\n						<ion-icon name="create"> {{ \'EDIT\' | translate }}</ion-icon>\n					</button>\n					<br *ngIf="data.collapseID==items.indexOf(item)">\n					<button *ngIf="data.collapseID==items.indexOf(item)" [hidden]="account.group!=1 || item.perms===\'admin\' || item.id===account.id" ion-button color="danger" (click)="deleteItem(item)">\n						<ion-icon name="trash"> {{ \'DELETE\' | translate }}</ion-icon>\n					</button>\n				</div>\n			</ion-item>\n		</ion-item-sliding>\n		<ion-item *ngIf="items===undefined || items.length==0">\n			{{ \'WARNING_EMPTYLIST\' | translate }}\n		</ion-item>\n	</ion-list>\n	<br>\n	<ion-item hidden>\n		<ion-label>{{ \'FILTERS\' | translate }}</ion-label>\n		<ion-select [(ngModel)]="data.filterType" #searchbarFilter>\n			<ion-option value="fullname">{{ \'ACCOUNT_FULLNAME\' | translate }}</ion-option>\n			<ion-option value="email">{{ \'ACCOUNT_EMAIL\' | translate }}</ion-option>\n			<ion-option value="phone">{{ \'ACCOUNT_PHONE\' | translate }}</ion-option>\n		</ion-select>\n	</ion-item>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\users\users.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* Api */]])
    ], UsersPage);
    return UsersPage;
}());

//# sourceMappingURL=users.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersNewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UsersNewPage = /** @class */ (function () {
    function UsersNewPage(platform, navCtrl, toastCtrl, translate, storage, api) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.storage = storage;
        this.api = api;
        this.account = { id: 0 };
        this.lang = {
            errorFillFields: '',
            errorTooShortPassword: '',
            errorPasswordsNotMatch: '',
            operationSucceed: '',
            registerUsernameTaken: '',
            registerEmailTaken: '',
            registerEmailNotExists: '',
            errorServer: '',
            errorServerAccess: ''
        };
        this.data = {
            username: '',
            email: '',
            password: '',
            repass: '',
            group: 2,
            language: (this.translate.getBrowserLang() ? this.translate.getBrowserLang() : 'en'),
            forename: '',
            lastname: ''
        };
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
        });
        this.translate.get('ERROR_FILLFIELDS').subscribe(function (value) { _this.lang.errorFillFields = value; });
        this.translate.get('ERROR_TOOSHORTPASSWORD').subscribe(function (value) { _this.lang.errorTooShortPassword = value; });
        this.translate.get('ERROR_PASSWORDSNOTMATCH').subscribe(function (value) { _this.lang.errorPasswordsNotMatch = value; });
        this.translate.get('OPERATION_SUCCEED').subscribe(function (value) { _this.lang.operationSucceed = value; });
        this.translate.get('REGISTER_USERNAMETAKEN').subscribe(function (value) { _this.lang.registerUsernameTaken = value; });
        this.translate.get('REGISTER_EMAILTAKEN').subscribe(function (value) { _this.lang.registerEmailTaken = value; });
        this.translate.get('REGISTER_EMAILNOTEXISTS').subscribe(function (value) { _this.lang.registerEmailNotExists = value; });
        this.translate.get('ERROR_SERVER').subscribe(function (value) { _this.lang.errorServer = value; });
        this.translate.get('ERROR_SERVERACCESS').subscribe(function (value) { _this.lang.errorServerAccess = value; });
    }
    UsersNewPage.prototype.saveChanges = function () {
        var _this = this;
        if (this.data.username == '' || this.data.email == '' || this.data.password == '' || this.data.repass == '' || this.data.forename == '' || this.data.lastname == '') {
            var toast = this.toastCtrl.create({
                message: this.lang.errorFillFields,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        else if (this.data.password.length < 6) {
            var toast = this.toastCtrl.create({
                message: this.lang.errorTooShortPassword,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        else if (this.data.repass != this.data.password) {
            var toast = this.toastCtrl.create({
                message: this.lang.errorPasswordsNotMatch,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        else {
            this.api.post('users-new', { item: this.data, user: this.account.id }).subscribe(function (res) {
                if (res.status == 'success') {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.operationSucceed,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                    _this.navCtrl.pop();
                }
                else if (res.status == 'username_taken') {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.registerUsernameTaken,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
                else if (res.status == 'email_taken') {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.registerEmailTaken,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
                else if (res.status == 'email_notExists') {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.registerEmailNotExists,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
                else {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.errorServer,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
            }, function (err) {
                console.error('ERROR', err);
                var toast = _this.toastCtrl.create({
                    message: _this.lang.errorServerAccess,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            });
        }
    };
    UsersNewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-users-new',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\users\users-new\users-new.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			<button ion-button icon-only navPop>\n				<ion-icon name="close"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'USERS_NEW\' | translate }}</ion-title>\n		<ion-buttons margin-right right style="width:80px">\n			\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_FORENAME\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_FORENAME\' | translate }}" [(ngModel)]="data.forename" type="text" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_LASTNAME\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_LASTNAME\' | translate }}" [(ngModel)]="data.lastname" type="text" clearInput></ion-input>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_EMAIL\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_EMAIL\' | translate }}" [(ngModel)]="data.email" type="email" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_PHONE\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_PHONE\' | translate }}" [(ngModel)]="data.phone" type="text" clearInput></ion-input>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_USERNAME\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_USERNAME\' | translate }}" [(ngModel)]="data.username" type="text" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_PASSWORD\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_PASSWORD\' | translate }}" [(ngModel)]="data.password" type="password" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'REPEAT\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_PASSWORD\' | translate }}" [(ngModel)]="data.repass" type="password" clearInput></ion-input>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_GROUP\' | translate }}:</b></ion-label>\n			<ion-select [(ngModel)]="data.group">\n				<ion-option value="2">Standard</ion-option>\n				<!-- <ion-option *ngIf="account.group==1" value="moderator">moderator</ion-option> -->\n			</ion-select>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'LANGUAGE\' | translate }}:</b></ion-label>\n			<ion-select [(ngModel)]="data.language">\n				<ion-option value="en">{{ \'LANGUAGE_EN\' | translate }}</ion-option>\n				<ion-option value="pl">{{ \'LANGUAGE_PL\' | translate }}</ion-option>\n			</ion-select>\n		</ion-item>\n		<br>\n		<div text-center>\n			<button ion-button color="secondary" style="width:200px; max-width:40%;" (click)="saveChanges()">{{ \'SAVE\' | translate }}</button>\n			<button ion-button color="light" style="width:200px; max-width:40%;" navPop>{{ \'CANCEL\' | translate }}</button>\n		</div>\n		<br>\n	</ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\users\users-new\users-new.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* Api */]])
    ], UsersNewPage);
    return UsersNewPage;
}());

//# sourceMappingURL=users-new.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersPreviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UsersPreviewPage = /** @class */ (function () {
    function UsersPreviewPage(platform, navCtrl, navParams, storage) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.account = { id: 0 };
        this.data = {
            extendedInfo: false,
            showUsername: false,
            showPassword: false
        };
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
        });
        this.selectedItem = navParams.get('item');
    }
    UsersPreviewPage.prototype.extendInfo = function () {
        this.data.extendedInfo = !this.data.extendedInfo;
    };
    UsersPreviewPage.prototype.showUsername = function () {
        this.data.showUsername = !this.data.showUsername;
    };
    UsersPreviewPage.prototype.showPassword = function () {
        this.data.showPassword = !this.data.showPassword;
    };
    UsersPreviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-users-preview',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\users\users-preview\users-preview.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			<button ion-button icon-only navPop>\n				<ion-icon name="close"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'PREVIEW\' | translate }}:<br><span style="font-size: 14px">({{ selectedItem.id }}) {{ selectedItem.forename }} {{ selectedItem.lastname }}</span></ion-title>\n		<ion-buttons margin-right right style="width:80px">\n			\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_FORENAME\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.forename }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_LASTNAME\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.lastname }}</ion-label>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_EMAIL\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.email }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_PHONE\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.phone }}</ion-label>\n		</ion-item>\n		<ion-item text-center *ngIf="!data.extendedInfo && account.group==1 && (selectedItem.group!=1 || selectedItem.id===account.id)">\n			<ion-label>\n				<button ion-button icon-only color="primary" (click)="extendInfo()">\n					<ion-icon *ngIf="!data.extendedInfo" name="arrow-down"></ion-icon>\n					<ion-icon *ngIf="data.extendedInfo" name="arrow-up"></ion-icon>\n				</button>\n			</ion-label>\n		</ion-item>\n		<br *ngIf="data.extendedInfo && selectedItem.id===account.id">\n		<ion-item *ngIf="data.extendedInfo && selectedItem.id===account.id">\n			<ion-label fixed *ngIf="!data.showUsername"><b>{{ \'ACCOUNT_USERNAME\' | translate }}:</b></ion-label>\n			<ion-label *ngIf="!data.showUsername">\n				<button small ion-button icon-only color="primary" (click)="showUsername()">\n					<ion-icon *ngIf="!data.showUsername" name="eye"></ion-icon>\n					<!-- <ion-icon *ngIf="data.showUsername" name="eye-off"></ion-icon> -->\n				</button>\n			</ion-label>\n			<ion-label fixed *ngIf="data.showUsername"><b>{{ \'ACCOUNT_USERNAME\' | translate }}:</b></ion-label>\n			<ion-label *ngIf="data.showUsername">{{ selectedItem.username }}</ion-label>\n		</ion-item>\n		<ion-item *ngIf="data.extendedInfo && selectedItem.id===account.id">\n			<ion-label fixed *ngIf="!data.showPassword"><b>{{ \'ACCOUNT_PASSWORD\' | translate }}:</b></ion-label>\n			<ion-label *ngIf="!data.showPassword">\n				<button small ion-button icon-only color="primary" (click)="showPassword()">\n					<ion-icon *ngIf="!data.showPassword" name="eye"></ion-icon>\n					<!-- <ion-icon *ngIf="data.showPassword" name="eye-off"></ion-icon> -->\n				</button>\n			</ion-label>\n			<ion-label fixed *ngIf="data.showPassword"><b>{{ \'ACCOUNT_PASSWORD\' | translate }}:</b></ion-label>\n			<ion-label *ngIf="data.showPassword">{{ selectedItem.password }}</ion-label>\n		</ion-item>\n		<br *ngIf="data.extendedInfo">\n		<ion-item *ngIf="data.extendedInfo">\n			<ion-label fixed><b>{{ \'ACCOUNT_GROUP\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.group }}</ion-label>\n		</ion-item>\n		<ion-item *ngIf="data.extendedInfo">\n			<ion-label fixed><b>{{ \'ACTIVE\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.active }}</ion-label>\n		</ion-item>\n		<ion-item *ngIf="data.extendedInfo">\n			<ion-label fixed><b>{{ \'LANGUAGE\' | translate }}:</b></ion-label>\n			<ion-label>{{ \'LANGUAGE_\'+selectedItem.language.toUpperCase() | translate }}</ion-label>\n		</ion-item>\n		<br *ngIf="data.extendedInfo">\n		<ion-item *ngIf="data.extendedInfo">\n			<ion-label fixed><b>{{ \'CREATED\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.created }}</ion-label>\n		</ion-item>\n		<ion-item *ngIf="data.extendedInfo">\n			<ion-label fixed><b>{{ \'ACCOUNT_LOGGED\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.logged }}</ion-label>\n		</ion-item>\n	</ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\users\users-preview\users-preview.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], UsersPreviewPage);
    return UsersPreviewPage;
}());

//# sourceMappingURL=users-preview.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UsersEditPage = /** @class */ (function () {
    function UsersEditPage(platform, navCtrl, navParams, toastCtrl, translate, storage, api) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.storage = storage;
        this.api = api;
        this.account = { id: 0 };
        this.lang = {
            errorFillFields: '',
            errorTooShortPassword: '',
            errorPasswordsNotMatch: '',
            operationSucceed: '',
            registerUsernameTaken: '',
            registerEmailTaken: '',
            registerEmailNotExists: '',
            errorServer: '',
            errorServerAccess: ''
        };
        this.data = {
            showUsername: false,
            showPassword: false
        };
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
        });
        this.selectedItem = navParams.get('item');
        this.translate.get('ERROR_FILLFIELDS').subscribe(function (value) { _this.lang.errorFillFields = value; });
        this.translate.get('ERROR_TOOSHORTPASSWORD').subscribe(function (value) { _this.lang.errorTooShortPassword = value; });
        this.translate.get('ERROR_PASSWORDSNOTMATCH').subscribe(function (value) { _this.lang.errorPasswordsNotMatch = value; });
        this.translate.get('OPERATION_SUCCEED').subscribe(function (value) { _this.lang.operationSucceed = value; });
        this.translate.get('REGISTER_USERNAMETAKEN').subscribe(function (value) { _this.lang.registerUsernameTaken = value; });
        this.translate.get('REGISTER_EMAILTAKEN').subscribe(function (value) { _this.lang.registerEmailTaken = value; });
        this.translate.get('REGISTER_EMAILNOTEXISTS').subscribe(function (value) { _this.lang.registerEmailNotExists = value; });
        this.translate.get('ERROR_SERVER').subscribe(function (value) { _this.lang.errorServer = value; });
        this.translate.get('ERROR_SERVERACCESS').subscribe(function (value) { _this.lang.errorServerAccess = value; });
    }
    UsersEditPage.prototype.showUsername = function () {
        this.data.showUsername = !this.data.showUsername;
    };
    UsersEditPage.prototype.showPassword = function () {
        this.data.showPassword = !this.data.showPassword;
    };
    UsersEditPage.prototype.saveChanges = function () {
        var _this = this;
        if (this.selectedItem.username == '' || this.selectedItem.email == '' || this.selectedItem.password == '' || this.selectedItem.repass == '' || this.selectedItem.forename == '' || this.selectedItem.lastname == '') {
            var toast = this.toastCtrl.create({
                message: this.lang.errorFillFields,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        else if (this.selectedItem.password.length < 6) {
            var toast = this.toastCtrl.create({
                message: this.lang.errorTooShortPassword,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        else if (this.selectedItem.repass != this.selectedItem.password) {
            var toast = this.toastCtrl.create({
                message: this.lang.errorPasswordsNotMatch,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        else {
            this.api.post('users-edit', { item: this.selectedItem, user: this.account.id }).subscribe(function (res) {
                if (res.status == 'success') {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.operationSucceed,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                    _this.navCtrl.pop();
                }
                else if (res.status == 'username_taken') {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.registerUsernameTaken,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
                else if (res.status == 'email_taken') {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.registerEmailTaken,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
                else if (res.status == 'email_notExist') {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.registerEmailNotExists,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
                else {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.errorServer,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
            }, function (err) {
                console.error('ERROR', err);
                var toast = _this.toastCtrl.create({
                    message: _this.lang.errorServerAccess,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            });
        }
    };
    UsersEditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-users-edit',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\users\users-edit\users-edit.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			<button ion-button icon-only navPop>\n				<ion-icon name="close"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'EDIT\' | translate }}:<br><span style="font-size: 14px">({{ selectedItem.id }}) {{ selectedItem.forename }} {{ selectedItem.lastname }}</span></ion-title>\n		<ion-buttons margin-right right style="width:80px">\n			\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_FORENAME\' | translate }}:</b></ion-label>\n			<ion-label *ngIf="account.group!=1 && selectedItem.id!=account.id">{{ selectedItem.forename }}</ion-label>\n			<ion-input *ngIf="account.group==1 || selectedItem.id==account.id" placeholder="{{ \'ACCOUNT_FORENAME\' | translate }}" [(ngModel)]="selectedItem.forename" type="text" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_LASTNAME\' | translate }}:</b></ion-label>\n			<ion-label *ngIf="account.group!=1 && selectedItem.id!=account.id">{{ selectedItem.lastname }}</ion-label>\n			<ion-input *ngIf="account.group==1 || selectedItem.id==account.id" placeholder="{{ \'ACCOUNT_LASTNAME\' | translate }}" [(ngModel)]="selectedItem.lastname" type="text" clearInput></ion-input>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_EMAIL\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_EMAIL\' | translate }}" [(ngModel)]="selectedItem.email" type="text" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_PHONE\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_PHONE\' | translate }}" [(ngModel)]="selectedItem.phone" type="text" clearInput></ion-input>\n		</ion-item>\n		<br *ngIf="selectedItem.id===account.id">\n		<ion-item *ngIf="selectedItem.id===account.id">\n			<ion-label fixed *ngIf="!data.showUsername" color="gray"><b>{{ \'ACCOUNT_USERNAME\' | translate }}:</b></ion-label>\n			<ion-label *ngIf="!data.showUsername">\n				<button small ion-button icon-only color="lGray" (click)="showUsername()">\n					<ion-icon *ngIf="!data.showUsername" name="eye"></ion-icon>\n					<!-- <ion-icon *ngIf="data.showUsername" name="eye-off"></ion-icon> -->\n				</button>\n			</ion-label>\n			<ion-label fixed *ngIf="data.showUsername"><b>{{ \'ACCOUNT_USERNAME\' | translate }}:</b></ion-label>\n			<ion-input *ngIf="data.showUsername" placeholder="{{ \'ACCOUNT_USERNAME\' | translate }}" [(ngModel)]="selectedItem.username" type="text" clearInput></ion-input>\n		</ion-item>\n		<ion-item *ngIf="selectedItem.id===account.id">\n			<ion-label fixed *ngIf="!data.showPassword" color="gray"><b>{{ \'ACCOUNT_PASSWORD\' | translate }}:</b></ion-label>\n			<ion-label *ngIf="!data.showPassword">\n				<button small ion-button icon-only color="lGray" (click)="showPassword()">\n					<ion-icon *ngIf="!data.showPassword" name="eye"></ion-icon>\n					<!-- <ion-icon *ngIf="data.showPassword" name="eye-off"></ion-icon> -->\n				</button>\n			</ion-label>\n			<ion-label fixed *ngIf="data.showPassword"><b>{{ \'ACCOUNT_PASSWORD\' | translate }}:</b></ion-label>\n			<ion-input *ngIf="data.showPassword" placeholder="{{ \'ACCOUNT_PASSWORD\' | translate }}" [(ngModel)]="selectedItem.password" type="password" clearInput></ion-input>\n		</ion-item>\n		<ion-item *ngIf="selectedItem.id===account.id && data.showPassword">\n			<ion-label fixed><b>{{ \'REPEAT\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_PASSWORD\' | translate }}" [(ngModel)]="selectedItem.repass" type="password" clearInput></ion-input>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_GROUP\' | translate }}:</b></ion-label>\n			<ion-select [(ngModel)]="selectedItem.group">\n				<ion-option value="standard">standard</ion-option>\n				<ion-option value="moderator">moderator</ion-option>\n				<ion-option value="admin">admin</ion-option>\n			</ion-select>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACTIVE\' | translate }}:</b></ion-label>\n			<ion-select [(ngModel)]="selectedItem.active">\n				<ion-option value="true">{{ \'CLIENTS_STATUS_ACTIVE\' | translate }}</ion-option>\n				<ion-option value="false">{{ \'CLIENTS_STATUS_BLOCKED\' | translate }}</ion-option>\n			</ion-select>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'LANGUAGE\' | translate }}:</b></ion-label>\n			<ion-select [(ngModel)]="selectedItem.language">\n				<ion-option value="en">{{ \'LANGUAGE_EN\' | translate }}</ion-option>\n				<ion-option value="pl">{{ \'LANGUAGE_PL\' | translate }}</ion-option>\n			</ion-select>\n		</ion-item>\n		<br>\n		<div text-center>\n			<button ion-button color="secondary" style="width:200px; max-width:40%;" (click)="saveChanges()">{{ \'SAVE\' | translate }}</button>\n			<button ion-button color="light" style="width:200px; max-width:40%;" navPop>{{ \'CANCEL\' | translate }}</button>\n		</div>\n		<br>\n	</ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\users\users-edit\users-edit.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* Api */]])
    ], UsersEditPage);
    return UsersEditPage;
}());

//# sourceMappingURL=users-edit.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__clients_new_clients_new__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__clients_preview_clients_preview__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__clients_edit_clients_edit__ = __webpack_require__(376);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ClientsPage = /** @class */ (function () {
    function ClientsPage(platform, navCtrl, toastCtrl, alertCtrl, modalCtrl, events, translate, storage, api) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.translate = translate;
        this.storage = storage;
        this.api = api;
        this.account = { id: 0 };
        this.quickMenu = {
            messages: [],
            notifications: [],
            warnings: []
        };
        this.lang = {
            clientsDeleteTitle: '',
            clientsDeleteMessage: '',
            yes: '',
            no: '',
            operationSucceed: '',
            errorServer: '',
            errorServerAccess: ''
        };
        this.data = {
            filterType: 'fullname',
            filterValue: '',
            collapseID: -1
        };
        this.items = [];
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
            _this.showItems();
        });
        this.translate.get('CLIENTS_DELETE_TITLE').subscribe(function (value) { _this.lang.clientsDeleteTitle = value; });
        this.translate.get('CLIENTS_DELETE_MESSAGE').subscribe(function (value) { _this.lang.clientsDeleteMessage = value; });
        this.translate.get('YES').subscribe(function (value) { _this.lang.yes = value; });
        this.translate.get('NO').subscribe(function (value) { _this.lang.no = value; });
        this.translate.get('OPERATION_SUCCEED').subscribe(function (value) { _this.lang.operationSucceed = value; });
        this.translate.get('ERROR_SERVER').subscribe(function (value) { _this.lang.errorServer = value; });
        this.translate.get('ERROR_SERVERACCESS').subscribe(function (value) { _this.lang.errorServerAccess = value; });
    }
    ClientsPage.prototype.openHomePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    ClientsPage.prototype.openLastPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    ClientsPage.prototype.updateCounters = function () {
        var _this = this;
        this.api.post('notifications-countNew', { user: this.account.id }).subscribe(function (res) {
            if (res.status == 'success')
                _this.quickMenu.notifications.length = res.counter;
            _this.storage.set('quickMenu', _this.quickMenu);
            _this.events.publish('quickMenu');
        });
    };
    ClientsPage.prototype.showItems = function () {
        var _this = this;
        this.data.collapseID = -1;
        this.storage.get('clientsList').then(function (val) {
            if (val) {
                _this.items = [];
                val.forEach(function (item) {
                    _this.items.push({
                        id: item.id,
                        forename: item.forename,
                        lastname: item.lastname,
                        address: item.address,
                        phone: item.phone,
                        email: item.email,
                        creator: item.creator,
                        created: item.created.slice(0, 10) + ', ' + item.created.slice(11, 19),
                        type: item.type,
                        status: item.status,
                        pesel: item.pesel,
                        note: item.note
                    });
                });
                _this.updateCounters();
            }
        });
        this.api.post('clients-list', { filter: '%%' }).subscribe(function (res) {
            if (res.status == 'success') {
                _this.items = [];
                res.list.forEach(function (item) {
                    _this.items.push({
                        id: item.id,
                        forename: item.forename,
                        lastname: item.lastname,
                        address: item.address,
                        phone: item.phone,
                        email: item.email,
                        creator: item.creator,
                        created: item.created.slice(0, 10) + ', ' + item.created.slice(11, 19),
                        type: item.type,
                        status: item.status,
                        pesel: item.pesel,
                        note: item.note
                    });
                });
                _this.storage.set('clientsList', res.list);
            }
        }, function (err) {
            console.error('ERROR', err);
        });
    };
    ClientsPage.prototype.refreshPage = function () {
        this.showItems();
    };
    ClientsPage.prototype.selectSearchbarFilter = function () {
        this.searchbarFilter.open();
    };
    ClientsPage.prototype.searchItems = function (ev) {
        var _this = this;
        this.data.filterValue = ev.target.value || '';
        this.storage.get('clientsList').then(function (val) {
            if (val) {
                _this.data.collapseID = -1;
                _this.items = [];
                val.forEach(function (item) {
                    if ((_this.data.filterType == 'fullname' && (item.forename + ' ' + item.lastname).toLowerCase().includes(_this.data.filterValue.toLowerCase()))
                        || (_this.data.filterType == 'address' && item.address.toLowerCase().includes(_this.data.filterValue.toLowerCase())))
                        _this.items.push({
                            id: item.id,
                            forename: item.forename,
                            lastname: item.lastname,
                            address: item.address,
                            phone: item.phone,
                            email: item.email,
                            creator: item.creator,
                            created: item.created.slice(0, 10) + ', ' + item.created.slice(11, 19),
                            type: item.type,
                            status: item.status,
                            pesel: item.pesel,
                            note: item.note
                        });
                });
            }
        });
    };
    ClientsPage.prototype.collapseItem = function (item) {
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].color = '';
        }
        if (this.data.collapseID == -1 || this.data.collapseID != this.items.indexOf(item)) {
            this.data.collapseID = this.items.indexOf(item);
            item.color = 'lgray';
        }
        else {
            this.data.collapseID = -1;
        }
    };
    ClientsPage.prototype.newItem = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__clients_new_clients_new__["a" /* ClientsNewPage */], null);
        modal.present();
        // this.navCtrl.setRoot(ClientsNewPage);
    };
    ClientsPage.prototype.previewItem = function (item) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__clients_preview_clients_preview__["a" /* ClientsPreviewPage */], { item: item });
        modal.present();
        // this.navCtrl.setRoot(ClientsPreviewPage);
    };
    ClientsPage.prototype.editItem = function (item) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__clients_edit_clients_edit__["a" /* ClientsEditPage */], { item: item });
        modal.present();
        // this.navCtrl.setRoot(ClientsEditPage);
    };
    ClientsPage.prototype.deleteItem = function (item) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: this.lang.clientsDeleteTitle,
            message: this.lang.clientsDeleteMessage,
            buttons: [
                {
                    text: this.lang.yes,
                    handler: function () {
                        _this.api.post('clients-delete', { id: item.id, user: _this.account.id }).subscribe(function (res) {
                            if (res.status == 'success') {
                                var index = _this.items.indexOf(item);
                                if (index > -1) {
                                    _this.items.splice(index, 1);
                                }
                                var toast = _this.toastCtrl.create({
                                    message: _this.lang.operationSucceed,
                                    duration: 3000,
                                    position: 'top'
                                });
                                toast.present();
                            }
                            else {
                                var toast = _this.toastCtrl.create({
                                    message: _this.lang.errorServer,
                                    duration: 3000,
                                    position: 'top'
                                });
                                toast.present();
                            }
                        }, function (err) {
                            console.error('ERROR', err);
                            var toast = _this.toastCtrl.create({
                                message: _this.lang.errorServerAccess,
                                duration: 3000,
                                position: 'top'
                            });
                            toast.present();
                        });
                    }
                },
                {
                    text: this.lang.no,
                    handler: function () { }
                }
            ]
        });
        confirm.present();
    };
    ClientsPage.prototype.ionViewDidEnter = function () {
        if (this.account)
            this.updateCounters();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('searchbarFilter'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Select */])
    ], ClientsPage.prototype, "searchbarFilter", void 0);
    ClientsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-clients',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\clients\clients.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			<button ion-button icon-only (click)="openHomePage()">\n				<ion-icon name="home"></ion-icon>\n			</button>\n			<button ion-button icon-only (click)="openLastPage()">\n				<ion-icon name="arrow-back"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'CLIENTS\' | translate }}</ion-title>\n		<ion-buttons margin-right right style="width:80px" menuToggle>\n			<button ion-button icon-only>\n				<ion-badge [hidden]="quickMenu.messages.length+quickMenu.notifications.length+quickMenu.warnings.length<1" [color]="quickMenu.warnings.length>0 ? \'danger\' : \'primary\'">{{ quickMenu.messages.length+quickMenu.notifications.length }}</ion-badge>&nbsp;\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<ion-buttons left>\n			<button ion-button icon-only (click)="selectSearchbarFilter()">\n				<ion-icon name="funnel"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-searchbar placeholder="{{ \'SEARCH\' | translate }}" (ionInput)="searchItems($event)"></ion-searchbar>\n		<ion-buttons right>\n			<button ion-button icon-only (click)="refreshPage()">\n				<ion-icon name="refresh"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-toolbar>\n	<br>\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<button ion-item color="primary" (click)="newItem()">\n			<div margin-left item-left>\n				<ion-icon name="add" item-left></ion-icon>\n			</div>\n			<div margin-left item-left>\n				{{ \'CLIENTS_NEW\' | translate }}\n			</div>\n		</button>\n	</ion-list>\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item-sliding *ngFor="let item of items">\n			<ion-item [color]="item.color" (click)="collapseItem(item)">\n				<!-- <ion-icon name="contact" item-left></ion-icon> -->\n				<div padding item-left>\n					<!-- {{ items.indexOf(item)+1 }}. -->\n					{{ item.id }}.\n				</div>\n				<div item-left>\n					<b>{{ item.forename }} {{ item.lastname }}</b>\n					<br>\n					{{ item.address }}\n					<br *ngIf="data.collapseID==items.indexOf(item)">\n					<br *ngIf="data.collapseID==items.indexOf(item)">\n					<button *ngIf="data.collapseID==items.indexOf(item)" ion-button color="primary" (click)="previewItem(item)">\n						<ion-icon name="document"> {{ \'PREVIEW\' | translate }}</ion-icon>\n					</button>\n					<br *ngIf="data.collapseID==items.indexOf(item)" [hidden]="account.group!=1 && account.id!=item.creator">\n					<button *ngIf="data.collapseID==items.indexOf(item)" [hidden]="account.group!=1 && account.id!=item.creator" ion-button color="secondary" (click)="editItem(item)">\n						<ion-icon name="create"> {{ \'EDIT\' | translate }}</ion-icon>\n					</button>\n					<br *ngIf="data.collapseID==items.indexOf(item)" [hidden]="account.group!=1 && account.id!=item.creator">\n					<button *ngIf="data.collapseID==items.indexOf(item)" [hidden]="account.group!=1 && account.id!=item.creator" ion-button color="danger" (click)="deleteItem(item)">\n						<ion-icon name="trash"> {{ \'DELETE\' | translate }}</ion-icon>\n					</button>\n				</div>\n			</ion-item>\n		</ion-item-sliding>\n		<ion-item *ngIf="items===undefined || items.length==0">\n			{{ \'WARNING_EMPTYLIST\' | translate }}\n		</ion-item>\n	</ion-list>\n	<ion-item hidden>\n		<ion-label>{{ \'FILTERS\' | translate }}</ion-label>\n		<ion-select [(ngModel)]="data.filterType" #searchbarFilter>\n			<ion-option value="fullname">{{ \'ACCOUNT_FULLNAME\' | translate }}</ion-option>\n			<ion-option value="address">{{ \'ACCOUNT_ADDRESS\' | translate }}</ion-option>\n		</ion-select>\n	</ion-item>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\clients\clients.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* Api */]])
    ], ClientsPage);
    return ClientsPage;
}());

//# sourceMappingURL=clients.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientsNewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ClientsNewPage = /** @class */ (function () {
    function ClientsNewPage(platform, navCtrl, toastCtrl, translate, storage, api) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.storage = storage;
        this.api = api;
        this.account = { id: 0 };
        this.lang = {
            errorFillFields: '',
            operationSucceed: '',
            errorServer: '',
            errorServerAccess: ''
        };
        this.data = {
            tabs: 0,
            forename: '',
            lastname: '',
            address: '',
            phone: '',
            email: '',
            type: 'person',
            status: 'active',
            pesel: '',
            note: ''
        };
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
        });
        this.translate.get('ERROR_FILLFIELDS').subscribe(function (value) { _this.lang.errorFillFields = value; });
        this.translate.get('OPERATION_SUCCEED').subscribe(function (value) { _this.lang.operationSucceed = value; });
        this.translate.get('ERROR_SERVER').subscribe(function (value) { _this.lang.errorServer = value; });
        this.translate.get('ERROR_SERVERACCESS').subscribe(function (value) { _this.lang.errorServerAccess = value; });
    }
    ClientsNewPage.prototype.selectTabs = function (val) {
        this.data.tabs = val;
    };
    ClientsNewPage.prototype.saveChanges = function () {
        var _this = this;
        if (this.data.forename == '' || this.data.lastname == '' || this.data.address == '') {
            var toast = this.toastCtrl.create({
                message: this.lang.errorFillFields,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        else {
            this.api.post('clients-new', { item: this.data, user: this.account.id }).subscribe(function (res) {
                if (res.status == 'success') {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.operationSucceed,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                    _this.navCtrl.pop();
                }
                else {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.errorServer,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
            }, function (err) {
                console.error('ERROR', err);
                var toast = _this.toastCtrl.create({
                    message: _this.lang.errorServerAccess,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            });
        }
        ;
    };
    ClientsNewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-clients-new',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\clients\clients-new\clients-new.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			<button ion-button icon-only navPop>\n				<ion-icon name="close"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'CLIENTS_NEW\' | translate }}</ion-title>\n		<ion-buttons margin-right right style="width:80px">\n			\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<button ion-button [color]="data.tabs==0 ? \'primary\' : \'lgray\'" (click)="selectTabs(0)">{{ \'CLIENTS_GENERAL\' | translate }}</button>\n		<button ion-button [color]="data.tabs==1 ? \'primary\' : \'lgray\'" (click)="selectTabs(1)">{{ \'CLIENTS_CONTACTS\' | translate }}</button>\n		<button ion-button [color]="data.tabs==2 ? \'primary\' : \'lgray\'" (click)="selectTabs(2)">{{ \'CLIENTS_NOTES\' | translate }}</button>\n	</ion-toolbar>\n	<br>\n	<!-- tab0 -->\n	<ion-list *ngIf="data.tabs==0" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_FORENAME\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_FORENAME\' | translate }}" [(ngModel)]="data.forename" type="text" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_LASTNAME\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_LASTNAME\' | translate }}" [(ngModel)]="data.lastname" type="text" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'CLIENTS_PESEL\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'CLIENTS_PESEL\' | translate }}" [(ngModel)]="data.pesel" type="text" clearInput></ion-input>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'CLIENTS_TYPE\' | translate }}:</b></ion-label>\n			<ion-select [(ngModel)]="data.type">\n				<ion-option value="person">{{ \'CLIENTS_TYPE_PERSON\' | translate }}</ion-option>\n				<ion-option value="company">{{ \'CLIENTS_TYPE_COMPANY\' | translate }}</ion-option>\n			</ion-select>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'CLIENTS_STATUS\' | translate }}:</b></ion-label>\n			<ion-select [(ngModel)]="data.status">\n				<ion-option value="active">{{ \'CLIENTS_STATUS_ACTIVE\' | translate }}</ion-option>\n				<ion-option value="blocked">{{ \'CLIENTS_STATUS_BLOCKED\' | translate }}</ion-option>\n			</ion-select>\n		</ion-item>\n	</ion-list>\n	<!-- tab1 -->\n	<ion-list *ngIf="data.tabs==1" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_ADDRESS\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_ADDRESS\' | translate }}" [(ngModel)]="data.address" type="text" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_PHONE\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_PHONE\' | translate }}" [(ngModel)]="data.phone" type="text" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_EMAIL\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_EMAIL\' | translate }}" [(ngModel)]="data.email" type="text" clearInput></ion-input>\n		</ion-item>\n	</ion-list>\n	<!-- tab2 -->\n	<ion-list *ngIf="data.tabs==2" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label stacked><b>{{ \'CLIENTS_NOTE\' | translate }}:</b></ion-label>\n			<ion-textarea placeholder="{{ \'CLIENTS_NOTE\' | translate }}" [(ngModel)]="data.note" type="text" clearInput></ion-textarea>\n		</ion-item>\n	</ion-list>\n	<!-- end -->\n	<br>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<div text-center>\n			<button ion-button color="secondary" style="width:200px; max-width:40%;" (click)="saveChanges()">{{ \'SAVE\' | translate }}</button>\n		</div>\n	</ion-toolbar>\n	<br>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\clients\clients-new\clients-new.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* Api */]])
    ], ClientsNewPage);
    return ClientsNewPage;
}());

//# sourceMappingURL=clients-new.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientsPreviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ClientsPreviewPage = /** @class */ (function () {
    function ClientsPreviewPage(platform, navCtrl, navParams, storage) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.account = { id: 0 };
        this.data = {
            tabs: 0
        };
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
        });
        this.selectedItem = navParams.get('item');
    }
    ClientsPreviewPage.prototype.selectTabs = function (val) {
        this.data.tabs = val;
    };
    ClientsPreviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-clients-preview',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\clients\clients-preview\clients-preview.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			<button ion-button icon-only navPop>\n				<ion-icon name="close"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'PREVIEW\' | translate }}:<br><span style="font-size:14px">({{ selectedItem.id }}) {{ selectedItem.forename }} {{ selectedItem.lastname }}</span></ion-title>\n		<ion-buttons margin-right right style="width:80px">\n			\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<button ion-button [color]="data.tabs==0 ? \'primary\' : \'lgray\'" (click)="selectTabs(0)">{{ \'CLIENTS_GENERAL\' | translate }}</button>\n		<button ion-button [color]="data.tabs==1 ? \'primary\' : \'lgray\'" (click)="selectTabs(1)">{{ \'CLIENTS_CONTACTS\' | translate }}</button>\n		<button ion-button [color]="data.tabs==2 ? \'primary\' : \'lgray\'" (click)="selectTabs(2)">{{ \'CLIENTS_NOTES\' | translate }}</button>\n	</ion-toolbar>\n	<br>\n	<!-- tab0 -->\n	<ion-list *ngIf="data.tabs==0" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_FORENAME\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.forename }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_LASTNAME\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.lastname }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'CLIENTS_PESEL\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.pesel }}</ion-label>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'CLIENTS_TYPE\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.type }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'CLIENTS_STATUS\' | translate }}:</b></ion-label>\n			<ion-label>{{ \'CLIENTS_STATUS_\'+selectedItem.status.toUpperCase() | translate }}</ion-label>\n		</ion-item>\n		<br *ngIf="account.group==1">\n		<ion-item *ngIf="account.group==1">\n			<ion-label fixed><b>{{ \'CREATED\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.created }}</ion-label>\n		</ion-item>\n	</ion-list>\n	<!-- tab1 -->\n	<ion-list *ngIf="data.tabs==1" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_ADDRESS\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.address }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_PHONE\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.phone }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_EMAIL\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.email }}</ion-label>\n		</ion-item>\n	</ion-list>\n	<!-- tab2 -->\n	<ion-list *ngIf="data.tabs==2" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label stacked><b>{{ \'CLIENTS_NOTE\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.note }}</ion-label>\n		</ion-item>\n	</ion-list>\n	<!-- end -->\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\clients\clients-preview\clients-preview.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], ClientsPreviewPage);
    return ClientsPreviewPage;
}());

//# sourceMappingURL=clients-preview.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientsEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ClientsEditPage = /** @class */ (function () {
    function ClientsEditPage(platform, navCtrl, navParams, toastCtrl, translate, storage, api) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.storage = storage;
        this.api = api;
        this.account = { id: 0 };
        this.lang = {
            errorFillFields: '',
            operationSucceed: '',
            errorServer: '',
            errorServerAccess: ''
        };
        this.data = {
            tabs: 0
        };
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
        });
        this.selectedItem = navParams.get('item');
        this.translate.get('ERROR_FILLFIELDS').subscribe(function (value) { _this.lang.errorFillFields = value; });
        this.translate.get('OPERATION_SUCCEED').subscribe(function (value) { _this.lang.operationSucceed = value; });
        this.translate.get('ERROR_SERVER').subscribe(function (value) { _this.lang.errorServer = value; });
        this.translate.get('ERROR_SERVERACCESS').subscribe(function (value) { _this.lang.errorServerAccess = value; });
    }
    ClientsEditPage.prototype.selectTabs = function (val) {
        this.data.tabs = val;
    };
    ClientsEditPage.prototype.saveChanges = function () {
        var _this = this;
        if (this.selectedItem.forename == '' || this.selectedItem.lastname == '' || this.selectedItem.address == '') {
            var toast = this.toastCtrl.create({
                message: this.lang.errorFillFields,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        else {
            this.api.post('clients-edit', { item: this.selectedItem, user: this.account.id }).subscribe(function (res) {
                if (res.status == 'success') {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.operationSucceed,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                    _this.navCtrl.pop();
                }
                else {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.errorServer,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
            }, function (err) {
                console.error('ERROR', err);
                var toast = _this.toastCtrl.create({
                    message: _this.lang.errorServerAccess,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            });
        }
        ;
    };
    ClientsEditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-clients-edit',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\clients\clients-edit\clients-edit.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			<button ion-button icon-only navPop>\n				<ion-icon name="close"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'EDIT\' | translate }}:<br><span style="font-size:14px">({{ selectedItem.id }}) {{ selectedItem.forename }} {{ selectedItem.lastname }}</span></ion-title>\n		<ion-buttons margin-right right style="width:80px">\n			\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<button ion-button [color]="data.tabs==0 ? \'primary\' : \'lgray\'" (click)="selectTabs(0)">{{ \'CLIENTS_GENERAL\' | translate }}</button>\n		<button ion-button [color]="data.tabs==1 ? \'primary\' : \'lgray\'" (click)="selectTabs(1)">{{ \'CLIENTS_CONTACTS\' | translate }}</button>\n		<button ion-button [color]="data.tabs==2 ? \'primary\' : \'lgray\'" (click)="selectTabs(2)">{{ \'CLIENTS_NOTES\' | translate }}</button>\n	</ion-toolbar>\n	<br>\n	<!-- tab0 -->\n	<ion-list *ngIf="data.tabs==0" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_FORENAME\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_FORENAME\' | translate }}" [(ngModel)]="selectedItem.forename" type="text" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_LASTNAME\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_LASTNAME\' | translate }}" [(ngModel)]="selectedItem.lastname" type="text" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'CLIENTS_PESEL\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'CLIENTS_PESEL\' | translate }}" [(ngModel)]="selectedItem.pesel" type="text" clearInput></ion-input>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'CLIENTS_TYPE\' | translate }}:</b></ion-label>\n			<ion-select [(ngModel)]="selectedItem.type">\n				<ion-option value="person">{{ \'CLIENTS_TYPE_PERSON\' | translate }}</ion-option>\n				<ion-option value="company">{{ \'CLIENTS_TYPE_COMPANY\' | translate }}</ion-option>\n			</ion-select>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'CLIENTS_STATUS\' | translate }}:</b></ion-label>\n			<ion-select [(ngModel)]="selectedItem.status">\n				<ion-option value="active">{{ \'CLIENTS_STATUS_ACTIVE\' | translate }}</ion-option>\n				<ion-option value="blocked">{{ \'CLIENTS_STATUS_BLOCKED\' | translate }}</ion-option>\n			</ion-select>\n		</ion-item>\n	</ion-list>\n	<!-- tab1 -->\n	<ion-list *ngIf="data.tabs==1" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_ADDRESS\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_ADDRESS\' | translate }}" [(ngModel)]="selectedItem.address" type="text" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_PHONE\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_PHONE\' | translate }}" [(ngModel)]="selectedItem.phone" type="text" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_EMAIL\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'ACCOUNT_EMAIL\' | translate }}" [(ngModel)]="selectedItem.email" type="text" clearInput></ion-input>\n		</ion-item>\n	</ion-list>\n	<!-- tab2 -->\n	<ion-list *ngIf="data.tabs==2" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label stacked><b>{{ \'CLIENTS_NOTE\' | translate }}:</b></ion-label>\n			<ion-textarea placeholder="{{ \'CLIENTS_NOTE\' | translate }}" [(ngModel)]="selectedItem.note" type="text" clearInput></ion-textarea>\n		</ion-item>\n	</ion-list>\n	<!-- end -->\n	<br>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<div text-center>\n			<button ion-button color="secondary" style="width:200px; max-width:40%;" (click)="saveChanges()">{{ \'SAVE\' | translate }}</button>\n		</div>\n	</ion-toolbar>\n	<br>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\clients\clients-edit\clients-edit.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* Api */]])
    ], ClientsEditPage);
    return ClientsEditPage;
}());

//# sourceMappingURL=clients-edit.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tickets_new_tickets_new__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tickets_preview_tickets_preview__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tickets_edit_tickets_edit__ = __webpack_require__(380);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TicketsPage = /** @class */ (function () {
    function TicketsPage(platform, navCtrl, toastCtrl, alertCtrl, modalCtrl, events, translate, storage, api) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.translate = translate;
        this.storage = storage;
        this.api = api;
        this.account = { id: 0 };
        this.quickMenu = {
            messages: [],
            notifications: [],
            warnings: []
        };
        this.lang = {
            ticketsDeleteTitle: '',
            ticketsDeleteMessage: '',
            yes: '',
            no: '',
            operationSucceed: '',
            errorServer: '',
            errorServerAccess: ''
        };
        this.data = {
            filterType: 'fullname',
            filterValue: '',
            collapseID: -1
        };
        this.items = [];
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
            _this.showItems();
        });
        this.translate.get('TICKETS_DELETE_TITLE').subscribe(function (value) { _this.lang.ticketsDeleteTitle = value; });
        this.translate.get('TICKETS_DELETE_MESSAGE').subscribe(function (value) { _this.lang.ticketsDeleteMessage = value; });
        this.translate.get('YES').subscribe(function (value) { _this.lang.yes = value; });
        this.translate.get('NO').subscribe(function (value) { _this.lang.no = value; });
        this.translate.get('OPERATION_SUCCEED').subscribe(function (value) { _this.lang.operationSucceed = value; });
        this.translate.get('ERROR_SERVER').subscribe(function (value) { _this.lang.errorServer = value; });
        this.translate.get('ERROR_SERVERACCESS').subscribe(function (value) { _this.lang.errorServerAccess = value; });
    }
    TicketsPage.prototype.openHomePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    TicketsPage.prototype.openLastPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    TicketsPage.prototype.updateCounters = function () {
        var _this = this;
        this.api.post('notifications-countNew', { user: this.account.id }).subscribe(function (res) {
            if (res.status == 'success')
                _this.quickMenu.notifications.length = res.counter;
            _this.storage.set('quickMenu', _this.quickMenu);
            _this.events.publish('quickMenu');
        });
    };
    TicketsPage.prototype.showItems = function () {
        var _this = this;
        this.data.collapseID = -1;
        this.storage.get('ticketsList').then(function (val) {
            if (val) {
                _this.items = [];
                val.forEach(function (item) {
                    _this.items.push({
                        id: item.id,
                        client: item.client,
                        forename: item.forename,
                        lastname: item.lastname,
                        address: item.address,
                        phone: item.phone,
                        email: item.email,
                        creator: item.creator,
                        created: item.created.slice(0, 10) + ', ' + item.created.slice(11, 19),
                        status: item.status,
                        priority: item.priority,
                        category: item.category,
                        payment: item.payment,
                        starting: item.starting.slice(0, 10) + ', ' + item.starting.slice(11, 19),
                        ending: item.ending.slice(0, 10) + ', ' + item.ending.slice(11, 19),
                        description1: item.description1,
                        description2: item.description2,
                        description3: item.description3,
                        note: item.note,
                        employees: item.employees
                    });
                });
                _this.updateCounters();
            }
        });
        this.api.post('tickets-list', { filter: '%%' }).subscribe(function (res) {
            if (res.status == 'success') {
                _this.items = [];
                res.list.forEach(function (item) {
                    _this.items.push({
                        id: item.id,
                        client: item.client,
                        forename: item.forename,
                        lastname: item.lastname,
                        address: item.address,
                        phone: item.phone,
                        email: item.email,
                        creator: item.creator,
                        created: item.created.slice(0, 10) + ', ' + item.created.slice(11, 19),
                        status: item.status,
                        priority: item.priority,
                        category: item.category,
                        payment: item.payment,
                        starting: item.starting.slice(0, 10) + ', ' + item.starting.slice(11, 19),
                        ending: item.ending.slice(0, 10) + ', ' + item.ending.slice(11, 19),
                        description1: item.description1,
                        description2: item.description2,
                        description3: item.description3,
                        note: item.note,
                        employees: item.employees
                    });
                });
                _this.storage.set('ticketsList', res.list);
            }
        }, function (err) {
            console.error('ERROR', err);
        });
    };
    TicketsPage.prototype.refreshPage = function () {
        this.showItems();
    };
    TicketsPage.prototype.selectSearchbarFilter = function () {
        this.searchbarFilter.open();
    };
    TicketsPage.prototype.searchItems = function (ev) {
        var _this = this;
        this.data.filterValue = ev.target.value || '';
        this.storage.get('ticketsList').then(function (val) {
            if (val) {
                _this.data.collapseID = -1;
                _this.items = [];
                val.forEach(function (item) {
                    if ((_this.data.filterType == 'fullname' && (item.forename + ' ' + item.lastname).includes(_this.data.filterValue))
                        || (_this.data.filterType == 'address' && item.address.includes(_this.data.filterValue)))
                        _this.items.push({
                            id: item.id,
                            client: item.client,
                            forename: item.forename,
                            lastname: item.lastname,
                            address: item.address,
                            phone: item.phone,
                            email: item.email,
                            creator: item.creator,
                            created: item.created.slice(0, 10) + ', ' + item.created.slice(11, 19),
                            status: item.status,
                            priority: item.priority,
                            category: item.category,
                            payment: item.payment,
                            starting: item.starting.slice(0, 10) + ', ' + item.starting.slice(11, 19),
                            ending: item.ending.slice(0, 10) + ', ' + item.ending.slice(11, 19),
                            description1: item.description1,
                            description2: item.description2,
                            description3: item.description3,
                            note: item.note,
                            employees: item.employees
                        });
                });
            }
        });
    };
    TicketsPage.prototype.collapseItem = function (item) {
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].color = '';
        }
        if (this.data.collapseID == -1 || this.data.collapseID != this.items.indexOf(item)) {
            this.data.collapseID = this.items.indexOf(item);
            item.color = 'lgray';
        }
        else {
            this.data.collapseID = -1;
        }
    };
    TicketsPage.prototype.newItem = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__tickets_new_tickets_new__["a" /* TicketsNewPage */], null);
        modal.present();
        // this.navCtrl.setRoot(TicketsNewPage);
    };
    TicketsPage.prototype.previewItem = function (item) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__tickets_preview_tickets_preview__["a" /* TicketsPreviewPage */], { item: item });
        modal.present();
        // this.navCtrl.setRoot(TicketsPreviewPage);
    };
    TicketsPage.prototype.editItem = function (item) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__tickets_edit_tickets_edit__["a" /* TicketsEditPage */], { item: item });
        modal.present();
        // this.navCtrl.setRoot(TicketsEditPage);
    };
    TicketsPage.prototype.deleteItem = function (item) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: this.lang.ticketsDeleteTitle,
            message: this.lang.ticketsDeleteMessage,
            buttons: [
                {
                    text: this.lang.yes,
                    handler: function () {
                        _this.api.post('tickets-delete', { id: item.id, user: _this.account.id }).subscribe(function (res) {
                            if (res.status == 'success') {
                                var index = _this.items.indexOf(item);
                                if (index > -1) {
                                    _this.items.splice(index, 1);
                                }
                                var toast = _this.toastCtrl.create({
                                    message: _this.lang.operationSucceed,
                                    duration: 3000,
                                    position: 'top'
                                });
                                toast.present();
                            }
                            else {
                                var toast = _this.toastCtrl.create({
                                    message: _this.lang.errorServer,
                                    duration: 3000,
                                    position: 'top'
                                });
                                toast.present();
                            }
                        }, function (err) {
                            console.error('ERROR', err);
                            var toast = _this.toastCtrl.create({
                                message: _this.lang.errorServerAccess,
                                duration: 3000,
                                position: 'top'
                            });
                            toast.present();
                        });
                    }
                },
                {
                    text: this.lang.no,
                    handler: function () { }
                }
            ]
        });
        confirm.present();
    };
    TicketsPage.prototype.ionViewDidEnter = function () {
        if (this.account)
            this.updateCounters();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('searchbarFilter'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Select */])
    ], TicketsPage.prototype, "searchbarFilter", void 0);
    TicketsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tickets',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\tickets\tickets.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			<button ion-button icon-only (click)="openHomePage()">\n				<ion-icon name="home"></ion-icon>\n			</button>\n			<button ion-button icon-only (click)="openLastPage()">\n				<ion-icon name="arrow-back"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'TICKETS\' | translate }}</ion-title>\n		<ion-buttons margin-right right style="width:80px" menuToggle>\n			<button ion-button icon-only>\n				<ion-badge [hidden]="quickMenu.messages.length+quickMenu.notifications.length+quickMenu.warnings.length<1" [color]="quickMenu.warnings.length>0 ? \'danger\' : \'primary\'">{{ quickMenu.messages.length+quickMenu.notifications.length }}</ion-badge>&nbsp;\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<ion-buttons left>\n			<button ion-button icon-only (click)="selectSearchbarFilter()">\n				<ion-icon name="funnel"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-searchbar placeholder="{{ \'SEARCH\' | translate }}" (ionInput)="searchItems($event)"></ion-searchbar>\n		<ion-buttons right>\n			<button ion-button icon-only (click)="refreshPage()">\n				<ion-icon name="refresh"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-toolbar>\n	<br>\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<button ion-item color="primary" (click)="newItem()">\n			<div margin-left item-left>\n				<ion-icon name="add" item-left></ion-icon>\n			</div>\n			<div margin-left item-left>\n				{{ \'TICKETS_NEW\' | translate }}\n			</div>\n		</button>\n	</ion-list>\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item-sliding *ngFor="let item of items">\n			<ion-item [color]="item.color" (click)="collapseItem(item)">\n				<!-- <ion-icon name="contact" item-left></ion-icon> -->\n				<div padding item-left>\n					<!-- {{ items.indexOf(item)+1 }}. -->\n					{{ item.id }}.\n				</div>\n				<div item-left>\n					<b>{{ item.forename }} {{ item.lastname }}</b>\n					<br>\n					{{ item.address }}\n					<br>\n					<span style="font-size:12px">{{ item.description1 }}</span>\n					<br *ngIf="data.collapseID==items.indexOf(item)">\n					<br *ngIf="data.collapseID==items.indexOf(item)">\n					<button *ngIf="data.collapseID==items.indexOf(item)" ion-button color="primary" (click)="previewItem(item)">\n						<ion-icon name="document"> {{ \'PREVIEW\' | translate }}</ion-icon>\n					</button>\n					<br *ngIf="data.collapseID==items.indexOf(item)" [hidden]="account.group!=1 && account.id!=item.creator">\n					<button *ngIf="data.collapseID==items.indexOf(item)" [hidden]="account.group!=1 && account.id!=item.creator" ion-button color="secondary" (click)="editItem(item)">\n						<ion-icon name="create"> {{ \'EDIT\' | translate }}</ion-icon>\n					</button>\n					<br *ngIf="data.collapseID==items.indexOf(item)" [hidden]="account.group!=1 && account.id!=item.creator">\n					<button *ngIf="data.collapseID==items.indexOf(item)" [hidden]="account.group!=1 && account.id!=item.creator" ion-button color="danger" (click)="deleteItem(item)">\n						<ion-icon name="trash"> {{ \'DELETE\' | translate }}</ion-icon>\n					</button>\n				</div>\n			</ion-item>\n		</ion-item-sliding>\n		<ion-item *ngIf="items===undefined || items.length==0">\n			{{ \'WARNING_EMPTYLIST\' | translate }}\n		</ion-item>\n	</ion-list>\n	<ion-item hidden>\n		<ion-label>{{ \'FILTERS\' | translate }}</ion-label>\n		<ion-select [(ngModel)]="data.filterType" #searchbarFilter>\n			<ion-option value="fullname">{{ \'ACCOUNT_FULLNAME\' | translate }}</ion-option>\n			<ion-option value="address">{{ \'ACCOUNT_ADDRESS\' | translate }}</ion-option>\n		</ion-select>\n	</ion-item>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\tickets\tickets.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* Api */]])
    ], TicketsPage);
    return TicketsPage;
}());

//# sourceMappingURL=tickets.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketsNewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TicketsNewPage = /** @class */ (function () {
    function TicketsNewPage(platform, navCtrl, toastCtrl, translate, storage, api) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.storage = storage;
        this.api = api;
        this.account = { id: 0 };
        this.lang = {
            errorFillFields: '',
            operationSucceed: '',
            errorServer: '',
            errorServerAccess: ''
        };
        this.data = {
            tabs: 0,
            client: null,
            forename: '',
            lastname: '',
            address: '',
            phone: '',
            email: '',
            creator: this.account.id,
            created: '',
            status: 'order',
            priority: 2,
            category: '',
            payment: 0.00,
            starting: new Date().toISOString(),
            ending: new Date().toISOString(),
            description1: '',
            description2: '',
            description3: '',
            note: '',
            employees: '' + this.account.id
        };
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
        });
        this.translate.get('ERROR_FILLFIELDS').subscribe(function (value) { _this.lang.errorFillFields = value; });
        this.translate.get('OPERATION_SUCCEED').subscribe(function (value) { _this.lang.operationSucceed = value; });
        this.translate.get('ERROR_SERVER').subscribe(function (value) { _this.lang.errorServer = value; });
        this.translate.get('ERROR_SERVERACCESS').subscribe(function (value) { _this.lang.errorServerAccess = value; });
    }
    TicketsNewPage.prototype.selectTabs = function (val) {
        this.data.tabs = val;
    };
    TicketsNewPage.prototype.saveChanges = function () {
        var _this = this;
        if (this.data.client == '') {
            var toast = this.toastCtrl.create({
                message: this.lang.errorFillFields,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        else {
            this.api.post('tickets-new', { item: this.data, user: this.account.id }).subscribe(function (res) {
                if (res.status == 'success') {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.operationSucceed,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                    _this.navCtrl.pop();
                }
                else {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.errorServer,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
            }, function (err) {
                console.error('ERROR', err);
                var toast = _this.toastCtrl.create({
                    message: _this.lang.errorServerAccess,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            });
        }
        ;
    };
    TicketsNewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tickets-new',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\tickets\tickets-new\tickets-new.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			<button ion-button icon-only navPop>\n				<ion-icon name="close"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'TICKETS_NEW\' | translate }}</ion-title>\n		<ion-buttons margin-right right style="width:80px">\n			\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<button ion-button [color]="data.tabs==0 ? \'primary\' : \'lgray\'" (click)="selectTabs(0)">{{ \'TICKETS_GENERAL\' | translate }}</button>\n		<button ion-button [color]="data.tabs==1 ? \'primary\' : \'lgray\'" (click)="selectTabs(1)">{{ \'TICKETS_NOTES\' | translate }}</button>\n		<button ion-button [color]="data.tabs==2 ? \'primary\' : \'lgray\'" (click)="selectTabs(2)">{{ \'EMPLOYEES\' | translate }}</button>\n	</ion-toolbar>\n	<br>\n	<!-- tab0 -->\n	<ion-list *ngIf="data.tabs==0" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_CLIENTID\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'TICKETS_CLIENTID\' | translate }}" [(ngModel)]="data.client" type="number" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_FORENAME\' | translate }}:</b></ion-label>\n			<ion-label>{{ data.forename }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_LASTNAME\' | translate }}:</b></ion-label>\n			<ion-label>{{ data.lastname }}</ion-label>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_ADDRESS\' | translate }}:</b></ion-label>\n			<ion-label>{{ data.address }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_PHONE\' | translate }}:</b></ion-label>\n			<ion-label>{{ data.phone }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_EMAIL\' | translate }}:</b></ion-label>\n			<ion-label>{{ data.email }}</ion-label>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_STATUS\' | translate }}:</b></ion-label>\n			<ion-select [(ngModel)]="data.status">\n				<ion-option value="order">{{ \'TICKETS_STATUS_ORDER\' | translate }}</ion-option>\n				<ion-option value="implementation">{{ \'TICKETS_STATUS_IMPLEMENTATION\' | translate }}</ion-option>\n				<ion-option value="waiting">{{ \'TICKETS_STATUS_WAITING\' | translate }}</ion-option>\n				<ion-option value="ended">{{ \'TICKETS_STATUS_ENDED\' | translate }}</ion-option>\n				<ion-option value="verified">{{ \'TICKETS_STATUS_VERIFIED\' | translate }}</ion-option>\n				<ion-option value="toverify">{{ \'TICKETS_STATUS_TOVERIFY\' | translate }}</ion-option>\n			</ion-select>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_PRIORITY\' | translate }}:</b></ion-label>\n			<ion-select [(ngModel)]="data.priority">\n				<ion-option value="0">{{ \'TICKETS_PRIORITY_0\' | translate }}</ion-option>\n				<ion-option value="1">{{ \'TICKETS_PRIORITY_1\' | translate }}</ion-option>\n				<ion-option value="2">{{ \'TICKETS_PRIORITY_2\' | translate }}</ion-option>\n				<ion-option value="3">{{ \'TICKETS_PRIORITY_3\' | translate }}</ion-option>\n				<ion-option value="4">{{ \'TICKETS_PRIORITY_4\' | translate }}</ion-option>\n			</ion-select>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_CATEGORY\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'TICKETS_CATEGORY\' | translate }}" [(ngModel)]="data.category" type="text" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_PAYMENT\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'TICKETS_PAYMENT\' | translate }}" [(ngModel)]="data.payment" type="text" clearInput></ion-input>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_STARTINGDATE\' | translate }}:</b></ion-label>\n			<ion-datetime displayFormat="YYYY-MM-DD, HH:mm" pickerFormat="YYYY-MM-DDTHH:mm:ssTZD" [(ngModel)]="data.starting"></ion-datetime>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_ENDINGDATE\' | translate }}:</b></ion-label>\n			<ion-datetime displayFormat="YYYY-MM-DD, HH:mm" pickerFormat="YYYY-MM-DDTHH:mm:ssTZD" [(ngModel)]="data.ending"></ion-datetime>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label stacked><b>{{ \'TICKETS_DESCRIPTION1\' | translate }}:</b></ion-label>\n			<ion-textarea placeholder="{{ \'TICKETS_DESCRIPTION1\' | translate }}" [(ngModel)]="data.description1" type="text" clearInput></ion-textarea>\n		</ion-item>\n		<ion-item>\n			<ion-label stacked><b>{{ \'TICKETS_DESCRIPTION2\' | translate }}:</b></ion-label>\n			<ion-textarea placeholder="{{ \'TICKETS_DESCRIPTION2\' | translate }}" [(ngModel)]="data.description2" type="text" clearInput></ion-textarea>\n		</ion-item>\n		<ion-item>\n			<ion-label stacked><b>{{ \'TICKETS_DESCRIPTION3\' | translate }}:</b></ion-label>\n			<ion-textarea placeholder="{{ \'TICKETS_DESCRIPTION3\' | translate }}" [(ngModel)]="data.description3" type="text" clearInput></ion-textarea>\n		</ion-item>\n	</ion-list>\n	<!-- tab1 -->\n	<ion-list *ngIf="data.tabs==1" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label stacked><b>{{ \'NOTE\' | translate }}:</b></ion-label>\n			<ion-textarea placeholder="{{ \'NOTE\' | translate }}" [(ngModel)]="data.note" type="text" clearInput></ion-textarea>\n		</ion-item>\n	</ion-list>\n	<!-- tab2 -->\n	<ion-list *ngIf="data.tabs==2" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label stacked><b>{{ \'EMPLOYEES\' | translate }}:</b></ion-label>\n			<ion-textarea placeholder="{{ \'EMPLOYEES\' | translate }}" [(ngModel)]="data.employees" type="text" clearInput></ion-textarea>\n		</ion-item>\n	</ion-list>\n	<!-- end -->\n	<br>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<div text-center>\n			<button ion-button color="secondary" style="width:200px; max-width:40%;" (click)="saveChanges()">{{ \'SAVE\' | translate }}</button>\n		</div>\n	</ion-toolbar>\n	<br>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\tickets\tickets-new\tickets-new.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* Api */]])
    ], TicketsNewPage);
    return TicketsNewPage;
}());

//# sourceMappingURL=tickets-new.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketsPreviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TicketsPreviewPage = /** @class */ (function () {
    function TicketsPreviewPage(platform, navCtrl, navParams, storage) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.account = { id: 0 };
        this.data = {
            tabs: 0
        };
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
        });
        this.selectedItem = navParams.get('item');
    }
    TicketsPreviewPage.prototype.selectTabs = function (val) {
        this.data.tabs = val;
    };
    TicketsPreviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tickets-preview',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\tickets\tickets-preview\tickets-preview.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			<button ion-button icon-only navPop>\n				<ion-icon name="close"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'PREVIEW\' | translate }}:<br><span style="font-size:14px">{{ selectedItem.forename }} {{ selectedItem.lastname }}</span></ion-title>\n		<ion-buttons margin-right right style="width:80px">\n			\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<button ion-button [color]="data.tabs==0 ? \'primary\' : \'lgray\'" (click)="selectTabs(0)">{{ \'TICKETS_GENERAL\' | translate }}</button>\n		<button ion-button [color]="data.tabs==1 ? \'primary\' : \'lgray\'" (click)="selectTabs(1)">{{ \'TICKETS_NOTES\' | translate }}</button>\n		<button ion-button [color]="data.tabs==2 ? \'primary\' : \'lgray\'" (click)="selectTabs(2)">{{ \'EMPLOYEES\' | translate }}</button>\n	</ion-toolbar>\n	<br>\n	<!-- tab0 -->\n	<ion-list *ngIf="data.tabs==0" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_CLIENTID\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.client }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_FORENAME\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.forename }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_LASTNAME\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.lastname }}</ion-label>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_ADDRESS\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.address }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_PHONE\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.phone }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_EMAIL\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.email }}</ion-label>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_STATUS\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.status }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_PRIORITY\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.priority }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_CATEGORY\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.category }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_PAYMENT\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.payment }}</ion-label>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_STARTINGDATE\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.starting }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_ENDINGDATE\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.ending }}</ion-label>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label stacked><b>{{ \'TICKETS_DESCRIPTION1\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.description1 }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label stacked><b>{{ \'TICKETS_DESCRIPTION2\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.description2 }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label stacked><b>{{ \'TICKETS_DESCRIPTION3\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.description3 }}</ion-label>\n		</ion-item>\n		<br *ngIf="account.group==1">\n		<ion-item *ngIf="account.group==1">\n			<ion-label fixed><b>{{ \'CREATED\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.created }}</ion-label>\n		</ion-item>\n	</ion-list>\n	<!-- tab1 -->\n	<ion-list *ngIf="data.tabs==1" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label stacked><b>{{ \'NOTE\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.note }}</ion-label>\n		</ion-item>\n	</ion-list>\n	<!-- tab2 -->\n	<ion-list *ngIf="data.tabs==2" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label stacked><b>{{ \'EMPLOYEES\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.employees }}</ion-label>\n		</ion-item>\n	</ion-list>\n	<!-- end -->\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\tickets\tickets-preview\tickets-preview.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], TicketsPreviewPage);
    return TicketsPreviewPage;
}());

//# sourceMappingURL=tickets-preview.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TicketsEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TicketsEditPage = /** @class */ (function () {
    function TicketsEditPage(platform, navCtrl, navParams, toastCtrl, translate, storage, api) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.storage = storage;
        this.api = api;
        this.account = { id: 0 };
        this.lang = {
            errorFillFields: '',
            operationSucceed: '',
            errorServer: '',
            errorServerAccess: ''
        };
        this.data = {
            tabs: 0
        };
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
        });
        this.selectedItem = navParams.get('item');
        this.translate.get('ERROR_FILLFIELDS').subscribe(function (value) { _this.lang.errorFillFields = value; });
        this.translate.get('OPERATION_SUCCEED').subscribe(function (value) { _this.lang.operationSucceed = value; });
        this.translate.get('ERROR_SERVER').subscribe(function (value) { _this.lang.errorServer = value; });
        this.translate.get('ERROR_SERVERACCESS').subscribe(function (value) { _this.lang.errorServerAccess = value; });
    }
    TicketsEditPage.prototype.selectTabs = function (val) {
        this.data.tabs = val;
    };
    TicketsEditPage.prototype.saveChanges = function () {
        var _this = this;
        if (this.selectedItem.client) {
            var toast = this.toastCtrl.create({
                message: this.lang.errorFillFields,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        else {
            this.api.post('tickets-edit', { item: this.selectedItem, user: this.account.id }).subscribe(function (res) {
                if (res.status == 'success') {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.operationSucceed,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                    _this.navCtrl.pop();
                }
                else {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.errorServer,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
            }, function (err) {
                console.error('ERROR', err);
                var toast = _this.toastCtrl.create({
                    message: _this.lang.errorServerAccess,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            });
        }
        ;
    };
    TicketsEditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tickets-edit',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\tickets\tickets-edit\tickets-edit.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			<button ion-button icon-only navPop>\n				<ion-icon name="close"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'EDIT\' | translate }}:<br><span style="font-size:14px">({{ selectedItem.id }}) {{ selectedItem.forename }} {{ selectedItem.lastname }}</span></ion-title>\n		<ion-buttons margin-right right style="width:80px">\n			\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<button ion-button [color]="data.tabs==0 ? \'primary\' : \'lgray\'" (click)="selectTabs(0)">{{ \'TICKETS_GENERAL\' | translate }}</button>\n		<button ion-button [color]="data.tabs==1 ? \'primary\' : \'lgray\'" (click)="selectTabs(1)">{{ \'TICKETS_NOTES\' | translate }}</button>\n		<button ion-button [color]="data.tabs==2 ? \'primary\' : \'lgray\'" (click)="selectTabs(2)">{{ \'EMPLOYEES\' | translate }}</button>\n	</ion-toolbar>\n	<br>\n	<!-- tab0 -->\n	<ion-list *ngIf="data.tabs==0" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_CLIENTID\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.client }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_FORENAME\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.forename }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_LASTNAME\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.lastname }}</ion-label>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_ADDRESS\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.address }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_PHONE\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.phone }}</ion-label>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'ACCOUNT_EMAIL\' | translate }}:</b></ion-label>\n			<ion-label>{{ selectedItem.email }}</ion-label>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_STATUS\' | translate }}:</b></ion-label>\n			<ion-select [(ngModel)]="selectedItem.status">\n				<ion-option value="order">{{ \'TICKETS_STATUS_ORDER\' | translate }}</ion-option>\n				<ion-option value="implementation">{{ \'TICKETS_STATUS_IMPLEMENTATION\' | translate }}</ion-option>\n				<ion-option value="waiting">{{ \'TICKETS_STATUS_WAITING\' | translate }}</ion-option>\n				<ion-option value="ended">{{ \'TICKETS_STATUS_ENDED\' | translate }}</ion-option>\n				<ion-option value="verified">{{ \'TICKETS_STATUS_VERIFIED\' | translate }}</ion-option>\n				<ion-option value="toverify">{{ \'TICKETS_STATUS_TOVERIFY\' | translate }}</ion-option>\n			</ion-select>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_PRIORITY\' | translate }}:</b></ion-label>\n			<ion-select [(ngModel)]="selectedItem.priority">\n				<ion-option value="0">{{ \'TICKETS_PRIORITY_0\' | translate }}</ion-option>\n				<ion-option value="1">{{ \'TICKETS_PRIORITY_1\' | translate }}</ion-option>\n				<ion-option value="2">{{ \'TICKETS_PRIORITY_2\' | translate }}</ion-option>\n				<ion-option value="3">{{ \'TICKETS_PRIORITY_3\' | translate }}</ion-option>\n				<ion-option value="4">{{ \'TICKETS_PRIORITY_4\' | translate }}</ion-option>\n			</ion-select>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_CATEGORY\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'TICKETS_CATEGORY\' | translate }}" [(ngModel)]="selectedItem.category" type="text" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_PAYMENT\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'TICKETS_PAYMENT\' | translate }}" [(ngModel)]="selectedItem.payment" type="text" clearInput></ion-input>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_STARTINGDATE\' | translate }}:</b></ion-label>\n			<ion-datetime displayFormat="YYYY-MM-DD, HH:mm" pickerFormat="YYYY-MM-DDTHH:mm:ssTZD" [(ngModel)]="selectedItem.starting"></ion-datetime>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'TICKETS_ENDINGDATE\' | translate }}:</b></ion-label>\n			<ion-datetime displayFormat="YYYY-MM-DD, HH:mm" pickerFormat="YYYY-MM-DDTHH:mm:ssTZD" [(ngModel)]="selectedItem.ending"></ion-datetime>\n		</ion-item>\n		<br>\n		<ion-item>\n			<ion-label stacked><b>{{ \'TICKETS_DESCRIPTION1\' | translate }}:</b></ion-label>\n			<ion-textarea placeholder="{{ \'TICKETS_DESCRIPTION1\' | translate }}" [(ngModel)]="selectedItem.description1" type="text" clearInput></ion-textarea>\n		</ion-item>\n		<ion-item>\n			<ion-label stacked><b>{{ \'TICKETS_DESCRIPTION2\' | translate }}:</b></ion-label>\n			<ion-textarea placeholder="{{ \'TICKETS_DESCRIPTION2\' | translate }}" [(ngModel)]="selectedItem.description2" type="text" clearInput></ion-textarea>\n		</ion-item>\n		<ion-item>\n			<ion-label stacked><b>{{ \'TICKETS_DESCRIPTION3\' | translate }}:</b></ion-label>\n			<ion-textarea placeholder="{{ \'TICKETS_DESCRIPTION3\' | translate }}" [(ngModel)]="selectedItem.description3" type="text" clearInput></ion-textarea>\n		</ion-item>\n	</ion-list>\n	<!-- tab1 -->\n	<ion-list *ngIf="data.tabs==1" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label stacked><b>{{ \'NOTE\' | translate }}:</b></ion-label>\n			<ion-textarea placeholder="{{ \'NOTE\' | translate }}" [(ngModel)]="selectedItem.note" type="text" clearInput></ion-textarea>\n		</ion-item>\n	</ion-list>\n	<!-- tab2 -->\n	<ion-list *ngIf="data.tabs==2" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label stacked><b>{{ \'EMPLOYEES\' | translate }}:</b></ion-label>\n			<ion-textarea placeholder="{{ \'EMPLOYEES\' | translate }}" [(ngModel)]="selectedItem.employees" type="text" clearInput></ion-textarea>\n		</ion-item>\n	</ion-list>\n	<!-- end -->\n	<br>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<div text-center>\n			<button ion-button color="secondary" style="width:200px; max-width:40%;" (click)="saveChanges()">{{ \'SAVE\' | translate }}</button>\n		</div>\n	</ion-toolbar>\n	<br>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\tickets\tickets-edit\tickets-edit.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* Api */]])
    ], TicketsEditPage);
    return TicketsEditPage;
}());

//# sourceMappingURL=tickets-edit.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CalendarPage = /** @class */ (function () {
    function CalendarPage(platform, navCtrl, events, translate, storage, api) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.events = events;
        this.translate = translate;
        this.storage = storage;
        this.api = api;
        this.account = {
            id: 0,
            perms: ''
        };
        this.quickMenu = {
            messages: [],
            notifications: [],
            warnings: []
        };
        this.data = {
            modeType: 'daily',
            event: '',
            collapseID: -1
        };
        this.msg = {
            warning_noConnection: ''
        };
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
            _this.updateCounters();
            _this.showCalendar();
        });
        this.translate.get('WARNING_NOCONNECTION').subscribe(function (value) { _this.msg.warning_noConnection = value; });
    }
    CalendarPage.prototype.openHomePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    CalendarPage.prototype.openLastPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    CalendarPage.prototype.updateCounters = function () {
        var _this = this;
        this.api.post('notifications-countNew', { user: this.account.id }).subscribe(function (res) {
            if (res.status == 'success')
                _this.quickMenu.notifications.length = res.counter;
            _this.storage.set('quickMenu', _this.quickMenu);
            _this.events.publish('quickMenu');
        });
    };
    CalendarPage.prototype.showCalendar = function () {
        this.data.collapseID = -1;
        this.items = [];
        if (this.data.modeType == 'daily') {
            for (var i = 0; i < 24; i++) {
                this.items.push({
                    num: i,
                    events: this.account,
                    color: ''
                });
            }
        }
        else if (this.data.modeType == 'weekly') {
            for (var i = 0; i < 7; i++) {
                this.items.push({
                    num: i,
                    events: this.account,
                    color: ''
                });
            }
        }
    };
    CalendarPage.prototype.refreshPage = function () {
        this.showCalendar();
    };
    CalendarPage.prototype.selectViewMode = function () {
        this.viewMode.open();
    };
    CalendarPage.prototype.collapseItem = function (item, ev) {
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].color = '';
        }
        if (this.data.collapseID == -1 || this.data.collapseID != this.items.indexOf(item)) {
            this.data.collapseID = this.items.indexOf(item);
            item.color = 'lGray';
        }
        else {
            this.data.collapseID = -1;
        }
    };
    CalendarPage.prototype.addEvent = function () {
        // let addModal = this.modalCtrl.create(CalendarAddPage, null);
        // addModal.present();
    };
    CalendarPage.prototype.previewEvent = function (item) {
        // let previewModal = this.modalCtrl.create(CalendarPreviewPage, { item: item });
        // previewModal.present();
    };
    CalendarPage.prototype.editEvent = function (item) {
        // let editModal = this.modalCtrl.create(CalendarEditPage, { item: item });
        // editModal.present();
    };
    CalendarPage.prototype.deleteEvent = function (item) {
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
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('viewMode'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Select */])
    ], CalendarPage.prototype, "viewMode", void 0);
    CalendarPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-calendar',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\calendar\calendar.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			<button ion-button icon-only (click)="openHomePage()">\n				<ion-icon name="home"></ion-icon>\n			</button>\n			<button ion-button icon-only (click)="openLastPage()">\n				<ion-icon name="arrow-back"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'CALENDAR\' | translate }}</ion-title>\n		<ion-buttons margin-right right style="width:80px" menuToggle>\n			<button ion-button icon-only>\n				<ion-badge [hidden]="quickMenu.messages.length+quickMenu.notifications.length+quickMenu.warnings.length<1" [color]="quickMenu.warnings.length>0 ? \'danger\' : \'primary\'">{{ quickMenu.messages.length+quickMenu.notifications.length }}</ion-badge>&nbsp;\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<ion-buttons left>\n			<button ion-button icon-only (click)="selectViewMode()">\n				<ion-icon name="list"></ion-icon>\n			</button>\n		</ion-buttons>\n		<button margin-left *ngIf="account.forename!==undefined && account.lastname!==undefined" style="font-size: 18px"><b>{{ account.forename }} {{ account.lastname }}</b></button>\n		<ion-buttons right>\n			<button ion-button icon-only (click)="addEvent()">\n				<ion-icon name="add"></ion-icon>\n			</button>\n			<button ion-button icon-only (click)="refreshPage()">\n				<ion-icon name="refresh"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-toolbar>\n	<br>\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item-sliding *ngFor="let item of items">\n			<ion-item>\n				<div padding-left item-left>\n					<b *ngIf="data.modeType==\'daily\'"><span *ngIf="items.indexOf(item)<10">0</span>{{ items.indexOf(item) }}:00</b>\n					<b *ngIf="data.modeType==\'weekly\'">{{ items.indexOf(item)+1 }} day of week</b>\n				</div>\n				<div padding item-left>\n					<ion-item-sliding *ngFor="let event of \' \'.repeat(10).split(\'\'), let x = index">\n						<ion-item [color]="item.color" (click)="collapseItem(item,event)">\n							event {{ x }}\n							<br *ngIf="data.collapseID==items.indexOf(item)">\n							<br *ngIf="data.collapseID==items.indexOf(item)">\n							<button *ngIf="data.collapseID==items.indexOf(item)" ion-button color="primary" (click)="previewEvent(item)">\n								<ion-icon name="document"> {{ \'PREVIEW\' | translate }}</ion-icon>\n							</button>\n							<br *ngIf="data.collapseID==items.indexOf(item)" [hidden]="(account.perms!==\'admin\' && item.id!==account.id) || (item.perms===\'admin\' && item.id!==account.id)">\n							<button *ngIf="data.collapseID==items.indexOf(item)" [hidden]="(account.perms!==\'admin\' && item.id!==account.id) || (item.perms===\'admin\' && item.id!==account.id)" ion-button color="secondary" (click)="editEvent(item)">\n								<ion-icon name="create"> {{ \'EDIT\' | translate }}</ion-icon>\n							</button>\n							<br *ngIf="data.collapseID==items.indexOf(item) && item.id!==account.id" [hidden]="account.perms!==\'admin\' || item.perms===\'admin\'">\n							<button *ngIf="data.collapseID==items.indexOf(item) && item.id!==account.id" [hidden]="account.perms!==\'admin\' || item.perms===\'admin\'" ion-button color="danger" (click)="deleteEvent(item)">\n								<ion-icon name="trash"> {{ \'DELETE\' | translate }}</ion-icon>\n							</button>\n						</ion-item>\n					</ion-item-sliding>\n				</div>\n			</ion-item>\n		</ion-item-sliding>\n		<ion-item *ngIf="items===undefined || items.length==0">\n			{{ \'WARNING_EMPTYLIST\' | translate }}\n		</ion-item>\n	</ion-list>\n	<br>\n	<ion-item hidden>\n		<ion-label>{{ \'MODE\' | translate }}</ion-label>\n		<ion-select (ionChange)="showCalendar()" [(ngModel)]="data.modeType" #viewMode>\n			<ion-option value="daily">{{ \'CALENDAR_MODE_DAILY\' | translate }}</ion-option>\n			<ion-option value="weekly">{{ \'CALENDAR_MODE_WEEKLY\' | translate }}</ion-option>\n			<ion-option value="monthly">{{ \'CALENDAR_MODE_MONTHLY\' | translate }}</ion-option>\n		</ion-select>\n	</ion-item>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\calendar\calendar.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* Api */]])
    ], CalendarPage);
    return CalendarPage;
}());

//# sourceMappingURL=calendar.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PermissionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PermissionsPage = /** @class */ (function () {
    function PermissionsPage(platform, navCtrl, toastCtrl, alertCtrl, events, translate, storage, api) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.translate = translate;
        this.storage = storage;
        this.api = api;
        this.account = { id: 0 };
        this.quickMenu = {
            messages: [],
            notifications: [],
            warnings: []
        };
        this.lang = {
            errorServer: '',
            errorServerAccess: ''
        };
        this.data = {
            group: 1
        };
        this.groups = [];
        this.modules = [];
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
            _this.showItems();
        });
        this.translate.get('ERROR_SERVER').subscribe(function (value) { _this.lang.errorServer = value; });
        this.translate.get('ERROR_SERVERACCESS').subscribe(function (value) { _this.lang.errorServerAccess = value; });
    }
    PermissionsPage.prototype.openHomePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    PermissionsPage.prototype.openLastPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    PermissionsPage.prototype.updateCounters = function () {
        var _this = this;
        this.api.post('notifications-countNew', { user: this.account.id }).subscribe(function (res) {
            if (res.status == 'success')
                _this.quickMenu.notifications.length = res.counter;
            _this.storage.set('quickMenu', _this.quickMenu);
            _this.events.publish('quickMenu');
        });
    };
    PermissionsPage.prototype.showItems = function () {
        var _this = this;
        this.storage.get('groupsList').then(function (val) {
            if (val) {
                _this.groups = [];
                val.forEach(function (item) {
                    _this.groups.push({
                        id: item.id,
                        name: item.name,
                        blockade: item.blockade,
                        creator: item.creator
                    });
                });
            }
        });
        this.storage.get('modulesList').then(function (val) {
            if (val) {
                _this.modules = [];
                val.forEach(function (item) {
                    _this.modules.push({
                        id: item.id,
                        name: item.name,
                        icon: item.icon,
                        actions: {}
                    });
                });
                _this.storage.get('actionsList').then(function (val2) {
                    if (val2) {
                        for (var i = 0; i < _this.modules.length; i++) {
                            _this.modules[i].actions = val2;
                            _this.modules[i].actions.forEach(function (item) {
                                item.allowed = false;
                            });
                        }
                    }
                });
            }
        });
        this.storage.get('permissionsList').then(function (val) {
            if (val) {
                val.forEach(function (item) {
                    // this.modules[this.modules.findIndex(x => x.id==item.module)].actions.push(item.action);
                    if (item.action == 'list' && item.group == _this.data.group)
                        _this.modules[_this.modules.findIndex(function (x) { return x.id == item.module; })].actions.list = true;
                    if (item.action == 'get' && item.group == _this.data.group)
                        _this.modules[_this.modules.findIndex(function (x) { return x.id == item.module; })].actions.get = true;
                    if (item.action == 'set' && item.group == _this.data.group)
                        _this.modules[_this.modules.findIndex(function (x) { return x.id == item.module; })].actions.set = true;
                    if (item.action == 'del' && item.group == _this.data.group)
                        _this.modules[_this.modules.findIndex(function (x) { return x.id == item.module; })].actions.del = true;
                    if (item.action == 'people' && item.group == _this.data.group)
                        _this.modules[_this.modules.findIndex(function (x) { return x.id == item.module; })].actions.people = true;
                });
                _this.updateCounters();
            }
        });
        this.api.post('permissions-list', { group: this.data.group }).subscribe(function (res) {
            if (res.status == 'success') {
                for (var i = 0; i < _this.modules.length; i++)
                    _this.modules[i].actions = { list: false, get: false, set: false, del: false, people: false };
                res.permissions.forEach(function (item) {
                    // this.modules[this.modules.findIndex(x => x.id==item.module)].actions.push(item.action);
                    if (item.action == 'list' && item.group == _this.data.group)
                        _this.modules[_this.modules.findIndex(function (x) { return x.id == item.module; })].actions.list = true;
                    if (item.action == 'get' && item.group == _this.data.group)
                        _this.modules[_this.modules.findIndex(function (x) { return x.id == item.module; })].actions.get = true;
                    if (item.action == 'set' && item.group == _this.data.group)
                        _this.modules[_this.modules.findIndex(function (x) { return x.id == item.module; })].actions.set = true;
                    if (item.action == 'del' && item.group == _this.data.group)
                        _this.modules[_this.modules.findIndex(function (x) { return x.id == item.module; })].actions.del = true;
                    if (item.action == 'people' && item.group == _this.data.group)
                        _this.modules[_this.modules.findIndex(function (x) { return x.id == item.module; })].actions.people = true;
                });
                _this.storage.set('permissionsList', res.permissions);
            }
        }, function (err) {
            console.error('ERROR', err);
        });
    };
    PermissionsPage.prototype.refreshPage = function () {
        this.showItems();
    };
    PermissionsPage.prototype.setPerm = function (module, action, value) {
        var _this = this;
        this.api.post('permissions-setPerm', { user: this.account.id, group: this.data.group, module: module.id, action: action, value: value }).subscribe(function (res) {
            if (res.status == 'success') {
                _this.showItems();
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: _this.lang.errorServer,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
        }, function (err) {
            console.error('ERROR', err);
            var toast = _this.toastCtrl.create({
                message: _this.lang.errorServerAccess,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
    };
    PermissionsPage.prototype.ionViewDidEnter = function () {
        if (this.account)
            this.updateCounters();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('searchbarFilter'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Select */])
    ], PermissionsPage.prototype, "searchbarFilter", void 0);
    PermissionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-permissions',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\permissions\permissions.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			<button ion-button icon-only (click)="openHomePage()">\n				<ion-icon name="home"></ion-icon>\n			</button>\n			<button ion-button icon-only (click)="openLastPage()">\n				<ion-icon name="arrow-back"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'PERMISSIONS\' | translate }}</ion-title>\n		<ion-buttons margin-right right style="width:80px" menuToggle>\n			<button ion-button icon-only>\n				<ion-badge [hidden]="quickMenu.messages.length+quickMenu.notifications.length+quickMenu.warnings.length<1" [color]="quickMenu.warnings.length>0 ? \'danger\' : \'primary\'">{{ quickMenu.messages.length+quickMenu.notifications.length }}</ion-badge>&nbsp;\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<ion-select [(ngModel)]="data.group" (ionChange)="refreshPage()">\n			<ion-option *ngFor="let group of groups" [value]="group.id">{{ group.name.charAt(0).toUpperCase()+group.name.slice(1) }}</ion-option>\n		</ion-select>\n		<ion-buttons right>\n			<button ion-button icon-only (click)="refreshPage()">\n				<ion-icon name="refresh"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-toolbar>\n	<br>\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-grid>\n			<ion-row>\n				<ion-col col-7><!-- <b>{{ \'PERMISSIONS_MODULE\' | translate }}:</b> --></ion-col>\n				<ion-col col-1><ion-icon color="tertiary" name="list"></ion-icon></ion-col>\n				<ion-col col-1><ion-icon color="primary" name="document"></ion-icon></ion-col>\n				<ion-col col-1><ion-icon color="secondary" name="create"></ion-icon></ion-col>\n				<ion-col col-1><ion-icon color="danger" name="trash"></ion-icon></ion-col>\n				<ion-col col-1><ion-icon color="important" name="people"></ion-icon></ion-col>\n			</ion-row>\n			<ion-row><ion-col></ion-col></ion-row>\n			<ion-row *ngFor="let module of modules">\n				<ion-col col-7>\n					{{ module.name }}\n				</ion-col>\n				<ion-col col-1>\n					<ion-checkbox item-end color="dark" [(ngModel)]="module.actions.list" (ionChange)="setPerm(module,\'list\',module.actions.list)"></ion-checkbox>\n				</ion-col>\n				<ion-col col-1>\n					<ion-checkbox item-end color="dark" [(ngModel)]="module.actions.get" (ionChange)="setPerm(module,\'get\',module.actions.get)"></ion-checkbox>\n				</ion-col>\n				<ion-col col-1>\n					<ion-checkbox item-end color="dark" [(ngModel)]="module.actions.set" (ionChange)="setPerm(module,\'set\',module.actions.set)"></ion-checkbox>\n				</ion-col>\n				<ion-col col-1>\n					<ion-checkbox item-end color="dark" [(ngModel)]="module.actions.del" (ionChange)="setPerm(module,\'del\',module.actions.del)"></ion-checkbox>\n				</ion-col>\n				<ion-col col-1>\n					<ion-checkbox item-end color="dark" [(ngModel)]="module.actions.people" (ionChange)="setPerm(module,\'people\',module.actions.people)"></ion-checkbox>\n				</ion-col>\n			</ion-row>\n		</ion-grid>\n	</ion-list>\n	<!-- <br> -->\n	<!-- <ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines> -->\n		<!-- <div text-center> -->\n			<!-- <button ion-button color="secondary" style="width:200px; max-width:40%;" (click)="saveChanges()">{{ \'SAVE\' | translate }}</button> -->\n		<!-- </div> -->\n	<!-- </ion-toolbar> -->\n	<!-- <br> -->\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\permissions\permissions.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* Api */]])
    ], PermissionsPage);
    return PermissionsPage;
}());

//# sourceMappingURL=permissions.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SettingsPage = /** @class */ (function () {
    function SettingsPage(platform, navCtrl, toastCtrl, alertCtrl, modalCtrl, events, translate, storage, api, settings) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.translate = translate;
        this.storage = storage;
        this.api = api;
        this.settings = settings;
        this.account = { id: 0, password: null, theme: '' };
        this.quickMenu = {
            messages: [],
            notifications: [],
            warnings: []
        };
        this.lang = {
            dismiss: '',
            errorTooShortPassword: '',
            errorPasswordsNotMatch: '',
            operationSucceed: '',
            errorServer: '',
            errorServerAccess: ''
        };
        this.data = {
            tabs: 0,
            oldPassword: '',
            newPassword: '',
            newRepass: ''
        };
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
            _this.updateCounters();
        });
        this.settings.getActiveTheme().subscribe(function (val) { return _this.selectedTheme = val; });
        this.translate.get('DISMISS').subscribe(function (value) { _this.lang.dismiss = value; });
        this.translate.get('ERROR_TOOSHORTPASSWORD').subscribe(function (value) { _this.lang.errorTooShortPassword = value; });
        this.translate.get('ERROR_PASSWORDSNOTMATCH').subscribe(function (value) { _this.lang.errorPasswordsNotMatch = value; });
        this.translate.get('OPERATION_SUCCEED').subscribe(function (value) { _this.lang.operationSucceed = value; });
        this.translate.get('ERROR_SERVER').subscribe(function (value) { _this.lang.errorServer = value; });
        this.translate.get('ERROR_SERVERACCESS').subscribe(function (value) { _this.lang.errorServerAccess = value; });
    }
    SettingsPage.prototype.openHomePage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    SettingsPage.prototype.openLastPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    SettingsPage.prototype.updateCounters = function () {
        var _this = this;
        this.api.post('notifications-countNew', { user: this.account.id }).subscribe(function (res) {
            if (res.status == 'success')
                _this.quickMenu.notifications.length = res.counter;
            _this.storage.set('quickMenu', _this.quickMenu);
            _this.events.publish('quickMenu');
        });
    };
    SettingsPage.prototype.selectTabs = function (val) {
        this.data.tabs = val;
    };
    SettingsPage.prototype.toggleAppTheme = function () {
        this.account.theme = this.selectedTheme.toString();
        this.settings.setActiveTheme(this.selectedTheme);
    };
    SettingsPage.prototype.saveChanges = function () {
        var _this = this;
        if (this.data.newPassword.length > 0 && this.data.oldPassword != this.account.password) {
            var toast = this.toastCtrl.create({
                message: this.lang.errorPasswordsNotMatch,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        else if (this.data.newPassword.length > 0 && this.data.newPassword.length < 6) {
            var toast = this.toastCtrl.create({
                message: this.lang.errorTooShortPassword,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        else if (this.data.newPassword.length > 0 && this.data.newPassword != this.data.newRepass) {
            var toast = this.toastCtrl.create({
                message: this.lang.errorPasswordsNotMatch,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        else {
            this.api.post('settings-edit', { account: this.account, data: this.data }).subscribe(function (res) {
                if (res.status == 'success') {
                    _this.storage.set('account', _this.account);
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.operationSucceed,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
                else {
                    var toast = _this.toastCtrl.create({
                        message: _this.lang.errorServer,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
            }, function (err) {
                console.error('ERROR', err);
                var toast = _this.toastCtrl.create({
                    message: _this.lang.errorServerAccess,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            });
        }
    };
    SettingsPage.prototype.ionViewDidEnter = function () {
        if (this.account)
            this.updateCounters();
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\settings\settings.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			<button ion-button icon-only (click)="openHomePage()">\n				<ion-icon name="home"></ion-icon>\n			</button>\n			<button ion-button icon-only (click)="openLastPage()">\n				<ion-icon name="arrow-back"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'SETTINGS\' | translate }}</ion-title>\n		<ion-buttons margin-right right style="width:80px" menuToggle>\n			<button ion-button icon-only>\n				<ion-badge [hidden]="quickMenu.messages.length+quickMenu.notifications.length+quickMenu.warnings.length<1" [color]="quickMenu.warnings.length>0 ? \'danger\' : \'primary\'">{{ quickMenu.messages.length+quickMenu.notifications.length }}</ion-badge>&nbsp;\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<button ion-button [color]="data.tabs==0 ? \'primary\' : \'lgray\'" (click)="selectTabs(0)">{{ \'SETTINGS_GENERAL\' | translate }}</button>\n		<button ion-button [color]="data.tabs==1 ? \'primary\' : \'lgray\'" (click)="selectTabs(1)">{{ \'SETTINGS_THEMING\' | translate }}</button>\n		<button ion-button [color]="data.tabs==2 ? \'primary\' : \'lgray\'" (click)="selectTabs(2)">{{ \'SETTINGS_SECURITY\' | translate }}</button>\n		<button ion-button [color]="data.tabs==3 ? \'primary\' : \'lgray\'" (click)="selectTabs(3)">{{ \'LANGUAGE\' | translate }}</button>\n		<button hidden ion-button [color]="data.tabs==4 ? \'primary\' : \'lgray\'" (click)="selectTabs(4)">{{ \'SETTINGS_CONNECT\' | translate }}</button>\n	</ion-toolbar>\n	<br>\n	<!-- tab0 -->\n	<ion-list *ngIf="data.tabs==0" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label><b>{{ \'SETTINGS_SHOWNOTIFICATIONS\' | translate }}:</b></ion-label>\n			<ion-toggle disabled color="primary" checked></ion-toggle>\n		</ion-item>\n	</ion-list>\n	<!-- tab1 -->\n	<ion-list *ngIf="data.tabs==1" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-icon name="bulb" item-left></ion-icon>\n			<ion-label fixed><b>{{ \'SETTINGS_THEME\' | translate }}:</b></ion-label>\n			<ion-select [(ngModel)]="selectedTheme" (ionChange)="toggleAppTheme()">\n				<ion-option value="theme-light">light</ion-option>\n				<ion-option value="theme-dark">dark</ion-option>\n				<ion-option value="theme-pink">pink</ion-option>\n			</ion-select>\n		</ion-item>\n		<ion-item>\n			<ion-icon name="desktop" item-left></ion-icon>\n			<ion-label fixed><b>{{ \'SETTINGS_WALLPAPER\' | translate }}:</b></ion-label>\n			<ion-select [(ngModel)]="account.wallpaper">\n				<ion-option value="none">none</ion-option>\n			</ion-select>\n		</ion-item>\n	</ion-list>\n	<!-- tab2 -->\n	<ion-list *ngIf="data.tabs==2" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label fixed><b>{{ \'SETTINGS_OLDPASSWORD\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'SETTINGS_OLDPASSWORD\' | translate }}" [(ngModel)]="data.oldPassword" type="password" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'SETTINGS_NEWPASSWORD\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'SETTINGS_NEWPASSWORD\' | translate }}" [(ngModel)]="data.newPassword" type="password" clearInput></ion-input>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'REPEAT\' | translate }}:</b></ion-label>\n			<ion-input placeholder="{{ \'REPEAT\' | translate }}" [(ngModel)]="data.newRepass" type="password" clearInput></ion-input>\n		</ion-item>\n	</ion-list>\n	<!-- tab3 -->\n	<ion-list radio-group [(ngModel)]="account.language" *ngIf="data.tabs==3" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-label fixed><b>{{ \'LANGUAGE_EN\' | translate }}</b></ion-label>\n			<ion-radio value="en"></ion-radio>\n		</ion-item>\n		<ion-item>\n			<ion-label fixed><b>{{ \'LANGUAGE_PL\' | translate }}</b></ion-label>\n			<ion-radio value="pl"></ion-radio>\n		</ion-item>\n	</ion-list>\n	<!-- tab4 -->\n	<ion-list *ngIf="data.tabs==4" [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<ion-icon style="width:24px" color="secondary" name="logo-google"></ion-icon>\n			tu bydzie konekt z guglem\n		</ion-item>\n		<ion-item>\n			<ion-icon style="width:24px" color="primary" name="logo-facebook"></ion-icon>\n			tu bydzie konekt z fejsem\n		</ion-item>\n		<ion-item>\n			<ion-icon style="width:24px" color="quaternary" name="logo-twitter"></ion-icon>\n			tu bydzie konekt z tłiterem\n		</ion-item>\n	</ion-list>\n	<!-- end -->\n	<br>\n	<ion-toolbar [class]="platform.width()<1000 ? \'toolbar toolbar-md listNarrow\' : \'toolbar toolbar-md listWide\'" no-lines>\n		<div text-center>\n			<button ion-button color="secondary" style="width:200px; max-width:40%;" (click)="saveChanges()">{{ \'SAVE\' | translate }}</button>\n		</div>\n	</ion-toolbar>\n	<br>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\settings\settings.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* Api */], __WEBPACK_IMPORTED_MODULE_4__providers__["c" /* SettingsProvider */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(389);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_http_loader__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__(710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_login__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_login_register_register__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_home_home__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_home_profile_profile__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_notifications_notifications__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_users_users__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_users_users_new_users_new__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_users_users_preview_users_preview__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_users_users_edit_users_edit__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_clients_clients__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_clients_clients_new_clients_new__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_clients_clients_preview_clients_preview__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_clients_clients_edit_clients_edit__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_tickets_tickets__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_tickets_tickets_new_tickets_new__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_tickets_tickets_preview_tickets_preview__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_tickets_tickets_edit_tickets_edit__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_calendar_calendar__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_permissions_permissions__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_settings_settings__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_help_help__ = __webpack_require__(711);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

































function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_8__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/lang/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_home_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_users_users__["a" /* UsersPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_users_users_new_users_new__["a" /* UsersNewPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_users_users_preview_users_preview__["a" /* UsersPreviewPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_users_users_edit_users_edit__["a" /* UsersEditPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_clients_clients__["a" /* ClientsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_clients_clients_new_clients_new__["a" /* ClientsNewPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_clients_clients_preview_clients_preview__["a" /* ClientsPreviewPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_clients_clients_edit_clients_edit__["a" /* ClientsEditPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_tickets_tickets__["a" /* TicketsPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_tickets_tickets_new_tickets_new__["a" /* TicketsNewPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_tickets_tickets_preview_tickets_preview__["a" /* TicketsPreviewPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_tickets_tickets_edit_tickets_edit__["a" /* TicketsEditPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_calendar_calendar__["a" /* CalendarPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_permissions_permissions__["a" /* PermissionsPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_help_help__["a" /* HelpPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: (createTranslateLoader),
                        deps: [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]]
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_9_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_home_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_users_users__["a" /* UsersPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_users_users_new_users_new__["a" /* UsersNewPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_users_users_preview_users_preview__["a" /* UsersPreviewPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_users_users_edit_users_edit__["a" /* UsersEditPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_clients_clients__["a" /* ClientsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_clients_clients_new_clients_new__["a" /* ClientsNewPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_clients_clients_preview_clients_preview__["a" /* ClientsPreviewPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_clients_clients_edit_clients_edit__["a" /* ClientsEditPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_tickets_tickets__["a" /* TicketsPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_tickets_tickets_new_tickets_new__["a" /* TicketsNewPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_tickets_tickets_preview_tickets_preview__["a" /* TicketsPreviewPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_tickets_tickets_edit_tickets_edit__["a" /* TicketsEditPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_calendar_calendar__["a" /* CalendarPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_permissions_permissions__["a" /* PermissionsPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_help_help__["a" /* HelpPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__providers__["a" /* Api */],
                __WEBPACK_IMPORTED_MODULE_10__providers__["b" /* NetProvider */],
                __WEBPACK_IMPORTED_MODULE_10__providers__["c" /* SettingsProvider */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__profile_profile__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__users_users__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__clients_clients__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tickets_tickets__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__calendar_calendar__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__permissions_permissions__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__settings_settings__ = __webpack_require__(383);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













// import { HelpPage } from '../help/help';
var HomePage = /** @class */ (function () {
    function HomePage(platform, navCtrl, toastCtrl, alertCtrl, modalCtrl, events, translate, storage, api) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.translate = translate;
        this.storage = storage;
        this.api = api;
        this.account = { id: 0, language: 'en', group: 0 };
        this.quickMenu = {
            messages: [],
            notifications: [],
            warnings: []
        };
        this.lang = {
            dismiss: '',
            errorNoAccessToModule: ''
        };
        this.data = {
            filterValue: ''
        };
        this.modules = [];
        this.permissions = [];
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
            _this.checkPermissions();
        });
        this.translate.get('DISMISS').subscribe(function (value) { _this.lang.dismiss = value; });
        this.translate.get('ERROR_NOACCESSTOMODULE').subscribe(function (value) { _this.lang.errorNoAccessToModule = value; });
    }
    HomePage.prototype.updateCounters = function () {
        var _this = this;
        this.api.post('notifications-countNew', { user: this.account.id }).subscribe(function (res) {
            if (res.status == 'success')
                _this.quickMenu.notifications.length = res.counter;
            // if (this.modules[0]) this.modules[this.modules.findIndex(x => x.component=='NotificationsPage')].counter = res.counter;
            _this.storage.set('quickMenu', _this.quickMenu);
            _this.events.publish('quickMenu');
        });
    };
    HomePage.prototype.checkPermissions = function () {
        var _this = this;
        this.api.post('permissions-list', null).subscribe(function (res) {
            if (res.status == 'success') {
                _this.storage.set('groupsList', res.groups);
                _this.storage.set('modulesList', res.modules);
                _this.storage.set('permissionsList', res.permissions);
            }
            _this.showItems();
        });
    };
    HomePage.prototype.showItems = function () {
        var _this = this;
        this.storage.get('modulesList').then(function (val) {
            if (val) {
                _this.modules = [];
                val.forEach(function (item) {
                    _this.modules.push({
                        id: item.id,
                        name: item.name,
                        component: item.component,
                        icon: item.icon,
                        disabled: item.disabled
                    });
                });
                _this.updateCounters();
            }
        });
        this.storage.get('permissionsList').then(function (val) {
            if (val) {
                _this.permissions = [];
                val.forEach(function (item) {
                    _this.permissions.push({
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
    };
    HomePage.prototype.searchItems = function (ev) {
        var _this = this;
        this.data.filterValue = ev.target.value || '';
        this.storage.get('modulesList').then(function (val) {
            if (val) {
                _this.modules = [];
                val.forEach(function (item) {
                    if (item.name.toLowerCase().includes(_this.data.filterValue.toLowerCase()))
                        _this.modules.push({
                            id: item.id,
                            name: item.name,
                            component: item.component,
                            icon: item.icon,
                            disabled: item.disabled
                        });
                });
            }
        });
    };
    HomePage.prototype.openProfilePage = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__profile_profile__["a" /* ProfilePage */], null);
        modal.present();
    };
    HomePage.prototype.openPage = function (page) {
        var _this = this;
        if (this.permissions[this.permissions.findIndex(function (x) { return (x.group == _this.account.group && x.module == page.id && x.action == 'list'); })]) {
            if (page.component == 'UsersPage')
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__users_users__["a" /* UsersPage */]);
            else if (page.component == 'ClientsPage')
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__clients_clients__["a" /* ClientsPage */]);
            else if (page.component == 'TicketsPage')
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__tickets_tickets__["a" /* TicketsPage */]);
            else if (page.component == 'CalendarPage')
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__calendar_calendar__["a" /* CalendarPage */]);
            else if (page.component == 'PermissionsPage')
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_11__permissions_permissions__["a" /* PermissionsPage */]);
            else if (page.component == 'SettingsPage')
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_12__settings_settings__["a" /* SettingsPage */]);
            else if (page.component == 'HelpPage')
                window.open('../../assets/help/doc-' + this.account.language + '.pdf');
        }
        else {
            var toast = this.alertCtrl.create({
                message: this.lang.errorNoAccessToModule,
                buttons: [this.lang.dismiss]
            });
            toast.present();
        }
    };
    HomePage.prototype.logout = function () {
        this.storage.clear();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
    };
    HomePage.prototype.ionViewDidEnter = function () {
        if (this.account)
            this.checkPermissions();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\home\home.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:80px">\n			\n		</ion-buttons>\n		<ion-title text-center>{{ \'HOME\' | translate }}</ion-title>\n		<ion-buttons margin-right right style="width:80px" menuToggle>\n			<button ion-button icon-only>\n				<ion-badge [hidden]="quickMenu.messages.length+quickMenu.notifications.length+quickMenu.warnings.length<1" [color]="quickMenu.warnings.length>0 ? \'danger\' : \'primary\'">{{ quickMenu.messages.length+quickMenu.notifications.length }}</ion-badge>&nbsp;\n				<!-- <ion-badge color="primary">{{ quickMenu.messages.length }}</ion-badge>&nbsp; -->\n				<!-- <ion-badge color="primary">{{ quickMenu.notifications.length }}</ion-badge>&nbsp; -->\n				<!-- <ion-badge color="danger">{{ quickMenu.warnings.length }}</ion-badge>&nbsp; -->\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-item>\n			<div item-left>\n				Logged as:\n			</div>\n			<div item-left>\n				<button ion-button icon-only color="primary" (click)="openProfilePage()">\n					<ion-icon name="person"></ion-icon>\n				</button>\n			</div>\n			<div item-left>\n				<b>{{ account.forename }} {{ account.lastname }}</b>\n			</div>\n		</ion-item>\n	</ion-list>\n	<br>\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<ion-searchbar placeholder="{{ \'SEARCH\' | translate }}" (ionInput)="searchItems($event)"></ion-searchbar>\n		<ion-item-sliding *ngFor="let module of modules">\n			<button ion-item [disabled]="module.disabled" (click)="openPage(module)">\n				<ion-icon name="{{ module.icon }}" item-left></ion-icon>\n				<div item-left padding-left>\n					<b>{{ module.name.toUpperCase() | translate }}</b>\n				</div>\n				<div ion-button *ngIf="module.counter && module.counter>0" item-left>\n					{{ module.counter }}\n				</div>\n			</button>\n		</ion-item-sliding>\n	</ion-list>\n	<br>\n	<ion-list [class]="platform.width()<1000 ? \'list list-md listNarrow\' : \'list list-md listWide\'" no-lines>\n		<button ion-item (click)="logout()">\n			<ion-icon name="log-out" item-left></ion-icon>\n			<div item-left padding-left>\n				<b>{{ \'LOGOUT\' | translate }}</b>\n			</div>\n		</button>\n	</ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* Api */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 441:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Api; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Api = /** @class */ (function () {
    function Api(http) {
        this.http = http;
        this.url = 'http://192.168.0.102:3000';
    }
    Api.prototype.get = function (endpoint, params, reqOpts) {
        if (!reqOpts) {
            reqOpts = {
                params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]()
            };
        }
        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpParams */]();
            for (var k in params) {
                reqOpts.params = reqOpts.params.set(k, params[k]);
            }
        }
        return this.http.get(this.url + '/' + endpoint, reqOpts);
    };
    Api.prototype.post = function (endpoint, body, reqOpts) {
        return this.http.post(this.url + '/' + endpoint, body, reqOpts);
    };
    Api.prototype.put = function (endpoint, body, reqOpts) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    };
    Api.prototype.delete = function (endpoint, reqOpts) {
        return this.http.delete(this.url + '/' + endpoint, reqOpts);
    };
    Api.prototype.patch = function (endpoint, body, reqOpts) {
        return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
    };
    Api = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], Api);
    return Api;
}());

//# sourceMappingURL=api.js.map

/***/ }),

/***/ 442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ConnectionStatusEnum */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_network__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConnectionStatusEnum;
(function (ConnectionStatusEnum) {
    ConnectionStatusEnum[ConnectionStatusEnum["Online"] = 0] = "Online";
    ConnectionStatusEnum[ConnectionStatusEnum["Offline"] = 1] = "Offline";
})(ConnectionStatusEnum || (ConnectionStatusEnum = {}));
var NetProvider = /** @class */ (function () {
    function NetProvider(alertCtrl, network, events) {
        this.alertCtrl = alertCtrl;
        this.network = network;
        this.events = events;
        this.netStatus = ConnectionStatusEnum.Online;
    }
    NetProvider.prototype.initializeNetworkEvents = function () {
        var _this = this;
        this.network.onDisconnect().subscribe(function () {
            if (_this.netStatus === ConnectionStatusEnum.Online) {
                _this.events.publish('network:offline');
            }
            _this.netStatus = ConnectionStatusEnum.Offline;
        });
        this.network.onConnect().subscribe(function () {
            if (_this.netStatus === ConnectionStatusEnum.Offline) {
                _this.events.publish('network:online');
            }
            _this.netStatus = ConnectionStatusEnum.Online;
        });
    };
    NetProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
    ], NetProvider);
    return NetProvider;
}());

//# sourceMappingURL=net.js.map

/***/ }),

/***/ 443:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SettingsProvider = /** @class */ (function () {
    function SettingsProvider() {
        this.theme = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"]('theme-light');
    }
    SettingsProvider.prototype.setActiveTheme = function (val) {
        this.theme.next(val);
    };
    SettingsProvider.prototype.getActiveTheme = function () {
        return this.theme.asObservable();
    };
    SettingsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], SettingsProvider);
    return SettingsProvider;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 710:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_notifications_notifications__ = __webpack_require__(162);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, alertCtrl, modalCtrl, translate, storage, events, network, netProvider, settings) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.translate = translate;
        this.storage = storage;
        this.events = events;
        this.network = network;
        this.netProvider = netProvider;
        this.settings = settings;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
        this.quickMenu = {
            messages: [],
            notifications: [],
            warnings: []
        };
        this.initializeApp();
        this.initTranslate();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.settings.getActiveTheme().subscribe(function (val) { return _this.selectedTheme = val; });
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.netProvider.initializeNetworkEvents();
            // Network status event
            _this.events.subscribe('network:offline', function () {
                _this.quickMenu.warnings[0] = _this.network.type;
            });
            _this.events.subscribe('network:online', function () {
                _this.quickMenu.warnings[0] = null;
            });
            // QuickMenu event
            _this.events.subscribe('quickMenu', function () {
                _this.storage.get('quickMenu').then(function (val) {
                    if (val) {
                        _this.quickMenu.messages = val.messages;
                        _this.quickMenu.notifications = val.notifications;
                        _this.quickMenu.warnings = val.warnings;
                    }
                });
            });
        });
    };
    MyApp.prototype.initTranslate = function () {
        var _this = this;
        this.translate.setDefaultLang('en');
        var browserLang = this.translate.getBrowserLang();
        this.storage.get('account').then(function (val) {
            if (val)
                _this.translate.use(val.language);
            else if (browserLang)
                _this.translate.use(_this.translate.getBrowserLang());
            else
                _this.translate.use('en');
        });
    };
    MyApp.prototype.showMessages = function () {
        // let modal = this.modalCtrl.create(MessagesPage, null);
        // modal.present();
    };
    MyApp.prototype.showNotifications = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__pages_notifications_notifications__["a" /* NotificationsPage */], null);
        modal.present();
    };
    MyApp.prototype.showWarnings = function () {
        // let modal = this.modalCtrl.create(WarningsPage, null);
        // modal.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\app\app.html"*/'<!-- <ion-split-pane when="lg"> -->\n\n	<ion-menu side="right" [content]="content">\n\n		<ion-content>\n\n			<!-- <ion-list> -->\n\n				<!-- <button *ngIf="quickMenu.returnLast" ion-item navPop> -->\n\n					<!-- <ion-icon name="arrow-back"></ion-icon> -->\n\n					<!-- <span margin-left>{{ \'RETURN_LAST\' | translate }}</span> -->\n\n				<!-- </button> -->\n\n				<!-- <button *ngIf="quickMenu.returnHome" ion-item (click)="navCtrl.popToRoot()"> -->\n\n					<!-- <ion-icon name="home"></ion-icon> -->\n\n					<!-- <span margin-left>{{ \'RETURN_HOME\' | translate }}</span> -->\n\n				<!-- </button> -->\n\n			<!-- </ion-list> -->\n\n			<!-- <br *ngIf="quickMenu.returnLast || quickMenu.returnHome"> -->\n\n			<ion-list>\n\n				<button *ngIf="quickMenu.messages" ion-item (click)="showMessages()">\n\n					<ion-icon name="chatbubbles"></ion-icon>\n\n					<span margin-left>{{ \'MESSAGES\' | translate }}</span>\n\n					<ion-badge color="primary" [hidden]="quickMenu.messages.length<1">{{ quickMenu.messages.length }}</ion-badge>\n\n				</button>\n\n				<button *ngIf="quickMenu.notifications" ion-item (click)="showNotifications()">\n\n					<ion-icon name="notifications"></ion-icon>\n\n					<span margin-left>{{ \'NOTIFICATIONS\' | translate }}</span>\n\n					<ion-badge color="primary" [hidden]="quickMenu.notifications.length<1">{{ quickMenu.notifications.length }}</ion-badge>\n\n				</button>\n\n				<button *ngIf="quickMenu.warnings" ion-item (click)="showWarnings()">\n\n					<ion-icon name="warning"></ion-icon>\n\n					<span margin-left>{{ \'WARNINGS\' | translate }}</span>\n\n					<ion-badge color="danger" [hidden]="quickMenu.warnings.length<1">{{ quickMenu.warnings.length }}</ion-badge>\n\n				</button>\n\n			</ion-list>\n\n			<br>\n\n			<ion-list>\n\n				<button ion-item menuClose>\n\n					<ion-icon name="close"></ion-icon>\n\n					<span margin-left>{{ \'CLOSE\' | translate }}</span>\n\n				</button>\n\n			</ion-list>\n\n		</ion-content>\n\n	</ion-menu>\n\n<!-- </ion-split-pane> -->\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false" [class]="selectedTheme"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* Events */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_7__providers__["b" /* NetProvider */], __WEBPACK_IMPORTED_MODULE_7__providers__["c" /* SettingsProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 711:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HelpPage = /** @class */ (function () {
    function HelpPage(platform, navCtrl, translate, storage, api) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.translate = translate;
        this.storage = storage;
        this.api = api;
        this.account = { id: 0 };
        this.notifications = [];
        this.warnings = [];
        this.storage.get('account').then(function (val) {
            if (val)
                _this.account = val;
        });
    }
    HelpPage.prototype.openDocumentation = function () {
        // this.navCtrl.push(HelpDocumentationPage);
        window.open('../../assets/help/doc-en.pdf');
    };
    HelpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-help',template:/*ion-inline-start:"C:\Users\Karol\IonicProjects\firma\src\pages\help\help.html"*/'<ion-header>\n	<ion-navbar hideBackButton>\n		<ion-buttons margin-left left style="width:200px; max-width:20%;">\n			<button ion-button icon-only (click)="navCtrl.popToRoot()">\n				<ion-icon name="home"></ion-icon>\n			</button>\n			<button ion-button icon-only navPop>\n				<ion-icon name="arrow-back"></ion-icon>\n			</button>\n		</ion-buttons>\n		<ion-title text-center>{{ \'HELP\' | translate }}</ion-title>\n		<ion-buttons margin-right right style="width:200px; max-width:20%;">\n			<button ion-button icon-only [disabled]="!notifications.length" (click)="showNotifications()">\n				<ion-icon name="notifications"></ion-icon>\n				<ion-badge color="primary">{{ notifications.length }}</ion-badge>\n			</button>\n			<button ion-button icon-only [disabled]="!warnings.length" (click)="showWarnings()">\n				<ion-icon name="warning"></ion-icon>\n				<ion-badge color="danger">{{ warnings.length }}</ion-badge>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-list [class]="platform.width()<1000 ? \'list-md listNarrow\' : \'list-md listWide\'" no-lines>\n		<button ion-item (click)="openDocumentation()">\n			<ion-icon name="document" item-left></ion-icon>\n			<div item-left padding-left>\n				<b>{{ \'HELP_DOCUMENTATION\' | translate }}</b>\n			</div>\n		</button>\n	</ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Karol\IonicProjects\firma\src\pages\help\help.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* Api */]])
    ], HelpPage);
    return HelpPage;
}());

//# sourceMappingURL=help.js.map

/***/ })

},[384]);
//# sourceMappingURL=main.js.map