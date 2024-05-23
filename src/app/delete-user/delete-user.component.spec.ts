import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { DeleteUserComponent } from './delete-user.component';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

describe('DeleteUserComponent', () => {
  let component: DeleteUserComponent;
  let fixture: ComponentFixture<DeleteUserComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  const activatedRouteStub = {
    snapshot: {
      paramMap: {
        get: (key: string) => '1'
      }
    }
  };

  beforeEach(waitForAsync(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['deleteUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        MatButtonModule
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
    fixture = TestBed.createComponent(DeleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit(); // Ensure ngOnInit is called to set userId
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userId from route parameters on init', () => {
    expect(component.userId).toBe(1); // Ensure the userId is set correctly
  });

  it('should call deleteUser and navigate to the user list on delete', () => {
    userService.deleteUser.and.returnValue(of(undefined));

    component.deleteUser();

    expect(userService.deleteUser).toHaveBeenCalledWith(1);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should navigate to the user list on cancel', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
