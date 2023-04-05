const modelLinkPattern = /^(ftp|http|https):\/\/[^ "]+$/;
const linkPattern = /^(ftp|http|https):\/\/[^"]+\.\w{2,}/;
const modelEmailPatter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = { modelLinkPattern, linkPattern, modelEmailPatter };
