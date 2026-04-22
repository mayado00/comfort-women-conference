import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/home/Hero'
import Sessions from './components/home/Sessions'
import Program from './components/home/Program'
import Venue from './components/home/Venue'
import FAQ from './components/home/FAQ'
import RegistrationForm from './components/registration/RegistrationForm'
import ArchivePage from './components/archive/ArchivePage'

function HomePage() {
  return (
    <>
      <Hero />
      <Sessions />
      <Program />
      <Venue />
      <FAQ />
      <RegistrationForm />
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archive" element={<ArchivePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
