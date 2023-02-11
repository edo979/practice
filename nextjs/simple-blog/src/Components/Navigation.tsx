'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Navigation() {
  const [collapseToggle, setCollapseToggle] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <nav
      className="border-gray-200 px-2 sm:px-4 py-2.5 rounded bg-gray-900"
      onClick={() => {
        collapseToggle && setCollapseToggle(false)
      }}
    >
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center">
          <img
            src="/images/logo.png"
            className="h-6 mr-3 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            Simple Blog
          </span>
        </Link>
        <button
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={collapseToggle ? 'true' : 'false'}
          onClick={() => setCollapseToggle((old) => !old)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={classNames('w-full md:block md:w-auto', {
            hidden: !collapseToggle,
          })}
          id="navbar-default"
        >
          <ul className="flex flex-col gap-2 p-2 px-4 mt-4 border border-gray-700 rounded-lg bg-gray-800 md:p-2 md:flex-row md:items-baseline md:gap-10 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent">
            <li>
              <Link
                href="/"
                className={classNames('navlink', { active: pathname === '/' })}
                aria-current={pathname === '/' ? 'page' : 'false'}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className={classNames('navlink', {
                  active: pathname?.includes('/dashboard'),
                })}
                aria-current={
                  pathname?.includes('/dashboard') ? 'page' : 'false'
                }
              >
                Dashboard
              </Link>
            </li>
            <li>
              {session?.user?.name ? (
                <button
                  className="btn btn-warning btn-sm my-2 md:m-0"
                  onClick={() => signOut()}
                  disabled={pathname?.includes('/login')}
                >
                  Sign Out
                </button>
              ) : (
                <button
                  className="btn btn-warning btn-sm my-2 md:m-0"
                  onClick={() => signIn()}
                  disabled={pathname?.includes('/login')}
                >
                  Sign In
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
