import {
  AlignmentVoteHandler,
  ButtonInputHandler,
  EthPlaysV0Handlers,
  SetConfigHandler,
} from "../generated/EthPlaysV0";

const handleAlignmentVote: AlignmentVoteHandler = async (params, context) => {
  const { db } = context;
  const { from, vote, alignment } = params;

  const insertResult = await db("FeedItem").insert({
    timestamp: 123,
    feedIndex: 456,
    type: "AlignmentVote",
    from: from,
    vote: vote,
  });

  console.log({ insertResult });
};

const handleButtonInput: ButtonInputHandler = (params) => {
  const { from, buttonIndex, inputIndex } = params;
};

const handleSetConfig: SetConfigHandler = (params) => {
  const { config } = params;
};

const handlers: EthPlaysV0Handlers = {
  AlignmentVote: handleAlignmentVote,
  ButtonInput: handleButtonInput,
  SetConfig: handleSetConfig,
};

export default handlers;
