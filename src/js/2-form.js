const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener("input", (event) => {
  const value = event.target.value;
  const name = event.target.name;
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedFormData) {
    savedFormData[name] = value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedFormData));
		
  } else {
    const formData = {
      [name]: value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();


  const formData = {
   email: form.elements.email.value.trim(),
   message: form.elements.message.value.trim(),
 };

 if (!formData.email || !formData.message) {
   alert('Fill please all fields');
   return;
 }
 console.log(formData);
 localStorage.removeItem(STORAGE_KEY);
 event.currentTarget.reset();
});

populateForm();

function populateForm() {
 const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

 if (!savedFormData) {
   return;
 }

 for (const key in savedFormData) {
   if (savedFormData.hasOwnProperty(key)) {
     form.elements[key].value = savedFormData[key];
   }
 }
}