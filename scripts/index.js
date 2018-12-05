const app = () => {
	const calendar = () => {
		let date = new Date(); // get date
		let monthCount = date.getMonth() + 1; // get count month
		let todayNumber = date.getDate(); // get today number
		let yearNumber = date.getFullYear();
		let nameDay = date.toString().split(" ")[0]; // get name day
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

			let other = null;

			const build = () => {
				console.log("dsd");
				for (let i = 0; i < lineSize; i++) {
					let template = document.createElement("div");
					template.classList.add("day-line");

					daysContainer.appendChild(template);
				}
			};

			const addItems = () => {
				for (let a = 0; a < lineSize; a++) {
					for (let i = 0; i < weekSize; i++) {
						//console.log(Object.values(columNames)[i]);
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
					let first = 0;

					for (let i = 0; i < lineSize; i++) {
						let k = 0;
						let line = daysContainer.getElementsByClassName("day-line")[i];

						if (setDayInit() > 0 && i === 0) {
							k = setDayInit();
							other = k;

							for (let gg = 1; gg <= k; gg++) {
								let day = line.getElementsByClassName("day-squre")[k - gg];
								let number = day.getElementsByClassName("number")[0];
								number.innerHTML +=
									countDaysMonth(monthCount - 1, yearNumber) - gg + 1;
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

			// get prev & next months
			// console.log(
			// 	columnMonth[monthCount - 1],
			// 	columnMonth[monthCount - 2],
			// 	columnMonth[monthCount > 12 ? monthCount - 1 : 0]
			// );

			build();
			addItems();

			setTimeout(() => {
				setDay();
				console.log(other + countDaysMonth(monthCount, yearNumber), 7 * 6);
			}, 0);
		};

		drawNav();
		init();
	};

	calendar();
};

document.addEventListener("DOMContentLoaded", app);

window.addEventListener("load", function() {
	// function draw() {
	// 	let dayNow = 0;
	// 	let todayIs = 0;
	// 	let thisMonth = false;
	// 	let countDays = daysInMonth(date.getMonth() + 1, date.getFullYear());
	// 	var daysContainer = document.getElementsByClassName("days-container")[0];
	// 	for (var i = 0; i < 6; i++) {
	// 		let calendarLine = daysContainer.getElementsByClassName("day-line")[i];
	// 		for (var j = 0; j < 7; j++) {
	// 			dayNow++;
	// 			let item;
	// 			let nextDay = new Date(date);
	// 			nextDay.setDate(date.getDate() + j);
	// 			if (
	// 				Object.values(columNames)[j] === columNames[stringDay] &&
	// 				!thisMonth
	// 			) {
	// 				thisMonth = true;
	// 			}
	// 			console.log(">>>>>>", thisMonth === true ? todayIs : 0);
	// 			if (thisMonth === true && countDays >= dayNow) {
	// 				todayIs++;
	// 			} else {
	// 				todayIs = 0;
	// 				thisMonth = false;
	// 			}
	// 			item = getItem(
	// 				thisMonth === true ? todayIs : 0,
	// 				Object.values(columNames)[j]
	// 			);
	// 			calendarLine.innerHTML += item;
	// 			let currentBlock = calendarLine.getElementsByClassName("day-squre")[j];
	// 			if (thisMonth === true) {
	// 				currentBlock.classList.add("current");
	// 			} else {
	// 				currentBlock.classList.add("not-current");
	// 			}
	// 		}
	// 	}
	// }
});
