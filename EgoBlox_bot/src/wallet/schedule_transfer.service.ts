async function schedulePayment(timeInMs: number, amount: number, cryptoAddress: string): Promise<void> {
    if (timeInMs <= 0) {
        throw new Error("Time must be greater than zero.");
    }

    console.log(Payment scheduled: Amount - ${amount}, Address - ${cryptoAddress}. Sending in ${timeInMs} ms.);

    // Wait for the specified time
    await new Promise(resolve => setTimeout(resolve, timeInMs));

    // Simulate sending payment details
    try {
        await sendPaymentDetails(amount, cryptoAddress);
        console.log("Payment details sent successfully!");
    } catch (error) {
        console.error("Failed to send payment details:", error);
    }
}

// Mock function to simulate sending payment details
async function sendPaymentDetails(amount: number, cryptoAddress: string): Promise<void> {
    // Simulate an API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(Details sent: Amount - ${amount}, Address - ${cryptoAddress});
}

// Example usage:
schedulePayment(5000, 0.05, "0x1234567890abcdef1234567890abcdef12345678")
    .then(() => console.log("Process completed."))
    .catch(error => console.error("Error:", error));
