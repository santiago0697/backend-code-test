export default abstract class DomainEvent {
    public constructor(
        public readonly id: string,
        public readonly body: Record<string, unknown>,
        public readonly ocurredOn: Date = new Date()
    ) { }

    public abstract get eventName(): string;
};