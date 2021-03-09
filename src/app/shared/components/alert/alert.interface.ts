export interface Alert {
    message: string;
    type: 'Error' | 'Success' | 'Warning' | 'Info';
}
