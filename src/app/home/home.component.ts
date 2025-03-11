import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { RouterModule } from '@angular/router';
import ButtonComponent from '../shared/components/button/button.component';
import { TableComponent } from '../shared/components/table/table.component';
import { DataService } from '../core/services/util/data.service';
import { ToastModule } from 'primeng/toast';
import { NotificationService } from '../core/services/util/notificacion.service';
import { DynamicFormComponent } from '../shared/components/dynamic-form/dynamic-form.component';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-home',
  imports: [
    Toolbar,
    AvatarModule,
    ButtonModule,
    RouterModule,
    ButtonComponent,
    TableComponent,
    ToastModule,
    DynamicFormComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  users: any[] = [];

  columns: any[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'status', header: 'Status' },
    { field: 'gender', header: 'Gender' },
  ];

  formConfig: any[] = [
    {
      type: 'text',
      icon: 'user',
      name: 'username',
      label: 'Username',
      on_label: 'Username',
      size: 'small',
      placeholder: '',
      validators: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      column: 'col-12 md:col-2',
      styleClass: 'mb-5',
    },
    // {
    //   type: 'email',
    //   name: 'email',
    //   label: 'Email',
    //   on_label: 'Username',
    //   size: 'small',
    //   placeholder: '',
    //   validators: {
    //     required: true,
    //     email: true,
    //   },
    // },
    // {
    //   type: 'password',
    //   name: 'password',
    //   label: 'Password',
    //   on_label: 'Username',
    //   size: 'small',
    //   placeholder: '',
    //   validators: {
    //     required: true,
    //     minLength: 6,
    //   },
    // },
    // {
    //   type: 'textarea',
    //   name: 'bio',
    //   label: 'Bio',
    //   on_label: 'Username',
    //   size: 'small',
    //   placeholder: '',
    //   validators: {
    //     maxLength: 200,
    //   },
    // },
    // {
    //   type: 'select',
    //   name: 'gender',
    //   label: 'Gender',
    //   on_label: 'Username',
    //   size: 'small',
    //   options: [
    //     { label: 'Male', value: 'male' },
    //     { label: 'Female', value: 'female' },
    //     { label: 'Other', value: 'other' },
    //   ],
    //   validators: {
    //     required: true,
    //   },
    // },
  ];

  totalRecords: number = 0;
  first: number = 0;
  rows: number = 20;
  page: number = 1;

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService
  ) {}

  onEdit(rowData: any): void {
    console.log('Edit:', rowData);
  }

  onDelete(rowData: any): void {
    console.log('Delete:', rowData);
  }

  onPageChange(event: PageEvent): void {
    this.page = event.page + 1;
    this.rows = event.rows;
    this.loadUsers();
  }

  loadUsers(): void {
    this.dataService.getUsers(this.page, this.rows).subscribe((data) => {
      this.users = data.results;
      this.totalRecords = data.info.count;
      this.notificationService.showSuccess(
        'The query has been successfully executed!',
        `We found ${data.results.length} results.`
      );
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  sid = 'existe';
  holaMundo() {
    console.log('holaMundo');
  }

  showSuccess(): void {
    this.notificationService.showSuccess('Code 200', 'Content create success.');
  }

  showError(): void {
    this.notificationService.showError('Error', 'Message Content');
  }

  showInfo(): void {
    this.notificationService.showInfo('Info', 'Message Content');
  }

  showWarn(): void {
    this.notificationService.showWarn('Warning', 'Message Content');
  }
}
