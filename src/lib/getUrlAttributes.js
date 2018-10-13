export const getUrlAttributes = (url) => {

  const urlAttributes = {
    originalUrl: url,
    protocol: getProtocol(url),
    primaryDomain: getPrimaryDomain(url),
    route: getRoute(url),
    domainExtension: getDomainExtension(url),
  };

  return urlAttributes;
}

export const getProtocol = (url) => {
  const splitProtocol = url.split('://');
  if (splitProtocol.length === 2) {
    return splitProtocol[0];
  }
  return null;
}

export const getPrimaryDomain = (url) => {
  let protocolStrippedUrl = '';
  if (url.includes('://')) {
    protocolStrippedUrl = url.split('://')[1];
  } else {
    protocolStrippedUrl = url;
  }

  const splitUrl = protocolStrippedUrl.split('.');
  return splitUrl[splitUrl.length - 2];
}

export const getDomainExtension = (url) => {
  const splitParameter = getPrimaryDomain(url) + '.';
  const splitUrl = url.split(splitParameter);

  const domainExtensionPlusRoute = splitUrl[splitUrl.length - 1];

  const routePlusDomainArray = domainExtensionPlusRoute.split('/');

  return routePlusDomainArray[0];
}

export const getRoute = (url) => {
  if (!getPrimaryDomain(url)) {
    return url;
  }
  const splitParameter = '.' + getDomainExtension(url);
  const splitUrl = url.split(splitParameter);

  return splitUrl[splitUrl.length - 1];
}

export default getUrlAttributes;