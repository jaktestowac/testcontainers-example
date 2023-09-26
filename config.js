let expect = require("chai").expect;
const supertest = require("supertest");

const baseApiUrl = "/api";
const baseArticlesUrl = "/api/articles";
const baseCommentsUrl = "/api/comments";
const imageName = "jaktestowac/gad";
const exposedPort = 3000;

module.exports = {
    expect,
    supertest,
    baseApiUrl,
    baseArticlesUrl,
    baseCommentsUrl,
    imageName,
    exposedPort,
};
