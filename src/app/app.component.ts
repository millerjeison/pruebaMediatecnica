import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ConeccionGitService } from './servicios/coneccion-git.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pruebaMediatecnica';
  filterPost: any = '';
  Nombre: any;
  Apellido: any;
  Correo: any;
  Cedula: any;
  Usuario_Githup: any;
  Fechas: any;
  cabezera: boolean = false;
  checkbox: boolean = false;
  datos: any = {};
  repositiorios: any[] = []
  p: number = 1;
  movil: any = false

  constructor(private conneccion: ConeccionGitService, private cookieService: CookieService) {
  }
  ngOnInit(): void {
    let row = document.getElementById("rM");
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      console.log('Esto es un dispositivo móvil');
      this.movil = true
      this.cargarLocalStorage()
    
    
      row.classList.remove('rM')
      console.log(localStorage.getItem('Nombre'));
      
      if (localStorage.getItem('Nombre')) {
        console.log(localStorage.getItem('Usuario_Githup').replace(/['"]+/g, ''));
        this.desaparecer();
        this.conneccion.getRepos(localStorage.getItem('Usuario_Githup')).subscribe(data => {
          this.cabezera = true;
          console.log(data);
          

          this.repositiorios = data;
        });

      }



    } else {
      row.classList.add('rM')
      if (this.cookieService.get('Nombre')) {
        this.datos = this.cookieService.getAll();
        this.cabezera = true;
        this.desaparecer()
        console.log(this.datos);

        this.conneccion.getRepos(this.datos.Usuario_Githup).subscribe(data => {

          this.repositiorios = data;
        });
      }
    }




  }
  guardarStorage() {
    if (this.Fechas == undefined || this.Nombre == undefined || this.Apellido == undefined || this.Correo == undefined || this.Cedula == undefined || this.Usuario_Githup == undefined) {
      alert("Faltan Campos por llenar ")
    } else {
      localStorage.setItem('Nombre', JSON.stringify(this.Nombre).replace(/['"]+/g, ''));
      localStorage.setItem('Apellido', JSON.stringify(this.Apellido).replace(/['"]+/g, ''));
      localStorage.setItem('Correo', JSON.stringify(this.Correo).replace(/['"]+/g, ''));
      localStorage.setItem('Cedula', JSON.stringify(this.Cedula).replace(/['"]+/g, ''));
      localStorage.setItem('Usuario_Githup', JSON.stringify(this.Usuario_Githup).replace(/['"]+/g, ''));
      localStorage.setItem('Fechas', JSON.stringify(this.Fechas).replace(/['"]+/g, ''));
      this.cargarLocalStorage()
      this.conneccion.getRepos(this.Usuario_Githup).subscribe(data => {

        this.repositiorios = data;
        this.desaparecer();
        this.conneccion.getRepos(this.datos.Usuario_Githup).subscribe(data => {
          this.cabezera = true;
          console.log(this.datos);
          

          this.repositiorios = data;
        });
      });

    }

  }
  cargarLocalStorage() {
  this.datos = {
    'Fechas': localStorage.getItem('Fechas'),
    'Apellido': localStorage.getItem('Apellido'),
    'Cedula': localStorage.getItem('Cedula'),
    'Correo': localStorage.getItem('Correo'),
    'Nombre': localStorage.getItem('Nombre'),
    'Usuario_Githup': localStorage.getItem('Usuario_Githup')


  }
  console.log(this.datos);
  

  }


  guardarENCokie() {
    if (this.Fechas == undefined || this.Nombre == undefined || this.Apellido == undefined || this.Correo == undefined || this.Cedula == undefined || this.Usuario_Githup == undefined) {
      alert("Faltan Campos por llenar ")
    } else {
      if (this.checkbox) {
        this.cookieService.set('Nombre', this.Nombre);
        this.cookieService.set('Apellido', this.Apellido);
        this.cookieService.set('Correo', this.Correo);
        this.cookieService.set('Cedula', this.Cedula);
        this.cookieService.set('Usuario_Githup', this.Usuario_Githup);
        this.cookieService.set('Fechas', this.Fechas);
        this.datos = this.cookieService.getAll();
        this.desaparecer();
        this.conneccion.getRepos(this.Usuario_Githup).subscribe(data => {
          console.log(data);
          this.repositiorios = data;
        });
      }
      else
        alert("No podemos continuar hasta que acepte que utlizicemos los cokies ,por favor acepta y vuelve adar click a guardar  ")
    }

  }
  desaparecer() {
    let formulario = document.getElementById("d_input");
    let titulo = document.getElementById("titulo");
    let caja = document.getElementById("caja");
    let Ti = document.getElementById("Ti");
    let perfil = document.getElementById("perfil");
    let animaT = document.getElementById("animaT");
    let contenedorRepo = document.getElementById("contenedorRepo");
    formulario.classList.toggle("desapareser");
    setTimeout(() => {
      titulo.classList.add('noneB')
      caja.classList.add('noneB')
      Ti.classList.add('none')
      formulario.classList.toggle("none");
      setTimeout(() => {
        titulo.classList.toggle("desapareserTitulo");
        setTimeout(() => {
          titulo.classList.add('none')
          caja.classList.add('caja')
          setTimeout(() => {
            caja.classList.add('topF')
            setTimeout(() => {
              caja.classList.add('bF')
              perfil.classList.add('blok')
              setTimeout(() => {
                animaT.classList.add('anim');
                contenedorRepo.classList.add('anim');
              }, 300);
            }, 500);
          }, 200);
        }, 300);
      }, 300);
    }, 300);
  }
}
