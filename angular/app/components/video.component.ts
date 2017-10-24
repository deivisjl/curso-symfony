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
	public video:Video;
	
	constructor(private _loginService: LoginService,
	            private _uploadServie: UploadService,
	            private _route: ActivatedRoute,
	            private _router: Router
		) {
		// code...
	}

	ngOnInit(){
		this.video = new Video(1,"","","public","","","","");
	}

	onSubmit(){
		console.log(this.video);
	}

	callVideoStatus(value){
		this.video.status = value;
	}
}
