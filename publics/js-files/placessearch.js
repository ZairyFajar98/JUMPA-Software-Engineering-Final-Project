let inputLocationComp = document.getElementById('search_location');
let inputLocationEdit = document.getElementById('location_edit');

function activatePlacesSearch(){
    let autocomplete1 = new google.maps.places.Autocomplete(inputLocationComp);
    let autocomplete2 = new google.maps.places.Autocomplete(inputLocationEdit);
}
