

import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination', 
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() displayPageCount: number = 9; 

  @Output() pageChange = new EventEmitter<number>();

  
  pagesToDisplay: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generatePagesToDisplay();
  }

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPage'] || changes['totalPages']) {
      this.generatePagesToDisplay();
    }
  }

  
  private generatePagesToDisplay(): void {
    this.pagesToDisplay = [];
    if (this.totalPages <= 1) {
      return; 
    }

    const startPage = Math.max(1, this.currentPage - Math.floor(this.displayPageCount / 2));
    const endPage = Math.min(this.totalPages, startPage + this.displayPageCount - 1);

    for (let i = startPage; i <= endPage; i++) {
      this.pagesToDisplay.push(i);
    }
    
    while (this.pagesToDisplay.length < this.displayPageCount && this.pagesToDisplay[0] > 1) {
        this.pagesToDisplay.unshift(this.pagesToDisplay[0] - 1);
    }
    
    while (this.pagesToDisplay.length < this.displayPageCount && this.pagesToDisplay[this.pagesToDisplay.length - 1] < this.totalPages) {
      this.pagesToDisplay.push(this.pagesToDisplay[this.pagesToDisplay.length - 1] + 1);
    }
    
    if (this.totalPages < this.displayPageCount) {
      this.pagesToDisplay = Array.from({length: this.totalPages}, (_, i) => i + 1);
    }
  }


  
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  
  previous(): void {
    this.goToPage(this.currentPage - 1);
  }

  next(): void {
    this.goToPage(this.currentPage + 1);
  }
}