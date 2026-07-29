export interface CabBookingDTO {
  bookingId?: number;
  source: string;
  destination: string;
  fare?: number;
  travelDate: string; // ISO date format: YYYY-MM-DD
  userMobile: number;
  status?: string;
}

export interface BookingResponse {
  bookingId?: number;
  message?: string;
}
