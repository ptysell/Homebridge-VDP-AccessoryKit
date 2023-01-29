import { PlatformAccessory, CharacteristicValue } from 'homebridge';
import { vdpPlatform } from './platform';
export declare class platformAccessory {
    private readonly platform;
    private readonly accessory;
    private service;
    private exampleStates;
    constructor(platform: vdpPlatform, accessory: PlatformAccessory);
    setOn(value: CharacteristicValue): Promise<void>;
    getOn(): Promise<CharacteristicValue>;
}
//# sourceMappingURL=platformAccessory.d.ts.map