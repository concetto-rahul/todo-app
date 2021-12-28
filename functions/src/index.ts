import * as functions from "firebase-functions";
const cors = require("cors")({ origin: true });
const { google } = require("googleapis");
const CLIENT_ID =
  "1091962448024-4fh5gkofkrutbumpidnt6ktdvsmb2uhs.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "http://localhost:3000/list";
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

export const helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.send({ data: { message: "Hello from Firebase!" } });
  });
});

export const generateAuthUrl = functions.https.onRequest(
  (request, response) => {
    cors(request, response, () => {
      const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URL
      );
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
      });
      response.send({ data: { authUrl } });
    });
  }
);

export const uploadFile = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const oAuth2Client = await new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URL
    );
    await oAuth2Client.getToken(
      request.body.data.code,
      async (err: any, token: any) => {
        if (err) {
          response.send({
            data: {
              status: false,
              error: "Error retrieving access token",
              data: {},
            },
          });
        } else {
          await oAuth2Client.setCredentials(token);
          const drive = await google.drive({ version: "v3", auth: oAuth2Client });
          await drive.files.create(
            {
              requestBody: {
                name: "todoAppData.json",
                mimeType: "application/json",
              },
              media: {
                mimeType: "application/json",
                body: JSON.stringify(request.body.data.listData),
              },
              fields: "id",
            },
            function (err: any, file: any) {
              if (err) {
                response.send({
                  data: {
                    status: false,
                    error: err,
                    data: {},
                  },
                });
              } else {
                response.send({
                  data: {
                    status: true,
                    error: "",
                    data: file.data,
                  },
                });
              }
            }
          );
        }
      }
    );
  });
});
