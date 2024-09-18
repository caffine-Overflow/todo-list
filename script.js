
        const apiUrl = 'https://crudcrud.com/api/1cfc2016931c465cbe1930e1fb404a24/todos';

        // Add item function
        function addItem(itemText) {
            const newItem = {
                text: itemText,
                done: false
            };

            axios.post(apiUrl, newItem)
                .then(response => {
                    displayItem(response.data);
                })
                .catch(error => {
                    console.error('Error adding item:', error);
                });
        }

        // Display item in the appropriate list
        function displayItem(item) {
            const list = item.done ? document.getElementById('doneList') : document.getElementById('todoList');
            const listItem = document.createElement('li');
            listItem.textContent = item.text;

            if (!item.done) {
                const doneButton = document.createElement('button');
                doneButton.textContent = 'Mark as Done';
                doneButton.addEventListener('click', () => updateItem(item._id, listItem));
                listItem.appendChild(doneButton);
            }

            list.appendChild(listItem);
        }

        // Update item function (Mark as Done)
        function updateItem(itemId, listItem) {
            const updatedItem = {
                done: true
            };

            axios.put(`${apiUrl}/${itemId}`, updatedItem)
                .then(() => {
                    // Remove item from To-Do list and move it to Done list
                    document.getElementById('todoList').removeChild(listItem);
                    displayItem({ ...updatedItem, text: listItem.textContent });
                })
                .catch(error => {
                    console.error('Error updating item:', error);
                });
        }

        // Example usage: Adding an item
        document.getElementById('addItemButton').addEventListener('click', () => {
            const itemText = document.getElementById('itemInput').value;
            if (itemText.trim() !== "") {
                addItem(itemText);
                document.getElementById('itemInput').value = "";  // Clear input field
            }
        });
   
