export const loginUserQuery = (openId: string) => {
  return {
    where: { openId } as any,
    select: {
      id: true,
      displayName: true,
      authCategory: true,
      accountType: true,
      approved: true,
    },
  };
};

export const findUserQuery = (openId: string) => {
  return {
    where: { openId } as any,
    select: {
      id: true,
      displayName: true,
      authCategory: true,
      accountType: true,
    },
  };
};
