
// NodeJS Async function to run on Azure.

// Function to create response.
var createResponse = function(title, text) {
    return {
        version: "1.0",
        status: 200,
        response: {
            outputSpeach: {
                type: "PlainText",
                text: text
            },
            card: {
                type: "Simple",
                title: title,
                content: text
            },
            shouldEndSession: false
        }
    };
}

// AddNumbers - adds two numbers and returns result.
module.exports = async function (context, req) {
    context.log('AddNumbers request.');
    // Parse the query string parameters.
    if (req.body && req.body.request) {
        var request = req.body.request;
        var type = request.type;
        switch (type) {
            case "IntentRequest":
                let intentName = request.intent.name;
                let n1 = parseFloat(request.intent.slots["firstnum"].value);
                let n2 = parseFloat(request.intent.slots["secondnum"].value);
                let result = n1 + n2;
                context.res.body = createResponse("The answer is:", "The answer is " + result.toString());
                break;
            case "LaunchRequest":
                context.res.body = createResponse("Welcome to the Alexa calculator", "Try asking: what is 3 plus 4?");
                break;
            default:
                context.res.body = createResponse("Oops", "Sorry, I couldn't understand the question.");
                break;  
        }        
    }
};
