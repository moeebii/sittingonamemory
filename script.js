const channel = "sitting-on-a-memory"
fetch('https://api.are.na/v2/channels/sitting-on-a-memory/contents')
    .then(response => response.json())
    .then(data => {
        
        const posts = data.contents.reverse()        
        
        posts.forEach(post => {        
            const original = post.image.original.url	        		        	            
            const link = document.createElement("a")                       
            const img = document.createElement("img")
            
            img.setAttribute("src", original)

            link.appendChild(img)                  
            document.body.appendChild(link)
        })
    })