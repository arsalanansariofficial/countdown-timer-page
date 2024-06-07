const container_top = document.querySelector('.time_num > .top');
const container_bottom = document.querySelector('.time_num > .bottom');

const days = document.querySelector('#days');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');

function update_class(element, class_name, add = true) {
  if (add) return element.classList.add(class_name);
  element.classList.remove(class_name);
}

function prefix(value, max_length, prefix) {
  return new String(value).padStart(max_length, prefix);
}

function apply_interval(launch_date, interval) {
  let time_remaining;
  if (new Date() >= launch_date) return clearInterval(interval);
  time_remaining = get_time_remaining(launch_date);
  days.textContent = time_remaining.days_remaining;
  hours.textContent = time_remaining.hours_remaining;
  minutes.textContent = time_remaining.minutes_remaining;
  seconds.textContent = time_remaining.seconds_remaining;
}

function get_time_remaining(launch_date) {
  const today = new Date();
  const hours_ratio = 86400;
  const minutes_ratio = 3600;
  const seconds_ratio = 60;
  const milliseconds_ratio = 1000;
  const launch_time = launch_date.getTime() - today.getTime();
  const total_seconds = launch_time / milliseconds_ratio;
  const days_remaining = parseInt(total_seconds / hours_ratio);
  const hours_remaining = parseInt(
    (total_seconds % hours_ratio) / minutes_ratio
  );
  const minutes_remaining = parseInt(
    ((total_seconds % hours_ratio) % minutes_ratio) / seconds_ratio
  );
  const seconds_remaining = parseInt(total_seconds % seconds_ratio);
  return {
    days_remaining: prefix(days_remaining, 2, 0),
    hours_remaining: prefix(hours_remaining, 2, 0),
    minutes_remaining: prefix(minutes_remaining, 2, 0),
    seconds_remaining: prefix(seconds_remaining, 2, 0)
  };
}

function main() {
  let interval;
  const launch_day = 9;
  const launch_date = new Date();
  launch_date.setDate(launch_date.getDate() + launch_day);
  launch_date.setHours(0, 0, 0, 0);
  interval = setInterval(
    apply_interval.bind(this, launch_date, interval),
    1000
  );
}

main();
