type Location = {
    city: string;
    country: string;
};

type Name = {
    title: string;
    first: string;
    last: string;
};

export interface User {
    email: string;
    location: Location;
    name: Name;
    phone: string;
    picture: string;
}
