namespace ParkBookSystem {

    export type ITicket = {
        ticketId: number;
        visitorName: string;
        ticketType: string;
    };

    export type TicketMeta = [string, string];

    export function LogTicket(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ): void {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            console.log(`Method called: ${propertyKey}`);
            console.log(`Timestamp: ${new Date().toISOString()}`);
            return originalMethod.apply(this, args);
        };
    }

    export class BasicTicket implements ITicket {
        ticketId: number;
        visitorName: string;
        ticketType: string;
        meta: TicketMeta;

        constructor(
            ticketId: number,
            visitorName: string,
            ticketType: string,
            meta: TicketMeta
        ) {
            this.ticketId = ticketId;
            this.visitorName = visitorName;
            this.ticketType = ticketType;
            this.meta = meta;
        }

        @LogTicket
        getSummary(): string {
            return `Ticket ID: ${this.ticketId}, Name: ${this.visitorName}, Type: ${this.ticketType}, Date: ${this.meta[0]}, Purpose: ${this.meta[1]}`;
        }
    }

    export class GroupTicket extends BasicTicket {
        groupSize: number;

        constructor(
            ticketId: number,
            visitorName: string,
            ticketType: string,
            meta: TicketMeta,
            groupSize: number
        ) {
            super(ticketId, visitorName, ticketType, meta);
            this.groupSize = groupSize;
        }

        @LogTicket
        getSummary(): string {
            return `${super.getSummary()}, Group Size: ${this.groupSize}`;
        }
    }

    export const ticketStore: (BasicTicket | GroupTicket)[] = [];

    export function calculateTotalVisitors(
        tickets: (BasicTicket | GroupTicket)[]
    ): number {
        let total = 0;

        for (const ticket of tickets) {
            if (ticket instanceof GroupTicket) {
                total += ticket.groupSize;
            } else {
                total += 1;
            }
        }

        return total;
    }
}