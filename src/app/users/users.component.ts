// Core
import { Component, OnInit } from '@angular/core';
// Services
import { UsersService } from './users.service';
// Interfaces
import { User } from './interfaces/user.interface';
import { ApiResponse } from './interfaces/api-response.interface';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    users: User[] = [];
    error: string | null = null;

    pageTitle: string = 'My Clerks';

    constructor(private usersService: UsersService) {}

    ngOnInit(): void {
        this.usersService.getRandomUsers().subscribe(
            (data: ApiResponse) => (this.users = data.results),
            (error) => (this.error = error),
        );
    }
}
