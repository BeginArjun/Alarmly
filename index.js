const submitButton = document.querySelector('.submitBtn');
const textfield = document.querySelector('.textField');
const alarmList = document.querySelector('.alarm-list');

submitButton.addEventListener('click', addAlarm);

function addAlarm(e) {
  e.preventDefault();

  const alarmDiv = document.createElement('div');
  alarmDiv.classList.add('alarm');

  const newAlarm = document.createElement('li');
  newAlarm.innerText = textfield.value;
  newAlarm.classList.add('alarm-item');
  alarmDiv.appendChild(newAlarm);

  const newTime = document.createElement('span');
  newTime.innerText = getTime();
  newTime.classList.add('alarm-time');
  alarmDiv.appendChild(newTime);

  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-button');
  trashButton.addEventListener('click', deleteAlarm);
  alarmDiv.appendChild(trashButton);

  alarmList.appendChild(alarmDiv);
  textfield.value = '';
}

function getTime() {
  const timeInput = document.querySelector('.time');
  const selectedTime = timeInput.value;

  const [hours, minutes] = selectedTime.split(':');
  const formattedTime = format12HourTime(hours, minutes);

  return formattedTime;
}

function format12HourTime(hours, minutes) {
  let period = 'AM';
  let formattedHours = parseInt(hours);

  if (formattedHours >= 12) {
    period = 'PM';
    if (formattedHours > 12) {
      formattedHours -= 12;
    }
  }

  formattedHours = formattedHours.toString().padStart(2, '0');
  return `${formattedHours}:${minutes} ${period}`;
}

function deleteAlarm() {
  const alarmItem = this.parentNode;
  alarmList.removeChild(alarmItem);
}
