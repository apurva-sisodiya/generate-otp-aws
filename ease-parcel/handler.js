'use strict';

const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require('uuid');

const dynamoDbClient = new DynamoDBClient({ region: "us-east-1" });

module.exports.createOtp = async (event) => {
  console.log("inside createOtp lambda with event", event);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const parcelId = uuidv4();

  // Prepare the item to be stored in DynamoDB
  const putItemCommand = new PutItemCommand({
      TableName: "ParcelOtpTable",
      Item: {
          parcelId: { S: parcelId },
          otp: { N: otp },
          name: { S: "neeraj2" },
          emailId: { S: "abc@gmail.com" }
      }
  });

  
  try {
    // Store the OTP in DynamoDB
    await dynamoDbClient.send(putItemCommand);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "OTP generated and stored successfully" })
    };
} catch (error) {
    console.error("Error storing OTP in DynamoDB:", error);
    return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error storing OTP in DynamoDB" })
    };
}

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

// return {
//   statusCode: 200,
//   body: JSON.stringify(
//     {
//       message: 'Go Serverless v1.0! Your function executed successfully!',
//       input: event,
//     },
//     null,
//     2
//   ),
// };
