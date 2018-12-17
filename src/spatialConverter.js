const positionFactor = 11000;
const geoToVirtualScale = delta => delta * positionFactor;

const getVirtualTargetLocation = (currentGeoLocation, targetGeoLocation) => {
  return {
    latitude: targetGeoLocation.latitude - currentGeoLocation.latitude,
    longitude: targetGeoLocation.longitude - currentGeoLocation.longitude
  };
};

const getVirtualScale = (userLocation, destinationLocation) => {
  const virtualRoomGeoLocation = getVirtualTargetLocation(
    userLocation,
    destinationLocation
  );

  const x = geoToVirtualScale(virtualRoomGeoLocation.latitude);
  const y = 0;
  const z = geoToVirtualScale(virtualRoomGeoLocation.longitude);
  return `${x} ${y} ${z}`;
};

export { getVirtualScale };
