// apiService.js

const BASE_URL = 'https://codtsmartschool.strangeweb.in';

// Fetch Data Function
const fetchData = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}/get.php?query=${encodeURIComponent(query)}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { data: null, error: errorData.error || 'An error occurred while fetching data.' };
        }

        const result = await response.json();

        if (result.success) {
            return { data: result.data, error: null };
        } else {
            return { data: null, error: result.error || 'An unknown error occurred.' };
        }
    } catch (err) {
        return { data: null, error: err.message || 'An error occurred while fetching data.' };
    }
};

// Update User Status Function
const updateUserStatus = async (userId, status) => {
    const requestBody = new URLSearchParams();
    requestBody.append('id', userId);
    requestBody.append('status', status);

    try {
        const response = await fetch(`${BASE_URL}/studentapi/update-status.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: requestBody,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error updating user status');
        }

        const data = await response.json();
        return data; // Return the data received from the API
    } catch (error) {
        throw new Error(error.message || 'Error updating user status');
    }
};

// Export both functions as named exports
export { fetchData, updateUserStatus };
