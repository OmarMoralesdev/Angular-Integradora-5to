import { Component, OnInit} from '@angular/core';
import { UserServiceService } from '../../../core/services/user-service.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../core/models/user';
import { InfoPerfil } from '../../../core/models/info-perfil';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-ver-usuarios',
  imports: [CommonModule,RouterLink],
  templateUrl: './ver-usuarios.component.html',
  styleUrl: './ver-usuarios.component.css'
})
export class VerUsuariosComponent implements OnInit {
  Usuarios:User[]=[];
  pagina:number=1;
  registros:number=6;

  constructor(public userService:UserServiceService, public router:Router, public tostada:ToastrService){}

  ngOnInit(): void {
    this.cargarUsers();
  }

  cargarUsers(){
    this.userService.getUsers().subscribe({
      next:(response)=>{
        this.Usuarios=response.data;
      },
      error:(e)=>{
        console.log(e);
      }
    })
  }

  cambiarEstado(usuario: any) {
    const nuevoEstado = !usuario.estado; 
    this.userService.putUser(usuario.id, { estado: nuevoEstado }).subscribe({
      next: (res) => {
        usuario.estado = nuevoEstado; 
        this.tostada.success('Estado de la cuenta actualizado','Éxito')
        
      },
      error: (err) => {
        console.error(err);
        this.tostada.error('Error al actualizar la cuenta', 'Error')
      }
    });
  }

  get paginaActual() {
    const indice = (this.pagina - 1) * this.registros;
    return this.Usuarios.slice(indice, indice + this.registros);
  }

  get totalPaginas() {
    return Math.ceil(this.Usuarios.length / this.registros);
  }

  siguiente() {
    if (this.pagina < this.totalPaginas) {
      this.pagina++;
    }
  }

  anterior() {
    if (this.pagina > 1) {
      this.pagina--;
    }
  }

}
