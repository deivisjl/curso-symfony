import { provideRouter, RouterConfig } from '@angular/router';

import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { DefaultComponent } from './components/default.component';
import { UserEditComponent } from './components/user.edit.component';
import { VideoComponent } from './components/video.component';

export const routes: RouterConfig = [
	{ path: '', redirectTo: '/index', terminal: true},

	{ path: 'create-video', component: VideoComponent },

	{ path: 'index', component: DefaultComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'login/:id', component: LoginComponent },
	{ path: 'user-edit', component: UserEditComponent },
	{ path: 'register', component: RegisterComponent }
];

export const APP_ROUTER_PROVIDERS = [
	
	provideRouter(routes)
	
];