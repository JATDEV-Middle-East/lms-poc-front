import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CourseDetail } from '../../interfaces/iCourse';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-partial',
  standalone: true,
   imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './course-partial.component.html',
  styleUrl: './course-partial.component.css'
})
export class CoursePartialComponent {
  @Input() course!: CourseDetail | null;
  @Input() isEnrolling!: boolean;
  
  @Output() enrollEvent = new EventEmitter<number>();
  
  // Reference to the video element in the template
  @ViewChild('introVideo') introVideo!: ElementRef<HTMLVideoElement>;
  // State for controlling playback and icon visibility
  showPlayButton: boolean = true;
  videoLoaded: boolean = false; // To track if video element has loaded enough data

  private routeSubscription: Subscription | undefined; // Keep if you actually use it

  // Constructor and lifecycle hooks
  constructor() { }

  ngOnInit(): void {
    // If you fetch course data here, or if it's dynamic
    // The @Input() handles it if passed from parent
  }

  ngAfterViewInit(): void {
    // We can interact with the video element once the view is initialized
    if (this.introVideo && this.introVideo.nativeElement) {
      // Listen for when video can play (enough data loaded)
      this.introVideo.nativeElement.oncanplaythrough = () => {
        this.videoLoaded = true;
        // console.log('Video can play through');
      };
      this.introVideo.nativeElement.onerror = (event) => {
        console.error('Video error:', event);
        this.videoLoaded = false; // Indicate video failed to load
        this.showPlayButton = false; // Hide play button if error
      };
      this.introVideo.nativeElement.onended = () => {
        this.showPlayButton = true; // Show play button again when video ends
      };
    }
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    // No specific cleanup for plain video tag needed beyond Angular's destruction
  }

  // Method to play the video when the play icon is clicked
  playIntroVideo(): void {
    if (this.introVideo && this.introVideo.nativeElement) {
      this.introVideo.nativeElement.play()
        .then(() => {
          this.showPlayButton = false; // Hide play button when video starts
          // console.log('Video started playing');
        })
        .catch(error => {
          console.error('Error playing video:', error);
          // Handle potential autoplay blocking issues here, e.g., show message
        });
    }
  }

  // --- Helper Methods (adapted) ---
  // No longer need getPlayrType as we're only using HTML5 video
  // You still need to ensure course.introVideoUrl is a direct video file path
  // (e.g., .mp4, .webm)
  getMimeType(url: string): string {
    if (url.endsWith('.mp4')) return 'video/mp4';
    if (url.endsWith('.webm')) return 'video/webm';
    if (url.endsWith('.ogg')) return 'video/ogg';
    // Fallback or handle unsupported types as needed
    return 'video/mp4'; // Default
  }

  getTotalLectures(): number {
    return this.course!.sections?.reduce((count, section) => count + section.lectures.length, 0) || 0;
  }

  getTotalDuration(): string {
    if (this.course!.durationHours === undefined || this.course!.durationHours === null) {
      return '0h 0m';
    }
    const hours = Math.floor(this.course!.durationHours);
    const minutes = Math.round((this.course!.durationHours - hours) * 60);
    return `${hours}h ${minutes}m`;
  }
  enroll() : void{
    this.enrollEvent.emit();
  }
}