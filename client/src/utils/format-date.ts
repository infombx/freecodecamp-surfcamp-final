export function formatDate(dateString: string | Date): string {
    try {
        // Parse ISO string to Date object
        const date = dateString ? new Date(dateString) : new Date();

        // Check if the date is valid
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date string");
        }

        // Format the date to Intl.DateTimeFormat for more consistent results
        const formatter = new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        return formatter.format(date);
    } catch (error) {
        console.error(`Error formatting date: ${dateString}`, error);
        return "Invalid date";
    }
}