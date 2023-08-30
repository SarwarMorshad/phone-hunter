const loadPhone = async (searchText = "13", isShowAll) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await response.json();
  const phones = data.data;
  //   console.log(phone);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  //   Clear Container
  phoneContainer.textContent = "";

  //   Display show all
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  //   console.log("is show", isShowAll);

  // display only 12 phones if not show all clicked
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 shadow-xl`;
    phoneCard.innerHTML = `
    <figure class="pt-11"><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary w-1/2 rounded-2xl bg-[#0D6EFD] text-white border-0">Show Details</button>
      </div>
    </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};

// Handle Search button
const handleSearch = (isShowAll) => {
  //   console.log("Handle");
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  //   console.log(searchText);
  loadPhone(searchText, isShowAll);
  searchField.value = "";
};

// Toggle Spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const handleShowDetails = async (id) => {
  //   console.log(id);
  // load single phone data
  const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await response.json();
  const phone = data.data;
  console.log(phone);
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  /* const phoneName = document.getElementById("phone-name");
  phoneName.innerText = phone.name; */
  const phoneDetailsContainer = document.getElementById("phone-details-container");
  phoneDetailsContainer.innerHTML = `
    <center><figure class="pt-11 "><img src="${phone.image}" alt="Phone" /></figure></center>
    <h3 class="font-bold text-lg mb-2">${phone.name}</h3>
    <P class="mb-2"><span class="font-bold">Storage: </span><span>${phone.mainFeatures.storage}</span></P>
    <p class="mb-2"><span class="font-bold">Display: </span><span>${phone.mainFeatures.displaySize}</span></p>
    <p class="mb-2"><span class="font-bold">Memory: </span><span>${phone.mainFeatures.memory}</span></p>
    <p class="mb-2">
    <span class="font-bold">Release Date: </span>
    <span>${phone?.releaseDate || "Data Not found"}</span>
    </p>
    `;

  show_details_modal.showModal();
};

// Handle Show all
const handleShowAll = () => {
  handleSearch(true);
};

loadPhone();
