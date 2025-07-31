
// Import required classes (adjust the import path if needed)
const { RoomNextAdapter, RoomNextAuth, RoomNextTimeFrame, RoomNextDatetime, BookingSuggestionsRequest } = require('roomnext');

// Define credentials (replace with your actual values or use environment variables)
const client_name = 'your_client_name';
const client_password = 'your_client_password';
const user_name = 'your_user_name';
const user_password = 'your_user_password';

async function main() {
    const adapter = new RoomNextAdapter();
    const auth = new RoomNextAuth(client_name, client_password, user_name, user_password);

    try {
        await auth.loginClientAndUser();
        // Proceed with API calls after successful login
        const timeFrames = [];
        const timeFrame = new RoomNextTimeFrame();
        timeFrame.begin = new RoomNextDatetime('2023-10-20 08:00:00'); // Example start time
        timeFrame.end = new RoomNextDatetime('2023-10-20 09:00:00'); // Example end time
        timeFrames.push(timeFrame);

        const request = new BookingSuggestionsRequest(auth, timeFrames);
        const response = await adapter.getBookingSuggestions(request);
        // Handle the response
        for (const populated of response.populatedObjects) {
            console.log(populated.object_id + ' Name: ' + populated.object_name + ' Location: ' + populated.toLocationString());
        }
    } catch (error) {
        console.log(error);
    }
}

main();