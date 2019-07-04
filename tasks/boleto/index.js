//require('console-stamp')(console, '[yyyy-mm-dd HH:MM:ss.l]');
const request = require('request-promise-native');
// ode_modules/form-data/lib/form_data.js
module.exports = {
    config: null,
    start: function (config) {
        this.config = config;
        let current = this;
        const url = "/v1/schedule/boleto/list";
        console.log("looking for boletos...");
        request({ method: "POST", baseUrl: current.config.api.uri, uri: url, json: true })
            .then(function(res){ 
                current.exec(res);
            });        
    },
    exec: function(boletos) {
        let current = this;
        console.log(`found: ${boletos.length}`);
        boletos.forEach(function(value){
            console.log(`executing ${value.id_pedido_venda} at ${value.name}...`);
            
            const url = `/v1/schedule/boleto/gateway?id_pedido_venda=${value.id_pedido_venda}&imthebossofme=${value.name}`;
            request({ method: "POST", baseUrl: current.config.api.uri, uri: url, json: true })
            .then(function(res){ 
                if (res.success) {
                    console.log(`executed ${value.id_pedido_venda} at ${value.name}.`);
                }
                else {
                    console.log(`executed ${value.id_pedido_venda} but... ${res.msg}`);
                }
            });        
        });
    }
};