import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

@Injectable()
export class VideoService{

	public url = "http://www.symfonyapi.com/symfony/web/app_dev.php";
	public identity;
	public token;

	constructor(private _http:Http){}

	create(token, video){

		let json = JSON.stringify(video);
		let params = "json="+json+"&authorization="+token;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'/video/new',params,{headers: headers})
							.map(res => res.json());
	}
}