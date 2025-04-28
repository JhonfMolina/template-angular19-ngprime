import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFormComponent } from '@components/dynamic-form/dynamic-form.component';
import { Users } from '@interfaces/users.interfaces';
import { ActionButton } from '@interfaces/util/actions.interfaces';
import { DynamicForm } from '@interfaces/util/dynamic-form.interface';
import { RolesService } from '@services/roles.service';
import { UsersService } from '@services/users.service';
import { LoadingService } from '@services/util/loading.service';
import { NotificationService } from '@services/util/notificacion.service';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs/internal/Subscription';
import { StorageService } from '@services/storage.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-users-create',
  imports: [DynamicFormComponent, CardModule, ButtonModule],
  templateUrl: './users-create.component.html',
})
export default class UsersCreateComponent {
  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;
  private readonly subscription: Subscription[] = [];

  formActionButton: ActionButton[] = [
    {
      label: 'Guardar',
      icon: 'save bx-sm',
      visible: true,
      width: 'w-full',
      color: 'primary',
      disabled: false,
      loading: false,
      permission: 'usuarios.crear',
      callback: (e: any) => {
        this.post(e);
      },
    },
  ];

  formConfig: DynamicForm[] = [
    {
      type: 'email',
      icon: 'envelope',
      name: 'email',
      label: 'Correo',
      on_label: 'email',
      placeholder: '',
      validators: {
        required: true,
        email: true,
      },
      column: 'col-12 md:col-6 lg:col-4',
    },
    {
      type: 'password',
      icon: 'lock',
      name: 'password',
      label: 'Clave',
      on_label: 'password',
      placeholder: '',
      validators: {
        required: true,
        minLength: 8,
      },
      column: 'col-12 md:col-6 lg:col-4',
    },
    {
      type: 'password',
      icon: 'lock',
      name: 'password_confirmation',
      label: 'Confirmar Clave',
      on_label: 'password_confirmation',
      placeholder: '',
      validators: {
        required: true,
        minLength: 8,
      },
      column: 'col-12 md:col-6 lg:col-4',
    },
    {
      type: 'number',
      icon: 'id-card',
      name: 'identificacion',
      label: 'identificacion',
      on_label: 'identificacion',
      placeholder: '',
      validators: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      column: 'col-12 md:col-6 lg:col-4',
    },
    {
      type: 'text',
      icon: 'user',
      name: 'name',
      label: 'Nombre',
      on_label: 'name',
      placeholder: '',
      validators: {
        required: true,
        minLength: 3,
        maxLength: 150,
      },
      column: 'col-12 md:col-6 lg:col-4',
    },
    {
      type: 'multiselect',
      name: 'acl_roles',
      label: 'Role',
      on_label: 'acl_roles',
      placeholder: '',
      filter: true,
      filterBy: 'nombre',
      showClear: true,
      options: [],
      selectedItems: [],
      validators: {
        required: true,
      },
      column: 'col-12 md:col-6 lg:col-4',
    },
  ];

  constructor(
    private readonly _notificationService: NotificationService,
    private readonly _usersService: UsersService,
    private readonly _rolesService: RolesService,
    private readonly _loadingService: LoadingService,
    private readonly _storageService: StorageService,
    private readonly _router: Router
  ) {}

  goToReturnUrl(): void {
    this._router.navigate(['admin/security/users']);
  }

  getListadoRoles(): void {
    this._rolesService
      .getlist({
        estados: ['activo'],
        ma_entidad_id: this._storageService.getEntityStorage.id!,
      })
      .subscribe((response) => {
        this.formConfig.find((field) => field.name === 'acl_roles')!.options =
          response.data.data;
      });
  }

  post(data: any): void {
    const usuario: Users = {
      ...data,
      ma_entidad_id: this._storageService.getEntityStorage.id!.toString(),
      acl_roles: this.formConfig
        .find((field) => field.name === 'acl_roles')!
        .selectedItems?.map((rol: any) => rol.id),
    };
    this.subscription.push(
      this._usersService.post(usuario).subscribe((res) => {
        this._notificationService.showSuccess(res.message);
        console.log(usuario);
        setTimeout(() => {
          this._notificationService.confirmation({
            message: '¿Desea crear otro usuario?',
            accept: () => {
              this.dynamicFormComponent.resetForm();
            },
            reject: () => {
              this.goToReturnUrl();
            },
          });
        }, 2000);
      })
    );
  }

  ngOnInit(): void {
    this._loadingService.loading$.subscribe((loading) => {
      this.formActionButton.find((btn) => btn.label === 'Guardar')!.loading =
        loading;
    });
    this.getListadoRoles();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}
