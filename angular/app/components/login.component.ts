// Importar el núcleo de Angular
import {Component, OnInit} from '@angular/core';
 
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'login',
    templateUrl: 'app/view/login.html'
})
 
// Clase del componente donde irán los datos y funcionalidades
export class LoginComponent implements OnInit{ 
	public titulo: string = "Iniciar sesion";
	public user;

	onSubmit(){

		console.log(this.user);
	}

	ngOnInit(){

		this.user = {
			"email":"",
			"password":"",
			"gethash":"false"
		};

	}
}
