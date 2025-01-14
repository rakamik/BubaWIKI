// Store wiki pages in localStorage
let wikiPages = JSON.parse(localStorage.getItem('wikiPages')) || {
    'welcome': {
        title: 'Welcome to Buba Wiki',
        content: document.getElementById('contentArea').innerHTML,
        infobox: {
            image: '',
            type: 'main',
            description: 'Welcome to the magical realm of knowledge'
        }
    }
};

// Save pages to localStorage
function savePages() {
    localStorage.setItem('wikiPages', JSON.stringify(wikiPages));
}

// Create a new page
function createNewPage() {
    const title = prompt('Enter the title of your new chronicle:');
    if (!title) return;
    
    const pageId = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    if (wikiPages[pageId]) {
        alert('A chronicle with this title already exists!');
        return;
    }
    
    wikiPages[pageId] = {
        title: title,
        content: '<p>Begin writing your tale here...</p>',
        infobox: {
            image: '',
            type: 'character',
            description: 'Describe this entry...',
            name: '',
            title: '',
            race: '',
            class: ''
        }
    };
    
    savePages();
    loadPage(pageId);
    showAllPages();
}

// Load a specific page with infobox
function loadPage(pageId) {
    const page = wikiPages[pageId];
    if (!page) return;
    
    document.getElementById('pageTitle').textContent = page.title;
    document.getElementById('contentArea').innerHTML = page.content;
    document.getElementById('contentArea').contentEditable = 'false';
    document.getElementById('editButton').textContent = 'Edit This Page';
    document.getElementById('editorControls').style.display = 'none';
    document.getElementById('pageList').style.display = 'none';
    document.getElementById('pageContent').style.display = 'block';
    
    // Setup infobox
    const infobox = document.getElementById('infobox');
    if (page.infobox) {
        // Set common fields
        document.getElementById('infoboxImage').src = page.infobox.image || '';
        document.getElementById('infoboxTypeSelect').value = page.infobox.type;
        document.getElementById('infoboxDescription').value = page.infobox.description;
        
        // Show appropriate fields based on type
        showInfoboxFields(page.infobox.type);
        
        // Set type-specific fields
        switch(page.infobox.type) {
            case 'character':
                document.getElementById('characterName').value = page.infobox.name || '';
                document.getElementById('characterTitle').value = page.infobox.title || '';
                document.getElementById('characterRace').value = page.infobox.race || '';
                document.getElementById('characterClass').value = page.infobox.class || '';
                break;
            case 'location':
                document.getElementById('locationName').value = page.infobox.name || '';
                document.getElementById('locationType').value = page.infobox.locationType || '';
                document.getElementById('locationRegion').value = page.infobox.region || '';
                break;
            case 'item':
                document.getElementById('itemName').value = page.infobox.name || '';
                document.getElementById('itemType').value = page.infobox.itemType || '';
                document.getElementById('itemRarity').value = page.infobox.rarity || 'common';
                break;
        }
        
        infobox.style.display = 'block';
    } else {
        infobox.style.display = 'none';
    }
}

// Show list of all pages
function showAllPages() {
    const pageList = document.getElementById('pageList');
    const wikiPagesList = document.getElementById('wikiPages');
    const pageContent = document.getElementById('pageContent');
    
    wikiPagesList.innerHTML = '';
    
    Object.keys(wikiPages).forEach(pageId => {
        const li = document.createElement('li');
        li.textContent = wikiPages[pageId].title;
        li.onclick = () => loadPage(pageId);
        wikiPagesList.appendChild(li);
    });
    
    pageList.style.display = 'block';
    pageContent.style.display = 'none';
}

// Toggle edit mode with rich text editor
function toggleEdit() {
    const contentArea = document.getElementById('contentArea');
    const editButton = document.getElementById('editButton');
    const editorControls = document.getElementById('editorControls');
    
    if (contentArea.contentEditable === 'true') {
        // Save changes
        const pageId = document.getElementById('pageTitle').textContent.toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        // Save content
        wikiPages[pageId].content = contentArea.innerHTML;
        
        // Save infobox data based on type
        const type = document.getElementById('infoboxTypeSelect').value;
        const infoboxData = {
            image: document.getElementById('infoboxImage').src,
            type: type,
            description: document.getElementById('infoboxDescription').value
        };
        
        // Add type-specific fields
        switch(type) {
            case 'character':
                infoboxData.name = document.getElementById('characterName').value;
                infoboxData.title = document.getElementById('characterTitle').value;
                infoboxData.race = document.getElementById('characterRace').value;
                infoboxData.class = document.getElementById('characterClass').value;
                break;
            case 'location':
                infoboxData.name = document.getElementById('locationName').value;
                infoboxData.locationType = document.getElementById('locationType').value;
                infoboxData.region = document.getElementById('locationRegion').value;
                break;
            case 'item':
                infoboxData.name = document.getElementById('itemName').value;
                infoboxData.itemType = document.getElementById('itemType').value;
                infoboxData.rarity = document.getElementById('itemRarity').value;
                break;
        }
        
        wikiPages[pageId].infobox = infoboxData;
        
        contentArea.contentEditable = 'false';
        editButton.textContent = 'Edit This Page';
        editorControls.style.display = 'none';
        
        savePages();
    } else {
        // Enter edit mode
        contentArea.contentEditable = 'true';
        editButton.textContent = 'Save Changes';
        editorControls.style.display = 'flex';
    }
}

// Show appropriate infobox fields based on type
function showInfoboxFields(type) {
    document.querySelectorAll('.infobox-type').forEach(div => {
        div.style.display = 'none';
    });
    document.querySelector(`.infobox-type.${type}`).style.display = 'block';
}

// Change infobox type
function changeInfoboxType() {
    const type = document.getElementById('infoboxTypeSelect').value;
    showInfoboxFields(type);
}

// Format text in the editor
function formatText(command) {
    document.execCommand(command, false, null);
}

// Create lists
function formatList(type) {
    if (type === 'bullet') {
        document.execCommand('insertUnorderedList', false, null);
    } else {
        document.execCommand('insertOrderedList', false, null);
    }
}

// Toggle infobox visibility
function toggleInfobox() {
    const infobox = document.getElementById('infobox');
    infobox.style.display = infobox.style.display === 'none' ? 'block' : 'none';
}

// Change infobox image
function changeInfoboxImage() {
    const imageUrl = prompt('Enter the URL of the image:');
    if (imageUrl) {
        document.getElementById('infoboxImage').src = imageUrl;
    }
}

// Initialize the welcome page if it's the first visit
if (!localStorage.getItem('wikiPages')) {
    savePages();
}
