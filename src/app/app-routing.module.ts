import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/user/home/home.component';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {DetailComponent} from './components/user/detail/detail.component';
import {DashboardComponent} from './components/admin/dashboard/dashboard.component';
import {UserListComponent} from './components/admin/user-list/user-list.component';
import {ProductListComponent} from './components/admin/product-list/product-list.component';
import {UnathorizedComponent} from './components/error/unathorized/unathorized.component';
import {NotFoundComponent} from './components/error/not-found/not-found.component';
import {TransactionListComponent} from './components/admin/transaction-list/transaction-list.component';
import {AuthGuard} from './guards/auth.guard';
import {Role} from './model/role';
import { MenupageComponent } from './components/menupage/menupage.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ReservationListComponent } from './components/admin/reservation-list/reservation-list.component';
import { ChefDashboardComponent } from './components/chef/chef-dashboard/chef-dashboard.component';

import { InventoryListComponent } from './components/admin/inventory-list/inventory-list.component';
import { ManagerdashboardComponent } from './components/manager/managerdashboard/managerdashboard.component';
// import {HeaderComponent} from './components/header/header.component'

const routes: Routes = [
  //Main page
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'menu', component: MenupageComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'reserve', component: ReservationComponent},
  //User pages
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthGuard]
  },
  {path: 'detail', component: DetailComponent},
  {path: 'detail/:id', component: DetailComponent},

  //admin panel
  {path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
  },
  //Chef panel
  {path: 'chefDashboard',
  component:ChefDashboardComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.CHEF]}
  },
  //manager panel
  {path: 'managerDashboard',
  component: ManagerdashboardComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.MANAGER]}
  },
  
  
  {path: 'user-list',
  component: UserListComponent,
  canActivate: [AuthGuard],
  data: {roles: [Role.ADMIN]}
  },

  {path: 'inventory-list',
  component:InventoryListComponent,
  canActivate: [AuthGuard],
  data: {allowedRoles: ['admin','chef','manager']}
  },

 
  
  {path: 'reservation-list',
  component:ReservationListComponent,
  canActivate: [AuthGuard],
  data: {allowedRoles: ['admin','chef','manager']}
  },
  {path: 'product-list',
  component: ProductListComponent,
  canActivate: [AuthGuard],
  data: {allowedRoles: ['admin','chef','manager']}
 },
 {path: 'transaction-list',
 component: TransactionListComponent,
 canActivate: [AuthGuard],
 data: {allowedRoles: ['admin','chef','manager']}
},

  //error pages
  {path: '404', component: NotFoundComponent},
  {path: '401', component: UnathorizedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
constructor(private router: Router) {
  this.router.errorHandler = (error: any) => {
    this.router.navigate(['/404']);
  }
}
}
