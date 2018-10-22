export default function daysAgo(date) {
  const oneDayInMS = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  const now = new Date();
  const targetDate = new Date(date);

  let daysAgo = Math.round(
      (now.getTime() - targetDate.getTime()) / oneDayInMS
  );

  return daysAgo;
}
