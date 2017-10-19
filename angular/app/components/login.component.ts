// Importar el núcleo de Angular
import {Component, OnInit} from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';

 
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

	constructor(private _loginService: LoginService, private _route: ActivatedRoute, private _router: Router){

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
												this._router.navigate(['/index']);

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

		this._route.params.subscribe(params => {

			let logout = params["id"];

			if(logout == 1){

				localStorage.removeItem('identity');
				localStorage.removeItem('token');
				this.identity = null;
				this.token = null;

				this._router.navigate(['/login']);
			}

		});

		if (this.identity != null && this.token != null) {
	  			
	  			this._router.navigate(['/index']);	
	  		}
	}
}
