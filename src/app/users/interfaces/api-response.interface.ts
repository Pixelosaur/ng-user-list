import { User } from './user.interface';

type ResponseInfo = {
    seed: string;
    results: number;
    page: number;
};

export interface ApiResponse {
    info: ResponseInfo;
    results: User[];
}
