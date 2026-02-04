async function gotLocation(position) {
  let loading = true;
  document.getElementById("locateBtn").innerHTML = "Loading...";
  const { latitude, longitude } = position.coords;
  // const apiUrl = `http://localhost:3000/api/get-location?latitude=${latitude}&longitude=${longitude}`;
  const apiUrl = `https://my-address-location-api.netlify.app/.netlify/functions/api?latitude=${latitude}&longitude=${longitude}`

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const address = data.results[0].components;
    document.getElementById("locateBtn").innerHTML = "Locate Me";
    loading = false;
    document.getElementById(
      "continent"
    ).innerHTML = `Continent : ${address.continent}`;
    document.getElementById(
      "country"
    ).innerHTML = `Country : ${address.country}`;
    document.getElementById("state").innerHTML = `State : ${address.state}`;
    document.getElementById(
      "district"
    ).innerHTML = `District : ${address.state_district}`;
    document.getElementById("city").innerHTML = `City : ${address.city}`;
    document.getElementById(
      "postalCode"
    ).innerHTML = `Postal Code : ${address.postcode}`;
    document.getElementById(
      "fullAddress"
    ).innerHTML = `Full Address : ${data.results[0].formatted}`;
  } catch (error) {
    document.getElementById("locateBtn").innerHTML = "Error";
    console.log(error);
  }
}

function errorLocation() {
  console.log("Unable to retrieve location.");
}

locateBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(gotLocation, errorLocation);
});
