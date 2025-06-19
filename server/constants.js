const NETFLIX_LOCATIONS = {
  'los-gatos': '121 Albright Way, Los Gatos, CA',
  'new-york': '888 Broadway, New York, NY',
  'la': '5808 Sunset Blvd, Los Angeles, CA',
};
const VALID_SORTS = ['distance', 'rating'];

module.exports = {
  NETFLIX_LOCATIONS,
  RADIUS: 10000,
  LIMIT: 20,
  VALID_SORTS,
  YELP_SEARCH_URL: 'https://api.yelp.com/v3/businesses/search',
};