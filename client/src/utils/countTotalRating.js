export const countTotalRating = (groups) => {
   const total = groups.map((group) => {
      const data = countTotalRatingForGroup(group);
      return data;
   });

   let totalRating = 0,
      userTotalRating = 0,
      compared = '',
      percent = 0;

   total.forEach((gr) => {
      //add total rating
      totalRating += gr.groupTotalRating;
      //add total user rating
      userTotalRating += gr.userTotalRating;
   });

   compared = `${totalRating}/${userTotalRating}`;

   percent = (userTotalRating / totalRating) * 100;

   return { totalRating, userTotalRating, compared, percent };
};

export const countTotalRatingForGroup = (group) => {
   let groupName = group.name,
      groupTotalRating = 0,
      userTotalRating = 0;

   group.competenceListId.forEach((competence) => {
      //add to total rating
      if (competence.ratingSetting === 'from0to4') {
         groupTotalRating += 4;
      } else if (competence.ratingSetting === 'from0to1') {
         groupTotalRating += 1;
      }

      //add to user total rating
      const competenceRating = parseInt(competence.rating.rating);
      if (competenceRating <= 4 && competenceRating >= 0) userTotalRating += competenceRating;
      // if (competence.rating.rating !== null || competence.rating.rating !== 0 || competence.rating.rating <= 4) {
      //    userTotalRating += competence.rating.rating;
      // }
   });

   return { groupName, groupTotalRating, userTotalRating };
};
