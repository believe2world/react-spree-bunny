var request = require('superagent');

const UserAPI = {
  login: (params) => {
    return request
      .post(`${ process.env.REACT_APP_AMS_API_BASE }/users/token`)
      .set('Accept', 'application/json')
      .send(params);
  },
  signup: (params) => {
    // If GUEST user signup is enabled in spree without API Key, 
    // then no need to send the x-spree-token for this action,
    // By Default REACT_APP_ALLOW_GUEST_SIGNUP is false

    const key = process.env.REACT_APP_ALLOW_GUEST_SIGNUP ? '' : process.env.REACT_APP_SPREE_API;
  	return request
  		.post(`${ process.env.REACT_APP_API_BASE }/users`)
  		.set('X-Spree-Token', key )
  		.set('Content-Type', 'application/json')
      .send(params);
  }
};


export default UserAPI;
