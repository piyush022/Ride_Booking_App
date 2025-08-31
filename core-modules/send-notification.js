async function sendNotification(rider, ride) {
  console.log("==>notification sent to", rider.name);
  return true;
}

module.exports = sendNotification;
