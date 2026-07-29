import { useState } from 'react';
import type { FormEvent } from 'react';
import type { CabBookingDTO } from '../types/CabBooking';
import bookingService from '../services/bookingService';
import '../styles/BookingForm.css';

const BookingForm = () => {
  const [formData, setFormData] = useState<CabBookingDTO>({
    source: '',
    destination: '',
    travelDate: '',
    userMobile: 0,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'userMobile' ? Number(value) : value,
    }));
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await bookingService.bookCab(formData);
      setMessage(response.message || 'Booking successful!');
      setFormData({ source: '', destination: '', travelDate: '', userMobile: 0 });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred while booking.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      <div className="form-card">
        <h2>Book Your Cab</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="source">Source</label>
            <input
              type="text"
              id="source"
              name="source"
              value={formData.source}
              onChange={handleInputChange}
              placeholder="Enter pickup location"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              placeholder="Enter drop location"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="travelDate">Travel Date</label>
            <input
              type="date"
              id="travelDate"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userMobile">Mobile Number</label>
            <input
              type="tel"
              id="userMobile"
              name="userMobile"
              value={formData.userMobile === 0 ? '' : formData.userMobile}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Booking...' : 'Book Cab'}
          </button>
        </form>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default BookingForm;
