'use client'

import { scrapeAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'

const isValidAmazonProductURL = (url: string) => {
    try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;

        if (hostname.includes('amazon.com') ||
            hostname.includes('amazon.') ||
            hostname.endsWith('amazon')
        ) {
            return true;
        }

    } catch (error) {

    }

    return false;
}


const Searchbar = () => {
    const [searchPromt, setSearchPromt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValidLink = isValidAmazonProductURL(searchPromt);  // use function on searchPromt

        if (!isValidLink) return alert('Please provide a valid Amazon link')

        try {
            setIsLoading(true);

            const product = await scrapeAndStoreProduct(searchPromt);

        } catch (error) {
            console.log(error);

        } finally {
           setIsLoading(false);
        }
    }

    return (
        <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
            <input
                type='text'
                value={searchPromt}
                onChange={(e) => setSearchPromt(e.target.value)}    // track input value in searchbar
                placeholder='Enter product link'
                className='searchbar-input'

            />

            <button type='submit' className='searchbar-btn' disabled={searchPromt === ''}>
                {isLoading ? 'Searching...' : 'Search'}
            </button>
        </form>
    )
}

export default Searchbar