const positionFactor = 1 / 111000;
const geoToVirtualScale = delta => delta / positionFactor;

const getVirtualTargetLocation = (currentGeoLocation, targetGeoLocation) => {
  return {
    latitude: targetGeoLocation.latitude - currentGeoLocation.latitude,
    longitude: targetGeoLocation.longitude - currentGeoLocation.longitude
  };
};

const getVirtualScaleFromGeoLocation = userLocation => {
  const x = geoToVirtualScale(userLocation.latitude);
  const y = 0;
  const z = geoToVirtualScale(userLocation.longitude);
  return `${x} ${y} ${z}`;
};

const getVirtualScale = (userLocation, destinationLocation) => {
  const virtualRoomGeoLocation = getVirtualTargetLocation(
    userLocation,
    destinationLocation
  );
  return getVirtualScaleFromGeoLocation(virtualRoomGeoLocation);
};

export { getVirtualScale, getVirtualScaleFromGeoLocation };
