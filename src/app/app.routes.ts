import { Router, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CouresListComponent } from './courses/list/list.component';
import { LearningComponent } from './learning/learning.component';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CourseDetailsComponent } from './courses/details/details.component';

const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export const routes: Routes = [
    { path: 'login', component: LoginComponent },

    {
    path: '',
        canActivate: [authGuard],
        component: MainLayoutComponent,
        children: [ 
            { path: 'dashboard', component: DashboardComponent },
            { path: 'courses', component: CouresListComponent },
            { path: 'courses/:id', component: CourseDetailsComponent },
            { path: 'my-learnings', component: LearningComponent },
            { path: 'analytics', component: AnalyticsComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '/login' }
];
