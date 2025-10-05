import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import NavItems from './NavItems'

const Header = () => {
    return (
        <header className='header sticky top-0'><div className='container header-wrapper'>
            <Link href='/'>
                <Image src='/assets/icons/logo.svg' alt='Signalist' width={140} height={32}
                    className='h-8 w-auto cursor-pointer' />
            </Link>
            <nav className='hidden sm:block'>
                <NavItems />
            </nav>
        </div></header>
    )
}

export default Header