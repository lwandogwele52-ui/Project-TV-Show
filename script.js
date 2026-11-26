//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
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

  episodeList.forEach((episode) => {
    const episodeCard = document.createElement("article");
    episodeCard.className = "episode-card";

    const titleElem = document.createElement("h2");
    const code = formatEpisodeCode(episode.season, episode.number);
    titleElem.textContent = `${episode.name} — ${code}`;

    const imageElem = document.createElement("img");
    imageElem.src = episode.image ? episode.image.medium : "";
    imageElem.alt = `${episode.name} (${code})`;

    const summaryElem = document.createElement("div");
    summaryElem.className = "episode-summary";
    summaryElem.innerHTML = episode.summary || "<p>No summary available.</p>";

    episodeCard.append(titleElem, imageElem, summaryElem);
    episodesContainer.appendChild(episodeCard);
  });

  const attributionElem = document.createElement("footer");
  attributionElem.className = "tvmaze-attribution";
  attributionElem.innerHTML =
    'Data originally from <a href="https://www.tvmaze.com/" target="_blank" rel="noopener noreferrer">TVMaze.com</a>.';

  rootElem.append(episodesContainer, attributionElem);
}

window.onload = setup;
