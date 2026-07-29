import type { CabBookingDTO, BookingResponse } from '../types/CabBooking';

const API_BASE_URL = '/bookings';

class BookingService {
  /**
   * Book a cab with the provided details
   */
  async bookCab(bookingData: CabBookingDTO): Promise<BookingResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const message = await response.text();
      return { message };
    } catch (error) {
      console.error('Error booking cab:', error);
      throw error;
    }
  }

  /**
   * Get booking details by mobile number
   */
  async getBookingDetails(mobileNo: number): Promise<CabBookingDTO[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/${mobileNo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const bookings = await response.json();
      return bookings;
    } catch (error) {
      console.error('Error fetching booking details:', error);
      throw error;
    }
  }

  /**
   * Cancel a booking by booking ID
   */
  async cancelBooking(bookingId: number): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const message = await response.text();
      return message;
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
  }
}

export default new BookingService();
