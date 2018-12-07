const app = () => {
	const calendar = () => {
		let date = new Date(); // get date
		let monthCount = date.getMonth() + 1; // get count month
		// let todayNumber = date.getDate(); // get today number
		let yearNumber = date.getFullYear();
		// let nameDay = date.toString().split(" ")[0]; // get name day
		let firstDay = new Date(yearNumber, monthCount - 1, 1); // get first day month

		const dateNavigation = document.getElementById("date-navigation"); // get date navigation
		const daysContainer = document.getElementById("days-container"); // days container

		const columNames = {
			Mon: "Понедельник",
			Tue: "Вторник",
			Wed: "Среда",
			Thu: "Четверг",
			Fri: "Пятница",
			Sat: "Суббота",
			Sun: "Восскресенье"
		}; // obj names days

		const columnMonth = [
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
		]; // array months

		const countDaysMonth = function(month, year) {
			return new Date(year, month, 0).getDate();
		}; // get count days in this month

		let getItem = nameDay => {
			return `<div class="day-squre">
        <div class="day-inner">
          <div class="day">
            <span class="title">${nameDay}</span>,
            <span class="number"></span>
          </div>
          </div>
        </div>`;
		};

		const drawNav = () => {
			let monthNav = dateNavigation.getElementsByClassName(
				"month-navigation"
			)[0];
			let yearNav = dateNavigation.getElementsByClassName("year-navigation")[0];

			monthNav.innerHTML += columnMonth[monthCount - 1] + ",";
			yearNav.innerHTML += yearNumber;
		};

		const init = () => {
			let lineSize = 6;
			let weekSize = 7;
			let allSize = lineSize * weekSize;

			const build = () => {
				for (let i = 0; i < lineSize; i++) {
					let template = document.createElement("div");
					template.classList.add("day-line");

					daysContainer.appendChild(template);
				}
			};

			const addItems = () => {
				for (let a = 0; a < lineSize; a++) {
					for (let i = 0; i < weekSize; i++) {
						let newItem = getItem(Object.values(columNames)[i]);
						let thisLine = daysContainer.getElementsByClassName("day-line")[a];

						thisLine.innerHTML += newItem;
					}
				}
			};

			const setDay = () => {
				const setDayInit = () => {
					let start = 0;

					for (let i = 0; i < Object.values(columNames).length; i++) {
						if (
							firstDay.toString().split(" ")[0] === Object.keys(columNames)[i]
						) {
							return start;
						}

						start++;
					}
				};

				const outputDayNum = () => {
					let b = 0;
					let st = 1;
					let first = 0;

					for (let i = 0; i < lineSize; i++) {
						let k = 0;
						let countsWithDifferent =
							setDayInit() + countDaysMonth(monthCount, yearNumber);
						let line = daysContainer.getElementsByClassName("day-line")[i];

						if (setDayInit() > 0 && i === 0) {
							k = setDayInit();

							for (let gg = 1; gg <= k; gg++) {
								let day = line.getElementsByClassName("day-squre")[k - gg];
								let number = day.getElementsByClassName("number")[0];
								number.innerHTML +=
									countDaysMonth(monthCount - 1, yearNumber) - gg + 1;
							}
						}

						for (let bb = 0; bb < weekSize; bb++) {
							b++;

							if (b > countsWithDifferent) {
								let day = line.getElementsByClassName("day-squre")[bb];
								let number = day.getElementsByClassName("number")[0];

								number.innerHTML += st;

								st++;
							}
						}

						for (k; k < weekSize; k++) {
							let day = line.getElementsByClassName("day-squre")[k];
							let number = day.getElementsByClassName("number")[0];

							first++;

							if (first <= countDaysMonth(monthCount, yearNumber)) {
								number.innerHTML += first;
								day.classList.add("current");
							} else {
								return false;
							}
						}
					}
				};

				outputDayNum();
      };
      
			build();
			addItems();

			setTimeout(() => {
				setDay();
			}, 0);
		};

		drawNav();
		init();
	};

	calendar();
};

document.addEventListener("DOMContentLoaded", app);