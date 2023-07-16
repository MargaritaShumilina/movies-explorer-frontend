export const convertMinutesToHours = (time) => {
  const hours = Math.floor(time / 60);
  const remainingMinutes = time % 60;
  if (hours === 0) {
    return `${remainingMinutes} мин`;
  }

  if (remainingMinutes === 0) {
    return `${hours} ч`;
  }
  return `${hours}ч ${remainingMinutes} мин`;
};
