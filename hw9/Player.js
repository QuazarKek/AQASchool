"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player(name, fuel) {
        this.inventory = [];
        this.name = name;
        this.fuelLevel = fuel;
    }
    Player.prototype.travel = function (distance) {
        if (distance > this.fuelLevel) {
            throw new Error('Not enough fuel!');
        }
        this.fuelLevel -= distance;
        console.log("Player ".concat(this.name, " traveled ").concat(distance, ". Fuel left: ").concat(this.fuelLevel));
    };
    Player.prototype.addResource = function (resource) {
        this.inventory.push(resource);
        console.log("Player ".concat(this.name, " found ").concat(resource.name, " with value ").concat(resource.value));
    };
    return Player;
}());
exports.Player = Player;
