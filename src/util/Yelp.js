const clientId = 'FHSMh3fqjwhOAh6cRLL24g';
const secret = 'fuHerMsM2iUvW9FWg4JvidEPOMeg1CbJk9qIwheI9JeeWn7tfAqrid6jXY9CWFvV';

let accessToken;
const Yelp = {
  getAccessToken(){
    if(accessToken){
      return new Promise(resolve => resolve(accessToken));
    }
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`,
      {method: 'POST'})
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => accessToken = jsonResponse.access_token);
  },
  search(term, location, sortBy){
    return Yelp.getAccessToken()
      .then(() => {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
          headers: {Authorization: `Bearer ${accessToken}`}
        });
      })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map(business => ({
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count
          }));
        } else {
          return [];
        }
      });
  }
};
export default Yelp;