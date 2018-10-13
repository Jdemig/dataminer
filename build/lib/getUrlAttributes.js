"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getRoute = exports.getDomainExtension = exports.getPrimaryDomain = exports.getProtocol = exports.getUrlAttributes = void 0;

const getUrlAttributes = url => {
  const urlAttributes = {
    originalUrl: url,
    protocol: getProtocol(url),
    primaryDomain: getPrimaryDomain(url),
    route: getRoute(url),
    domainExtension: getDomainExtension(url)
  };
  return urlAttributes;
};

exports.getUrlAttributes = getUrlAttributes;

const getProtocol = url => {
  const splitProtocol = url.split('://');

  if (splitProtocol.length === 2) {
    return splitProtocol[0];
  }

  return null;
};

exports.getProtocol = getProtocol;

const getPrimaryDomain = url => {
  let protocolStrippedUrl = '';

  if (url.includes('://')) {
    protocolStrippedUrl = url.split('://')[1];
  } else {
    protocolStrippedUrl = url;
  }

  const splitUrl = protocolStrippedUrl.split('.');
  return splitUrl[splitUrl.length - 2];
};

exports.getPrimaryDomain = getPrimaryDomain;

const getDomainExtension = url => {
  const splitParameter = getPrimaryDomain(url) + '.';
  const splitUrl = url.split(splitParameter);
  const domainExtensionPlusRoute = splitUrl[splitUrl.length - 1];
  const routePlusDomainArray = domainExtensionPlusRoute.split('/');
  return routePlusDomainArray[0];
};

exports.getDomainExtension = getDomainExtension;

const getRoute = url => {
  if (!getPrimaryDomain(url)) {
    return url;
  }

  const splitParameter = '.' + getDomainExtension(url);
  const splitUrl = url.split(splitParameter);
  return splitUrl[splitUrl.length - 1];
};

exports.getRoute = getRoute;
var _default = getUrlAttributes;
exports.default = _default;
//# sourceMappingURL=getUrlAttributes.js.map