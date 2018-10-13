import axios from 'axios';
import $ from 'cheerio';

import getUrlAttributes from './lib/getUrlAttributes';

import { getRoute } from './lib/getUrlAttributes';

const extractAllAnchors = async (url) => {
  try {
    let urls = [];
    const resp = await axios.get(url);
    const html = resp.data;

    Object.entries($('a', html)).map((anchorArray) => {
      if (!isNaN(anchorArray[0])) {
        urls.push(anchorArray[1].attribs.href);
      }
    });

    return urls;
  } catch (err) {
    return err;
  }
}

const doPrimaryDomainsMatch = (url1, url2) => {

  if (getUrlAttributes(url1).primaryDomain === getUrlAttributes(url2).primaryDomain) {
    return true;
  }
  return false;
}



/**
 * @param {*Expects the uri of the origin domain} originUrl 
 * @param {*Expects a list of uri's that were found on the origin domain} urls 
 * 
 * Compares the origin url with the list of other urls found on origin url and returns a url not of the same domain as the origin
 */
const getExternalUrls = (originUrl, urls) => {
  return urls.filter((url) => {
    if (!getUrlAttributes(url).primaryDomain) {
      return false;
    } else if (!doPrimaryDomainsMatch(originUrl, url)) {
      return url;
    }
    return false;
  });
}

(async () => {
  const foundUrls = await extractAllAnchors('https://fluxteck.com');

  const externalUrls = getExternalUrls('https://fluxteck.com', foundUrls);

  console.log(externalUrls);
})();


