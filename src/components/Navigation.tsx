'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
    label: string;
    href: string;
}

interface NavigationProps {
    navLinks: NavLink[];
}


const Navigation: React.FC<NavigationProps> = ({ navLinks }) => {
    const pathname = usePathname();

    return (
        <>
            {navLinks.map(link => {
                const isActive = pathname === link.href;

                return (
                    <Link
                        key={link.label}
                        href={link.href}
                        className={isActive ? "active" : ""}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </>
    );
};

export default Navigation;
