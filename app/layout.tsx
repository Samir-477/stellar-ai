import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Stellar AI — Your data has answers. AI finds them.',
    description: 'Let AI create goals from your data. Validate performance against targets. Surface insights, flag risks, and dive straight into action.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
