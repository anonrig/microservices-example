## Requirements

- NPM
- PostgreSQL (preferably >= 12)

## Technological Choices

### Using Composite Keys

- I deliberately chose to not use a subscription identifier in the subscriptions table. Since, we can achieve the same result with newsletter_id and email address combination, we can use 2 columns as primary key (composite keys) to reduce storage usage.

## Privacy Issues

- Subscription microservice is not GDPR friendly. We shouldn't store any personal information unless we particularly need it. Since some of the issues regarding personal information was inside the task itself, I left it there, but in order comply with the regulations, I didn't soft delete a subscription but removed it completely upon cancellation.
