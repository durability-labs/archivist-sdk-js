import { type InferIssue } from "valibot";

type ValidationError = {
  expected: string;
  received: string;
  message: string;
  path: string | undefined;
};

/**
 *  The ArchivistError contains a message and 3 optionals properties:
 * `code`: The (http) code error when it comes from a request
 * `errors`: A {ValidationError} array when it comes from an object validation process
 * `stack`: The error stack when the ArchivistError results from a error thrown
 */
export class ArchivistError extends Error {
  code: number | null;
  errors: ValidationError[] | null;
  sourceStack: string | null;

  constructor(
    message: string,
    { code, errors, sourceStack }: ArchivistErrorProps = {}
  ) {
    super(message);

    this.code = code || null;
    this.errors = errors || null;
    this.sourceStack = sourceStack || null;
  }
}

type ArchivistErrorProps = {
  code?: number | null;
  errors?: ValidationError[] | null;
  sourceStack?: string | null;
};

export const ArchivistValibotIssuesMap = (issues: InferIssue<any>[]) =>
  issues.map((i) => ({
    expected: i.expected,
    received: i.received,
    message: i.message,
    path: i.path?.map((item: { key: string }) => item.key).join("."),
  }));
