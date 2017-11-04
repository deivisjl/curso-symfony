import { Component, OnInit } from "@angular/core";
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import { LoginService }from "../services/login.service";
import { VideoService }from "../services/video.service";
import { User } from "../model/user";
import { Video } from "../model/video";

@Component({
	selector: "video-detail",
	templateUrl: "app/view/video.detail.html",
	directives: [ROUTER_DIRECTIVES],
	providers: [LoginService, VideoService]
})

export class VideoDetailComponent implements OnInit{

	public numero:number;

	constructor(private _loginService: LoginService,
	            private _videoService: VideoService,
	            private _route: ActivatedRoute,
	            private _router: Router
		) {}

	ngOnInit(){

		this._route.params.subscribe(params => {
			let id = +params["id"];

			this.numero = id;
		});

	}
}
