import { Routes } from '@angular/router';
import { IndexComponent } from './views/welcome/index/index.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { NuestrosSensoresComponent } from './views/welcome/nuestros-sensores/nuestros-sensores.component';
import { SobreNosotrosComponent } from './views/welcome/sobre-nosotros/sobre-nosotros.component';
import { ParaQuienComponent } from './views/welcome/para-quien/para-quien.component';
import { GraficaComponent } from './views/grafica/grafica.component';
import { EnviarCorreoComponent } from './views/auth/enviar-correo/enviar-correo/enviar-correo.component';
import { UserDashboardComponent } from './views/dashboard/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './views/dashboard/admin-dashboard/admin-dashboard.component';
import { SensoresHabitacionComponent } from './views/user/sensores/sensores-habitacion/sensores-habitacion.component';
import{HabitacionesComponent} from './views/user/habitaciones/habitaciones.component';
import { EditarContrasenaComponent } from './views/auth/editar-contrasena/editar-contrasena.component';
import { EditarPerfilComponent } from './views/auth/editar-perfil/editar-perfil.component';
import { ReporteDiarioComponent } from './views/user/reporte/reporte-diario/reporte-diario.component';
import { AltaHabitacionComponent } from './views/user/alta-habitacion/alta-habitacion.component';
import { NotFoundComponent } from './shared/components/not-found/not-found/not-found.component';
import { authTokenGuard } from './core/guards/auth-token.guard';
import { EditarHabitacionComponent } from './views/user/editar-habitacion/editar-habitacion.component';
import { VerUsuariosComponent } from './views/admin/ver-usuarios/ver-usuarios.component';
import { ReenvioComponent } from './views/auth/reenvio/reenvio.component';
import { rolesGuard } from './core/guards/roles.guard';

export const routes: Routes = [

    // {
    //     path: '',
    //     component: GraficaComponent
    // },
    {
        path: '',
        component: IndexComponent
    }
    ,
    {
        // RUTA INDEX QUE VERAN LOS USUARIOS QUE NO ESTEN LOGUEADOS
        path: 'Index',
        component: IndexComponent
    },
    {
        //RUTA PARA QUE LOS USUARIOS SE LOGUEEN
        path: 'Login',
        component: LoginComponent
    },
    {
        //RUTA PARA QUE LOS USUARIOS SE REGISTREN
        path: 'Register',
        component: RegisterComponent
    },
    //REENVIO DE CORREO
    {
        path: 'reenvio',
        component: ReenvioComponent
    },
    {
        path: 'enviar-correo',
        component: EnviarCorreoComponent 
    },
    {
        // RUTA PARA LOS SENSORES QUE OFRECEMOS
        path: 'NuestrosSensores',
        component: NuestrosSensoresComponent
    },
    {
        // RUTA SOBRE NUESTRA INFORMACION Y NUESTRO OBJETIVO
        path: 'SobreNosotros',
        component: SobreNosotrosComponent
    },
    {
        //RUTA PARA QUIENES ESTA DIRIGIDO EL PROYECTO
        path: 'PublicoDirigido',
        component: ParaQuienComponent
    },
    {
        //RUTA PARA LA GRAFICA DE LOS SENSORES
        path: 'Graficas/:id',
        component: GraficaComponent, canActivate: [authTokenGuard]
    },
    { 
        path: 'reporte-diario/:id', component: ReporteDiarioComponent  ,canActivate: [authTokenGuard]
    },
    {
        path: 'User-Dashboard',
        component: UserDashboardComponent  ,canActivate: [authTokenGuard]
    },
    {
        path: 'Admin-Dashboard',
        component: AdminDashboardComponent  ,canActivate: [authTokenGuard]
    },
    {
        //RUTA PARA VER QUE SENSORES TIENE LA HABITACION // ACTIVAR O DESACTIVARLOS 
        path: 'sensorHabitacion/:id',
        component: SensoresHabitacionComponent  ,canActivate: [authTokenGuard]
    },
    {
        //RUTA PARA VER MIS HABITACIONES 
        path: 'misHabitaciones/:id',
        component: HabitacionesComponent,
        canActivate: [authTokenGuard, rolesGuard],
        data: { roles: [3] }
    },
    {
        //RUTA PARA VER MIS HABITACIONES 
        path: 'misHabitaciones',
                component: HabitacionesComponent  ,canActivate: [authTokenGuard]
    },
    {
        //RUTA PARA DAR DE ALTA HABITACION
        path: 'nuevaHabitacion',
        component: AltaHabitacionComponent  ,canActivate: [authTokenGuard]
    },
    {
        //RUTA PARA ACTUALIZAR HABITACION
        path: 'editarHabitacion/:id',
        component: EditarHabitacionComponent
    },
    {
        path: 'editar-contraseña',
        component: EditarContrasenaComponent  ,canActivate: [authTokenGuard]
    },
    {
        path: 'editar-perfil',
        component: EditarPerfilComponent ,canActivate: [authTokenGuard]
    },
    {
        path: 'ver-usuarios',
        component: VerUsuariosComponent
    },
    { 
        path: 'not-found', component: NotFoundComponent 
    },
    {
        path: '**', redirectTo: 'not-found' 
    }




];
