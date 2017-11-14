// Importar el núcleo de Angular
import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { VideoService } from '../services/video.service';

 
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'default',
    templateUrl: 'app/view/default.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService, VideoService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class DefaultComponent { 
	public titulo = "Portada";
	public identity;
	public videos;

	public errorMessage;
	public status;
	public loading;

	constructor(private _loginService: LoginService, private _videoService: VideoService, private _route: ActivatedRoute,
					private _router: Router){}

	ngOnInit(){
		this.loading = "show";
		this.identity = this._loginService.getIdentity();
		this.getAllVideos();

	}

	getAllVideos(){
		this._route.params.subscribe(params => {
			let page = +params["page"];
			if (!page) {

				page = 1;
			}

			this._videoService.getVideos(page).subscribe(
					response=>{

						this.status = response.status;

						if (this.status != "success") {
							this.status = "error";
						}else{
							this.videos = response.data;
							this.loading = "hide";
							console.log(this.videos);
						}
					},
					error =>{
							this.errorMessage = <any>error;
							if (this.errorMessage != null) {
								
								alert(this.errorMessage);
							}
					}
				);
		});
	}
}
