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
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { DynamicForm } from '../core/interfaces/util/dynamic-form.interface';
import { CardModule } from 'primeng/card';
import { SkeletonComponent } from '../shared/components/skeleton/skeleton.component';

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
    FormsModule,
    SelectModule,
    CardModule,
    SkeletonComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  users: any[] = [];

  toggle = false;

  columns: any[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'status', header: 'Status' },
    { field: 'gender', header: 'Gender' },
  ];

  formConfig: DynamicForm[] = [
    {
      type: 'text',
      icon: 'id-card',
      name: 'id',
      label: 'ID',
      on_label: 'id',
      placeholder: '',
      validators: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      column: 'col-12 md:col-2 lg:col-12',
    },
    {
      type: 'text',
      icon: 'user',
      name: 'username',
      label: 'Username',
      on_label: 'Username',
      placeholder: '',
      validators: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      column: 'col-12 md:col-4 lg:col-12',
    },
    {
      type: 'email',
      icon: 'envelope',
      name: 'email',
      label: 'Email',
      on_label: 'Email',
      placeholder: '',
      validators: {
        required: true,
        email: true,
      },
      column: 'col-12 md:col-4 lg:col-12',
    },
    {
      type: 'password',
      icon: 'key',
      name: 'password',
      label: 'Password',
      on_label: 'password',
      placeholder: '',
      validators: {
        required: true,
        minLength: 6,
      },
      column: 'col-12 md:col-2 lg:col-12',
    },
    {
      type: 'select',
      name: 'country',
      label: 'Country',
      on_label: 'country',
      placeholder: '',
      filter: true,
      filterBy: 'name',
      showClear: true,
      options: [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' },
      ],
      selectedItems: [],
      validators: {
        required: true,
      },
      column: 'col-12 md:col-4 lg:col-12',
    },
    {
      type: 'textarea',
      name: 'bio',
      label: 'bio',
      on_label: 'bio',
      placeholder: '',
      validators: {
        maxLength: 200,
      },
      column: 'col-12 md:col-8 lg:col-12',
    },
  ];

  totalRecords: number = 0;
  first: number = 0;
  rows: number = 20;
  page: number = 1;

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService
  ) {}

  toogleDarkMode(): void {
    this.toggle = !this.toggle;
    const element = document.querySelector('html');
    if (this.toggle) {
      element!.classList.add('my-app-dark');
      localStorage.setItem('theme', 'dark');
    } else {
      element!.classList.remove('my-app-dark');
      localStorage.setItem('theme', 'light');
    }
  }

  onEdit(rowData: any): void {
    console.log('Edit:', rowData);
  }

  onDelete(rowData: any): void {
    console.log('Delete:', rowData);
  }

  onPageChange(event: PageEvent): void {
    this.page = event.page + 1;
    this.rows = event.rows;
    this.getList();
  }

  getList(): void {
    this.dataService.getList(this.page, this.rows).subscribe((data) => {
      this.users = data.results;
      this.totalRecords = data.info.count;
      this.notificationService.showSuccess(
        'The query has been successfully executed!',
        `We found ${data.results.length} results.`
      );
    });
  }

  get(filterValue?: string): void {
    if (filterValue) {
      this.dataService.getId(filterValue, 'Alive').subscribe((data) => {
        console.log(filterValue);
        if (data && data.results) {
          this.users = data.results;
        } else {
          this.getList();
        }
      });
    }
  }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.toggle = true;
      document.querySelector('html')!.classList.add('my-app-dark');
    }
    this.getList();
  }

  post(dataForm: any): void {
    console.log(dataForm);
  }
}
