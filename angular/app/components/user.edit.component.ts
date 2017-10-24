// Importar el núcleo de Angular
import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../model/user';
import { UploadService } from '../services/upload.service';

 
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'user-edit',
    templateUrl: 'app/view/user-edit.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService, UploadService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class UserEditComponent implements OnInit{
	public titulo = "Actualizar mis datos";
	public user:User;
	public errorMessage;
	public status;
	public identity;

	constructor(
		private _loginService: LoginService,
		private _route: ActivatedRoute,
		private _router:Router,
		private _uploadService:UploadService
		){}

	ngOnInit(){

		let identity = this._loginService.getIdentity();

		this.identity = identity;

		if (identity == null) {
			
			this._router.navigate(['/index']);
		}else{

			this.user = new User(identity.sub,identity.role,identity.name,identity.surname,identity.email,identity.password,null);
		}

	}

	onSubmit(){
		if(this.user.password == this.identity.password){

			this.user.password = "";

		}

		this._loginService.updateUser(this.user).subscribe(
			response => {
				this.status = response.status;

				if (this.status != "success") {

					this.status = "error";
				}else{

					localStorage.setItem('identity', JSON.stringify(this.user));

					this.status = "success";

					console.log(this.status);
				}

			},
			error => {
				this.errorMessage = <any>error;

				if (this.errorMessage != null) {
					
					console.log(this.errorMessage);
					
					alert("Error en la peticion");
				}
			});
	}

	public filesToUpload: Array<File>;
	public resultUpload;

	fileChangeEvent(fileInput:any){

		this.filesToUpload = <Array<File>>fileInput.target.files;

		let token = this._loginService.getToken();

		let url = "http://www.symfonyapi.com/symfony/web/app_dev.php/user/upload-image-user";

		this._uploadService.makeFileRequest(token, url, ['image'], this.filesToUpload).then(
				(result)=>{
					this.resultUpload = result;

				},
				(error) =>{
					console.log(error);
				}
			);



	}

 }
