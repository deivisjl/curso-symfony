import { Component, OnInit } from "@angular/core";
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from "@angular/router";
import { LoginService }from "../services/login.service";
import { CommentService }from "../services/comment.service";
import { User } from "../model/user";
import { Video } from "../model/video";

import { GenerateDatePipe } from "../pipes/generate.date.pipe";

@Component({
	selector: "comments",
	templateUrl: "app/view/comments.html",
	directives: [ROUTER_DIRECTIVES],
	providers: [LoginService, CommentService],
	pipes: [GenerateDatePipe]
})

export class CommentsComponent implements OnInit{

	public titulo: string ="Comentarios";
	public comment;
	public identity;
	public errorMessage;
	public status;
	public statusComment;
	public loading = 'show';

	public commentList;

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
					this.getComments(id);
			});

		
	}

	onSubmit(){

		let token = this._loginService.getToken();

		this.loading = 'show';
		
		this._commentService.create(token, this.comment).subscribe(
				response =>{
						this.status = response.status;

						if (this.status != "success") {

							this.status = 'error';
						}else{

							this.comment.body = " ";
							this.getComments(this.comment.video_id);

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

	getComments(video_id){

		this.loading = 'show';

		this._commentService.getCommentsOfVideo(video_id).subscribe(
				response =>{
					this.statusComment = response.status;

						if (this.statusComment != "success") {

							this.statusComment = 'error';
						}else{

							this.commentList = response.data;
							this.loading = 'hidden';
						}
				},
				error =>{
					this.errorMessage = <any>error;

					if (this.errorMessage != null) {
						console.log(this.errorMessage);
						alert(this.errorMessage);
					}
				}
			);
	}

	deleteComment(id){
		let comment_panel = <HTMLElement>document.querySelector(".comment-panel-"+id);

		if (comment_panel != null) {
			
			comment_panel.style.display = "none";

		}

		let token = this._loginService.getToken();

		this._commentService.delete(token,id).subscribe(

				response => {
					if (this.statusComment != "success") {
						this.statusComment = "error";
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