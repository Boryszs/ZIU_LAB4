export type AppStatusType = "idle" | "loading" | "success" | "error";

export interface AppStatus {
  type: AppStatusType;
  message: string;
}
