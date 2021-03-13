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
    // Full list of users
    users: User[] = [];
    // Displayed user cards
    displayedUserCards: User[] = [];
    currentDisplayedCardsIndex: number = 0;
    numberOfDisplayedCards: number = 3;

    pageTitle: string = 'My Clerks';
    isContentLoading!: boolean;

    alert!: Alert;
    isAlertShowing!: boolean;

    constructor(private usersService: UsersService) {}

    ngOnInit(): void {
        // hide alert
        this.isAlertShowing = false;

        this.getRandomUsers();
    }

    getRandomUsers(): void {
        this.usersService.getRandomUsers().subscribe(
            (data: ApiResponse) => {
                this.isContentLoading = true;

                this.users = data.results;
                this.displayedUserCards = this.setDisplayedUserCards(this.users);

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

    /* return the selected portion of the users list */
    setDisplayedUserCards(users: User[]): User[] {
        return users.slice(
            this.currentDisplayedCardsIndex,
            this.numberOfDisplayedCards + this.currentDisplayedCardsIndex,
        );
    }

    onPageChange(pager: string): void {
        console.log(pager);
    }
}
