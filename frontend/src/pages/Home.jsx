import Hero from '../components/Hero';
import FeaturedSports from '../components/FeaturedSports';
import HowItWorks from '../components/HowItWorks';
import AthleteShowcase from '../components/AthleteShowcase';
import AnalyticsFeature from '../components/AnalyticsFeature';
import Testimonials from '../components/Testimonials';
import DemoPreview from '../components/DemoPreview';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="bg-slate-950 min-h-screen">
            <Hero />
            <FeaturedSports />
            <HowItWorks />
            <AthleteShowcase />
            <AnalyticsFeature />
            <DemoPreview />
            <Testimonials />
            {/* CTA Section removed as its functionality is covered in Hero/Footer/HowItWorks */}
            <Footer />
        </div>
    );
};

export default Home;
