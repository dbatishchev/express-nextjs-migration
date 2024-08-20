import React from 'react'
import type { AppProps } from 'next/app'
import { StaticRouter } from 'react-router-dom/server'
import Link from 'next/link';
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <div>
        <nav>
            <ul>
            <li><Link href="/">Main</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/list">Pokémon List</Link></li>
            </ul>
        </nav>
        <Component {...pageProps} />
      </div>
  )
}