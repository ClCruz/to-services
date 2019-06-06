require('console-stamp')(console, '[yyyy-mm-dd HH:MM:ss.l]');

const cron = require("node-cron");
const express = require("express");
var fs = require('fs');

//var moment = require('moment');

var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

(async function () {
    try {
        console.log(`Started service.`);
        console.log(`API: ${config.api.uri}}`);
        let task = cron.schedule("0 59 23 * * * *", () => {
            let sitemap = require("./tasks/sitemap/index");
            sitemap.start(config);
            //   console.log("running a task every minute - "+config.api.uri);
        }, { scheduled: false, timezone: "America/Sao_Paulo" });

       task.start();
       
       let sitemap = require("./tasks/sitemap/index");
       sitemap.start(config);

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})()
