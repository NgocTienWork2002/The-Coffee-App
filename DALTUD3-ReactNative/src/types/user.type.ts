export interface User {
    _id: string;
    email: string;
    gender: boolean;
    createdAt: string;
    updatedAt: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
}
export interface Item {
    _id: string;
    name: string;
    quantity: number;
    size: string;
}

export interface ProductCart {
    _id: string;
    name: string;
    option: {
        size: string;
        price: number;
        _id: string;
    }[];
    quantity: number;
    chooseSize: string;
    amount: number;
}

export interface productDetail {
    id: string;
    img: string;
    name: string;
    price: string;
}
export interface size {
    _id: string;
    price: number;
    size: string;
}

export interface OrderType {
    _id: string;
    userId: string;
    paymentMethod: string;
    status: string;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
}
