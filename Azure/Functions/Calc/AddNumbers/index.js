
// NodeJS Async function to run on Azure.
// AddNumbers - adds two numbers and returns result.
module.exports = async function (context, req) {
    context.log('AddNumbers request.');
    context.res = {
        status: 400,
        body: "Not implemented yet!"
    };
};
