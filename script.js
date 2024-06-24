const predefinedSearchTerms = ['ayasofya', 'sultan ahmet', 'topkapı sarayı'];

function toggleDropdown() {
  const dropdownMenu = document.getElementById('dropdown-menu');
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

function selectDropdownItem(item) {
  const searchInput = document.getElementById('search-bar');
  searchInput.value = item;
  toggleDropdown();
}

async function fetchFileContent(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('File not found');
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching or reading file:', error);
    return null;
  }
}

function updateInfoPanel(content, imagePath) {
  const infoPanel = document.getElementById('info-panel');
  const panelImage = document.getElementById('panel-image');
  const panelText = document.getElementById('panel-text');

  if (content) {
    panelText.innerHTML = content;
  } else {
    panelText.innerHTML = 'Error fetching content. Please try again later.';
  }
  panelImage.style.backgroundImage = `url('${imagePath}')`;
  infoPanel.style.display = 'block';
}

async function searchPlace() {
  const input = document.getElementById('search-bar').value.trim().toLowerCase();
  const iframe = document.getElementById('map');
  
  if (predefinedSearchTerms.includes(input)) {
    iframe.src = `https://www.google.com/maps?q=${encodeURIComponent(input)},Istanbul+Turkey&output=embed`;
    
    const imagePath = `${input}.jpg`;
    const filePath = `${input}.txt`;

    const content = await fetchFileContent(filePath);
    updateInfoPanel(content, imagePath);
  } else {
    iframe.src = `https://www.google.com/maps?q=Istanbul+Turkey&output=embed`;
    document.getElementById('info-panel').style.display = 'none';
  }
}

