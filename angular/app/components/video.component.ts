import { Component, OnInit } from "@angular/core";
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import { LoginService }from "../services/login.service";
import { UploadService }from "../services/upload.service";
import { User } from "../model/user";
import { Video } from "../model/video";

@Component({
	selector: "video-new",
	templateUrl: "app/view/video.new.html",
	directives: [ROUTER_DIRECTIVES],
	providers: [LoginService, UploadService]
})

export class VideoComponent implements OnInit{

	public titulo: string = "Crear un nuevo video";
	
	constructor(private _loginService: LoginService,
	            private _uploadServie: UploadService,
	            private _route: ActivatedRoute,
	            private _router: Router
		) {
		// code...
	}

	ngOnInit(){
		console.log("Componente video cargado..");
	}
}
