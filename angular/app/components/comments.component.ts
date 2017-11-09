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

	constructor(private _loginService: LoginService,
	            private _route: ActivatedRoute,
	            private _router: Router
		) {}

	ngOnInit(){}
}