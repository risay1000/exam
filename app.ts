/// <reference path="./TicketModule.ts" />

import PB = ParkBookSystem;

const t1 = new PB.BasicTicket(1, "Alice", "Single", ["2026-04-10", "Tour"]);
const t2 = new PB.BasicTicket(2, "Bob", "Single", ["2026-04-10", "Visit"]);
const t3 = new PB.GroupTicket(3, "Charlie", "Group", ["2026-04-10", "School Trip"], 5);

PB.ticketStore.push(t1, t2, t3);

console.log(t1.getSummary());
console.log(t3.getSummary());

const totalVisitors = PB.calculateTotalVisitors(PB.ticketStore);

console.log("Total Visitors:", totalVisitors);