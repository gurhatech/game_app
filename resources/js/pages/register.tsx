import Topbar from '@/components/Topbar';
import { Link } from '@inertiajs/react';

export default function Register() {
    return (
        <>
            <Topbar title='Register' redirectUrl='/' />
            <Link href="/">register Page </Link>
        </>
    );
}
