export class VotingHistoryDTO {

    votingId: number;
    order: number;
    description: string;
    subDescription: string;
    result: string;
    yesCount: number;
    noCount: number;
    abstentionCount: number;
    totalVotes: number;
}
