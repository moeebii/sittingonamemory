const channel = "sitting-on-a-memory"; // Your channel name

// Fetch content from the Are.na channel
fetch('https://api.are.na/v2/channels/' + channel + '/contents')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log("API Response:", data); // Log API response for debugging
        const posts = data.contents.reverse();

        if (posts.length === 0) {
            console.log("No content found in this channel.");
        }

        const contentContainer = document.getElementById("content-container");

        posts.forEach(post => {
            // Create a container for each post
            const postBox = document.createElement("div");
            postBox.classList.add("post-box");

            // Handle text blocks
            if (post.class === "Text" && post.content) {
                const textElement = document.createElement("p");
                textElement.textContent = post.content;
                postBox.appendChild(textElement);
            }

            // Handle image blocks
            if (post.image && post.image.original.url) {
                const imgElement = document.createElement("img");
                imgElement.setAttribute("src", post.image.original.url);
                postBox.appendChild(imgElement);
            }

            // Handle link blocks
            if (post.class === "Link" && post.source && post.source.url) {
                const linkElement = document.createElement("a");
                linkElement.setAttribute("href", post.source.url);
                linkElement.textContent = post.title ? post.title : post.source.url;
                postBox.appendChild(linkElement);
            }

            // Append the post container to the content container
            contentContainer.appendChild(postBox);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
