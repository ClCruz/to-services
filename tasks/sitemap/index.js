//require('console-stamp')(console, '[yyyy-mm-dd HH:MM:ss.l]');
const request = require('request-promise-native');
// ode_modules/form-data/lib/form_data.js
module.exports = {
    config: null,
    start: function (config) {
        this.config = config;
        let current = this;
        const url = "/v1/sitemap/list";
        console.log("looking for partner...");
        request({ method: "POST", baseUrl: current.config.api.uri, uri: url, json: true })
            .then(function(res){ 
                current.exec(res);
            });        
    },
    save: function(id_partner, success, msg, uniquename) {
        let current = this;
        const url = `/v1/sitemap/save`;
        request({ method: "POST", baseUrl: current.config.api.uri, uri: url, json: false, formData: { "id_partner": id_partner, "success":success, "msg":msg } })
        .then(function(res){ 
            console.log(`executed ${uniquename}.`);
        });        
    }, 
    exec: function(sites) {
        let current = this;
        console.log(`found: ${sites.length}`);
        sites.forEach(function(value){
            if (value.hourafterlastgenerated>24) {
                console.log(`executing ${value.uniquename}...`);
            }
            else {
                console.log(`executing ${value.uniquename}... but has less then 24 hours, so now I stop.`);
            }
            
            if (value.hourafterlastgenerated>24) {
                const url = `/v1/gen_sitemap?uniquename=${value.uniquename}`;
                request({ method: "POST", baseUrl: current.config.api.uri, uri: url, json: true })
                .then(function(res){ 
                    current.save(value.id, res.success, res.msg, value.uniquename);
                });        
            }
        });
    }
};