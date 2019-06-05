require('console-stamp')(console, '[yyyy-mm-dd HH:MM:ss.l]');

const cron = require("node-cron");
const express = require("express");
var fs = require('fs');

//var moment = require('moment');

var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));


(async function () {
    try {
        console.log(`Started service.`);

        //let task = cron.schedule("* * * * * *", () => {
            let sitemap = require("./tasks/sitemap/index");
            sitemap.start(config);
            //   console.log("running a task every minute - "+config.api.uri);
        //}, { scheduled: false });

//        task.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})()
