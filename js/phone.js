const loadPhone = async (searchText = "13", isShow) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShow);
};

const displayPhones = (phones, isShow) => {
  // console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  const showAllContainer = document.getElementById("show-all-button");
  if (phones.length > 12 && !isShow) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  // console.log('isShow',isShow)
  if (!isShow) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-8 mt-8 bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
          <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions">
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>

        `;
    phoneContainer.appendChild(phoneCard);
  });

  toggleloader(false);
};

const handleShowDetails = async (id) => {
  // console.log('click hoiche',id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  phoneDetails(phone);
};

const phoneDetails = (phone) => {
  console.log(phone);

  const phoneName = document.getElementById("phone-name");
  phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById(
    "show-details-container"
  );
  showDetailsContainer.innerHTML = `
  <img src = "${phone.image}" alt = "" />
  <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
  <p><span>Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
  <p><span>displaySize: </span>${phone?.mainFeatures?.displaySize}</p>
  <p><span>memory: </span>${phone?.mainFeatures?.memory}</p>
  <p><span>sensors: </span>${phone?.mainFeatures?.sensors}</p>
  <p><span>GPS: </span>${phone?.others?.GPS || 'No GPS'}</p>
  `;
  show_modal.showModal();
};

const handleSearch = (isShow) => {
  toggleloader(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText, isShow);
};
const toggleloader = (isLoading) => {
  const loadingSpiner = document.getElementById("loading");
  if (isLoading) {
    loadingSpiner.classList.remove("hidden");
  } else {
    loadingSpiner.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};

