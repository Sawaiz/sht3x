//This is a I2C library for the SHT-3x Humidity Temprature Sensor by Sensirion

var I2C = require('raspi-i2c').I2C;

const SINGLE_STRECHING_HIGH      = [0x2C, 0x06];
const SINGLE_STRECHING_MED       = [0x2C, 0x0D];
const SINGLE_STRECHING_LOW       = [0x2C, 0x10];
const SINGLE_NO_STRECHING_HIGH   = [0x24, 0x00];
const SINGLE_NO_STRECHING_MED    = [0x24, 0x0B];
const SINGLE_NO_STRECHING_LOW    = [0x24, 0x16];

const PERIODIC_0_5_MPS_HIGH      = [0x20, 0x32];
const PERIODIC_0_5_MPS_MED       = [0x20, 0x24];
const PERIODIC_0_5_MPS_LOW       = [0x20, 0x2F];
const PERIODIC_1_0_MPS_HIGH      = [0x21, 0x30];
const PERIODIC_1_0_MPS_MED       = [0x21, 0x26];
const PERIODIC_1_0_MPS_LOW       = [0x21, 0x2D];
const PERIODIC_2_0_MPS_HIGH      = [0x22, 0x36];
const PERIODIC_2_0_MPS_MED       = [0x22, 0x20];
const PERIODIC_2_0_MPS_LOW       = [0x22, 0x2B];
const PERIODIC_4_0_MPS_HIGH      = [0x23, 0x34];
const PERIODIC_4_0_MPS_MED       = [0x23, 0x22];
const PERIODIC_4_0_MPS_LOW       = [0x23, 0x29];
const PERIODIC_10__MPS_HIGH      = [0x27, 0x37];
const PERIODIC_10__MPS_MED       = [0x27, 0x21];
const PERIODIC_10__MPS_LOW       = [0x27, 0x2A];

const FETCH_DATA                 = [0xE0, 0x00];
const ART                        = [0x2B, 0x32];
const BREAK                      = [0x30, 0x93];
const SOFT_RESET                 = [0x30, 0xA2];
const READ_STATUS_REG            = [0xF3, 0x2D];
const CLEAR_STATUS_REG           = [0x30, 0x41];
const HEATER_ENABLE              = [0x30, 0x6D];
const HEATER_DISABLE             = [0x30, 0x66];

module.exports = class SHT3x {
    constructor(ADDR) {
        //The sht3x has two possible slave adresses. Default VSS:(0x44) Alt VDD:(0x45).
        this.SLAVE_ADDR = ADDR | 0x44;
    }

    data() {
        var data = {};
        this.sendCommand(SINGLE_NO_STRECHING_HIGH);

        var response = this.readResponse(6);
        data.temp = response.readUInt16BE(0);
        data.humdity = response.readUInt16BE(3);

        data.temp_F = this.valToFahrenheit(data.temp);
        data.temp_C = this.valToCelsius(data.temp);
        data.RH = this.valToRH(data.humdity);
        return data;
    }


    sendCommand(command) {
        var i2c = new I2C();
        var buffer = Buffer.from(command);
        i2c.writeSync(this.SLAVE_ADDR, buffer);
    }

    readResponse(bytes) {
        var i2c = new I2C();
        return i2c.readSync(0x44, undefined, bytes);
    }

    // Convert 16 bit Temprature value from sensor to degrees Fahrenheit, funciton from Datasheet
    valToFahrenheit(value) {
        return -49 + (315 * (value) / (Math.pow(2, 16) - 1))
    }

    // Convert 16 bit Temprature value from sensor to degrees Celsius, funciton from Datasheet
    valToCelsius(value) {
        return -45 + (175 * (value) / (Math.pow(2, 16) - 1))
    }

    // Convert 16 bit humidty value from sensor to Reletive humdity, funciton from Datasheet
    valToRH(value) {
        return 100 * ((value) / (Math.pow(2, 16) - 1))
    }
}