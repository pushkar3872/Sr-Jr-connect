export default function formatMessageTime(date) {
    return new Date(date).toLocaleDateString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata"
    });
};
// Compare this snippet from backend/src/controllers/messageController.js: