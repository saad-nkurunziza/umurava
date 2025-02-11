import { Prisma } from "@prisma/client";

export type UserChallengeExtendedProps = Prisma.UserChallengeGetPayload<{
  include: {
    challenge: true;
  };
}>;

export type DeliverableTypes = Prisma.DeliverableGetPayload<{
  include: {
    challenge: true;
    user: true;
  };
}>;

export type SearchType = Prisma.ChallengeGetPayload<{
  include: {
    _count: {
      select: {
        participants: true;
      };
    };
  };
}>;
