class UI {
    constructor() {
      this.alarmField = document.querySelector('.textField');
      this.timeField = document.querySelector('.time');
      this.submitButton = document.querySelector('.submitBtn');
      this.allAlarms = document.getElementById('alarms');
      this.alarms = this.getAlarmsFromLocalStorage();
      this.submitButton.addEventListener('click', this.handleSubmit);
      this.addDeleteButtonsToAlarms();
    }
  
    getAlarmsFromLocalStorage=()=>{
      const alarmsString = localStorage.getItem('alarms');
      if (!alarmsString) {
        return [];
      }
      return JSON.parse(alarmsString);
    }
  
    handleSubmit=(event)=>{
      event.preventDefault();
      const alarmTitle = this.alarmField.value;
      const timeData = this.timeField.value;
      const alarm = {
        alarmTitle,
        timeData,
      };
      this.alarms.push(alarm);
      localStorage.setItem('alarms', JSON.stringify(this.alarms));
      this.allAlarms.innerHTML = this.alarms.map(alarm => `
        <li>
          <strong>${alarm.alarmTitle}</strong>
          <span>${alarm.timeData}</span>
          <button class="delete">Delete</button>
        </li>
      `);
    }
  
    addDeleteButtonsToAlarms=()=>{
      this.alarms.forEach((alarm, index) => {
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
          this.alarms.splice(index, 1);
          localStorage.setItem('alarms', JSON.stringify(this.alarms));
          this.allAlarms.innerHTML = this.alarms.map(alarm => `
            <li>
              <strong>${alarm.alarmTitle}</strong>
              <span>${alarm.timeData}</span>
              <button class="delete">Delete</button>
            </li>
          `);
        });
        this.allAlarms.appendChild(deleteButton);
      });
    }
  }
  
  const ui = new UI();
  