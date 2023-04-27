
exports.searchBusiness = async (req, res)=>{

    const sdk = require('api')('@yelp-developers/v1.0#deudoolf6o9f51');
    sdk.auth('Bearer -5Ae3pOs-yWX68MWDGMZvfWdF4AWjBekQR8TnrywnHrUKeFo6vgKzP-skgTLu-VLssHPq7ktY4LHd7uuPs9h5LQiPiV-zlDN8SPuOZOOPDDHzT_sJkFes2EigAugWXYx');
    sdk.v3_business_search({location: "USA", term: req.body.businessName, sort_by: 'best_match', limit: '10'})
    .then(({ data }) => {
        // console.log(data)
        res.send(data.businesses);
    })
    .catch(err => res.send(err));

}