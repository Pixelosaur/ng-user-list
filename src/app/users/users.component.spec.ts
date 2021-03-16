// Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
// RxJS
import { of, throwError } from 'rxjs';
// Components -  Services
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
// Interfaces
import { ApiResponse } from './interfaces/api-response.interface';
import { User } from './interfaces/user.interface';
import { Alert } from '../shared/components/alert/alert.interface';

describe('UsersComponent', () => {
    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;
    let usersServiceSpy: UsersService;

    beforeEach(async () => {
        usersServiceSpy = jasmine.createSpyObj('UsersService', ['getRandomUsers']);

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [UsersComponent],
            providers: [
                {
                    provide: UsersService,
                    useValue: usersServiceSpy,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // getRandomUsers() on subscribe success
    it(`getRandomUsers(): should update users array with the response and the displayedUserCards array by calling the "setDisplayedUserCards" once on subscribe success`, async () => {
        const mockServerResponse: ApiResponse = {
            info: {
                seed: 'foo',
                results: 1,
                page: 1,
            },
            results: [
                {
                    email: 'jane@doe.com',
                    location: {
                        city: 'London',
                        country: 'United Kingdom',
                    },
                    name: {
                        title: 'Ms.',
                        first: 'Jane',
                        last: 'Doe',
                    },
                    phone: '+44 12345 678',
                    picture: {
                        medium: 'http://my-pic.com',
                    },
                },
                {
                    email: 'paul@doe.com',
                    location: {
                        city: 'Athens',
                        country: 'Greece',
                    },
                    name: {
                        title: 'Mr.',
                        first: 'Paul',
                        last: 'Doe',
                    },
                    phone: '+44 12345 678',
                    picture: {
                        medium: 'http://my-pic.com',
                    },
                },
                {
                    email: 'sarah@doe.com',
                    location: {
                        city: 'Paris',
                        country: 'France',
                    },
                    name: {
                        title: 'Ms.',
                        first: 'Sarah',
                        last: 'Doe',
                    },
                    phone: '+44 12345 678',
                    picture: {
                        medium: 'http://my-pic.com',
                    },
                },
                {
                    email: 'tom@doe.com',
                    location: {
                        city: 'London',
                        country: 'United Kingdom',
                    },
                    name: {
                        title: 'Mr.',
                        first: 'Tom',
                        last: 'Doe',
                    },
                    phone: '+44 12345 678',
                    picture: {
                        medium: 'http://my-pic.com',
                    },
                },
                {
                    email: 'john@doe.com',
                    location: {
                        city: 'Berlin',
                        country: 'Germany',
                    },
                    name: {
                        title: 'Mr.',
                        first: 'John',
                        last: 'Doe',
                    },
                    phone: '+44 12345 678',
                    picture: {
                        medium: 'http://my-pic.com',
                    },
                },
                {
                    email: 'helen@doe.com',
                    location: {
                        city: 'Madrid',
                        country: 'Spain',
                    },
                    name: {
                        title: 'Ms.',
                        first: 'Helen',
                        last: 'Doe',
                    },
                    phone: '+44 12345 678',
                    picture: {
                        medium: 'http://my-pic.com',
                    },
                },
            ],
        };
        const displayedUserCards: User[] = mockServerResponse.results.slice(0, 3);

        // call userService and return mock value
        (usersServiceSpy.getRandomUsers as jasmine.Spy).and.returnValue(of(mockServerResponse));
        // spy on component's setDisplayedUserCards method
        spyOn(component, 'setDisplayedUserCards').and.returnValue(displayedUserCards);
        // call component's getRandomUsers()
        const getRandomUsersCall = component.getRandomUsers();

        // expectations
        expect(getRandomUsersCall).toBeUndefined();
        expect(usersServiceSpy.getRandomUsers).toHaveBeenCalled();
        expect(component.setDisplayedUserCards).toHaveBeenCalledOnceWith(
            mockServerResponse.results,
        );
        expect(component.users).toBe(mockServerResponse.results);
        expect(component.displayedUserCards).toBe(displayedUserCards);
        expect(component.isContentLoading).toBe(false);
        expect(component.alert).toBeUndefined();
        expect(component.isAlertShowing).toBe(false);
    });

    // getRandomUsers() on subscribe error
    it(`getRandomUsers(): should display an alert with the response error on subscribe error`, async () => {
        const errorResponse: string = 'Uh oh, something has gone wrong...';
        const alert: Alert = {
            type: 'Error',
            message: errorResponse,
        };

        // call userService and return error
        (usersServiceSpy.getRandomUsers as jasmine.Spy).and.returnValue(throwError(errorResponse));
        // spy on component's setDisplayedUserCards method
        spyOn(component, 'setDisplayedUserCards').and.returnValue([]);
        // call component's getRandomUsers()
        const getRandomUsersCall = component.getRandomUsers();

        // expectations
        expect(getRandomUsersCall).toBeUndefined();
        expect(usersServiceSpy.getRandomUsers).toHaveBeenCalled();
        expect(component.setDisplayedUserCards).toHaveBeenCalledTimes(0);
        expect(component.users).toEqual([]);
        expect(component.displayedUserCards).toEqual([]);
        expect(component.alert).toEqual(alert);
        expect(component.isAlertShowing).toBe(true);
        expect(component.isContentLoading).toBe(false);
    });
});
