import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { UpdateUserComponent } from './update-user.component';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UpdateUserComponent', () => {
  let component: UpdateUserComponent;
  let fixture: ComponentFixture<UpdateUserComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  const activatedRouteStub = {
    snapshot: {
      paramMap: {
        get: (key: string) => '1'
      }
    }
  };

  const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };

  beforeEach(waitForAsync(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUser', 'updateUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIcon,
        BrowserAnimationsModule
      ],
      declarations: [],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserComponent);
    component = fixture.componentInstance;
    userService.getUser.and.returnValue(of(mockUser));
    fixture.detectChanges();
    component.ngOnInit(); // Ensure ngOnInit is called to set user
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user from route parameters on init', () => {
    expect(component.user.id).toBe(1); // Ensure the user id is set correctly
    expect(component.user.name).toBe('Test User');
    expect(component.user.email).toBe('test@example.com');
  });

  it('should call updateUser and navigate to the user list on update', () => {
    userService.updateUser.and.returnValue(of(mockUser));

    component.updateUser();

    expect(userService.updateUser).toHaveBeenCalledWith(1, mockUser);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should navigate to the user list on goBack', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
