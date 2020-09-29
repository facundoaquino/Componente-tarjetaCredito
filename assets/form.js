const $card = document.querySelector("#card"),
  $btnform = document.getElementById("btn-open-form"),
  $form = document.querySelector("#form-card"),
  $cardNumbers = document.querySelector("#card .number"),
  $cardName = document.querySelector("#card .name"),
  $frontalLogo = document.querySelector(".frontal__logo"),
  $firm = document.querySelector(".firm p"), // accedo al parrafo dentro de la firma
  $month = document.querySelector("#card .month"),
  $year = document.querySelector("#card .year"),
  $ccv = document.querySelector("#card .ccv ");

//validamos si la tarjeta esta de atras le sacamos la clase active cuando este en los campos de numero y nombre de tarjeta

const lookFrontal = () => {
  $card.classList.remove("active");
};

//validar que tipo de tarjeta es

const typeOfCard = (inputForm) => {
  if (inputForm[0] == 4 || (inputForm[0] == 5 && inputForm.length <= 1)) {
    $frontalLogo.innerHTML = "";
    const imgVisa = document.createElement("img");
    inputForm[0] == 4
      ? (imgVisa.src = "img/logos/visa.png")
      : (imgVisa.src = "img/logos/mastercard.png");

    $frontalLogo.append(imgVisa);
  } else if (inputForm == "") {
    $frontalLogo.innerHTML = "";
  }
};

$card.addEventListener("click", () => {
  $card.classList.toggle("active");
});

$btnform.addEventListener("click", () => {
  $btnform.classList.toggle("active");
  $form.classList.toggle("active");
});

//rellenar el select del mes dinamicamente

for (let i = 1; i <= 12; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.innerText = i;
  $form.selectMonth.appendChild(option);
}

//rellenado el año dinamicamente

const actualYear = new Date().getFullYear();
for (let i = actualYear; i <= actualYear + 10; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.innerText = i;
  $form.selectYear.appendChild(option);
}

// input del numero de la tarjeta agregar espacio en blanco cada 4 digitos

const inputNumberForm = () => {
  if (($form.inputNumber.value.length + 1) % 5 == 0) {
    $form.inputNumber.value += " ";
     
  }
};

inputNumberForm();

$form.inputNumber.addEventListener("keydown", (e) => {
  if (!isNaN(Number(e.key)) && $form.inputNumber.value.length <= 23) {
    $form.inputNumber.value += e.key;
    inputNumberForm();
  } else if (e.keyCode == 8) {
    $form.inputNumber.value = $form.inputNumber.value.slice(
      0,
      $form.inputNumber.value.length - 1
    );
  }
  $cardNumbers.innerText = $form.inputNumber.value;
  if ($cardNumbers.innerText == "") {
    $cardNumbers.innerText = "#### #### #### #### ####";
  }
  typeOfCard($form.inputNumber.value);
  lookFrontal();
});

$form.inputName.addEventListener("keyup", (e) => {
  $cardName.textContent = $form.inputName.value;
  $firm.textContent = $form.inputName.value;
  if ($cardName.textContent == "") {
    $cardName.textContent = "FACUNDO AQUINO";
  }
  lookFrontal();
  // console.log(e);
});

// accedemos al select mes
// el evento change permite ejecutar el codigo cada vez que haya  un cambio en nuestro select
$form.selectMonth.addEventListener("change", (e) => {
  $month.textContent = e.target.value;
  lookFrontal();
});
$form.selectYear.addEventListener("change", (e) => {
  $year.textContent = e.target.value.slice(2);
  lookFrontal();
});

//validando el cvv

$form.inputCvv.addEventListener('keyup',()=>{
  $card.classList.add('active')
  $form.inputCvv.value = $form.inputCvv.value.replace(/\s/g,'').replace(/\D/g,'');//expresiones regulares la primera elimina los espacios en blanco , la segunda elimina las letras
  $ccv.textContent=$form.inputCvv.value
})