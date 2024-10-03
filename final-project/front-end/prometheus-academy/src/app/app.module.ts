import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { MyLearningComponent } from './components/my-learning/my-learning.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { MyProgressComponent } from './components/my-progress/my-progress.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { AdminComponent } from './components/admin/admin.component';
import { ManageCoursesComponent } from './components/manage-courses/manage-courses.component';
import { EmployeeProgressComponent } from './components/employee-progress/employee-progress.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistComponent } from './playlist/playlist.component';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes=[
{path: '', component:LoginComponent },
{path: 'login', component:LoginComponent },
{path: 'registration', component:RegistrationComponent },
{ path: 'playlist/:courseid', component: PlaylistComponent },
{path: 'admin', component:AdminComponent },
{path: 'managecourses', component:ManageCoursesComponent },
{path: 'employeeprogress', component:EmployeeProgressComponent },
{path: 'userdashboard', component:UserDashboardComponent },
{path: 'mylearning', component:MyLearningComponent },
{path: 'allcourses', component:AllCoursesComponent },
{path: 'myprogress', component:MyProgressComponent },
{path: 'myaccount', component:MyAccountComponent },
{ path: 'logout', component: LogoutComponent },
{path: '**', component:LoginComponent }


]

@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    MyLearningComponent,
    AllCoursesComponent,
    MyProgressComponent,
    MyAccountComponent,
    AdminComponent,
    ManageCoursesComponent,
    EmployeeProgressComponent,
    LoginComponent,
    RegistrationComponent,
    PlaylistComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
