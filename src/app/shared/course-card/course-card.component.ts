import { Component, Input } from '@angular/core';
import { Course } from '../../interfaces/iCourse';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  showFavDropdown : boolean = false
  @Input() course!: Course;
  @Input() showEnrolButton: boolean = false;

  toggeleFavDropdown() : void {
    this.showFavDropdown = !this.showFavDropdown;
  }
  hideFavDropdown() : void {
    this.showFavDropdown = false;
  }
  addToFavorites(): void {

    console.log('Add to favorite button clicked!');
  }

  shareContent(): void {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this content!',
        text: 'This is a great resource.',
        url: window.location.href,
      })
      .then(() => this.showFavDropdown = false)
      .catch((error) => console.log('Error sharing', error));
    } else {
      alert('Sharing is not supported on this browser. You can manually copy the URL.');
    }
  }

}
