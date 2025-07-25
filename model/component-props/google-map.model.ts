export interface MapComponentData {
    title: string;
    _metadata: {
      uid: string;
    };
    pin_icon: PinIcon;
    locations: Location[];
  }
  
  export interface PinIcon {
    url: string;
  }
  
  export interface Location {
    title: string;
    latitude: any;
    longitude: any;
  }
  
  export interface LocationAttributes {
    id: number;
    lat: number;
    lon: number;
    title: string;
  };
  