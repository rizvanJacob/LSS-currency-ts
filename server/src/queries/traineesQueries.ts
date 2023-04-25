export const traineesIndexQuery = {
  include: {
    users: { select: { approved: true } },
    categories: { select: { name: true } },
    currencies: { select: { expiry: true } },
  },
};

export const traineesInTrainingQuery = (trainingId: number) => {
  return {
    where: {
      trainings: {
        some: {
          training: trainingId,
        },
      },
      users: { approved: true },
    },
    include: {
      users: { select: { approved: true } },
      categories: { select: { name: true } },
      currencies: {
        where: {
          requirements: {
            trainings: {
              some: {
                id: trainingId,
              },
            },
          },
        },
      },
      trainings: {
        where: { training: trainingId },
        select: { statuses: { select: { name: true } } },
        orderBy: { training: "asc" },
      },
    },
  };
};
