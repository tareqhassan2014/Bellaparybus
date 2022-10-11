const jwt = require('jsonwebtoken');
const db = require('../../services/db');

const bookingTable = 'booking_info';

/**
 * Get All Bookings
 */
exports.getAll = () => {
    return new Promise(async (resolve, reject) => {
        const bookings = await db.query(`SELECT * FROM ${bookingTable}`);
        resolve({
            status: 200,
            message: 'Get All Bookings',
            bookings,
        });
    });
};

/**
 * Booking Ride
 */

exports.bookingRide = (request) => {
    return new Promise(async (resolve, reject) => {
        const {
            userId,
            booking_type,
            first_ride_pickup_date,
            first_ride_passengers,
            duration,
            first_ride_pickup_location,
            first_ride_drop_off_location,
            occasion,
            coupon_code,
            return_ride_pickup_date,
            return_ride_passengers,
            return_ride_pickup_location,
            return_ride_drop_off_location,
            first_name,
            last_name,
            email,
            phone,
            contact_method,
            vehicle,
            special_request,
        } = request.body;

        const bookingRide = await db.query(
            `INSERT INTO ${bookingTable}(user_id, booking_type, first_ride_pickup_date, first_ride_passengers, duration, first_ride_pickup_location, first_ride_drop_off_location, occasion, coupon_code, return_ride_pickup_date, return_ride_passengers, return_ride_pickup_location, return_ride_drop_off_location, first_name, last_name, email, phone, contact_method, vehicle, special_request) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                booking_type,
                first_ride_pickup_date,
                first_ride_passengers,
                duration,
                first_ride_pickup_location,
                first_ride_drop_off_location,
                occasion,
                coupon_code,
                return_ride_pickup_date,
                return_ride_passengers,
                return_ride_pickup_location,
                return_ride_drop_off_location,
                first_name,
                last_name,
                email,
                phone,
                contact_method,
                vehicle,
                special_request,
            ]
        );

        resolve({
            status: 200,
            message: 'User Account Deleted!',
        });
    });
};
