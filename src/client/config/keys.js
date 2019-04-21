// KEYS.JS - FIGURE OUT WHAT SETS OF KEYS TO RETURN
// THESE ARE THE FRONT END KEYS, IT DOESNT MATTER IF THEY CAN SEE THIS OR NOT, HAS NO HARM
if (process.env.NODE_ENV === 'production')
{
    module.exports = require('./prod');
}
else
{
    module.exports = require('./dev');
}