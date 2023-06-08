import Link from 'next/link'

export default function Navbar() {
    return (
        <div className='flex sm:justify-center lg:justify-end align-middle p-7 gap-4 border bg-slate-700'>
            <Link href="/">
                Home
            </Link>
            <Link href="/welcome">
                Welcome
            </Link>
            <Link href="/users">
                Profile
            </Link>
        </div>
    )
}