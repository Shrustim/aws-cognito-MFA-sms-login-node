const AWS = require('aws-sdk');
AWS.config.update({ region: "us-east-1" });
const {CognitoIdentityProviderClient, InitiateAuthCommand, ResendConfirmationCodeCommand, ConfirmSignUpCommand,
VerifySoftwareTokenCommand} = require("@aws-sdk/client-cognito-identity-provider");

// Create a new CognitoIdentityServiceProvider object
const cognito = new AWS.CognitoIdentityServiceProvider();
const client = new CognitoIdentityProviderClient({ region: "us-east-1" });
   
//  const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18'});
    
   

exports.handler = async (event, context, callback) => {
  const phoneNumber = '+9190000008';
//   const data = await signInWithPhoneNumber(phoneNumber);
 const data = await respondToAuthChallenge(phoneNumber,"225787","");
 console.log("data--",data);
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};


async function signInWithPhoneNumber(phoneNumber) {
    const params = {
              AuthFlow: 'USER_PASSWORD_AUTH',
              ClientId: '',
              UserPoolId:"",
              AuthParameters: {
                USERNAME: phoneNumber,
                PASSWORD: "Test@123",
              }
    };
    try {
     let data = {}
     // Call InitiateAuthCommand
      data = await client.send(new InitiateAuthCommand(params));
       console.log("InitiateAuthCommand response:", data);
        return data
        
    } catch (err) {
        console.error(err);
    }
}


async function respondToAuthChallenge(phoneNumber, code, session) {
    const params = {
        ChallengeName: 'SMS_MFA', // Assuming SMS MFA is enabled
        ClientId: '',
        Session:session,
        ChallengeResponses:  {"SMS_MFA_CODE": code, "USERNAME": phoneNumber}
    };

    try {
        const data = await cognito.respondToAuthChallenge(params).promise();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

async function resendMFACode(phoneNumber) {
    try {
         const command = new ResendConfirmationCodeCommand({
            ClientId: '',
            Username: phoneNumber,
          });

         return await  client.send(command);
    } catch (err) {
        console.error(err);
    }
}
