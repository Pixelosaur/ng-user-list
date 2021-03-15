import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { ApiResponse } from './interfaces/api-response.interface';
import { environment } from '../../environments/environment';

describe('Service: UsersService', () => {
    let service: UsersService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UsersService],
        });
        service = TestBed.inject(UsersService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    // getRandomUsers() on subscribe success
    it(`getRandomUsers(): should return the API response object on successful request`, () => {
        const mockApiResponse: ApiResponse = {
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
            ],
        };

        // perform a request
        service.getRandomUsers().subscribe((resp: ApiResponse) => {
            // assert expectations
            expect(resp).toEqual(mockApiResponse);
            expect(resp.results.length).toBe(1);
        });

        // tell the httpMock what kind of request we expect and toward which URL
        const apiRequest = httpMock.expectOne(
            `${environment.apiUrl}?inc=name,email,phone,location,picture&seed=null&page=1&results=51`,
            'call to randomUser API',
        );
        expect(apiRequest.request.method).toBe('GET');

        // fire the request
        apiRequest.flush(mockApiResponse);
    });
    // getRandomUsers() on subscribe error
    it(`getRandomUsers(): should throw an error on failed request`, () => {
        const mockApiResponseError: any = 'Uh oh, something has gone wrong... :(';

        // perform a request
        service.getRandomUsers().subscribe((resp: any) => {
            // assert expectations
            expect(resp).toEqual(mockApiResponseError);
        });

        // tell the httpMock what kind of request we expect and toward which URL
        const apiRequest = httpMock.expectOne(
            `${environment.apiUrl}?inc=name,email,phone,location,picture&seed=null&page=1&results=51`,
            'call to randomUser API',
        );
        expect(apiRequest.request.method).toBe('GET');

        // fire the request
        apiRequest.flush(mockApiResponseError);
    });

    afterEach(() => {
        // verify that there are not outstanding http calls
        httpMock.verify();
    });
});
