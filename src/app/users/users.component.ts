// Core
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// Services
import { UsersService } from './users.service';
// Theme
import { THEMES } from '../shared/theme';
// Interfaces
import { User } from './interfaces/user.interface';
import { ApiResponse } from './interfaces/api-response.interface';
import { Alert } from '../shared/components/alert/alert.interface';
import { Theme } from '../shared/interfaces/theme.interface';
import { SelectOption } from '../shared/interfaces/select-option.interface';
@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
    // Full list of users
    users: User[] = [];
    // Displayed user cards
    displayedUserCards: User[] = [];
    currentDisplayedCardsIndex: number = 0;
    numberOfDisplayedCards: number = 3;

    pageTitle: string = 'My Clerks';

    isContentLoading: boolean = true;
    isNextButtonDisabled: boolean = false;
    isPrevButtonDisabled: boolean = true;
    // Alert
    alert!: Alert;
    isAlertShowing!: boolean;
    // Theme
    currentTheme!: Theme;
    themeOptions: SelectOption[] = [];

    subscription!: Subscription;

    constructor(private usersService: UsersService) {}

    ngOnInit(): void {
        // hide alert
        this.isAlertShowing = false;
        // set default theme
        this.initializeTheme();
        // fetch users
        this.getRandomUsers();
    }

    initializeTheme(): void {
        let themeNames: string[] = Object.keys(THEMES);
        this.themeOptions = themeNames.map((key: string, index: number) => {
            return {
                id: index,
                name: key,
            };
        });
        this.currentTheme = THEMES[themeNames[0]];
    }

    getRandomUsers(): void {
        this.subscription = this.usersService.getRandomUsers().subscribe(
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
        if (pager === 'next') {
            // Increase the index by 3 which is the number of displayed cards
            this.currentDisplayedCardsIndex += this.numberOfDisplayedCards;
            // Update the displayed cards array
            this.displayedUserCards = this.setDisplayedUserCards(this.users);
        } else if (pager === 'previous' && this.currentDisplayedCardsIndex !== 0) {
            // Decrease the index by 3
            this.currentDisplayedCardsIndex -= this.numberOfDisplayedCards;
            // Update the displayed cards array
            this.displayedUserCards = this.setDisplayedUserCards(this.users);
        }

        this.isNextButtonDisabled =
            this.currentDisplayedCardsIndex >= this.users.length - this.numberOfDisplayedCards;
        this.isPrevButtonDisabled = this.currentDisplayedCardsIndex === 0;
    }

    setTheme(theme: SelectOption) {
        this.currentTheme = THEMES[theme.name];
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
