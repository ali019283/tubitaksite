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

function searchplace() {
  const input = document.getElementById('search-bar').value.trim().toLowerCase();
  const iframe = document.getElementById('map');
  const infoPanel = document.getElementById('info-panel');
  const panelImage = document.getElementById('panel-image');
  const panelText = document.getElementById('panel-text');

  if (predefinedSearchTerms.includes(input)) {
    iframe.src = `https://www.google.com/maps?q=${encodeURIComponent(input)},Istanbul+Turkey&output=embed`;
    const imagePath = `${input}.jpg`;
    panelImage.style.backgroundImage = `url('${imagePath}')`;
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      panelText.innerHTML = event.target.result;
      infoPanel.style.display = 'block';
    };
    fileReader.onerror = function(event) {
      console.error('Error reading file:', event.target.error);
      panelText.innerHTML = 'Error reading content. Please try again later.';
      infoPanel.style.display = 'block';
    };
    const filePath = `${input}.txt`;
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('File not found');
        }
        return response.blob();
      })
      .then(blob => {
        fileReader.readAsText(blob);
      })
      .catch(error => {
        console.error('Error fetching or reading file:', error);
        panelText.innerHTML = 'Error fetching content. Please try again later.';
        infoPanel.style.display = 'block';
      });
  } else {
    iframe.src = `https://www.google.com/maps?q=Istanbul+Turkey&output=embed`;
    infoPanel.style.display = 'none';
  }
}
