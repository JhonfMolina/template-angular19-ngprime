import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import ButtonComponent from '../button/button.component';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-table',
  imports: [
    TableModule,
    ButtonComponent,
    CardModule,
    PaginatorModule,
    CommonModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Input() totalRecords: number = 0;
  @Input() first: number = 0;
  @Input() rows: number = 0;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<any>();

  onEdit(rowData: any): void {
    this.edit.emit(rowData);
  }

  onDelete(rowData: any): void {
    this.delete.emit(rowData);
  }

  onPageChange(event: any): void {
    this.pageChange.emit(event);
  }
}
