window.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed');
  websdkready();
});

async function websdkready() {

  var testTool = window.testTool;
  // get meeting args from url
  var tmpArgs = testTool.parseQuery();
  var meetingConfig = {
    sdkKey: tmpArgs.sdkKey,
    meetingNumber: tmpArgs.mn,
    userName: (function () {
      if (tmpArgs.name) {
        try {
          return testTool.b64DecodeUnicode(tmpArgs.name);
        } catch (e) {
          return tmpArgs.name;
        }
      }
      return (
        "CDN#" +
        tmpArgs.version +
        "#" +
        testTool.detectOS() +
        "#" +
        testTool.getBrowserInfo()
      );
    })(),
    passWord: tmpArgs.pwd,
    leaveUrl: "https://www.wellspringoflight.com/trialmembership",
    role: parseInt(tmpArgs.role, 10),
    userEmail: (function () {
      try {
        return testTool.b64DecodeUnicode(tmpArgs.email);
      } catch (e) {
        return tmpArgs.email;
      }
    })(),
    lang: tmpArgs.lang,
    signature: tmpArgs.signature || "",
    china: tmpArgs.china === "1",
  };

  // a tool use debug mobile device
  if (testTool.isMobileDevice()) {
    vConsole = new VConsole();
  }
  // console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

  // it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
  // ZoomMtg.setZoomJSLib("https://source.zoom.us/2.14.0/lib", "/av"); // CDN version defaul
  if (meetingConfig.china)
    ZoomMtg.setZoomJSLib("https://jssdk.zoomus.cn/2.14.0/lib", "/av"); // china cdn option
  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareJssdk();
  async function beginJoin(signature) {
    ZoomMtg.init({
      leaveUrl: meetingConfig.leaveUrl,
      webEndpoint: meetingConfig.webEndpoint,
      disableCORP: !window.crossOriginIsolated, // default true
      // disablePreview: false, // default false
      externalLinkPage: './externalLinkPage.html',
      success: function () {
        ZoomMtg.i18n.load(meetingConfig.lang);
        ZoomMtg.i18n.reload(meetingConfig.lang);
        ZoomMtg.join({
          meetingNumber: meetingConfig.meetingNumber,
          userName: meetingConfig.userName,
          signature: signature,
          sdkKey: meetingConfig.sdkKey,
          userEmail: meetingConfig.userEmail,
          passWord: meetingConfig.passWord,
          success: function (res) {
            console.log("join meeting success");
            console.log("get attendeelist");
            ZoomMtg.getAttendeeslist({});
            ZoomMtg.getCurrentUser({
              success: function (res) {
                console.log("success getCurrentUser", res.result.currentUser);
              },
            });
          },
          error: function (res) {
            console.log("KILROY UNSUCCESS");
            console.log(res);
          },
        });
      },
      error: function (res) {
        console.log(res);
      },
    });

    // Target the element with the class "mini-layout-body-title"
    var divElement = document.querySelector(".mini-layout-body-title");

    if (divElement) {
      divElement.innerHTML = "Please wait.";
    }


    const joinBtn = document.getElementById("join-btn");
    async function setButtonStatus() {
      const response = await fetch("https://us-central1-wellspring-of-light.cloudfunctions.net/zoomSig/meeting/status");
      const res = await response.json();
      if (res.success && res.isOnline) {
        joinBtn.disabled = false;
        joinBtn.innerHTML = "Join";

        const labelElement = document.createElement('h2');
        labelElement.textContent = "This session is now live! Please press Join to connect with your Wellness Practice.";
        labelElement.style.color = '#ffffff';
        labelElement.style.backgroundColor = '#ff0000';
        labelElement.style.textAlign = 'center';
        labelElement.style.padding = '10px';
        joinBtn.parentNode.insertBefore(labelElement, joinBtn);
        divElement.innerHTML = "";

        // divElement.innerHTML = "This session is now live! Please press Join to connect with your Wellness Practice.";
        // divElement.style.backgroundColor = '#ff0000';
        joinBtn.classList.remove("loading");
        clearInterval(intervalId); //stop polling once online
      } else {
        joinBtn.disabled = true;
        joinBtn.innerHTML = "Waiting for host to start the meeting...";
        joinBtn.classList.add("loading");
      }
    }

    let intervalId = setInterval(async function() {
      await setButtonStatus();
    }, 10000); //every 10 seconds
    joinBtn.disabled = true;
    joinBtn.innerHTML = "Waiting for host to start the meeting...";
    joinBtn.classList.add("loading");
    divElement.innerHTML = "Please wait.";
    setButtonStatus();
  }

  beginJoin(meetingConfig.signature);

};

function triggerButtonClick() {
  // const joinBtn = document.getElementById("join-btn");
  // if (joinBtn) {
  //   joinBtn.click();
  // }
}
