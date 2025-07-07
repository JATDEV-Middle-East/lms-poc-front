import { Component } from '@angular/core';
import { Course } from '../../interfaces/iCourse';
import { Observable } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { CourseCardComponent } from '../../shared/course-card/course-card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CourseCardComponent, CommonModule, RouterLink, NgxPaginationModule, PaginationComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class CouresListComponent {
  courses: Course[] = [];
  newCourses: Course[] = [];
  upComingCourses: Course[] = [];
  pageLimit = 9;

  page = 1;
  totalPage = 0;

  pageUpComing = 1;
  totalPageComing = 0;

  pageNew = 1;
  totalPageNew = 0;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.fetchCourses();
    this.fetchNewCourses();
    this.fetchUpComingCourses();
  }
  fetchCourses(page = 1) : void {
    this.courseService.getCourses(page, this.pageLimit)
     .subscribe({
        next: (response) => {
          console.log(response);
          if(response.success){
           this.courses = response.data
           this.page = page;
           this.totalPage = response.totalCount ? Math.ceil(response.totalCount/this.pageLimit) : 0
          }else {
          }
        },
        error: (error) => {
        }
      });
  }
  fetchNewCourses(page = 1) : void {
     this.courseService.getCourses(page, this.pageLimit)
     .subscribe({
        next: (response) => {
          if(response.success){
           this.newCourses = response.data
           this.pageNew = page
           this.totalPageNew = response.totalCount ? Math.ceil(response.totalCount/this.pageLimit) : 0


          }else {
          }
        },
        error: (error) => {
        }
      });
  }

  fetchUpComingCourses(page = 1) : void {
     this.courseService.getCourses(page, this.pageLimit)
     .subscribe({
        next: (response) => {
          if(response.success){
           this.upComingCourses = response.data
           this.pageUpComing = page
           this.totalPageComing = response.totalCount ? Math.ceil(response.totalCount/this.pageLimit) : 0

          }else {
          }
        },
        error: (error) => {
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
