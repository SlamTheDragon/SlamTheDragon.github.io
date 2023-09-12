/**
 * Focuses on the HTML element with the specified ID.
 * @param {string} id - The ID of the HTML element to focus on.
 * @returns {boolean} Returns true if the element was successfully focused, false otherwise.
 */
function focusComponent(id: string) {
    const element = document.getElementById(id);
    element?.focus();
    return true;
}

export { focusComponent };