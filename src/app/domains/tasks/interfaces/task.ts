export interface Task {
  id: string;
  title: string;
  description: string | null;
  /**
   * The due date in ISO 8601 format.
   *
   * @example '2021-01-01T00:00:00.000Z'
   */
  dueDate: string | null;
  /**
   * The creation date in ISO 8601 format.
   *
   * @example '2021-01-01T00:00:00.000Z'
   */
  createdAt: string;
  /**
   * The user ID of the user who created the task.
   */
  createdBy: string;
  /**
   * The last update date in ISO 8601 format.
   *
   * @example '2021-01-01T00:00:00.000Z'
   */
  updatedAt: string;
  /**
   * The user ID of the user who last updated the task.
   */
  updatedBy: string;
}
