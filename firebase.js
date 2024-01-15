import { initializeApp } from "firebase/app";
import { getPerformance } from "firebase/performance";

const firebaseConfig = {
    apiKey: "AIzaSyBsQse1mKxQ1F7-l41RE1Oz4QhP91qgmLw",
    authDomain: "clubbox-system.firebaseapp.com",
    projectId: "clubbox-system",
    storageBucket: "clubbox-system.appspot.com",
    messagingSenderId: "359955007424",
    appId: "1:359955007424:web:67ba150aad7d439d6eea25",
    measurementId: "G-D9WWVVXX7W"
  };
  

  const app = initializeApp(firebaseConfig);
const perf = getPerformance(app);

export { app, perf };








/*const sendWhatsAppMessage = async () => {
  const accountSid = "ACcc18256591c95ab8a2d72a53baaf3fa1";
  const authToken = "538283108a6d7f5bfdfeeee7e0a8b229";
  const twilioPhoneNumber = "+14155238886";
  const toPhoneNumber = "+967777406062"; // The recipient's WhatsApp number
  const twilio = require("twilio");

  // Create a Twilio client
  const client = twilio(accountSid, authToken);

  if (!client) {
      console.error("Failed to create Twilio client");
      return;
  }

  try {
      // Send a WhatsApp message
      const message = await client.messages.create({
          body: "This is done through Twilio",
          from: `whatsapp:${twilioPhoneNumber}`,
          to: `whatsapp:${toPhoneNumber}`,
      });

      console.log("WhatsApp message sent:", message.sid);
  } catch (error) {
      console.error("Error sending WhatsApp message:", error.message);
  }
};

// Call the function
sendWhatsAppMessage();
*/



