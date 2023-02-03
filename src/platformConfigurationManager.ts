import { API, Logger, PlatformConfig, PlatformAccessory } from 'homebridge';
import { HOMEBRIDGE_CONFIGURATION_PATH } from './platformSettings';
import { platformConfiguration, platformConfigurationPlatforms } from './platformInterfaces';

import fs, { stat } from 'fs';

export class platformConfigurationManager {

  private configurationFile = '';
  private deviceList: PlatformAccessory[] = [];
  //public refresh = true;

  private lastUpdated = 0;

  constructor(
        public readonly log: Logger,
        public readonly config: PlatformConfig,
        public readonly api: API,
  ) {
    //this.initialize();
  }

  //async initialize(){
  // try {
  //   this.log.debug('Platform Configuration Manager: Initializing');
  //   fs.stat(HOMEBRIDGE_CONFIGURATION_PATH, (error, stats) => {
  //     if(error) {
  //       throw new Error('');
  //     }
  //     this.lastUpdated = stats.ctimeMs;
  //   });
  // } catch (error) {
  //   throw new Error('');
  // }
  // }

  public update(): boolean {
    let updateStatus = false;
    this.log.warn('<Update> Initializing: Return Value |', updateStatus);
    try {
      fs.stat(HOMEBRIDGE_CONFIGURATION_PATH, (error, stats) => {
        if(this.lastUpdated === stats.ctimeMs){
          this.log.warn('<Update> Matched Time Stamps: Return Value |', updateStatus);
        } else {
          updateStatus = true;
          this.log.warn('<Update> Miss-Matched Time Stamps: Return Value |', updateStatus);
          this.log.error('<Update> Set Last Updated.......');
          this.log.error('<Update> From:', this.lastUpdated);
          this.log.error('<Update> To:', stats.ctimeMs);

          this.lastUpdated = stats.ctimeMs;
        }
      });
    } catch (error) {
      this.log.error('');
    }
    this.log.warn('<Update> Returning: Return Value |', updateStatus);
    return updateStatus;
  }

  refresh(): boolean {
    try {
      fs.stat(HOMEBRIDGE_CONFIGURATION_PATH, (error, stats) => {
        if(error) {
          throw new Error('');
        }
        if(this.lastUpdated === stats.ctimeMs){
          this.log.debug('Update2: No');
          return false;
        } else {
          this.log.debug('Update2: Yes');
          this.lastUpdated = stats.ctimeMs;
          return true;
        }
      });
    } catch (error) {
      throw new Error('');
    }
    return false;
  }

  scan(timeout = 500): PlatformAccessory[] {
    this.log.info('Refreshing Configuration File.');
    this.log.error('Configuration Status:', this.update());

    try {
      if ( this.update()) {
        this.log.info('Configuration File Change: Yes');
        const configData = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8');
        const configFile: platformConfiguration = JSON.parse(configData);
        this.log.error('----------Start Bridge----------');
        this.log.error('Bridge Name:', configFile.bridge.name);
        this.log.error('Bridge User Name:', configFile.bridge.username);
        this.log.error('Bridge Port:', configFile.bridge.port);
        this.log.error('Bridge Pin:', configFile.bridge.pin);
        this.log.error('Bridge Advertiser:', configFile.bridge.advertiser);
        this.log.error('Bridge Bind:', configFile.bridge.bind.toString);
        this.log.error('----------End Bridge----------');


        for (let index=0; index < configFile.platforms.length; index++){
          this.log.warn('Platform:', configFile.platforms[index].platform.toString);
        }

      } else {
        this.log.info('Configuration File Change: No');
      }
    } catch (error) {
      throw new Error();
    }
    return this.deviceList;

  }


  // scan(timeout = 500): Promise<PlatformAccessory[]> {
  //   return new Promise((resolve, reject) => {

  //     this.log.info('Refreshing Configuration File.');



  //     try {



  //       if (this.update()) {
  //         this.log.info('Configuration File Change: Yes');
  //         const configData = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8');
  //         const configFile: platformConfiguration = JSON.parse(configData);
  //         this.log.error('----------Start Bridge----------');
  //         this.log.error('Bridge Name:', configFile.bridge.name);
  //         this.log.error('Bridge User Name:', configFile.bridge.username);
  //         this.log.error('Bridge Port:', configFile.bridge.port);
  //         this.log.error('Bridge Pin:', configFile.bridge.pin);
  //         this.log.error('Bridge Advertiser:', configFile.bridge.advertiser);
  //         this.log.error('Bridge Bind:', configFile.bridge.bind.toString);
  //         this.log.error('----------End Bridge----------');


  //         for (let index=0; index < configFile.platforms.length; index++){
  //           this.log.warn('Platform:', configFile.platforms[index].platform.toString);
  //         }




  //         // var results []map[string]interface{}

  //         // // Unmarshal or Decode the JSON to the interface.
  //         // json.Unmarshal([]byte(empArray), &results)

  //         // for key, result := range results {
  //         //   address := result["address"].(map[string]interface{})
  //         //   fmt.Println("Reading Value for Key :", key)
  //         //   //Reading each value by its key
  //         //   fmt.Println("Id :", result["id"],
  //         //     "- Name :", result["name"],
  //         //     "- Department :", result["department"],
  //         //     "- Designation :", result["designation"])
  //         //   fmt.Println("Address :", address["city"], address["state"], address["country"])
  //         // }



  //       } else {
  //         this.log.info('Configuration File Change: No');

  //       }
  //       setTimeout(() => {
  //         resolve(this.deviceList);
  //       }, timeout);

  //     } catch {
  //       reject('Scan Error.');
  //     }

  //   });

  // }
















  // async scan(timeout = 500): Promise<PlatformAccessory[]> {
  //   return new Promise((resolve, reject) => {

  //     this.log.info('Refreshing Configuration File.');



  //     try {

  //       const configData = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_PATH, 'utf-8');
  //       const configFile = JSON.parse(configData);

  //       if (this.configurationInfo.toString() === configData.toString()) {
  //         this.log.info('Configuration File Change: No');
  //         this.refresh = false;
  //       } else {
  //         this.log.info('Configuration File Change: Yes');
  //         this.refresh = true;
  //         this.configurationInfo = configData.toString();
  //         this.deviceList = [];





  //         for (let index=0; index < configFile.platforms.length; index++){
  //           if(configFile.platforms[index].name === this.config.name){
  //             for (let index2 =0; index2 < configFile.platforms[index].devices.length; index2++){
  //               const displayName = configFile.platforms[index].devices[index2].name;
  //               const UUID = this.api.hap.uuid.generate(configFile.platforms[index].devices[index2].name);
  //               const accessory = new this.api.platformAccessory(displayName, UUID);
  //               this.deviceList.push(accessory);
  //             }
  //           }
  //         }
  //       }
  //       setTimeout(() => {
  //         resolve(this.deviceList);
  //       }, timeout);

  //     } catch {
  //       reject('Scan Error.');
  //     }

  //   });

  // }

}

