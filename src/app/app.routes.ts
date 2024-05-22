import { Route } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';

export const routes: Route[] = [
  { path: '', component: UserListComponent },
  { path: 'create', component: CreateUserComponent },
  { path: 'update/:id', component: UpdateUserComponent },
  { path: 'delete/:id', component: DeleteUserComponent },
];
