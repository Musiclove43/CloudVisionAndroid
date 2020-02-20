import React, { Component } from 'react';
import Scan from './scan';
import config from './config';

console.log("Camera containerr")


class CameraContainer extends Component {
//   componentDidMount() {
//     console.log('GrandChild did mount.');
//
// var url= "https://accounts.google.com/o/oauth2/auth";
// var token_  // variable will store the token
// var userName = config.googleCloud.client_email; // app clientID
// var passWord = config.googleCloud.private_key; // app clientSecret
// var caspioTokenUrl = "https://oauth2.googleapis.com/token"; // Your application token endpoint
// var clientID = config.googleCloud.client_id
// var request = new XMLHttpRequest();
//
// function getToken(url, clientID, passWord) {
//     var key;
//     request.open("POST", url, true);
//     request.setRequestHeader("Content-type", "application/json", "application/x-www-form-urlencoded");
//     request.send(JSON.stringify(
//     {"alg":"RS256",
//     "typ":"JWT",
//     "iss":"react-app-ss@gatesdemo-229018.iam.gserviceaccount.com",
//     "scope":"https://accounts.google.com/o/oauth2/auth",
//     "aud":"https://oauth2.googleapis.com/token",
//     "exp":1328554385,
//     "iat":1328550785,
//   }
//
// )); // specify the credentials to receive the token on request
//     request.onreadystatechange = function () {
//         if (request.readyState == request.DONE) {
//             var response = request.responseText;
//             var obj = JSON.parse(response);
//             key = obj.access_token; //store the value of the accesstoken
//             token_ = key; // store token in your global variable "token_" or you could simply return the value of the access token from the function
//         }
//         console.log(obj);
//     }
//
// }
// // Get the token
// getToken(caspioTokenUrl, userName, passWord);
//
//   }
//
//
//
    constructor(props) {
        super(props);
        this.state = {
            camera: false,
            cameraResult: false,
            result: null,
            visionResponse: '',
            loading: false,
            googleVisionDetetion: undefined
        };
    }

    takePicture = async (value) => {
        if (value) {
            const options = { quality: 0.5, base64: true };
            const data = await value.takePictureAsync(options);
            console.log(data);
            this.setState({
                cameraResult: true,
                result: data.base64,
                camera: false
            }, () =>
                    this.callGoogleVIsionApi(this.state.result))
            this.setState({ loading: true });
        }
    };

    callGoogleVIsionApi = async (base64, name, password) => {
        let googleVisionRes = await fetch(config.googleCloud.api, {
            method: 'POST',
            headers: {
              Authorization:
                     'Bearer (ya29.Il-_B9lpBJGbF_-lpWPiEK3_crqVYIhYexgiBwG71NdMzMCihZOhn_NygLP7fn_D9WURtvFs5g2umZ7sKNjQ_ToxeIKRlzB26maCK75GyIhXd-6rTKyIMUmz-RYacUQjsA)',
                   'Content-Type': 'application/json',
   },
    contentType: 'application/json',
            body: JSON.stringify({

                "payload": [
                    {
                        "image": {
                            "imageBytes": base64
                        },

                    }
                ]
            })
        });

        await googleVisionRes.json()
            .then(googleVisionRes => {
                console.log("this is a response from server" + googleVisionRes)
                if (googleVisionRes) {
                    this.setState(
                        {
                            loading: false,
                            googleVisionDetetion: googleVisionRes.responses[0]
                        }
                    )
                    console.log('response', this.state.googleVisionDetetion);
                }
            }).catch((error) => { console.log("error" + error) })
    }
    activeCamera = () => {
      console.log("we are a camera")
        this.setState({
            camera: true

        })
    }
    clickAgain = () => {
        this.setState({
            camera: true,
            googleVisionDetetion: false,
            loading: false
        })
    }
    render() {
        const { camera, cameraResult, result, googleVisionDetetion, loading } = this.state
        return (
            <Scan

                camera={camera}
                cameraResult={cameraResult}
                result={result}
                clickAgain={this.clickAgain}
                takePicture={(value) => this.takePicture(value)}
                activeCamera={this.activeCamera}
                googleVisionDetetion={googleVisionDetetion}
                loading={loading}
            />
        );
    }
}

export default CameraContainer;
