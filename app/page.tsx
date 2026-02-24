import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturesScroll from '@/components/FeaturesScroll';
import ProcessSection from '@/components/ProcessSection';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer'; // <-- Import the new Footer

export default function LandingPage() {
    return (
        <main className="bg-white min-h-screen font-sans text-slate-900 selection:bg-emerald-100 relative">
            <Navbar />
            <Hero />
            <FeaturesScroll />
            <ProcessSection />
            <StatsSection />
            <TestimonialsSection />
            <CTASection />
            <Footer /> {/* <-- Add it right here at the very bottom */}
        </main>
    );
}