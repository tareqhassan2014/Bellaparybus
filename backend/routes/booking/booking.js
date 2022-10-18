const jwt = require('jsonwebtoken');
const db = require('../../services/db');

const bookingTable = 'booking_info';

/**
 * Get All Bookings
 */
exports.getAll = () => {
    return new Promise(async (resolve, reject) => {
        const bookings = await db.query(`SELECT * FROM ${bookingTable}`);
        console.log(bookings);
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
        const { firstRide, returnRide, ...rest } = request.body;

        // json array
        const vehicleTypes = JSON.stringify(rest.vehicleTypes);
        console.log(rest.duration);

        const booking = await db.query(
            `INSERT INTO ${bookingTable} SET
            user_id = '${1}' , 
            email = '${rest.email}', 
            phone = '${rest.phone}',
            vehicle = '${vehicleTypes}', 
            occasion = '${rest.occasion}',
            booking_type = '${rest.type}',
            duration = '${rest.duration}',
            coupon_code = '${rest.code}',
            last_name = '${rest.lastName}',
            first_name = '${rest.firstName}',
            pickup_date = '${rest.pickupDate}',
            pickup_time = '${rest.pickupTime}',
            passengers = '${rest.passengers}',
            special_request = '${rest.specialRequest}',
            pickup_location = '${rest.pickupLocation}',
            drop_off_location = '${rest.dropOffLocation}',
            first_ride_passengers = '${firstRide.passengers}', 
            first_ride_pickup_date = '${firstRide.pickupDate}', 
            first_ride_pickup_time = '${firstRide.pickupTime}',
            return_ride_passengers = '${returnRide.passengers}',
            return_ride_pickup_date = '${returnRide.pickupDate}',
            first_ride_pickup_location = '${firstRide.pickupLocation}',
            contact_method = '${rest.isPreferEmail ? 'email' : 'phone'}',
            return_ride_pickup_location = '${returnRide.pickupLocation}',
            first_ride_drop_off_location = '${firstRide.dropOffLocation}',
            return_ride_drop_off_location = '${returnRide.dropOffLocation}'`
        );

        resolve({
            status: 201,
            message: 'Ride Booked',
            booking: request.body,
        });
    });
};
