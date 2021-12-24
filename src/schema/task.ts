export enum taskStatus {
    PENDING="pending",
    IN_PROGRESS = "in-progress",
    COMPLETED="completed"
}
export type Task = {
    id?: string;
    title: string;
    description?: string;
    createdAt?: Date | string | number;
    updatedAt?: Date | string | number;
    status?: taskStatus;
}
  