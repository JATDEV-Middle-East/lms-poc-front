import { Component } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/iCourse';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '../shared/course-card/course-card.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IUserData } from '../interfaces/iUser';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CourseCardComponent, RouterLink, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  authUser: IUserData | null = null;
  recommendedCourses: Course[] = [];
  assignedCourses: Course[] = [];
  totalInProgressCourses: Course[] = [];
  totalAssigned: Course[] = [];
  totalCompleted: Course[] = [];
  constructor(private courseService: CourseService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authUser = this.authService.getCurrentUserFromToken()
    this.fetchAssignedCourses();
    this.fetchReccommendedCourses();
  }

  fetchAssignedCourses() : void {
    this.courseService.getMyLearning()
      .subscribe({
        next: (response) => {
          if(response.success){
           this.assignedCourses = response.data
           this.totalAssigned = response.data.filter((c) => c.progress === 0);
           this.totalCompleted = response.data.filter((c) => c.progress && c.progress >= 99);
           this.totalInProgressCourses = response.data.filter((c) => c.progress && c.progress > 0 && c.progress < 99);
          }else {
          }
        },

        error: (error) => {
            console.log('Login successful:', error);
         
        }

      });
  }

  fetchReccommendedCourses() : void {
    this.courseService.getRecommendedCourses()
      .subscribe({
        next: (response) => {
          if(response.success){
            console.log('Login successful:', response);
           this.recommendedCourses = response.data.splice(0, 3)
          }else {
            console.log('Login successful:', response);
           
          }
        },

        error: (error) => {
            console.log('Login successful:', error);
         
        }

      });
  }
}
