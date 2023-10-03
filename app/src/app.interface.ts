export interface IJobType {
  id: string;
  email: string;
  emailCount: number;
  processedEmails: number;
}

export interface IJobUpdate {
  id: string;
  count: number;
}
