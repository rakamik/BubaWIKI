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
        infobox: null
    };
    
    savePages();
    loadPage(pageId);
}

// Save current page as a new page
function savePageAs() {
    const currentTitle = document.getElementById('pageTitle').textContent;
    const newTitle = prompt('Enter the new title for this chronicle:', currentTitle);
    if (!newTitle) return;
    
    const newPageId = newTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    if (wikiPages[newPageId]) {
        if (!confirm('A chronicle with this title already exists. Overwrite it?')) {
            return;
        }
    }
    
    wikiPages[newPageId] = {
        title: newTitle,
        content: document.getElementById('contentArea').innerHTML,
        infobox: getCurrentInfoboxData()
    };
    
    savePages();
    loadPage(newPageId);
    showAllPages();
}

// Delete current page
function deletePage() {
    const pageId = document.getElementById('pageTitle').textContent.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    if (pageId === 'welcome') {
        alert('Cannot delete the welcome page!');
        return;
    }
    
    if (!confirm('Are you sure you want to delete this chronicle? This action cannot be undone.')) {
        return;
    }
    
    delete wikiPages[pageId];
    savePages();
    loadPage('welcome');
    showAllPages();
}

// Save draft
function saveDraft() {
    const currentPage = {
        title: document.getElementById('pageTitle').textContent,
        content: document.getElementById('contentArea').innerHTML,
        infobox: getCurrentInfoboxData()
    };
    localStorage.setItem('wikeDraft', JSON.stringify(currentPage));
    alert('Draft saved successfully!');
}

// Load draft
function loadDraft() {
    const draft = localStorage.getItem('wikeDraft');
    if (!draft) {
        alert('No draft found!');
        return;
    }
    
    if (!confirm('Loading draft will replace current content. Continue?')) {
        return;
    }
    
    const page = JSON.parse(draft);
    document.getElementById('pageTitle').textContent = page.title;
    document.getElementById('contentArea').innerHTML = page.content;
    if (page.infobox) {
        loadInfoboxData(page.infobox);
    }
}

// Get current infobox data
function getCurrentInfoboxData() {
    const infobox = document.getElementById('infobox');
    if (infobox.style.display === 'none') return null;
    
    const type = document.getElementById('infoboxTypeSelect').value;
    const data = {
        image: document.getElementById('infoboxImage').src,
        type: type,
        description: document.getElementById('infoboxDescription').value
    };
    
    // Add type-specific fields
    switch(type) {
        case 'character':
            data.name = document.getElementById('characterName').value;
            data.title = document.getElementById('characterTitle').value;
            data.race = document.getElementById('characterRace').value;
            data.class = document.getElementById('characterClass').value;
            break;
        case 'location':
            data.name = document.getElementById('locationName').value;
            data.locationType = document.getElementById('locationType').value;
            data.region = document.getElementById('locationRegion').value;
            break;
        case 'item':
            data.name = document.getElementById('itemName').value;
            data.itemType = document.getElementById('itemType').value;
            data.rarity = document.getElementById('itemRarity').value;
            break;
        case 'region':
            data.name = document.getElementById('regionName').value;
            data.climate = document.getElementById('regionClimate').value;
            data.terrain = document.getElementById('regionTerrain').value;
            data.features = document.getElementById('regionFeatures').value;
            data.controllingNation = document.getElementById('regionNation').value;
            break;
        case 'nation':
            data.name = document.getElementById('nationName').value;
            data.capital = document.getElementById('nationCapital').value;
            data.government = document.getElementById('nationGovernment').value;
            data.ruler = document.getElementById('nationRuler').value;
            data.majorCities = document.getElementById('nationCities').value;
            break;
        case 'dominion':
            data.nationale = document.getElementById('domNation').value;
            data.name = document.getElementById('dominionName').value;
            data.size = document.getElementById('dominionSize').value;
            data.population = document.getElementById('dominionPopulation').value;
            data.military = document.getElementById('dominionMilitary').value;
            data.resources = document.getElementById('dominionResources').value;
            data.alliances = document.getElementById('dominionAlliances').value;
            data.rivals = document.getElementById('dominionRivals').value;
            data.politics = document.getElementById('dominionPolitics').value;
            break;
    }
    
    return data;
}

// Load infobox data
function loadInfoboxData(data) {
    if (!data) {
        document.getElementById('infobox').style.display = 'none';
        return;
    }
    
    document.getElementById('infobox').style.display = 'block';
    document.getElementById('infoboxImage').src = data.image || '';
    document.getElementById('infoboxTypeSelect').value = data.type;
    document.getElementById('infoboxDescription').value = data.description || '';
    
    showInfoboxFields(data.type);
    
    switch(data.type) {
        case 'character':
            document.getElementById('characterName').value = data.name || '';
            document.getElementById('characterTitle').value = data.title || '';
            document.getElementById('characterRace').value = data.race || '';
            document.getElementById('characterClass').value = data.class || '';
            break;
        case 'location':
            document.getElementById('locationName').value = data.name || '';
            document.getElementById('locationType').value = data.locationType || '';
            document.getElementById('locationRegion').value = data.region || '';
            break;
        case 'item':
            document.getElementById('itemName').value = data.name || '';
            document.getElementById('itemType').value = data.itemType || '';
            document.getElementById('itemRarity').value = data.rarity || 'common';
            break;
        case 'region':
            document.getElementById('regionName').value = data.name || '';
            document.getElementById('regionClimate').value = data.climate || '';
            document.getElementById('regionTerrain').value = data.terrain || '';
            document.getElementById('regionFeatures').value = data.features || '';
            document.getElementById('regionNation').value = data.controllingNation || '';
            break;
        case 'nation':
            document.getElementById('nationName').value = data.name || '';
            document.getElementById('nationCapital').value = data.capital || '';
            document.getElementById('nationGovernment').value = data.government || '';
            document.getElementById('nationRuler').value = data.ruler || '';
            document.getElementById('nationCities').value = data.majorCities || '';
            break;
        case 'dominion':
            document.getElementById('domNation').value = data.nationale || '';
            document.getElementById('dominionName').value = data.name || '';
            document.getElementById('dominionSize').value = data.size || '';
            document.getElementById('dompop').value = data.population || '';
            document.getElementById('dommil').value = data.military || '';
            document.getElementById('dominionResources').value = data.resources || '';
            document.getElementById('dominionAlliances').value = data.alliances || '';
            document.getElementById('dominionRivals').value = data.rivals || '';
            document.getElementById('dominionPolitics').value = data.politics || '';
            break;
    }
}

// Load a specific page
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
    
    loadInfoboxData(page.infobox);
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

// Create new infobox
function createInfobox() {
    const type = document.getElementById('infoboxTypeSelect').value;
    document.getElementById('infobox').style.display = 'block';
    showInfoboxFields(type);
    
    // Clear all fields
    document.getElementById('infoboxImage').src = '';
    document.getElementById('infoboxDescription').value = '';
    document.querySelectorAll('.infobox-type input, .infobox-type select').forEach(input => {
        input.value = '';
    });
}

// Toggle edit mode
function toggleEdit() {
    const contentArea = document.getElementById('contentArea');
    const editButton = document.getElementById('editButton');
    const editorControls = document.getElementById('editorControls');
    
    if (contentArea.contentEditable === 'true') {
        // Save changes
        const pageId = document.getElementById('pageTitle').textContent.toLowerCase().replace(/[^a-z0-9]/g, '-');
        
        wikiPages[pageId].content = contentArea.innerHTML;
        wikiPages[pageId].infobox = getCurrentInfoboxData();
        
        contentArea.contentEditable = 'false';
        editButton.textContent = 'Edit This Page';
        editorControls.style.display = 'none';
        
        savePages();
    } else {
        contentArea.contentEditable = 'true';
        editButton.textContent = 'Save Changes';
        editorControls.style.display = 'flex';
    }
}

// Show appropriate infobox fields
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

// Insert page link
function insertPageLink() {
    const dialog = document.getElementById('linkDialog');
    dialog.style.display = 'flex';
    const searchInput = document.getElementById('linkSearch');
    searchInput.value = '';
    searchInput.focus();
    searchPages('');
}

// Close link dialog
function closeDialog() {
    document.getElementById('linkDialog').style.display = 'none';
}

// Search pages for link dialog
function searchPages(query) {
    const results = document.getElementById('searchResults');
    results.innerHTML = '';
    
    const searchTerm = query.toLowerCase();
    Object.keys(wikiPages).forEach(pageId => {
        const page = wikiPages[pageId];
        if (page.title.toLowerCase().includes(searchTerm)) {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            item.textContent = page.title;
            item.onclick = () => {
                insertLink(page.title, pageId);
                closeDialog();
            };
            results.appendChild(item);
        }
    });
}

// Insert link into content
function insertLink(title, pageId) {
    const link = document.createElement('a');
    link.className = 'wiki-link';
    link.textContent = title;
    link.setAttribute('data-page-id', pageId);
    link.onclick = () => loadPage(pageId);
    
    // Insert at cursor position or replace selection
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(link);
    
    // Move cursor after link
    range.setStartAfter(link);
    range.setEndAfter(link);
    selection.removeAllRanges();
    selection.addRange(range);
}

// Handle clicks on wiki links
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('wiki-link')) {
        const pageId = e.target.getAttribute('data-page-id');
        if (pageId && wikiPages[pageId]) {
            loadPage(pageId);
        }
    }
});

// Validate links when loading content
function validateLinks() {
    document.querySelectorAll('.wiki-link').forEach(link => {
        const pageId = link.getAttribute('data-page-id');
        if (!wikiPages[pageId]) {
            link.classList.add('broken');
            link.title = 'Page does not exist';
        } else {
            link.classList.remove('broken');
            link.title = wikiPages[pageId].title;
        }
    });
}

// Add link validation to page load
const originalLoadPage = loadPage;
loadPage = function(pageId) {
    originalLoadPage(pageId);
    validateLinks();
};

// Initialize the welcome page if it's the first visit
if (!localStorage.getItem('wikiPages')) {
    savePages();
}
