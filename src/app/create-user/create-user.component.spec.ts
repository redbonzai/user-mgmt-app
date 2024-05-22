import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { CreateUserComponent } from './create-user.component';
import { UserService, User } from '../services/user.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  const mockUser: User = { id: 1, name: 'Test User', email: 'test@example.com' };

  beforeEach(waitForAsync(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['createUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      declarations: [],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form that is invalid when required fields are empty', waitForAsync(() => {
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement as HTMLElement;
      const submitButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;

      // Simulate form being invalid
      component.userForm.controls['name'].setValue('');
      component.userForm.controls['email'].setValue('');
      component.userForm.controls['name'].markAsTouched();
      component.userForm.controls['email'].markAsTouched();
      fixture.detectChanges();

      // Check if the form is invalid
      expect(component.userForm.invalid).toBeTrue();

      // Check if the submit button is disabled
      expect(submitButton.disabled).toBeTrue();

      // Simulate form being valid
      component.userForm.controls['name'].setValue('Test User');
      component.userForm.controls['email'].setValue('test@example.com');
      fixture.detectChanges();

      // Check if the form is valid
      expect(component.userForm.valid).toBeTrue();

      // Check if the submit button is enabled
      expect(submitButton.disabled).toBeFalse();
    });
  }));

  it('should call createUser and navigate to the user list on success', () => {
    userService.createUser.and.returnValue(of(mockUser));
    spyOn(component, 'createUser').and.callThrough();

    component.user.name = 'Test User';
    component.user.email = 'test@example.com';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    submitButton.click();

    expect(component.createUser).toHaveBeenCalled();
    expect(userService.createUser).toHaveBeenCalledWith(component.user);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
