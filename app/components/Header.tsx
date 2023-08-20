'use client';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

const headerLinks = [
    { id: 1, title: 'Home', href: '/', },
    { id: 1, title: 'Blog', href: '/blog', },
    { id: 1, title: 'About', href: '/about', },

];

const Header = () => {
    const pathname = usePathname();

    const links = [
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blog' },
        { name: 'About', href: '/about' },

    ];

    return (
        <header>
            {links.map((link, i) => {
                const isActive = pathname === link.href;

                return (
                    <Link
                        className={isActive ? 'active-link' : ''}
                        href={link.href}
                        key={link.name}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </header>
    );
};

export default Header;