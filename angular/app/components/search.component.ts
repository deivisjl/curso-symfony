// Importar el núcleo de Angular
import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { VideoService } from '../services/video.service';

 
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'default',
    templateUrl: 'app/view/search.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService, VideoService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class SearchComponent implements OnInit{ 
	public titulo = "Resultados de la busqueda";
	public identity;
	public videos;

	public errorMessage;
	public status;
	public loading;

	public pages;
	public pagePrev = 1;
	public pageNext = 1;
	public active;

	public search;

	constructor(private _loginService: LoginService, private _videoService: VideoService, private _route: ActivatedRoute,
					private _router: Router){}

	ngOnInit(){
			this.getSearchVideos();
	}


	getSearchVideos(){
			this._route.params.subscribe(params => {

				let search:any = params["search"];

				if(!search || search.trim().length == 0){

					search = null;

					this._router.navigate(['/index']);
				}

				let page = +params["page"];
				if (!page) {

					page = 1;
				}

				this.loading = "show";
				this.active = page;

				this.searchString = search;
				
				this._videoService.search(search, page).subscribe(
						response=>{

							this.status = response.status;

							if (this.status != "success") {
								this.status = "error";
							}else{
								this.videos = response.data;
								this.loading = "hide";

								this.pages = [];

								for (let i = 0; i < response.total_pages; i++) {

									this.pages.push(i);
								}

								if (page >= 2) {
									
									this.pagePrev = (page - 1);
								}else{

									this.pagePrev = page;
								}

								if (page < response.total_pages || page == 1) {
									
									this.pageNext = (page + 1);
								}else{

									this.pageNext = page;
								}
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
