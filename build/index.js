"use strict";

var _axios = _interopRequireDefault(require("axios"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _getUrlAttributes = _interopRequireWildcard(require("./lib/getUrlAttributes"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const extractAllAnchors = async url => {
  try {
    let urls = [];
    const resp = await _axios.default.get(url);
    const html = resp.data;
    Object.entries((0, _cheerio.default)('a', html)).map(anchorArray => {
      if (!isNaN(anchorArray[0])) {
        urls.push(anchorArray[1].attribs.href);
      }
    });
    return urls;
  } catch (err) {
    return err;
  }
};

const doPrimaryDomainsMatch = (url1, url2) => {
  if ((0, _getUrlAttributes.default)(url1).primaryDomain === (0, _getUrlAttributes.default)(url2).primaryDomain) {
    return true;
  }

  return false;
};
/**
 * @param {*Expects the uri of the origin domain} originUrl 
 * @param {*Expects a list of uri's that were found on the origin domain} urls 
 * 
 * Compares the origin url with the list of other urls found on origin url and returns a url not of the same domain as the origin
 */


const getExternalUrls = (originUrl, urls) => {
  return urls.filter(url => {
    if (!(0, _getUrlAttributes.default)(url).primaryDomain) {
      return false;
    } else if (!doPrimaryDomainsMatch(originUrl, url)) {
      return url;
    }

    return false;
  });
};

(async () => {
  const foundUrls = await extractAllAnchors('https://fluxteck.com');
  const externalUrls = getExternalUrls('https://fluxteck.com', foundUrls);
  console.log(externalUrls);
})();
//# sourceMappingURL=index.js.map