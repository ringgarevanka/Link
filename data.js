fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Filling data in HTML elements
        document.title = data.title;

        const authorMeta = document.querySelector('meta[name="author"]');
        if (authorMeta) authorMeta.setAttribute('content', data.author);

        const copyrightMeta = document.querySelector('meta[name="copyright"]');
        if (copyrightMeta) copyrightMeta.setAttribute('content', data.copyright);

        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta) descriptionMeta.setAttribute('content', data.description);

        const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
        if (ogDescriptionMeta) ogDescriptionMeta.setAttribute('content', data.meta.ogDescription);

        const ogImageMeta = document.querySelector('meta[property="og:image"]');
        if (ogImageMeta) ogImageMeta.setAttribute('content', data.meta.ogImage);

        const ogTitleMeta = document.querySelector('meta[property="og:title"]');
        if (ogTitleMeta) ogTitleMeta.setAttribute('content', data.meta.ogTitle);

        const appleTouchIconLink = document.querySelector('link[rel="apple-touch-icon"]');
        if (appleTouchIconLink) appleTouchIconLink.setAttribute('href', data.meta.appleTouchIcon);

        const faviconLink = document.querySelector('link[rel="icon"]');
        if (faviconLink) faviconLink.setAttribute('href', data.meta.favicon);

        const profilePictureImg = document.querySelector('#profilePicture img');
        if (profilePictureImg) profilePictureImg.setAttribute('src', data.profilePicture);

        const userNameElem = document.getElementById('userName');
        if (userNameElem) userNameElem.innerText = data.userName;

        const hashtagElem = document.getElementById('hashtag');
        if (hashtagElem) hashtagElem.innerText = data.hashtag;

        // Fill in the data in the links section
        const linksDiv = document.getElementById('links');
        if (linksDiv) {
            data.links.forEach(link => {
                const a = document.createElement('a');
                a.className = 'link';
                a.href = link.href;
                a.target = '_blank';
                a.innerHTML = `<i class="${link.icon}">&nbsp;</i>${link.text}`;
                linksDiv.appendChild(a);
            });
        }
    })
    .catch(error => console.error('Error fetching data:', error));
