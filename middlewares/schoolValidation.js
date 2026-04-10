const {body, validationResult} = require('express-validator');
// express.urlencoded and express.json are registered on the app object in app.js, 
// so they run globally on every request as middleware — they don't need to be imported in every file.
// body from express-validator is not middleware registered on app. It is a function you are directly c
// alling in your code to build validators. Since you're calling it, Node.js needs to know what body is in that file.
exports.inputValidation = [
    body('name')
        .notEmpty().withMessage('Name cannot be left empty')
        .isString().withMessage('Name must be a valid String'),
    
    body('address')
        .notEmpty().withMessage('Address cannot be left empty')
        .isString().withMessage('Address must be a valid String'),
    
    body('latitude')
        .notEmpty().withMessage('Latitude cannot be left empty')
        .isFloat().withMessage('Latitude must be a valid float'),
    
    body('longitude')
        .notEmpty().withMessage('Longitude cannot be left empty')
        .isFloat().withMessage('Longitude must be a valid float')    
];