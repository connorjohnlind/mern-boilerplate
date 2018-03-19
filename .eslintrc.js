module.exports = {
    "extends": "airbnb",
    "env": {
      "browser": true,
      "node": true
    },
    "parser": "babel-eslint", // stage 2 babel
    "rules": {
      "function-paren-newline": ["error", "consistent"], // pushing react elements to arrays
      "jsx-a11y/anchor-is-valid": [ "error", {
        "components": [ "Link" ],
        "specialLink": [ "to" ],
        "aspects": [ "noHref", "invalidHref", "preferButton" ]
      }],
    },
};
