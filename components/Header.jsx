import React, { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { getCategories } from '../services'

// const categories = [
//     { name: 'Web Development', slug: 'web-dev'},
//     { name: 'React', slug: 'react'}
// ];

const Header = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories().then((newCategories) => {
        setCategories(newCategories);
        })
    }, []);

    return (
        <div className='container mx-auto px-5 md:px-10 2xl:px-28 mb-8'>
            <div className='border-b w-full inline-block border-white py-8'>
                <div className='md:float-left block'>
                    <Link href="/">
                        <span className='cursor-pointer font-bold text-4xl text-white'>
                            {/* Joseph's Blog */}
                            <Image src='/logo.png' width="170" height="30" ></Image>
                        </span>
                    </Link>
                </div>
                <div className='hidden md:float-left md:contents'>
                    { categories.map((category) => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                            <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                                { category.name }
                            </span>
                        </Link>
                    )) }
                </div>
            </div>
        </div>
    )
}

export default Header