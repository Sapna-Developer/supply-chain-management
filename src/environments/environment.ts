// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  //  url: 'https://testgeps.greenko.net/app/api', //test

  //  url: 'https://gepsv2.greenkogroup.com/app/api',  //v2
  url: "http://10.80.14.65:8000/api",
  // url: "http://10.80.14.84:8000/api",
  // url: "http://10.80.14.84:8001/api",
  // sso_url: 'https://testgeps.greenko.net', //test
  // sso_url:'https://gepsv2.greenkogroup.com',  //v2
  sso_url: "http://10.80.14.65:8000/api",
  // sso_url: "http://10.80.14.84:8000/api",
  // sso_url: "http://10.80.14.84:8001/api",
  // sso_api : 'http://logintest.gits.lan/',
  sso_api: 'https://gee.greenko.net/ssov2',  //common for both
  // sso_api: "http://10.80.14.22:8000/api",
  // sso_api: "http://10.80.14.84:8000/api",
  // sso_api: "http://10.80.14.84:8001/api",
  //  base_url: 'https://testgeps.greenko.net', //test
  //  base_url:'https://gepsv2.greenkogroup.com',  //v2
  base_url: "http://10.80.14.65:8000/api",
  // base_url: "http://10.80.14.84:8000/api",  
  // base_url: "http://10.80.14.84:8001/api",  
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
