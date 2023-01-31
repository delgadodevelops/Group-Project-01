var submitButton = $('#submitBtn');
var guestCheckInEl = $('input[name="check_in"]');
var guestCheckOutEl = $('input[name="check_out"]');
var guestLocationEl = $('input[name="location"]');
var numberOfAdultsEl = $('#num_of_adults');
var numberOfChildrenEl = $('#num_of_children');

const hotel_options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5c01614464msh879928d4a62fcc9p1d2a96jsn2c435bb2e9ef',
        'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
    }
};
const airbnb_options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5c01614464msh879928d4a62fcc9p1d2a96jsn2c435bb2e9ef',
        'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    }
};
const getDestinationIdOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5c01614464msh879928d4a62fcc9p1d2a96jsn2c435bb2e9ef',
        'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
    }
};
const getHotelIdOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5c01614464msh879928d4a62fcc9p1d2a96jsn2c435bb2e9ef',
        'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
    }
};