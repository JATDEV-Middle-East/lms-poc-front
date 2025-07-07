import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course, CourseDetail } from '../../interfaces/iCourse';
import { CoursePartialComponent } from '../../shared/course-partial/course-partial.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CoursePartialComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class CourseDetailsComponent {
    courseId: number | null = null;
    course: CourseDetail | null = null;
  isEnrolling = false;

  private routeSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      const idString = params.get('id');
      if (idString) {
        this.courseId = +idString; 
        this.fetchCourse(idString);
      } else {
        this.courseId = null;
        this.router.navigate(['/courses']);
      }
    });
  }

  fetchCourse(id : string) : void {
     this.courseService.getCourse(parseInt(id))
     .subscribe({
        next: (response) => {
          console.log(response);
         if(!response){
            this.router.navigate(['/courses']);
         }else {
           if(response.success){
             console.log(response.data)
           this.course = response.data
          }else {
          }
         }
        },
        error: (error) => {
        }
      });
  }

  enrolInCourse(): void {
    this.isEnrolling = true;
    var courseid = this.courseId ? this.courseId : "";
    this.courseService.purchaseCourse(this.courseId)
     .subscribe({
        next: (response) => {
          this.isEnrolling = false;
          console.log(response);
         if(!response){
            //toast error
         }else {
           if(response.success){
            this.fetchCourse(courseid.toString());
          }else {
          }
         }
        },
        error: (error) => {
          this.isEnrolling = false;
        }
      });
  }
}
