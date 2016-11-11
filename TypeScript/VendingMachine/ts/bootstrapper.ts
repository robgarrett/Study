/// <reference path="vendingMachine.ts" />
/// <reference path="typings/knockout.d.ts" />

var machine = new VendingMachine();
machine.size = VendingMachineSize.medium;
ko.applyBindings(machine);

