export type DomainEvent = {
    id: string,
    eventName: string,
    body: Record<string, unknown>,
    ocurredOn: Date
};