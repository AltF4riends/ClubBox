const sendWhatsAppMessage = async () => {
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
