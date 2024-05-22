import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { DeleteUserComponent } from './delete-user.component';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { provideRouter } from '@angular/router';

describe('DeleteUserComponent', () => {
  let component: DeleteUserComponent;
  let fixture: ComponentFixture<DeleteUserComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(waitForAsync(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['deleteUser']);
    const activatedRouteStub = { snapshot: { paramMap: { get: (key: string) => '1' } } };

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
      ],
      declarations: [DeleteUserComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        provideRouter([])
      ],
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userId from route parameters on init', () => {
    expect(component.userId).toBe(1);
  });

  it('should call deleteUser and navigate to the user list on delete', () => {
    userService.deleteUser.and.returnValue(of(undefined));
    spyOn(router, 'navigate');

    component.deleteUser();
    expect(userService.deleteUser).toHaveBeenCalledWith(1);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should navigate to the user list on cancel', () => {
    spyOn(router, 'navigate');
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
