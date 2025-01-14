// apiService.js

export const fetchUsers = async (query, pageNumber) => {
    try {
        const res = await fetch('https://codtsmartschool.strangeweb.in/studentapi/getallusers.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, page: pageNumber }),
        });
  
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
  
        const data = await res.json();
        let records = Array.isArray(data) ? data : data.records || data.data || [];
  
        // Ensure no duplicates in the fetched data
        records = [...new Map(records.map(item => [item.id, item])).values()];
  
        return records;
    } catch (error) {
        throw new Error(error.message);
    }
  };
  