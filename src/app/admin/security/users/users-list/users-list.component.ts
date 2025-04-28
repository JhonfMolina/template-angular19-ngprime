import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '@components/table/table.component';
import { Users } from '@interfaces/users.interfaces';
import { ActionButton } from '@interfaces/util/actions.interfaces';
import { PageEvent } from '@interfaces/util/page-event.interfaces';
import { AuthService } from '@services/auth.service';
import { StorageService } from '@services/storage.service';
import { UsersService } from '@services/users.service';
import { Chip } from 'primeng/chip';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-users-list',
  imports: [TableComponent, Chip],
  templateUrl: './users-list.component.html',
})
export default class UsersListComponent {
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  private readonly subscription: Subscription[] = [];

  users: Users[] = [];
  columns: any[] = [];
  actions: ActionButton[] = [
    {
      icon: 'bx bx-edit',
      color: 'success',
      permission: 'usuarios.editar',
      callback: (row: any) => this.onEdit(row),
    },
    {
      icon: 'bx bx-trash',
      color: 'danger',
      permission: 'usuarios.eliminar',
      callback: (row: any) => this.onDelete(row),
    },
  ];

  totalRecords: number = 0;
  first: number = 0;
  rows: number = 15;
  page: number = 1;

  constructor(
    private readonly _usersService: UsersService,
    private readonly _storageService: StorageService,
    private readonly cdr: ChangeDetectorRef,
    private readonly _router: Router
  ) {}

  onNavigate() {
    this._router.navigate(['admin/security/users/users-create']);
  }

  onEdit(rowData: any): void {
    this._router.navigate(['admin/security/users/users-update', rowData.id]);
  }

  onDelete(rowData: any): void {
    console.log('Delete:', rowData);
  }

  onPageChange(event: PageEvent): void {
    this.page = event.page + 1;
    this.rows = event.rows;
    this.getList();
  }

  getList() {
    const params = {
      ma_entidad_id: this._storageService.getEntityStorage.id,
      estados: ['activo', 'inactivo'],
      per_page: this.rows,
      page: this.page,
    };
    this.subscription.push(
      this._usersService.getlist(params).subscribe((res) => {
        if (res) {
          console.log(res);

          this.users = res.data.data;
          this.totalRecords = res.data.total;
        }
      })
    );
  }

  ngOnInit() {
    this.getList();
  }

  ngAfterViewInit() {
    this.columns = [
      { field: 'name', header: 'Nombre' },
      { field: 'identificacion', header: 'Identificación' },
      { field: 'email', header: 'Correo' },
      {
        field: 'status',
        header: 'Estado',
        template: this.statusTemplate,
      },
    ];
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}
