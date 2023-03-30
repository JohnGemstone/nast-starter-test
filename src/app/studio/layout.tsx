import { Raleway } from 'next/font/google';
import "@/sanity/customStyles.css";
import type {PropsWithChildren} from "react";
import { Metadata } from 'next';


const raleway = Raleway({
  variable: '--font-raleway',
  display: 'swap',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Studio | LCD Showcase',
  viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
  robots: 'noindex',
}

export default function StudioLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={raleway.className}>
      <body>{children}</body>
    </html>
  )
}
