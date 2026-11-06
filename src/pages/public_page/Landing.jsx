import BottomCTA from "../../components/landing_components/BottomCTA"
import CoreFeatures from "../../components/landing_components/CoreFeatures"
import Footer from "../../components/landing_components/Footer"
import Hero from "../../components/landing_components/Hero"
import HowItWorks from "../../components/landing_components/HowItWorks"
import ProblemSolution from "../../components/landing_components/ProblemSolution"
import NavbarLandingPage from "../../components/navbar/NavbarLandingPage"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-bg-base text-ink flex flex-col font-sans selection:bg-brand selection:text-white">
            <NavbarLandingPage />

            <main className="flex-1">
                <Hero />

                <ProblemSolution />

                <HowItWorks />

                <CoreFeatures />

                <BottomCTA />

                <Footer />
            </main>
        </div>
    )
}