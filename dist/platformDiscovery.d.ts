import { API, Logger, PlatformConfig, PlatformAccessory } from 'homebridge';
export declare class platformDiscovery {
    readonly log: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    private configurationInfo;
    private deviceList;
    refresh: boolean;
    constructor(log: Logger, config: PlatformConfig, api: API);
    scan(timeout?: number): Promise<PlatformAccessory[]>;
}
//# sourceMappingURL=platformDiscovery.d.ts.map