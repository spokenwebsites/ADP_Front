import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() page: number = 0;
  @Input() total: number = 0;
  // On change of the page.
  @Output() change: EventEmitter<Number> = new EventEmitter();

  // How many pages to show on the view.
  @Input() pageLength: number = 20;

  constructor() { }

  ngOnInit(): void {
  }

  rangePages(): number[] {
    const pageNumbers: number[] = [];
    // To keep the current page in the middle of the list of page numbers.
    for (let index = Math.max(0, this.page - (this.pageLength / 2)); index < Math.min(this.total, this.page + (this.pageLength / 2)); index++) {
      pageNumbers.push(index);
    }
    return pageNumbers;
  }

  onFirstPage(): void {
    if (this.page > 0)
      this.change.emit(0);
  }
  onPreviousPage(): void {
    if (this.page > 0)
      this.change.emit(this.page - 1);
  }
  onNextPage(): void {
    if (this.page < this.total - 1)
      this.change.emit(this.page + 1);
  }
  onPageChange(page: number): void {
    if (this.page == page) {
      return;
    }
    this.change.emit(page);
  }
  onLastPage(): void {
    if (this.page < this.total - 1)
      this.change.emit(this.total - 1);
  }
}
