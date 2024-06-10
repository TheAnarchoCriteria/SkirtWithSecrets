(function() {
  emailjs.init("3ImyA9sZMlHLtN3aE"); // Reemplaza "YOUR_PUBLIC_KEY" con tu clave pública de EmailJS
})();

function showSection(id) {
  var sections = document.getElementsByClassName('section-content');
  var menus = document.getElementsByClassName('menu')[0].getElementsByTagName('div');
  for (var i = 0; i < sections.length; i++) {
    sections[i].classList.remove('active');
    sections[i].style.display = 'none'; // Ocultar todas las secciones
    menus[i].classList.remove('active');
  }
  document.getElementById(id).classList.add('active');
  document.getElementById(id).style.display = 'flex'; // Mostrar la sección activa
  document.getElementById('menu' + id.replace('info', '')).classList.add('active');
}

function applyResources(resources) {
  document.getElementById('pageTitle').textContent = resources.pageTitle;
  document.getElementById('welcome-message').textContent = resources.welcomeMessage;
  document.querySelector('.logo').setAttribute('alt', resources.logoAlt);
  document.querySelector('.product-name').textContent = resources.productName;
  document.querySelector('.image').setAttribute('alt', resources.imageAlt);
  
  var menuItems = resources.menuItems;
  var menuDivs = document.querySelectorAll('.menu div');
  for (var i = 0; i < menuDivs.length; i++) {
    menuDivs[i].textContent = menuItems[i];
  }
  document.querySelector('.contact-button').textContent = menuItems[5];

  var infoSections = [resources.info1, resources.info2, resources.info3, resources.info4, resources.info5];
  for (var i = 0; i < infoSections.length; i++) {
    var section = document.getElementById('info' + (i + 1));
    var content = infoSections[i];
    section.innerHTML = '';
    for (var j = 0; j < content.length; j++) {
      var p = document.createElement('p');
      p.textContent = content[j];
      section.appendChild(p);
    }
  }

  document.getElementById('email').setAttribute('placeholder', resources.contactForm.emailPlaceholder);
  document.getElementById('message').setAttribute('placeholder', resources.contactForm.messagePlaceholder);
  document.querySelector('.popup button[type="submit"]').textContent = resources.contactForm.sendButton;
  document.querySelector('.popup button.cancel').textContent = resources.contactForm.cancelButton;
}

function loadResources(language) {
  switch(language) {
    case 'es':
      applyResources(resources_es);
      break;
    case 'fr':
      applyResources(resources_fr);
      break;
    case 'de':
      applyResources(resources_de);
      break;
    case 'ca':
      applyResources(resources_ca);
      break;
    case 'ru':
      applyResources(resources_ru);
      break;
    case 'ja':
      applyResources(resources_ja);
      break;
    case 'ko':
      applyResources(resources_ko);
      break;
    default:
      applyResources(resources_en);
  }
}

function closeWelcomePopup() {
  document.getElementById('welcome-popup').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {
  const userLang = navigator.language || navigator.userLanguage;
  const langCode = userLang.split('-')[0];
  const languageSelect = document.getElementById('language-select');

  // Establecer el valor del combo al idioma del navegador
  if (['es', 'fr', 'de', 'ca', 'ru', 'ja', 'ko'].includes(langCode)) {
    languageSelect.value = langCode;
  } else {
    languageSelect.value = 'en';
  }

  // Cargar los recursos según el idioma del navegador
  loadResources(languageSelect.value);

  showSection('info1'); // Preseleccionar la opción 1 al cargar la página

  languageSelect.addEventListener('change', function() {
    const selectedLanguage = languageSelect.value;
    loadResources(selectedLanguage);
  });

  document.getElementById('confirm-language-button').addEventListener('click', closeWelcomePopup);
});

function toggleContactForm() {
  var overlay = document.getElementById('popup-overlay');
  overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
}

function sendEmail(event) {
  event.preventDefault();
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;

  emailjs.send('service_23rkpbi', 'template_1abukbp', {
    to_email: 'manifestouncensored@gmail.com',
    from_email: email,
    message: message
  }).then(function(response) {
    alert(resources.contactSuccess);
    document.getElementById('contact-form').reset();
    toggleContactForm();
  }, function(error) {
    alert(resources.contactError);
  });
}
