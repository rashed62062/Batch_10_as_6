document.getElementById("scrollButton").addEventListener("click", function () {
  document.getElementById("target").scrollIntoView({ behavior: "smooth" });
});

const buttonCategory = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => CategoryName(data.categories))
    .catch((error) => console.log(error));
};

const VideoSection = () => {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden"); // Show loader

  // Start the fetching process
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      setTimeout(() => {
        petsData = data.pets;
        buttonfilterdiplay(petsData);
        loader.classList.add("hidden");
      }, 2000); // 2 seconds delay
    })
    .catch((error) => {
      console.log(error);
      loader.classList.add("hidden");
    });
};

//  button categories section
const LoadVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    // .then((data) => displaySection(data.pets))
    .then((data) => buttonfilterdiplay(data.data))
    .catch((error) => console.log(error));
};

const modalDetails = async (petsID) => {
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petsID}`;
  const res = await fetch(uri);
  const data = await res.json();
  modalDisplay(data.petData);
};

const modalDisplay = (pet) => {
  console.log("ja", pet);
  const modalContainer = document.getElementById("modal-content");

  document.getElementById("customModal").showModal();
  modalContainer.innerHTML = `
     <img  src="${pet.image}"/>

     <div class="text-3xl font-bold"> 
         <p>${pet.pet_name}</p>
         </div>

    
         <div>
     <p><i class="fas fa-paw mr-2"></i>  Breed :${pet.breed}</p>
     <p> <i class="fas fa-venus-mars mr-2"></i> 
       Gender :${pet.gender}</p>
     <p>   <i class="fas fa-syringe mr-2"></i> Vaccinated status : ${
       pet.vaccinated_status > 0 ? `${pet.vaccinated_status}` : "Unavailable"
     }</p>

    
     
     </div>

     <div class="">
      <p> <i class="fas fa-birthday-cake mr-2"></i>  Birth:  ${
        pet.date_of_birth > 0 ? `${pet.date_of_birth}` : "unavailable"
      }</p>
      <P>  <i class="fas fa-dollar-sign mr-2"></i> Price:${
        pet.price > 0 ? `${pet.price}` : " unavailable"
      }</P>
     </div>
        
      

        <P class="font-bold">Details Information</P>
        <p>${pet.pet_details}</p>

      `;
};

//  display button function
const CategoryName = (categories) => {
  const categoryContainer = document.getElementById("btnSection");
  categories.forEach((item) => {
    console.log("ma", item);

    // //   create  a button

    const buttonContainer = document.createElement("div");

    buttonContainer.innerHTML = `
            

                   <button onclick="LoadVideos('${item.category}')" class="btn flex items-center gap-2">
        <img src="${item.category_icon}" alt="${item.category} icon" class="w-6 h-6" />
        <span>${item.category}</span>
      </button>

             
             `;

    categoryContainer.append(buttonContainer);
  });
};

// pr------function
buttonCategory();

VideoSection();

const startAdoptCountdown = (petName) => {
  const modalContainer = document.getElementById("modal-content");
  let countdown = 3; // Set countdown starting value

  // Update modal content to show countdown message
  modalContainer.innerHTML = `
      <div class="text-3xl font-bold">Adopting ${petName}...</div>
      <p class="text-lg">Closing in <span id="countdown">${countdown}</span> seconds.</p>
  `;
  
  // Show the modal
  const modal = document.getElementById("customModal");
  modal.showModal();

  // Start countdown
  const interval = setInterval(() => {
      countdown--;
      document.getElementById("countdown").textContent = countdown;
      if (countdown <= 0) {
          clearInterval(interval);
          modal.close(); // Close the modal after countdown
          // alert(`You have adopted ${petName}!`); // Optional: show confirmation message
      }
  }, 1000); // Update countdown every second
};



const buttonfilterdiplay = (pets) => {
  const petsContainer = document.getElementById("petsImg");
  petsContainer.innerHTML = "";

  if (pets.length === 0) {
    petsContainer.innerHTML = `
      <div class="flex justify-center items-center h-screen">
        <div class="card bg-white-300 text-primary-content p-6">
          <div class="flex justify-center">
            <img class="object-center" src="/images/error.webp" alt="Error Image">
          </div>
          <div class="text-center mt-4">
            <h1 class="font-bold text-2xl text-black">No Information Available</h1>
            <p>It is a long established fact that a reader will be distracted...</p>
          </div>
        </div>
      </div>
    `;
    return;
  }

  pets.forEach((pet) => {
    const PetsCard = document.createElement("div");
    PetsCard.classList = "card bg-base-100 shadow-xl gap-5";

    PetsCard.innerHTML = `
      <figure class="px-5 pt-5">
        <img src="${pet.image}" alt="${pet.pet_name}" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <div class="text-3xl font-bold"><p>${pet.pet_name}</p></div>
        <div class="flex flex-col items-center">
          <p class="flex items-center">
            <i class="fas fa-birthday-cake mr-2"></i> Birth: ${
              pet.date_of_birth
            }
          </p>
          <p class="flex items-center">
            <i class="fas fa-venus-mars mr-2"></i> Gender: ${pet.gender}
          </p>
          <p class="flex items-center">
            <i class="fas fa-dollar-sign mr-2"></i> Price: ${
              pet.price > 0 ? `${pet.price}` : " Unavailable"
            } 
          </p>
          <p class="flex items-center">
            <i class="fas fa-paw mr-2"></i> Breed: ${pet.breed}
          </p>
        </div>
        <div class="card-actions">
        
          <button class="btn" onclick="likeAdd('${pet.image}')">
            <i class="fas fa-thumbs-up"></i>
        <button class="btn btn-warning" onclick="startAdoptCountdown('${pet.pet_name}')">Adopt</button>

            <i class="fa-thin fa-"></i>
          </button>
          <button class="btn btn-primary" onclick="modalDetails('${
            pet.petId
          }')">Details</button>


        </div>

      </div>
    `;
    petsContainer.append(PetsCard);
  });
};

// icon end section

const likeAdd = (image) => {
  const imgContainer = document.getElementById("likeBtn");
  const imgCard = document.createElement("div");
  imgCard.innerHTML = `
  <div class="">
      <img src="${image}" alt="Liked pet image" class="rounded-xl shadow-md" />
  </div>
`;
  imgContainer.append(imgCard);
};

//   price short function

const sortPetsByPriceLowToHigh = () => {
  const sortedPets = [...petsData].sort((a, b) => a.price - b.price);
  buttonfilterdiplay(sortedPets); // Display sorted pets
};

VideoSection();

buttonfilterdiplay();
