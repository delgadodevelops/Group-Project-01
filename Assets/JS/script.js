var submitButton = $('#submitBtn');
var guestCheckInEl = $('#check_in');
var guestCheckOutEl = $('#check_out');
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
const queryStringConverter = function (guestInput) {
    guestInput = guestInput.val();
    guestInput = String(guestInput);
    const inputArray = guestInput.split(" ");
    queryString = inputArray[0];
    for (let i = 1; i < inputArray.length; i++) {
        queryString = queryString.concat("%20", inputArray[i])
    }
    return queryString
}
$(document).ready(function () {
    $('select').formSelect();
});


submitButton.on('click', function (e) {
    e.preventDefault();
    const guestLocationQueryString = queryStringConverter(guestLocationEl);
    const guestCheckInQueryString = queryStringConverter(guestCheckInEl);
    const guestCheckOutQueryString = queryStringConverter(guestCheckOutEl);
    const numberOfAdultsQueryString = queryStringConverter(numberOfAdultsEl);
    const numberOfChildrenQueryString = queryStringConverter(numberOfChildrenEl);
    const queryLocationString = queryStringConverter(guestLocationEl);

    // airbnb fetch
    // fetch('https://airbnb13.p.rapidapi.com/search-location?location=' + guestLocationQueryString + '&checkin=2023-02-03&checkout=2023-02-04&adults=1&children=0&infants=0&page=1&bedrooms=2', airbnb_options)
    // .then(response => response.json())
    // .then(airbnb_data => {
    //         console.log(airbnb_data)
    //         for (let i = 1; i < 6; i++) {
    //             const thumbNail = document.createElement('img')
    //             thumbNail.setAttribute('src', airbnb_data.results[i].images[0])
    //             $(`#bnb-${i}`).append(thumbNail)
    //             $(`#bnb-${i}`).wrap(`<a href= ${airbnb_data.result[i].url}></a>`)
    //         }
    // }
    // )
    // .catch(err => console.error(err));

        // hotels fetch

    fetch('https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?text=' + queryLocationString + '&languagecode=en-us', getDestinationIdOptions)
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].dest_type === "city" && data[i].city_name === guestLocationEl.val()) {
                const dest_id = data[i].dest_id;
                fetch('https://apidojo-booking-v1.p.rapidapi.com/properties/list?offset=0&arrival_date='+guestCheckInQueryString+'&departure_date='+guestCheckOutQueryString+'&guest_qty='+numberOfAdultsQueryString+'&dest_ids=' + dest_id + '&room_qty=1&search_type=city&children_qty='+numberOfChildrenQueryString+'&children_age=5%2C7&search_id=none&price_filter_currencycode=USD&order_by=popularity&languagecode=en-us&travel_purpose=leisure', getHotelIdOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        for (let i = 1; i < 6; i++) {
                            const thumbNail = document.createElement('img')
                            thumbNail.setAttribute('src', data.result[i].main_photo_url)
                            thumbNail.setAttribute('width', '75px')
                            thumbNail.setAttribute('height','75px')
                            $(`#hotel-img-${i}`).append(thumbNail)
                            $(`#hotel-${i}`).wrap(`<a href= ${data.result[i].url}></a>`)
                            $(`#title-${i}`).append(data.result[i].hotel_name)
                            $(`#price-${i}`).append(`\$${data.result[i].price_breakdown.all_inclusive_price} per night`)
                            console.log(thumbNail)
                        }
                    })
                    .catch(err => console.error(err));

            }

        }
    })
    .catch(err => console.error(err));

})
