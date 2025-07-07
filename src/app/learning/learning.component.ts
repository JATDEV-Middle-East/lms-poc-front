import { Component } from '@angular/core';
import { Course } from '../interfaces/iCourse';
import { Observable } from 'rxjs';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CourseCardComponent } from '../shared/course-card/course-card.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [CourseCardComponent, CommonModule, RouterLink, NgxPaginationModule, PaginationComponent],
  templateUrl: './learning.component.html',
  styleUrl: './learning.component.css'
})
export class LearningComponent {
  courses: Course[] = [];
  newCourses: Course[] = [];
  upComingCourses: Course[] = [];
  pageLimit = 9;

  page = 1;
  totalPage = 1;

  pageUpComing = 1;
  totalPageComing = 1;

  pageNew = 1;
  totalPageNew = 1;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.fetchCourses();
    this.fetchNewCourses();
    this.fetchUpComingCourses();
  }
    fetchCourses(page = 1) : void {
    this.courseService.getMyLearning()
      .subscribe({
        next: (response) => { 
          if(response.success){
           this.courses = response.data
          }else {
          }
        },
        error: (error) => {
            console.log('Login successful:', error);
        }
      });
  }
  fetchNewCourses(page = 1) : void {
    this.courseService.getMyLearning()
      .subscribe({
        next: (response) => { 
          if(response.success){
           this.newCourses = response.data
          }else {
          }
        },
        error: (error) => {
            console.log('Login successful:', error);
        }
      });
  }

  fetchUpComingCourses(page = 1) : void {
    this.courseService.getMyLearning()
      .subscribe({
        next: (response) => { 
          if(response.success){
           this.upComingCourses = response.data
          }else {
          }
        },
        error: (error) => {
            console.log('Login successful:', error);
        }
      });
  }

  onPageChange(newPageNumber: number, source = "course"): void {
    if(source == "course"){
      this.fetchCourses(newPageNumber)
    }else if(source == "new"){
      this.fetchNewCourses(newPageNumber);
    }else if(source == "upComing") {
      this.fetchUpComingCourses(newPageNumber);
    }
    console.log('Current page changed to:', newPageNumber);
  }

}
