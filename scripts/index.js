window.addEventListener("load", function() {
	var date = new Date(); // get current date
	var dateNav = document.getElementsByClassName("date-navigation")[0];

	var columNames = {
		Mon: "Понедельник",
		Tue: "Вторник",
		Wed: "Среда",
		Thu: "Четверг",
		Fri: "Пятница",
		Sat: "Суббота",
		Sun: "Восскресенье"
	};

	var columnMonth = [
		"Январь",
		"Февраль",
		"Март",
		"Апрель",
		"Май",
		"Июнь",
		"Июль",
		"Август",
		"Сентябрь",
		"Октябрь",
		"Ноябрь",
		"Декабрь"
	];

	var stringDay = date.toString().split(" ")[0]; // get string name day

	var today = date.getDate(); // today date count

	var daysInMonth = function(month, year) {
		return new Date(year, month, 0).getDate(); // кол-во дней месяца
	};

	function getItem(index, nameDay) {
		return `
    <div class="day-squre">
            <div class="day-inner">
              <div class="day">
              <span class="number">${index}</span>,
                <span class="title">${nameDay}</span>
              </div>
            </div>
          </div>`;
	}

	function draw() {
		let dayNow = 0;
		let todayIs = 0;
		let thisMonth = false;
		let countDays = daysInMonth(date.getMonth() + 1, date.getFullYear());

		var daysContainer = document.getElementsByClassName("days-container")[0];

		for (var i = 0; i < 6; i++) {
			let calendarLine = daysContainer.getElementsByClassName("day-line")[i];

			for (var j = 0; j < 7; j++) {
				dayNow++;

				let item;
				let nextDay = new Date(date);
				nextDay.setDate(date.getDate() + j);

				if (
					Object.values(columNames)[j] === columNames[stringDay] &&
					!thisMonth
				) {
					thisMonth = true;
				}

				console.log(thisMonth === true ? todayIs : 0);

				if (thisMonth === true && countDays >= dayNow - 5) {
					todayIs++;
				} else {
					todayIs = 0;
					thisMonth = false;
				}

				item = getItem(
					thisMonth === true ? todayIs : 0,
					Object.values(columNames)[j]
				);

				calendarLine.innerHTML += item;

				let currentBlock = calendarLine.getElementsByClassName("day-squre")[j];

				if (thisMonth === true) {
					currentBlock.classList.add("current");
				} else {
					currentBlock.classList.add("not-current");
				}
			}
		}
	}

	function drawNav() {
		let monthNav = dateNav.getElementsByClassName("month")[0];
		let yearNav = dateNav.getElementsByClassName("year")[0];

		monthNav.innerHTML += columnMonth[date.getMonth()];
		yearNav.innerHTML += date.getFullYear();
	}

	draw();
	drawNav();
});
