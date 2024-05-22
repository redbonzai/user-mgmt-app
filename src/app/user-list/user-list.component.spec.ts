import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService, User } from '../services/user.service';
import { UserListComponent } from './user-list.component';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;

  const mockUsers: User[] = [
    { id: 1, name: 'User1', email: 'user1@example.com' },
    { id: 2, name: 'User2', email: 'user2@example.com' }
  ];

  beforeEach(waitForAsync(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers', 'deleteUser']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatTableModule,
        MatButtonModule,
        CommonModule,
      ],
      declarations: [],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        provideRouter([]),
      ],
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display users on init', () => {
    // Arrange
    userService.getUsers.and.returnValue(of(mockUsers));

    // Act
    component.ngOnInit();
    fixture.detectChanges();

    // Assert
    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.users.length).toBe(2);
    expect(component.users).toEqual(mockUsers);

    const rows = fixture.debugElement.queryAll(By.css('tr.mat-row'));
    console.log('ROWS: ', rows);
    expect(rows.length).toBe(2);
    expect(rows[0].nativeElement.textContent).toContain('User1');
    expect(rows[1].nativeElement.textContent).toContain('User2');
  });

  it('should delete a user', () => {
    // Arrange
    component.users = [...mockUsers];
    userService.deleteUser.and.returnValue(of(undefined));

    // Act
    component.deleteUser(1);
    fixture.detectChanges();

    // Assert
    expect(userService.deleteUser).toHaveBeenCalledWith(1);
    expect(component.users.length).toBe(1);
    expect(component.users[0].id).toBe(2);
  });
});
