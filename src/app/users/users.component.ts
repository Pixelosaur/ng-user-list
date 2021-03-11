// Core
import { Component, OnInit } from '@angular/core';
// Services
import { UsersService } from './users.service';
// Interfaces
import { User } from './interfaces/user.interface';
import { ApiResponse } from './interfaces/api-response.interface';
import { Alert } from '../shared/components/alert/alert.interface';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    users: User[] = [];

    pageTitle: string = 'My Clerks';
    isContentLoading!: boolean;

    alert!: Alert;
    isAlertShowing!: boolean;

    constructor(private usersService: UsersService) {}

    ngOnInit(): void {
        this.isContentLoading = true;
        // hide alert
        this.isAlertShowing = false;

        this.getRandomUsers();
    }

    getRandomUsers(): void {
        this.usersService.getRandomUsers().subscribe(
            (data: ApiResponse) => {
                this.users = data.results;

                // reset the page loader
                this.isContentLoading = false;
            },
            (error: any) => {
                this.alert = {
                    message: error,
                    type: 'Error',
                };
            },
        );
    }

    onPageChange(pager: string): void {
        console.log(pager);
    }
}
