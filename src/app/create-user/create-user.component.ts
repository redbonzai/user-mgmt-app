import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  user: User = { id: 0, name: '', email: '' };

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  createUser(): void {
    this.userService.createUser(this.user).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
