export const formatDateCalendar = (date) => {
   if (date === undefined) return;
   return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${
      date.getHours() < 10 ? 0 : ''
   }${date.getHours()}:${date.getMinutes()}`;
};

export const formatDate = (date) => {
   if (date === undefined) return;
   return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${
      date.getHours() < 10 ? 0 : ''
   }${date.getHours()}:${date.getMinutes()}`;
};
