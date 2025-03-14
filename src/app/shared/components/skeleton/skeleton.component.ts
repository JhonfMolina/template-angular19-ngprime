import { Component, Input } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  imports: [Skeleton, TableModule, CardModule, CommonModule],
  templateUrl: './skeleton.component.html',
})
export class SkeletonComponent {
  @Input() type!: 'form' | 'card' | 'table' | 'list';
  @Input() dataRows: any[] = [];
  @Input() columns: any[] = [];

  ngOnInit() {
    this.dataRows = Array.from({ length: 7 }).map((_, i) => `Item #${i}`);
  }
}
