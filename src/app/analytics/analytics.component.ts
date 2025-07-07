import { Component, ViewChild, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../interfaces/iCourse';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from "ng-apexcharts";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexMarkers,
  ApexYAxis,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from "ng-apexcharts";
import { RouterLink, RouterOutlet } from '@angular/router';

// Define the ChartOptions type to be strictly enforced
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis : ApexYAxis,
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  markers: ApexMarkers;
};
export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  colors: string[];
  dataLabels: ApexDataLabels; 
};
@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, RouterOutlet, RouterLink],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements OnInit { // Implement OnInit
  @ViewChild("chart") chart!: ChartComponent; // Definite assignment assertion
  progressChatView = "";
  // Declare chartOptions with the strict ChartOptions type
  public chartOptions!: ChartOptions;
  @ViewChild("coursePieChart") coursePieChart!: ChartComponent;
  public coursePieChartOptions!: Partial<PieChartOptions>;
  showFavCustomize = true;


  courses: Course[] = [];

  constructor(private courseService: CourseService) {
    // Initialize chartOptions with all required properties in the constructor
    
  }

  ngOnInit(): void {
    this.fetchCourses();
    this.drawProgressChart();
    this.drawCoursesPieChart();
  }

  drawProgressChart(view = "weekly") : void {
    if(view === this.progressChatView) return;
    if(view == "weekly"){
    this.chartOptions = {
      series: [
        {
          name: "",
          data: [10, 41, 35, 51, 69, 91, 148]
        }
      ],
      chart: {
        height: 280,
        type: "line",
        fontFamily : "Manrope",
        zoom: {
          enabled: false
        },
        toolbar: { 
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
       stroke: {
        curve: "straight",
        width: 1,
        colors : ["#7337FF"]
      },
      title: {
        text: "",
        align: "left"
      },
      grid: {
        row: {
          colors: ["transparent", "transparent"], 
          opacity: 1
        },
      },
      xaxis: {
        categories: [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        labels: { 
          style: {
            fontFamily : "Manrope",
            fontSize : "14px",
            fontWeight : "700"
          }
        }
      },
      yaxis: { 
        labels: { 
          style: {
            fontWeight: '700',
            fontFamily : "Manrope",
            fontSize : "14px"
          }
        }
      },
       markers: { 
        size: 5, 
        colors: ['#fff' ], 
        strokeColors: '#7337FF', 
        strokeWidth: 4, 
        hover: {
          size: 7, 
        }
      }
    };
    }
    if(view == "monthly"){
    this.chartOptions = {
      series: [
        {
          name: "",
          data: [60, 41, 35, 51, 69, 91, 148, 12, 100, 10, 90, 43]
        }
      ],
       chart: {
        height: 280,
        type: "line",
        fontFamily : "Manrope",
        zoom: {
          enabled: false
        },
        toolbar: { 
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
       stroke: {
        curve: "straight",
        width: 1,
        colors : ["#7337FF"]
      },
      title: {
        text: "",
        align: "left"
      },
      grid: {
        row: {
          colors: ["transparent", "transparent"], 
          opacity: 1
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: { 
          style: {
            fontFamily : "Manrope",
            fontSize : "14px",
            fontWeight : "700" 
          }
        }
      },
      yaxis: { 
        labels: { 
          style: {
            fontFamily : "Manrope",
            fontSize : "14px",
            fontWeight : "700"
          }
        }
      },
        markers: { 
        size: 5, 
        colors: ['#fff' ], 
        strokeColors: '#7337FF', 
        strokeWidth: 4, 
        hover: {
          size: 7, 
        }
      }

    };
    }
    this.progressChatView = view;
  }

  drawCoursesPieChart() : void {
    this.coursePieChartOptions = {
      series: [44, 55],
      chart: {
        type: "donut",
        width : 180
      },
      labels: ["Complete", "Incompleted"],
      colors: ["#253C91", "#E3D7FF"], 
      legend: {
        show: false
      },
       dataLabels: { 
        enabled: false
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 180
            }
          }
        }
      ]
    };
  }
   fetchCourses() : void {
    this.courseService.getAssignedCourses(10)
     .subscribe({
        next: (response) => {
          console.log(response);
          this.courses = response;
        },
        error: (error) => {
        }
      });
  }

  toggeleFavCustomize() {
    this.showFavCustomize = !this.showFavCustomize;
  }

  hideFavCustomize() {
    this.showFavCustomize = false;
  }
}
