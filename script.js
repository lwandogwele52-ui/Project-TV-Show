//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

  populateEpisodeSelector(allEpisodes);

  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", () => {
    handleSearch(allEpisodes);
  });

  const selectElem = document.getElementById("episode-select");
  selectElem.addEventListener("change", (event) => {
    const selectedId = event.target.value;
    if (!selectedId) return; // Ignore if they select the default "Select..."

    // Clear the search box and show all episodes so the target card is definitely on the page
    document.getElementById("search-input").value = "";
    makePageForEpisodes(allEpisodes);

    // Find the card and scroll to it
    const targetCard = document.getElementById(`episode-${selectedId}`);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth" });
    }
  });
}

function formatEpisodeCode(season, number) {
  const paddedSeason = String(season).padStart(2, "0");
  const paddedNumber = String(number).padStart(2, "0");
  return `S${paddedSeason}E${paddedNumber}`;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  const episodesContainer = document.createElement("section");
  episodesContainer.className = "episodes-list";

  document.getElementById("match-count").textContent =
    `Displaying ${episodeList.length} episodes`;

  episodeList.forEach((episode) => {
    const card = createEpisodeCard(episode);
    episodesContainer.appendChild(card);
  });
  rootElem.append(episodesContainer);
}

function createEpisodeCard(episode) {
  const episodeCard = document.createElement("article");
  episodeCard.className = "episode-card";

  episodeCard.id = `episode-${episode.id}`;

  const titleElem = document.createElement("h2");
  const code = formatEpisodeCode(episode.season, episode.number);
  titleElem.textContent = `${episode.name} — ${code}`;

  const imageElem = document.createElement("img");
  if (episode.image) {
    imageElem.src = episode.image.medium;
  } else {
    imageElem.style.display = "none";
  }
  imageElem.alt = `${episode.name} (${code})`;

  const summaryElem = document.createElement("div");
  summaryElem.className = "episode-summary";
  if (episode.summary) {
    // Strip the <p> tags so we have clean text for searching and displaying
    summaryElem.textContent = episode.summary
      .replace("<p>", "")
      .replace("</p>", "");
  } else {
    summaryElem.textContent = "No summary available.";
  }

  episodeCard.append(titleElem, imageElem, summaryElem);
  return episodeCard;
}

function handleSearch(episodeList) {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();

  const filteredEpisodes = episodeList.filter((episode) => {
    const nameMatches = episode.name.toLowerCase().includes(searchTerm);
    const summaryMatches =
      episode.summary && episode.summary.toLowerCase().includes(searchTerm);

    return nameMatches || summaryMatches;
  });

  makePageForEpisodes(filteredEpisodes);
}

function populateEpisodeSelector(episodeList) {
  const selectElem = document.getElementById("episode-select");
  for (const episode of episodeList) {
    const option = document.createElement("option");
    option.textContent =
      episode.name + " - " + formatEpisodeCode(episode.season, episode.number);
    option.value = episode.id;
    selectElem.appendChild(option);
  }
}

window.onload = setup;
