export interface platformConfiguration {
    [x: string]: any;
    bridge: platformConfigurationBridge;
    accessories: platformConfigurationAccessories;
    platforms: platformConfigurationPlatforms[];
    disabledPlugins: platformConfigurationDisabledPlugins;
    }

export interface platformConfigurationBridge {
    name: string;
    username: string;
    port: string;
    pin: string;
    advertiser: string;
    bind: string[];
}

export interface platformConfigurationAccessories {
    name: string;
    }

export interface platformConfigurationPlatforms {
        name: string;
        platform: string;
        accessories: platformConfigurationPlatformsAccessory[];
        }

export interface platformConfigurationPlatformsAccessory {
    name: string;
    UUID: string;
    }

export interface platformConfigurationDisabledPlugins {
        name: string;
        }









export interface platformAccessory {
    UUID: string;
    displayName: string;
}

export interface lightbulbAccessory extends platformAccessory {
Category: string;
Type: string;

}
