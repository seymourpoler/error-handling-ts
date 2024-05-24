import { AppError } from "./AppError";

export class FindUserResult {
    constructor(public readonly user: AppError | null) {}

  public static userNotFound() : FindUserResult {
    return new FindUserResult(AppError.UserNotFound);
  }
}