import { useState } from 'react';
import type { CabBookingDTO } from '../types/CabBooking';
import bookingService from '../services/bookingService';
import '../styles/BookingLookup.css';

const BookingLookup = () => {
  const [mobileNo, setMobileNo] = useState('');
  const [bookings, setBookings] = useState<CabBookingDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!mobileNo.trim()) {
      setError('Please enter a mobile number');
      return;
    }

    setLoading(true);
    setError('');
    setBookings([]);

    try {
      const result = await bookingService.getBookingDetails(Number(mobileNo));
      setBookings(result);
      setSearched(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch booking details.'
      );
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId: number | undefined) => {
    if (!bookingId) return;

    try {
      await bookingService.cancelBooking(bookingId);
      setBookings(bookings.filter((b) => b.bookingId !== bookingId));
      alert('Booking cancelled successfully');
    } catch (err) {
      alert(
        `Error cancelling booking: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
    }
  };

  return (
    <div className="lookup-container">
      <div className="lookup-card">
        <h2>View Your Bookings</h2>

        <div className="search-group">
          <input
            type="tel"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            placeholder="Enter your mobile number"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {searched && bookings.length === 0 && !error && (
          <div className="info-message">No bookings found for this number.</div>
        )}

        {bookings.length > 0 && (
          <div className="bookings-list">
            <h3>Your Bookings</h3>
            {bookings.map((booking) => (
              <div key={booking.bookingId} className="booking-card">
                <div className="booking-info">
                  <p>
                    <strong>Booking ID:</strong> {booking.bookingId}
                  </p>
                  <p>
                    <strong>Route:</strong> {booking.source} → {booking.destination}
                  </p>
                  <p>
                    <strong>Date:</strong> {booking.travelDate}
                  </p>
                  <p>
                    <strong>Fare:</strong> ₹{booking.fare}
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className={`status-${booking.status?.toLowerCase()}`}>
                      {booking.status === 'A' ? 'Active' : 'Cancelled'}
                    </span>
                  </p>
                </div>
                {booking.status === 'A' && (
                  <button
                    onClick={() => handleCancel(booking.bookingId)}
                    className="cancel-btn"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingLookup;
