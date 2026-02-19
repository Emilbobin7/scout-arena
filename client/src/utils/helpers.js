/**
 * Format a date string into a readable format
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

/**
 * Get the auth header object for axios requests
 * @returns {{ Authorization: string } | {}}
 */
export const getAuthHeader = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
    if (userInfo?.token) {
        return { Authorization: `Bearer ${userInfo.token}` };
    }
    return {};
};

/**
 * Get the current logged-in user info from localStorage
 * @returns {object|null}
 */
export const getCurrentUser = () => {
    try {
        return JSON.parse(localStorage.getItem('userInfo') || 'null');
    } catch {
        return null;
    }
};

/**
 * Truncate text to a given length
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncate = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

/**
 * Calculate average of an array of numbers
 * @param {number[]} arr
 * @returns {number}
 */
export const average = (arr) => {
    if (!arr || arr.length === 0) return 0;
    return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
};
