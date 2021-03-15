import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { UserCardComponent } from './components/user-card/user-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [UsersComponent, UserCardComponent],
    imports: [CommonModule, HttpClientModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class UsersModule {}
