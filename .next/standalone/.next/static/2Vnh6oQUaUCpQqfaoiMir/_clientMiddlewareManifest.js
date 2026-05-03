self.__MIDDLEWARE_MATCHERS = [
  {
    "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json)?[\\/#\\?]?$",
    "originalSource": "/admin/:path*"
  },
  {
    "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/reseller(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json)?[\\/#\\?]?$",
    "originalSource": "/reseller/:path*"
  }
];self.__MIDDLEWARE_MATCHERS_CB && self.__MIDDLEWARE_MATCHERS_CB()