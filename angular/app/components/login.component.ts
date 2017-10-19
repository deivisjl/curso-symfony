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

	constructor(private _loginService: LoginService){

	}

	onSubmit(){		

		this._loginService.signIn(this.user).subscribe(
				response => {

					console.log(response);
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

	}
}
