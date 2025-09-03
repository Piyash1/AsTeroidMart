"use server"

import { signOut } from "@/auth"
import { api } from "./api";
import { revalidatePath } from "next/cache";

export async function signOutUser() {
    await signOut({redirectTo: "/"})
}


export async function addReview(formData: FormData) {
    const product_id = Number(formData.get("product_id"));
    const email = formData.get("email");
    const rating = Number(formData.get("rating"));
    const comment = formData.get("review");

    const slug = formData.get("slug");

    if(!product_id || !email || !rating || !comment || !slug){
        throw new Error('Missing required fields')
    }

    const reviewObj = {product_id, email, rating, comment};

    try{
        const response = await api.post('add_review/', reviewObj)
        revalidatePath(`/products/${slug}`)
        return response.data
    }catch(err: unknown){
        if(err instanceof Error){
            throw new Error(err.message)
        }
        throw new Error('An unknown error occurred')
    }

    
}


export async function addToCartAction(formData: FormData) {
    const cart_code = formData.get("cart_code");
    const product_id = formData.get("product_id");

    const cartitemObj = {cart_code, product_id};

    try{
        const response = await api.post('add_to_cart/', cartitemObj)
        return response.data
    }catch(err: unknown){
        if(err instanceof Error){
            throw new Error(err.message)
        }
        throw new Error('An unknown error occurred')
    }
}


export async function addToWishlistAction(formData: FormData) {
    const email = formData.get("email");
    const product_id = formData.get("product_id");

    if (!email || !product_id) {
        throw new Error('Email and product ID are required');
    }

    const wishlistObj = {email, product_id};

    try {
        const response = await api.post('add_to_wishlist/', wishlistObj)
        return response.data
    }catch(err: unknown){
        if(err instanceof Error){
            throw new Error(err.message)
        }
        throw new Error('An unknown error occurred')
    }
}


export async function updateCartitemQuantity(formData: FormData) {
    const item_id = formData.get("item_id");
    const quantity = formData.get("quantity");
    const cart_code = formData.get("cart_code");

    // Validate required fields
    if (!item_id || !quantity || !cart_code) {
        throw new Error('Missing required fields: item_id, quantity, and cart_code are required');
    }

    // Validate and convert item_id
    const itemId = Number(item_id);
    if (isNaN(itemId) || itemId <= 0) {
        throw new Error('Invalid item_id: must be a positive number');
    }

    // Validate and convert quantity
    const itemQuantity = Number(quantity);
    if (isNaN(itemQuantity) || itemQuantity <= 0) {
        throw new Error('Invalid quantity: must be a positive number');
    }

    const cartitemObj = {item_id: itemId, quantity: itemQuantity};

    try {
        const response = await api.put('update_cartitem_quantity/', cartitemObj)
        revalidatePath(`/cart/${cart_code}`)
        return response.data;   
    }catch(err: unknown){
        if(err instanceof Error){
            throw new Error(err.message)
        }
        throw new Error('An unknown error occurred')
    }
}

export async function deleteCartItem(formData: FormData) {
    const item_id = formData.get("item_id");
    const cart_code = formData.get("cart_code");

    // Validate required fields
    if (!item_id || !cart_code) {
        throw new Error('Missing required fields: item_id and cart_code are required');
    }

    // Validate and convert item_id
    const itemId = Number(item_id);
    if (isNaN(itemId) || itemId <= 0) {
        throw new Error('Invalid item_id: must be a positive number');
    }

    try {
        const response = await api.delete(`delete_cartitem/${itemId}/`)
        revalidatePath(`/cart/${cart_code}`)
        return response.data;   
    }catch(err: unknown){
        if(err instanceof Error){
            throw new Error(err.message)
        }
        throw new Error('An unknown error occurred')
    }
}