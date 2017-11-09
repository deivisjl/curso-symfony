import { Component, OnInit } from "@angular/core";
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import { LoginService }from "../services/login.service";
import { CommentService }from "../services/comment.service";
import { User } from "../model/user";
import { Video } from "../model/video";

@Component({
	selector: "comments",
	templateUrl: "app/view/comments.html",
	directives: [ROUTER_DIRECTIVES],
	providers: [LoginService, CommentService]
})

export class CommentsComponent implements OnInit{

	public titulo: string ="Comentarios";
	public comment;
	public identity;
	public errorMessage;
	public status;

	constructor(private _loginService: LoginService,
	            private _route: ActivatedRoute,
	            private _router: Router,
	            private _commentService: CommentService
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

					//conseguir comentarios
			});

		
	}

	onSubmit(){

		let token = this._loginService.getToken();
		
		this._commentService.create(token, this.comment).subscribe(
				response =>{
						this.status = response.status;

						if (this.status != "success") {

							this.status = 'error';
						}else{

							this.comment.body = " ";

						}
				},

				error => {
					this.errorMessage = <any>error;

					if (this.errorMessage != null) {
						console.log(this.errorMessage);
						alert(this.errorMessage);
					}
				}
			);
	}
}