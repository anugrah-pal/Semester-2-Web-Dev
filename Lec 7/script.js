const API_KEY = "b69e40a0c4a144bf89d75137263001";
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

const input = document.getElementById("nav-input");
const searchBtn = document.getElementById("searchBtn");
const statusMsg = document.getElementById("statusMsg");

const tempEl = document.getElementById("temp");
const cityEl = document.getElementById("city");
const timeEl = document.getElementById("time");
const dayEl = document.getElementById("day");
const dateEl = document.getElementById("date");
const iconImg = document.getElementById("icon");
const conditionEl = document.getElementById("condition");

function setStatus(message, type = "info") {
  statusMsg.textContent = message;
  statusMsg.className = "status " + type;
}

function formatDateParts(localtimeStr) {
  const dt = new Date(localtimeStr.replace(" ", "T"));

  const timeStr = dt.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const dayStr = dt.toLocaleDateString("en-GB", { weekday: "long" });
  const dateStr = dt.toLocaleDateString("en-GB").replace(/\//g, ".");

  return { timeStr, dayStr, dateStr };
}

async function fetchWeather(query) {
  if (!query) {
    setStatus("Please enter a city or place name.", "error");
    return;
  }

  setStatus("Fetching weather...", "info");

  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&aqi=no`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      setStatus("Location not found or API error.", "error");
      return;
    }

    const data = await res.json();
    renderWeather(data);
    setStatus(`Showing weather for "${data.location.name}".`, "success");
  } catch (error) {
    setStatus("Network error. Check your internet.", "error");
  }
}

function renderWeather(data) {
  const { location, current } = data;
  const { timeStr, dayStr, dateStr } = formatDateParts(location.localtime);

  tempEl.textContent = Math.round(current.temp_c) + " °C";
  cityEl.textContent = location.name;
  timeEl.textContent = timeStr;
  dayEl.textContent = dayStr;
  dateEl.textContent = dateStr;

  conditionEl.textContent = current.condition.text;
  iconImg.src = "https:" + current.condition.icon;
  iconImg.alt = current.condition.text;
  iconImg.style.display = "block";
}

function handleSearch() {
  fetchWeather(input.value.trim());
}

searchBtn.addEventListener("click", handleSearch);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});

// Default city
fetchWeather("London");