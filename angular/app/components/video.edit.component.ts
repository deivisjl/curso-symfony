import { Component, OnInit } from "@angular/core";
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import { LoginService }from "../services/login.service";
import { UploadService }from "../services/upload.service";
import { VideoService }from "../services/video.service";
import { User } from "../model/user";
import { Video } from "../model/video";

@Component({
	selector: "video-edit",
	templateUrl: "app/view/video.edit.html",
	directives: [ROUTER_DIRECTIVES],
	providers: [LoginService, UploadService, VideoService]
})

export class VideoEditComponent implements OnInit{

	public titulo: string = "Editar video";
	public video;
	public errorMessage;
	public status;
	public uploadImage;

	public status_get_video;
	
	constructor(private _loginService: LoginService,
	            private _uploadService: UploadService,
	            private _videoService: VideoService,
	            private _route: ActivatedRoute,
	            private _router: Router
		) {
		this.uploadImage = false;
	}

	ngOnInit(){
		this.video = new Video(1,"","","public","null","null",null,null);
		this.getVideo();
	}

	onSubmit(){

		console.log(this.video);

		this._route.params.subscribe(
				params => {
					let id = +params['id'];

							let token = this._loginService.getToken();
								this._videoService.update(token, this.video, id).subscribe(
										response => {

											this.status = response.status;

											if (this.status != "success") {
												this.status = "error";
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


				});


	}

	getVideo(){

		// 	this._route.params.subscribe(params => {

		// 	let id = +params["id"];

		// 	this._videoService.getVideo(id).subscribe(

		// 			response =>{

		// 				this.video = response.data;
		// 				this.status_get_video = response.status;

		// 				this.id = this.video.id;
		// 				this.videoPath = this.video.videoPath;
		// 				this.name = this.video.user.name;
		// 				this.descripcion = this.video.description;

		// 				if(this.status_get_video != "success"){
		// 					this._router.navigate(["/index"]);
		// 				}

		// 			},
		// 			error => {
		// 				this.errorMessage = <any>error;

		// 			if (this.errorMessage != null) {
		// 				console.log(this.errorMessage);
		// 				alert("Error en la peticion");
		// 			}

		// 			}
		// 		);

		// 		this._videoService.getLastsVideos().subscribe(	
		// 			response => {

		// 				this.lastsVideos = response.data;

		// 				this.statusLastsVideos = response.status;

		// 				if (this.statusLastsVideos != "success") {

		// 					this._router.navigate(['/index']);
		// 				}
		// 			},
		// 			error => {
		// 				this.errorMessage = <any>error;

		// 				if (this.errorMessage != null) {
		// 					console.log(this.errorMessage);
		// 					alert("Error en la peticion");
		// 				}
		// 			}

		// 		);
		// });

	}

	public filesToUpload:Array<File>;
	public resultUpload;

	fileChangeEventImage(fileInput:any){

		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
		console.log(this.video.id);

		let token = this._loginService.getToken();

		let url = "http://www.symfonyapi.com/symfony/web/app_dev.php/video/upload-image/" + this.video.id;

		this._uploadService.makeFileRequest(token, url, ['image'], this.filesToUpload).then(
				(result)=>{
					this.resultUpload = result;
					console.log(this.resultUpload);
				},
				(error) =>{
					console.log(error);
				}
			);
	}

	nextUploadVideo(){

		this.uploadImage = true;
	}

	callVideoStatus(value){
		this.video.status = value;
	}

	fileChangeEventVideo(fileInput:any){

		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
		console.log(this.video.id);

		let token = this._loginService.getToken();

		let url = "http://www.symfonyapi.com/symfony/web/app_dev.php/video/upload-video/" + this.video.id;

		this._uploadService.makeFileRequest(token, url, ['video'], this.filesToUpload).then(
				(result)=>{
					this.resultUpload = result;
					console.log(this.resultUpload);
				},
				(error) =>{
					console.log(error);
				}
			);
	}

	redirectToVideo(){
		this._router.navigate(['/video',this.video.id]);
	}
}
