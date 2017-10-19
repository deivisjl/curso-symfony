// Importar el núcleo de Angular
import {Component, OnInit} from '@angular/core';
import { LoginService } from '../services/login.service';
}
 
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'login',
    templateUrl: 'app/view/login.html',
    providers: [LoginService]
})
 
// Clase del componente donde irán los datos y funcionalidades
export class LoginComponent implements OnInit{ 
	public titulo: string = "Iniciar sesion";
	public user;
	public errorMessage;
	public identity;
	public token;

	constructor(private _loginService: LoginService){

	}

	onSubmit(){		

		this._loginService.signIn(this.user).subscribe(
				response => {

					let identity = response;

					this.identity = identity;

					if (this.identity.length <= 0) {

						alert("Error en el servidor");

					}else{

						if (!this.identity.status) {
							
							localStorage.setItem('identity', JSON.stringify(identity));

							this.user.gethash = "true";

								//get Token
							this._loginService.signIn(this.user).subscribe(

									response => {

										let token = response;

										this.token = token;

										if (this.token.length <= 0) {
											
											alert("Error en el servidor");
										}else{

											if (!this.token.status) {
												
												localStorage.setItem('token', token);

												//redireccion


											}
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

	ngOnInit(){		

		this.user = {
			"email":"",
			"password":"",
			"gethash":"false"
		};

		console.log(this._loginService.getIdentity());
		console.log(this._loginService.getToken());
	}
}
