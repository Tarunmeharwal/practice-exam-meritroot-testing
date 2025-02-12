import { Albert_Sans } from 'next/font/google';
import './globals.css';

const albertSans = Albert_Sans({
  subsets: ['latin'],
  weights: ['400', '700'], 
});

export const metadata = {
  metadataBase: new URL('https://meritroot.com'),
  title: {
    default: 'Meritroot Practice Prep - Ace JEE, NEET & Digital SAT | Call +91 7417454936',
    template: '%s | Meritroot'
  },
  description: 'Master JEE, NEET, Digital SAT, and CUET with expert faculty, structured study plans, and personalized guidance. Secure top ranks with our proven strategies and exam-focused preparation.',
  keywords: [
    'JEE Advanced Coaching', 
    'NEET Crash Course', 
    'Digital SAT Prep', 
    'CUET Entrance Coaching', 
    'Board Exam Success', 
    'Best JEE Coaching Institute', 
    'Medical Entrance Training', 
    'Engineering Entrance Preparation', 
    'Top SAT Tutors', 
    'Mock Tests for JEE & NEET'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://meritroot.com',
    title: 'Meritroot - JEE, NEET, Digital SAT & CUET Prep | Call +91 7417454936',
    description: 'Crack JEE, NEET, SAT, and CUET with our result-driven courses. Get expert mentorship, exam simulations, and in-depth conceptual clarity for your success.',
    siteName: 'Meritroot',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200, 
        height: 630,  
        alt: 'Meritroot - JEE, NEET, Digital SAT & CUET Prep',
      },
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="512x512" />
      <link rel="canonical" href="https://meritroot.com" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={albertSans.className}>
     {children}
      </body>
    </html>
  );
}
