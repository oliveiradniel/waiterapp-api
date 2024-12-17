export function isValidObjectId(objectId: string) {
  const regex = /^[a-f0-9]{24}$/;

  return regex.test(objectId);
}
