import { Component, OnInit } from "@angular/core";
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import { LoginService }from "../services/login.service";
import { UploadService }from "../services/upload.service";
import { VideoService }from "../services/video.service";
import { User } from "../model/user";
import { Video } from "../model/video";

@Component({
	selector: "video-new",
	templateUrl: "app/view/video.new.html",
	directives: [ROUTER_DIRECTIVES],
	providers: [LoginService, UploadService, VideoService]
})

export class VideoComponent implements OnInit{

	public titulo: string = "Crear un nuevo video";
	public video;
	public errorMessage;
	public status;
	
	constructor(private _loginService: LoginService,
	            private _uploadService: UploadService,
	            private _videoService: VideoService,
	            private _route: ActivatedRoute,
	            private _router: Router
		) {
		// code...
	}

	ngOnInit(){
		this.video = new Video(1,"","","public","null","null",null,null);
	}

	onSubmit(){

		console.log(this.video);

		let token = this._loginService.getToken();
		this._videoService.create(token, this.video).subscribe(
				response => {

					this.status = response.status;
					if (this.status != "success") {
						this.status = "error";
					}else{
						this.video = response.data;
						console.log(this.video);
					}

				},
				error => {
					this.errorMessage = <any>error;

					if (this.errorMessage != null) {
						console.log(this.errorMessage);
						alert("Error en la peticion");
					}

				}
			);

	}

	callVideoStatus(value){
		this.video.status = value;
	}
}
