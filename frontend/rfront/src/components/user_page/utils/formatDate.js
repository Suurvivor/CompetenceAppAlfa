export const formatDate = (date) => {
   return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${
      date.getHours() < 10 ? 0 : ''
   }${date.getHours()}:${date.getMinutes()}`;
};
