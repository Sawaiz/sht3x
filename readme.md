# Sensirion SHT3x
Node.js library for the temprature and humidity sensor. Manufacturer website for the component [part](https://www.sensirion.com/products/humidity-sensors/digital-humidity-sensors-for-various-applications/) and [datasheet](https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/2_Humidity_Sensors/Sensirion_Humidity_Sensors_SHT3x_Datasheet_digital.pdf).

### Use

For example to use it on your project instatiate the libray, and call the data function. As it acsesses hardware features, you need sudo inorder to run it.
```js
var SHT3x = require("./sht3x.js");
var sht32 = new SHT3x();
console.log(sht32.data());
```

You can can also call it directly from the command line 

```bash
sudo node -e 'console.log(new (require("./sht3x.js"))().data())'
```

### Response

The expected response is a JSON object with the temprature and relitive humiditiy.
```json
{ temp: 28525,
  humdity: 4597,
  temp_F: 88.10803387502861,
  temp_C: 31.171129930571453,
  RH: 7.014572365911345 }
```