import { Component, OnInit } from "@angular/core";
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import { LoginService }from "../services/login.service";
import { User } from "../model/user";
import { Video } from "../model/video";

@Component({
	selector: "comments",
	templateUrl: "app/view/comments.html",
	directives: [ROUTER_DIRECTIVES],
	providers: [LoginService]
})

export class CommentsComponent implements OnInit{

	public titulo: string ="Comentarios";
	public comment;
	public identity;

	constructor(private _loginService: LoginService,
	            private _route: ActivatedRoute,
	            private _router: Router
		) {}

	ngOnInit(){

		this.identity = this._loginService.getIdentity();

		this._route.params.subscribe(
			params => {

				let id = +params["id"];

					this.comment = {
						"video_id": id,
						"body":""
					};
			});

		
	}

	onSubmit(){
		console.log(this.comment);
	}
}