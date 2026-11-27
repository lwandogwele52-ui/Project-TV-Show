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
    const card = createEpisodeCard(episode);
    episodesContainer.appendChild(card);
  });
  rootElem.append(episodesContainer);
}

function createEpisodeCard(episode) {
  const episodeCard = document.createElement("article");
  episodeCard.className = "episode-card";

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

window.onload = setup;
