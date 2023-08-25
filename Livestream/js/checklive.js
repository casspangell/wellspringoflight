// import supabase from "../config/supabaseClient";
//
// // Function to send a GET request
// async function sendGetRequest() {
//     console.log(supabase);
//     // const url = 'https://eo5eyx2h4zjuvsj.m.pipedream.net/';
//     //
//     // try {
//     //     const response = await fetch(url);
//     //     const data = await response.text();
//     //     console.log('Response:', data);
//     //
//     //     // Check if the response meets the condition "meeting.ended"
//     //     if (data === 'meeting.started') {
//     //         console.log("Started.")
//     //         triggerButtonClick();
//     //         clearInterval(intervalId); // Stop the interval
//     //     } else {
//     //         console.log("Waiting.")
//     //     }
//     // } catch (error) {
//     //     console.error('Error fetching data:', error);
//     // }
// }
//
// function triggerButtonClick() {
//     const joinBtn = document.getElementById("join-btn");
//     if (joinBtn) {
//         joinBtn.click();
//     }
// }
//
// // Call the function every 5 seconds using setInterval
// const intervalId = setInterval(sendGetRequest, 5000);
