// js/form.js — Contact form validation + submit
// Replace the fake delay with Formspree or EmailJS (see README)

const submitBtn = document.getElementById('submitBtn');
const fname  = document.getElementById('fname');
const femail = document.getElementById('femail');
const fmsg   = document.getElementById('fmessage');

function setErr(el, err){
  el.style.borderColor = err ? 'rgba(255,45,120,.7)' : 'rgba(0,255,225,.1)';
}

async function sendForm(){
  const nameOk  = fname?.value.trim();
  const emailOk = femail?.value.trim() && /\S+@\S+\.\S+/.test(femail.value);
  const msgOk   = fmsg?.value.trim();

  setErr(fname,  !nameOk);
  setErr(femail, !emailOk);
  setErr(fmsg,   !msgOk);
  if(!nameOk || !emailOk || !msgOk) return;

  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: new FormData(document.querySelector('.contact-form-inner')), // I'll add this class to the form tag
    });

    submitBtn.textContent = '✓ Message Sent!';
    fname.value=''; femail.value='';
    document.getElementById('fsubject').value='';
    fmsg.value='';

    setTimeout(()=>{ submitBtn.textContent='Send Message →'; submitBtn.disabled=false; },4000);
  } catch(err) {
    submitBtn.textContent = 'Failed — Try Again';
    submitBtn.style.borderColor='var(--neon2)';
    submitBtn.disabled=false;
  }
}

submitBtn?.addEventListener('click', sendForm);
