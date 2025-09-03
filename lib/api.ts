import axios from 'axios';
import { CategoryDetail, ProductDetail  } from './type';
import { redirect } from 'next/navigation';

export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
export const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;

export const api = axios.create({
    baseURL: BASE_URL,
});

export async function getExistingUser(email: string | null | undefined) {
    try {
        const safeEmail = email ? encodeURIComponent(email) : '';
        const response = await api.get(`/existing_user/${safeEmail}/`);
        return response.data;
    } catch (err:unknown) {
        if(err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}



export async function createNewUser(data: {
    email: string | null | undefined;
    username: string | null | undefined;
    first_name: string | null | undefined;
    last_name: string | null | undefined;
    profile_picture_url: string | null | undefined;
}) {
    try {
        const response = await api.post('/create_user/', data);
        return response.data;
    }
    catch (err:unknown) {
        if(err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}


export async function getCategories() {
    try{
        const response = await api.get('category_list');
        return response.data;
    }
    catch (err:unknown) {
        if(err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}


export async function getProducts() {
    try{
        const response = await api.get('product_list');
        return response.data;
    }
    catch (err:unknown) {
        if(err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}

export async function getCategoryDetail(slug: string): Promise<CategoryDetail> {
    try{
        const response = await api.get(`categories/${encodeURIComponent(slug)}/`);
        return response.data as CategoryDetail;
    }
    catch (err:unknown) {
        if(err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}


export async function getProductDetail(slug: string): Promise<ProductDetail> {
    try{
        const response = await api.get(`products/${encodeURIComponent(slug)}/`);
        return response.data as ProductDetail;
    }
    catch (err:unknown) {
        if(err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}


export async function updateReview(reviewId: number, data: { rating?: number; comment?: string }) {
    try {
        const response = await api.put(`update_review/${reviewId}/`, data);
        return response.data;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}

export async function deleteReview(reviewId: number) {
    try {
        const response = await api.delete(`delete_review/${reviewId}/`);
        return response.data;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}

export async function checkProductInCart(cartCode: string, productId: number) {
    if (!cartCode || !productId) {
        throw new Error('Cart code and product ID are required')
    }
    
    try {
        const response = await api.get(`product_in_cart/?cart_code=${cartCode}&product_id=${productId}`);
        return response.data;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}

export async function getCartStats(cartCode: string) {
    if (!cartCode) {
        throw new Error('Cart code is required')
    }
    
    try {
        const response = await api.get(`get_cart_stat/?cart_code=${cartCode}`);
        return response.data;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}

export async function getCart(cart_code: string) {
    try {
        const response = await api.get(`get_cart/${cart_code}/`);
        return response.data;
    } catch (err: unknown) {
        if (err instanceof Error) {
            if(err.message == "Request failed with status code 404") {
                redirect('/cart')
            }
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }   
    
}


export async function productSearch(searchInput: string | null | undefined) {
    if(!searchInput) {
        return [];
    }
    
    try {
        const response = await api.get(`search/?query=${encodeURIComponent(searchInput)}`);
        return response.data;
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
}

export async function initiatePayment(paymentInfo: {email: string | null | undefined, cart_code: string | null }) {
    try {
        const response = await api.post('create_checkout_session/', paymentInfo)
        return response.data;
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
} 


export async function getOrders(email: string | null | undefined) {
    if(email) {
        try {
            const response = await api.get(`get_orders?email=${email}`);
            return response.data;
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error('An unknown error occurred');
        }
    }
    else {
        throw new Error('Email is required');
    }
}



export async function getWishLists(email: string | null | undefined) {
    if(email) {
        try {
            const response = await api.get(`my_wishlists?email=${email}`);
            return response.data;
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error('An unknown error occurred');
        }
    }
    else {
        throw new Error('Email is required');
    }
}


export async function addAddress(addressData: {
    email: string | null | undefined;
    street: string;
    city: string;
    state: string;
    phone: string;
}) {
    if(addressData.email) {
        try {
        const response = await api.post('add_address/', addressData)
        return response.data
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
        throw new Error('An unknown error occurred');
    }
    }
    else {
        throw new Error('Email is required');
    }
}


export async function getAddress(email: string | null | undefined) {
    if(email) {
        try {
            const response = await api.get(`get_address?email=${email}`);
            return response.data;
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error('An unknown error occurred');
        }
    }
    else {
        throw new Error('Email is required');
    }
}