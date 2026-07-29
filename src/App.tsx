import { useState } from 'react'
import BookingForm from './components/BookingForm'
import BookingLookup from './components/BookingLookup'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'book' | 'lookup'>('book')

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🚕 InfyCabs Booking System</h1>
        <p>Quick and easy cab bookings</p>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-btn ${activeTab === 'book' ? 'active' : ''}`}
          onClick={() => setActiveTab('book')}
        >
          Book a Cab
        </button>
        <button
          className={`nav-btn ${activeTab === 'lookup' ? 'active' : ''}`}
          onClick={() => setActiveTab('lookup')}
        >
          View Bookings
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'book' && <BookingForm />}
        {activeTab === 'lookup' && <BookingLookup />}
      </main>
    </div>
  )
}

export default App
