const AWS = require('aws-sdk');
AWS.config.update({ region: "us-east-1" });
const {CognitoIdentityProviderClient, InitiateAuthCommand, ResendConfirmationCodeCommand, ConfirmSignUpCommand,
VerifySoftwareTokenCommand} = require("@aws-sdk/client-cognito-identity-provider");

// Create a new CognitoIdentityServiceProvider object
const cognito = new AWS.CognitoIdentityServiceProvider();
const client = new CognitoIdentityProviderClient({ region: "us-east-1" });
   
//  const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18'});
    
   

exports.handler = async (event, context, callback) => {
  const phoneNumber = '+919529146598';
//   const data = await signInWithPhoneNumber(phoneNumber);
 const data = await respondToAuthChallenge(phoneNumber,"225787","AYABeDGu7gZOyK8kD8kWf9JT9-MAHQABAAdTZXJ2aWNlABBDb2duaXRvVXNlclBvb2xzAAEAB2F3cy1rbXMAS2Fybjphd3M6a21zOnVzLWVhc3QtMTo3NDU2MjM0Njc1NTU6a2V5L2IxNTVhZmNhLWJmMjktNGVlZC1hZmQ4LWE5ZTA5MzY1M2RiZQC4AQIBAHjHL4WD3WpekpFe85nxP9Nwg99u3bPN6BTSaB-uHZcTLAH2sEtKENGjkn0FnArf-N9pAAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMrOQu7kmaX32aOszPAgEQgDtGWtQh2PffIEnH0hhoiia5VAR_M4zsomjrLbKOpgZgUjIAdLHzux5xIfmtGrVds_qvQDpyE49HomhrhAIAAAAADAAAEAAAAAAAAAAAAAAAAACiAthKtGqNzdENdmxHI7zh_____wAAAAEAAAAAAAAAAAAAAAEAAAJnlBFKDlllqqKby-6GhNgNWybqGAW9uhr37MAsTFdZMB_AtWSc8ijLKotyMgjdoBTFzr_BKE69eAfKT2QtuCIx6WNfD6feiOKI-1cQLVbbh-QIaTyGC1LJ6zEqKxbatdKfqOhz-7QKc2lhVTqP8JqYZ_Jx0Qi3zNyWDmbqcygqnb0QZBX5GKN2mMkAn0n5gbfKFp2ePbGMhoZ2bx40oYmQgNlzwhGyACQR9UWN0Hr0I4OzaESxzOqJckT7BcSJsxOYAxlsragAqJRkc4j2pJRpJc08WF0ZwyH1X-aV0zNZHbE0Etf_V_8gAEMBSkJRW2qimhz-PGPoAbt_4lVVbjZMTZmT9xwnG8AQx-CYT8HGYQYyaySkTw_yrHr9y4RkbkZDnYJ-HDic-oXDQJH3136hclBwXO-KYegNRbSEtiSn_3Z3A2j7t4yFK-G3Jamce0g1HvhLFEALXMGC2-NzI3GZcBAeKlfXcbn-9VXngUEpL3nWdEAqoWI1RBXQBG3przgjLwthbQvpBlF6L3rnCAy3spJqkImvqrOF6V7OfscZwRXnkTm-da0MssjQZbAhH58ygmyPpfnBeoix1Tq7DDZHzWn8jOfoDHIXgZd1zcLE3EC9oaZ_kNeK_I0Mh7CuqgHFG_8GrZdfjSPlZoTKxj5vsfh6HikP9GwJTvHfWDTJhgtC2lsViYQxUBb7OI9crx6QCeFTU_e7R2dI36UvWCe-IWXblRmfl7NlvEU6Qc2zAjVRUYtGsmJjvvE0TgwXZ4Svg1ShdeiutAXlga7QKedrc3m_yk9_ov5kxaqFWvURXo2qIQlrFhoIGA5NUwohLsrRwucfbKTjbQ");
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
