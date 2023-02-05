import { API, Logger, PlatformConfig, PlatformAccessory, UnknownContext, uuid } from 'homebridge';
import { HOMEBRIDGE_CONFIGURATION_FILE_PATH, PLATFORM_NAME} from '../../platformSettings';
import { platformConfiguration, platformConfigurationPlatforms, platformConfigurationPlatformsAccessory } from '../../platformInterfaces/platformInterfaces';

import fs, { access } from 'fs';
import { platformConnector } from './platformConnector';


export class homebridgeConnector extends platformConnector {

  public name = 'homebridgeConnector';
  protected deviceList: PlatformAccessory<UnknownContext>[] = [];

  private cachedConfigurationTimeStamp = 0;
  private cachedConfigurationFile = '';
  private cachedConfigurationData = '';

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    super(log, config, api, HOMEBRIDGE_CONFIGURATION_FILE_PATH);
    //this.initialize();
  }

  protected async initialize(): Promise<void> {
    this.cachedConfigurationTimeStamp = fs.statSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs;
    this.cachedConfigurationFile = fs.readFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, 'utf-8');

    const currentConfigurationFile: platformConfiguration = JSON.parse(this.cachedConfigurationFile);
    const platformIndex = currentConfigurationFile.platforms.findIndex(
      (platformConfigurationPlatforms) => platformConfigurationPlatforms.platform === PLATFORM_NAME,
    );
    for (let accessoryIndex=0; accessoryIndex < currentConfigurationFile.platforms[platformIndex].accessories.length; accessoryIndex++){
      if (currentConfigurationFile.platforms[platformIndex].accessories[accessoryIndex].uuid === 'N/A') {
        currentConfigurationFile.platforms[platformIndex].accessories[accessoryIndex].uuid =
        this.api.hap.uuid.generate(currentConfigurationFile.platforms[platformIndex].accessories[accessoryIndex].name + Math.random);
      }
      //this.deviceList.push()

    }
    fs.writeFileSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH, JSON.stringify(currentConfigurationFile));
  }

  private async loadConfigurationFromJSON(configurationFile: string): Promise<boolean | void> {

    return;
  }


  public async status(): Promise<boolean | void> {
    if(this.cachedConfigurationTimeStamp !== fs.statSync(HOMEBRIDGE_CONFIGURATION_FILE_PATH).ctimeMs){
      return true;
    }
    return false;
  }

  public async refresh(): Promise<void> {
    this.log.error('[homebridgeConnector]<refresh> Method not implemented.');
  }

  public async get(): Promise<PlatformAccessory[]> {
    this.log.error('[homebridgeConnector]<get> Method not implemented.');
    return this.deviceList;
  }

  public async update(): Promise<boolean | void> {
    this.log.error('[homebridgeConnector]<update> Method not implemented.');
  }

}